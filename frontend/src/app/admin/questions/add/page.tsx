"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddQuestion() {
  const [questionData, setQuestionData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctOption: 0,
    examType: "",
    subject: "",
    sectionPhysics: "",
    sectionChemistry: "",
    sectionMathematics: "",
    difficulty: "",
    year: "not applicable",
    languageLevel: "",
    solutionMode: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => {
    const { name, value } = e.target;
    if (index !== undefined) {
      const newOptions = [...questionData.options];
      newOptions[index] = value;
      setQuestionData({ ...questionData, options: newOptions });
    } else {
      setQuestionData({ ...questionData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const uploadUrl = "http://localhost:4000/api/v1/questions/upload"; // Adjust backend URL if needed

    try {
      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Question uploaded successfully");
        router.push("/admin/questions"); // Redirect to the questions list page
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error uploading question:", error);
      alert("Failed to upload the question");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary text-center mb-6">Add New Question</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg">Question</label>
          <input
            type="text"
            name="question"
            value={questionData.question}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-lg">Options</label>
          {questionData.options.map((option, index) => (
            <input
              key={index}
              type="text"
              name={`option-${index}`}
              value={option}
              onChange={(e) => handleInputChange(e, index)}
              className="w-full px-4 py-2 border rounded-md mb-2"
              placeholder={`Option ${String.fromCharCode(65 + index)}`}
              required
            />
          ))}
        </div>

        <div>
          <label className="block text-lg">Correct Option (0-3)</label>
          <input
            type="number"
            name="correctOption"
            value={questionData.correctOption}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
            required
            min="0"
            max="3"
          />
        </div>

        <div>
          <label className="block text-lg">Exam Type</label>
          <input
            type="text"
            name="examType"
            value={questionData.examType}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-lg">Subject</label>
          <input
            type="text"
            name="subject"
            value={questionData.subject}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-lg">Section (Physics)</label>
          <input
            type="text"
            name="sectionPhysics"
            value={questionData.sectionPhysics}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-lg">Section (Chemistry)</label>
          <input
            type="text"
            name="sectionChemistry"
            value={questionData.sectionChemistry}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-lg">Section (Mathematics)</label>
          <input
            type="text"
            name="sectionMathematics"
            value={questionData.sectionMathematics}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-lg">Difficulty</label>
          <input
            type="text"
            name="difficulty"
            value={questionData.difficulty}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-lg">Year</label>
          <input
            type="text"
            name="year"
            value={questionData.year}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-lg">Language Level</label>
          <input
            type="text"
            name="languageLevel"
            value={questionData.languageLevel}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-lg">Solution Mode</label>
          <input
            type="text"
            name="solutionMode"
            value={questionData.solutionMode}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Question"}
        </button>
      </form>
    </div>
  );
}
