"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // Use this in the app directory
import { fetchTestDetails } from "../../../utils/api";

interface Question {
  question: string;
  options: string[];
  correctOption: number;
}

interface Test {
  _id: string;
  examType: string;
  title: string;
  year: number;
  time: string;
  shift: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
  numberOfQuestions: number;
}

const TestDetailsPage = () => {
  const { id } = useParams(); // Extract the test ID from the URL
  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      console.log("Test id: ", id);
      const getTestDetails = async () => {
        try {
          const response = await fetchTestDetails(id);
          const data = response?.data; // Extracting the data object from response
          setTest(data || null);
          console.log("Test data: ", data);
        } catch (error) {
          console.error("Error fetching test details:", error);
          setError("Failed to load test details. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      getTestDetails();
    }
  }, [id]);

  if (loading) {
    return <p className="text-center text-lg">Loading test details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!test) {
    return <p className="text-center text-gray-500">Test not found.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary text-center mb-6">
        Test Details: {test.title}
      </h1>
      <div className="mb-8">
        <p className="text-lg">
          <strong>Exam Type:</strong> {test.examType}
        </p>
        <p className="text-lg">
          <strong>Year:</strong> {test.year}
        </p>
        <p className="text-lg">
          <strong>Shift:</strong> {test.shift}
        </p>
        <p className="text-lg">
          <strong>Time:</strong> {test.time}
        </p>
        <p className="text-lg">
          <strong>Number of Questions:</strong> {test.numberOfQuestions}
        </p>
        <p className="text-lg">
          <strong>Created At:</strong> {new Date(test.createdAt).toLocaleString()}
        </p>
        <p className="text-lg">
          <strong>Updated At:</strong> {new Date(test.updatedAt).toLocaleString()}
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Questions</h2>
      {test.questions.length > 0 ? (
        <div className="space-y-6">
          {test.questions.map((question, index) => (
            <div
              key={question._id || index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <p className="text-lg font-semibold mb-4">{`Q${index + 1}: ${question.question}`}</p>
              <ul className="list-disc ml-6 space-y-2">
                {question.options.map((option, idx) => (
                  <li key={idx} className="text-md">
                    {`${String.fromCharCode(65 + idx)}. ${option}`}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-md font-semibold text-green-600">
                Correct Answer: {`${String.fromCharCode(65 + question.correctOption)}. ${question.options[question.correctOption]}`}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No questions available.</p>
      )}
    </div>
  );
};

export default TestDetailsPage;
