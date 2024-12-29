import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        }, 
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        username: {
            type: String,
            required: true,
            trim: true,
            index: true,
            unique: true
        },
        avatar: {
            type: String, // clourdnary url
        }, 
        coverImage: {
            type: String // clourdnary url
        },
        password: {
            type:String,
            required: [true, "Password is required"]
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next(); 
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function
(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {

    const accessToken = jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );

    console.log("\nAccess token is: " + accessToken);

    return accessToken;
}

userSchema.methods.generateRefreshToken = function () {

    const refreshToken = jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
    console.log("\nRefresh token is: " + refreshToken);

    return refreshToken;
}

export const User = mongoose.model("User", userSchema);