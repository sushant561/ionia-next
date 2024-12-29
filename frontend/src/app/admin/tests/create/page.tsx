"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateTestPage() {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [examType, setExamType] = useState("");
  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [shift, setShift] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch questions for filtering when page loads
    async function loadQuestions() {
      try {
        const res = await fetch("http://your-backend-api-url/api/questions");
        const data = await res.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    loadQuestions();
  }, []);

  const handleCreateTest = async () => {
    setLoading(true);

    try {
      const testData = {
        examType,
        year,
        title,
        shift,
        subject,
        difficulty,
        questions: selectedQuestions,
      };

      const response = await fetch("http://your-backend-api-url/api/tests/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      });

      const result = await response.json();
      
      if (response.ok) {
        alert("Test series created successfully!");
        router.push("/admin/tests");
      } else {
        alert(result.message || "Error creating test series");
      }
    } catch (error) {
      console.error("Error creating test series:", error);
      alert("Error creating test series");
    }

    setLoading(false);
  };

  const handleQuestionSelect = (questionId: string) => {
    setSelectedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Create Test Series</h1>

      <form className="space-y-6">
        <div>
          <label className="block">Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block">Exam Type</label>
          <select
            className="w-full p-2 border rounded"
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
            required
          >
            <option value="">Select Exam Type</option>
            <option value="jee-mains">JEE Mains</option>
            <option value="jee-advanced">JEE Advanced</option>
            <option value="cuet">CUET</option>
          </select>
        </div>

        <div>
          <label className="block">Year</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block">Shift</label>
          <select
            className="w-full p-2 border rounded"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            required
          >
            <option value="">Select Shift</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>
        </div>

        <div>
          <label className="block">Subject</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block">Difficulty</label>
          <select
            className="w-full p-2 border rounded"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            required
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <h2 className="text-xl mt-6">Select Questions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {questions.map((question) => (
            <div
              key={question.id}
              className="p-4 border rounded cursor-pointer"
              onClick={() => handleQuestionSelect(question.id)}
              style={{
                backgroundColor: selectedQuestions.includes(question.id)
                  ? "#D1E7DD"
                  : "#FFF",
              }}
            >
              <p>{question.question}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="w-full p-4 bg-primary text-white rounded"
          onClick={handleCreateTest}
          disabled={loading}
        >
          {loading ? "Creating Test..." : "Create Test Series"}
        </button>
      </form>
    </div>
  );
}
