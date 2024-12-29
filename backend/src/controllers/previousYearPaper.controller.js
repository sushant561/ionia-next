import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { PreviousTest } from "../models/previousYearPaper.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Controller to add a new previous year test (Admin only)
const addPreviousYearTest = asyncHandler(async (req, res) => {
    const {
        examType,
        year,
        title,
        time,
        shift,
        questions,
    } = req.body;

    // Validate required fields
    if (!examType || !year || !title || !time || !shift) {
        throw new ApiError(400, "All fields are required.");
    }

    // Create a new test instance
    const newTest = new PreviousTest({
        examType,
        year,
        title,
        time,
        shift,
        questions,
    });

    // Save the new test to the database
    const savedTest = await newTest.save();

    // Respond with success
    res.status(201).json(new ApiResponse("Previous year test added successfully.", savedTest));
});

// Controller to get previous year tests based on filters (for users)
const getPreviousYearTests = asyncHandler(async (req, res) => {
    try {
        // Extract query parameters from the request
        const { examType, year } = req.query;

        // Build the filter object
        const filter = {};
        if (examType) filter.examType = examType;
        if (year) filter.year = year;

        // If no query parameters are provided, the filter object will be empty
        // which means fetching all tests
        const tests = await PreviousTest.find(filter).populate("questions");

        // If no tests found, return a 404 error
        if (tests.length === 0) {
            throw new ApiError(404, "No tests found matching the criteria.");
        }

        // Send the response with the retrieved tests
        res.status(200).json(new ApiResponse("Previous year tests retrieved successfully.", tests));
    } catch (error) {
        throw new ApiError(500, "Error retrieving previous year tests.", error.message);
    }
});

// Controller to get details of a single test by ID (including questions)
const getTestDetails = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params; // Get the test ID from the URL parameters

        // Fetch the test with the specified ID and populate the questions
        const test = await PreviousTest.findById(id).populate("questions");

        if (!test) {
            throw new ApiError(404, "Test not found");
        }

        // Return the test details along with its associated questions
        res.status(200).json(new ApiResponse("Test details retrieved successfully.", test));
    } catch (error) {
        throw new ApiError(500, "Error retrieving test details.", error.message);
    }
});

export {
    addPreviousYearTest,
    getPreviousYearTests,
    getTestDetails,
};
