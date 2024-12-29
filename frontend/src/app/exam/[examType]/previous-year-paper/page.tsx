"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const PreviousYearPapers = () => {
  const { examType, subject } = useParams(); // Extract examType and subject from the URL
  const router = useRouter();
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/v1/previous-year-papers/get"); // Adjust API URL if needed
        const { data } = await res.json();
        setPapers(data);
      } catch (err) {
        setError("Error fetching papers.");
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Previous Year Papers</h1>
      <ul className="space-y-4">
        {papers.map((paper) => (
          console.log(`/exam/previous-year-paper/${paper._id}`),
          <li
            key={paper._id}
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
            onClick={() => 
              router.push(`/exam/jee-mains/previous-year-paper/${paper._id}`) // Route to [paperId]/page.jsx
            }
          >
            <h2 className="text-xl font-semibold">{paper.title}</h2>
            <p>{paper.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreviousYearPapers;
