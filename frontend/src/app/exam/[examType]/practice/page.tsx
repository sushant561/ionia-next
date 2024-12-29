"use client";

import { useParams } from "next/navigation";

export default function PracticePage() {
  const params = useParams();
  const { testType } = params || {};

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary text-center mb-6">
        Practice Tests for {testType.toUpperCase()}
      </h1>
      <p className="text-lg text-gray-700 text-center">
        Here you can find practice tests and quizzes for {testType}.
      </p>
    </div>
  );
}
