"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");  // Add error state

  // Fetch all questions from the API using the environment variable for the base URL
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const apiUrl = "http://localhost:4000/api/v1/questions/get"; // Update with your API URL
        console.log("Fetching questions from:", apiUrl); // Log URL for debugging

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }

        const data = await response.json();
        console.log("Fetched questions: ", data);  // Check if data is received correctly

        // Assuming data is inside the 'data' key based on your API response format
        setQuestions(data.data); // Access 'data' key to get the array of questions
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("Error fetching questions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return <h1 className="text-center mt-20 text-2xl">Loading questions...</h1>;
  }

  if (error) {
    return <h1 className="text-center mt-20 text-2xl text-red-600">{error}</h1>;
  }

  if (!questions.length) {
    return <h1 className="text-center mt-20 text-2xl">No questions available</h1>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary text-center mb-6">All Questions</h1>
      
      <div className="mb-6 text-right">
        <Link
          href="/admin/questions/add"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Add New Question
        </Link>
      </div>

      <div className="space-y-4">
        {questions.map((question) => (
          <div
            key={question._id}
            className="p-4 bg-white border rounded-lg shadow-md hover:shadow-xl"
          >
            <h2 className="text-lg font-medium">{question.question}</h2>
            <p className="text-gray-700">Subject: {question.subject}</p>
            <p className="text-gray-700">Exam Type: {question.examType}</p>
            <p className="text-gray-700">Difficulty: {question.difficulty}</p>
            <div className="flex justify-end space-x-4 mt-4">
              <Link
                href={`/admin/questions/edit/${question._id}`}
                className="text-blue-600 hover:underline"
              >
                Edit
              </Link>
              <Link
                href={`/admin/questions/delete/${question._id}`}
                className="text-red-600 hover:underline"
              >
                Delete
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
