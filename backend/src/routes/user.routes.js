import {Router} from "express";
import { loginUser,
         registerUser, 
         logoutUser, 
         refreshAccessToken, 
         changeCurrentPassword, 
         getCurrrentUser, 
         updateAccountDetails, 
         updateUserAvatar,
         updateUserCoverImage
} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { verifyJWT} from "../middlewares/auth.middleware.js";


const router = Router();


router.route("/register").post(
    upload.fields([
        {
            name:"avatar",     // This should be communicated between frontend and backend engineer
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount:1
        }
    ]),
    registerUser);

router.route("/login").post(loginUser);

// secured routes
router
.route("/logout")
.post(verifyJWT, logoutUser);

router
.route("/refresh-token")
.post(refreshAccessToken);

router
.route("/change-password")
.post(verifyJWT, changeCurrentPassword);

router
.route("/current-user")
.get(verifyJWT, getCurrrentUser);

router
.route("/update-account")
.patch(verifyJWT, updateAccountDetails);

router
.route("/avatar")
.patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

router
.route("/cover-image")
.patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

export default router;