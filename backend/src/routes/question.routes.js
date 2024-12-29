import {Router} from "express";
import { uploadQuestion, getQuestions} from "../controllers/question.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import { verifyJWT} from "../middlewares/auth.middleware.js";


const router = Router();


router.route("/upload").post(uploadQuestion);
router.route("/get").get(getQuestions);

export default router;