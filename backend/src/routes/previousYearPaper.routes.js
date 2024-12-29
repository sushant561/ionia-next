import { Router } from "express";
import { addPreviousYearTest, getPreviousYearTests, getTestDetails } from "../controllers/previousYearPaper.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Route to add a new previous year test (Admin only)
router.route("/add").post(addPreviousYearTest); // Assuming only admins have the right to add tests

// Route to get previous year tests based on filters
router.route("/get").get(getPreviousYearTests);

// Route to get details of a particular test by ID
router.route("/get/:id").get(getTestDetails); // This route fetches a single test's details by its ID

export default router;
