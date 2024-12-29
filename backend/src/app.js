import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.use(cookieParser())
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

// routes import 

import userRouter from "./routes/user.routes.js";
import questionRouter from "./routes/question.routes.js";
import previousYearPaperRouter from "./routes/previousYearPaper.routes.js";

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/previous-year-papers", previousYearPaperRouter);
// http://localhost:3000/api/v1/users/register

export {app}