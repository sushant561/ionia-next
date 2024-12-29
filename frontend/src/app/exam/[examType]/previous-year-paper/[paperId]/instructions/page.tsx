"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

const Instructions = () => {
  const router = useRouter();
  const { paperId, examType } = useParams(); // Extract paperId and examType from the URL
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    console.log(`/exam/${examType}/previous-year-paper/${paperId}/test`);
    if (!paperId) {
      console.error("paperId is missing!");
    }
  }, [paperId]);

  // Redirect to the test page once the user agrees to the instructions
  const handleProceed = () => {
    if (paperId && examType) {
      // Ensure we are redirecting to the correct test page with paperId
      router.push(`/exam/${examType}/previous-year-paper/${paperId}/test`);
    } else {
      console.error("Invalid paperId or examType");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <header className="bg-blue-100 py-4 px-6 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-lg font-semibold">Ministry of Education</h1>
            <h2 className="text-sm">Government of India</h2>
          </div>
          <div>
            <img
              src="https://nta.ac.in/Images/logo.png" // Replace with an actual logo link or local asset
              alt="National Testing Agency Logo"
              className="h-12"
            />
          </div>
        </div>
      </header>

      {/* Instructions Section */}
      <main className="max-w-4xl mx-auto mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Please read the instructions carefully
        </h2>

        {/* General Instructions */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold">General Instructions:</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
            <li>Total duration of JEE-Main is 180 minutes.</li>
            <li>
              The clock will be set at the server. The countdown timer in the
              top right corner of the screen will display the remaining time
              available for you to complete the examination.
            </li>
            <li>
              The Questions Palette displayed on the right side of the screen
              will show the status of each question using symbols.
            </li>
            <li>You can navigate through questions and sections as needed.</li>
          </ul>
        </section>

        {/* Symbols Section */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold">Question Palette Symbols:</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <span className="inline-block w-4 h-4 bg-gray-200 border rounded-full mr-2"></span>
              You have not visited the question yet.
            </li>
            <li>
              <span className="inline-block w-4 h-4 bg-red-500 border rounded-full mr-2"></span>
              You have not answered the question.
            </li>
            <li>
              <span className="inline-block w-4 h-4 bg-green-500 border rounded-full mr-2"></span>
              You have answered the question.
            </li>
            <li>
              <span className="inline-block w-4 h-4 bg-purple-500 border rounded-full mr-2"></span>
              You have marked the question for review.
            </li>
            <li>
              <span className="inline-block w-4 h-4 bg-blue-500 border rounded-full mr-2"></span>
              Marked for review and considered for evaluation.
            </li>
          </ul>
        </section>

        {/* Navigating and Answering Section */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold">Navigating and Answering:</h3>
          <ul className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li>To answer a question, click on the question number.</li>
            <li>
              Click "Save & Next" to save your answer for the current question
              and move to the next one.
            </li>
            <li>
              Click "Mark for Review & Next" to mark the current question for
              review and move to the next question.
            </li>
          </ul>
        </section>

        {/* Agreement and Proceed */}
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            id="agree"
            className="w-4 h-4"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <label
            htmlFor="agree"
            className="text-sm text-gray-700 cursor-pointer"
          >
            I have read and understood the instructions.
          </label>
        </div>
        <button
          className={`${
            isChecked
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-300 cursor-not-allowed"
          } text-white px-4 py-2 rounded-md w-full`}
          disabled={!isChecked}
          onClick={handleProceed} // Use the function here
        >
          Proceed
        </button>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-4 text-center mt-8 border-t">
        <p className="text-xs text-gray-500">
          © All Rights Reserved - National Testing Agency
        </p>
      </footer>
    </div>
  );
};

export default Instructions;
