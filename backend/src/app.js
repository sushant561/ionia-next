import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));

// Routes import 
import userRouter from "./routes/user.routes.js";
import questionRouter from "./routes/question.routes.js";
import previousYearPaperRouter from "./routes/previousYearPaper.routes.js";
import attemptedTestRouter from "./routes/attemptedTest.routes.js";  // <-- Import the attemptedTest router

// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/previous-year-papers", previousYearPaperRouter);
app.use("/api/v1/attempted-tests", attemptedTestRouter);  // <-- Register the attemptedTest routes

// Example: http://localhost:3000/api/v1/users/register

export { app };
