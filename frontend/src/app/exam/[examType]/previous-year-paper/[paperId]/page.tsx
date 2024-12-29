"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const TestDetails = () => {
  const { paperId } = useParams();
  const [testDetails, setTestDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/v1/previous-year-papers/get/${paperId}`); // Adjust API URL if needed
        const { data } = await res.json();
        setTestDetails(data);
      } catch (err) {
        setError("Error fetching test details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestDetails();
  }, [paperId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{testDetails.title}</h1>
      <div className="mb-4">
        <p><strong>Year:</strong> {testDetails.year}</p>
        <p><strong>Shift:</strong> {testDetails.shift}</p>
        <p><strong>Time:</strong> {testDetails.time}</p>
        <p><strong>Difficulty:</strong> {testDetails.difficulty}</p>
        <p><strong>No. of Questions:</strong> {testDetails.numberOfQuestions}</p>
      </div>
      <button
        onClick={() => router.push(`/exam/jee-mains/previous-year-paper/${paperId}/instructions`)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Start Test
      </button>
    </div>
  );
};

export default TestDetails;
