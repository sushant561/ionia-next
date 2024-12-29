import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import { Question } from "../models/question.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const uploadQuestion = asyncHandler( async (req, res) => {
    const {
        question,
        options,
        correctOption,
        examType,
        subject,
        sectionPhysics,
        sectionChemistry,
        sectionMathematics,
        difficulty,
        year,
        languageLevel,
        solutionMode
        } = req.body;
    
        // Create new question instance
    const newQuestion = new Question({
        question,
        options,
        correctOption,
        examType,
        subject,
        sectionPhysics,
        sectionChemistry,
        sectionMathematics,
        difficulty,
        year,
        languageLevel,
        solutionMode
    });

    // Save question to the database
    const savedQuestion = await newQuestion.save();
    res.status(201).json({ message: 'Question saved successfully', data: savedQuestion });

})

const getQuestions = asyncHandler(async (req, res) => {
    try {
        // Extract query parameters from the request
        const { testType, subject } = req.query;

        // Build the filter object
        const filter = {};

        if (testType) {
            filter.examType = testType; // Filter by testType (examType in your schema)
        }

        if (subject) {
            filter.subject = subject; // Filter by subject
        }

        // Retrieve questions based on the filter
        const questions = await Question.find(filter);

        // Send the response with the filtered questions
        res.status(200).json({
            message: "Questions retrieved successfully",
            data: questions
        });
    } catch (error) {
        throw new ApiError(500, 'Error retrieving questions', error.message);
    }
});


export {
    uploadQuestion,
    getQuestions
}