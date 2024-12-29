"use client";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ExamTypePage() {
  const params = useParams();
  const { examType } = params || {};

  const examDetails = {
    "jee-mains": {
      title: "JEE Mains Test Series",
      description: "Comprehensive practice for JEE Mains",
      subjects: ["Physics", "Chemistry", "Mathematics"],
    },
    "jee-advanced": {
      title: "JEE Advanced Test Series",
      description: "Challenging preparation for JEE Advanced",
      subjects: ["Physics", "Chemistry", "Mathematics"],
    },
    cuet: {
      title: "CUET Test Series",
      description: "Focused practice for CUET exams",
      subjects: ["Physics", "Chemistry", "Mathematics", "English", "General Knowledge"],
    },
  };

  const details = examDetails[examType];

  if (!details) {
    return <h1 className="text-center mt-20 text-2xl">Exam Type Not Found</h1>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary text-center mb-6">{details.title}</h1>
      <p className="text-lg text-gray-700 text-center">{details.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {details.subjects.map((subject) => (
          <Link
            key={subject}
            href={`/exam/${examType}/${subject.toLowerCase()}`}
            className="block p-6 bg-white border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold text-center text-primary">{subject}</h2>
          </Link>
        ))}
        <Link
          href={`/exam/${examType}/previous-year-paper`}
          className="block p-6 bg-white border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <h2 className="text-2xl font-semibold text-center text-primary">Previous Year Paper</h2>
        </Link>
      </div>
    </div>
  );
}
