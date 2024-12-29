import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        
        console.log("User Controller login access token: " + accessToken);
        console.log("User Controller login refresh token: " + refreshToken);

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token", error)
    }
}

const registerUser = asyncHandler(async (req,res) => {
    // 1.get user details from frontend
    // 2. validation - not empty
    // 3. check if user already exists: username, email
    // 4. check for image, check for avatar
    // 5. upload them to cloudinary, avatar
    // 6. create user object - create entry in db
    // 7. remove password and refresh token field from response
    // 8. check for user creation
    // 9. return response

    const {fullName, email, username, password} = req.body;
    console.log(req.body);


    if (
        [fullName, email, username, password].some((field) => 
        field?.trim() === "")
    ) {
        throw new ApiError(400 ,"All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{username}, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    // console.log(req.files);

    // 4. check for image, check for avatar

    const avatarLocalPath = req.files?.avatar[0]?.path;
//    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    // if(!avatarLocalPath) {
    //     throw new ApiError(400, "Avatar file is required");
    // }

    // 5. upload them to cloudinary, avatar

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    // if(!avatar) {
    //     throw new ApiError(400, "Avatar file is required");
    // }

    // 6. create user object - create entry in db

    const user = await User.create({
        fullName,
        avatar: avatar?.url || "",
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()

    })
    // console.log("User data on signup: ", user);

    // 7. remove password and refresh token field from response

    const createdUser = await  User.findById(user._id).select(
        "-password -refreshToken"
    );

    // 8. check for user creation

    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // 9. return response

    return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"));
})

const loginUser = asyncHandler(async (req, res) => {

    // 1. req body -> data
    const {email, username, password} = req.body;
    // console.log(req.body);

    if(!username && !email) {
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({
        $or: [{username}, {email}] 
    })

    if(!user) {
        throw new ApiError(404,"User does not exist" );
    }

    console.log("Login password is: ", password);

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid) {
        throw new ApiError(401,"Invalid user credentials" );
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);


    const loggedInUser = await User.findById(user._id).select("-password -refreshtoken")

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/'
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged in successfully"
        )
    )
})

const logoutUser = asyncHandler(async(req,res) => {
    console.log("req.user: ", req.user);
    await User.findByIdAndUpdate(
        req.user._id,
        {
            // $set: {
            //     refreshToken: undefined
            // }
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/'
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out"))
});

const refreshAccessToken = asyncHandler(async(req,res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    console.log("Cookie", req.cookies);
    console.log("Incoming refresh token is: ",incomingRefreshToken);

    console.log("Error starting");
    if(!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request");
    }
    console.log("Error ending");

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
        console.log("Decoded token: ",  decodedToken);
        const user = await User.findById(decodedToken?._id);
        
    
        if(!user) {
            throw new ApiError(401, "Invalid refresh token");
        }
    
        console.log("Start");
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }
        console.log("end");
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newrefreshToken} = await generateAccessAndRefreshToken(user._id);
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newrefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {accessToken, refreshToken: newrefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
});

const changeCurrentPassword = asyncHandler( async (req, res) => {
    const {oldPassword, newPassword, confirmPassword} = req.body;

    if(!(newPassword === confirmPassword)) {
        throw new ApiError(400, "Confirm password did not match");
    }

    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if(!isPasswordCorrect) {
        throw new ApiError(400, "invalid old password");
    }

    user.password = newPassword;
    await user.save({validateBeforeSave: true});

    return res.status(200).json(
        new ApiResponse(200, {}, "Password changed successfully")
    )
}); 

const getCurrrentUser = asyncHandler(async (req, res) => {
    return res.status(200)
    .json(new ApiResponse(200, req.user, "current user fetched successfully"))
});

const updateAccountDetails = asyncHandler( async(req, res) => {
    const {fullName , email} = req.body;

    if(!fullName || !email) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email: email
            }
        },
        {new: true} // if we write new then object is returned after updating
    ).select("-password");


    return res.status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
})

const updateUserAvatar = asyncHandler(async  (req, res) => {
    const avatarLocalPath = req.file?.path;
    console.log("req.file", req.file);

    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing");
    }

    // TODO: delete old image --assignment
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if(!avatar.url) {
        throw new ApiError(400, "Error while uploading on avatar");
    }



    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar:  avatar.url
            }
        },
        {new:true}
    ).select("-password");


    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "Avatar image updated successfully")
    )
})

const updateUserCoverImage = asyncHandler(async  (req, res) => {
    const coverImageLocalPath = req.file?.path;
    console.log("req.file: " + req.file);

    if(!coverImageLocalPath) {
        throw new ApiError(400, "CoverImage file is missing");
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!coverImage.url) {
        throw new ApiError(400, "Error while uploading on coverImage");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                coverImage:  coverImage.url
            }
        },
        {new:true}
    ).select("-password");

    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "Cover image updated successfully")
    )
})

export {
    registerUser, 
    loginUser, 
    logoutUser, 
    refreshAccessToken,
    changeCurrentPassword,
    getCurrrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage
}