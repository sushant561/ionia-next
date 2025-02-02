import { Router } from "express";
import { 
  submitTest, 
  getTestAnalysis, 
  updateTestResults, 
  deleteTestResults 
} from "../controllers/attemptedTest.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Route to submit a test
router.route("/submit").post( submitTest);

// Route to get test analysis
router.route("/analysis/:attemptedTestId").get(verifyJWT, getTestAnalysis);

// Route to update test results
router.route("/update").put(verifyJWT, updateTestResults);

// Route to delete test results
router.route("/delete/:attemptedTestId").delete(verifyJWT, deleteTestResults);

export default router;
