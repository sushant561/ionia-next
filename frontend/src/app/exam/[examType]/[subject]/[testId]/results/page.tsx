"use client";

import { useParams } from "next/navigation";

export default function ResultsPage() {
  const params = useParams();
  const { testType, testId } = params || {};

  if (!testId) {
    return <h1 className="text-center mt-20 text-2xl">Results Not Found</h1>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary text-center mb-6">
        Results for {testType.toUpperCase()} - {testId}
      </h1>
      <p className="text-lg text-gray-700 text-center">
        This page displays results for test ID: <strong>{testId}</strong>.
      </p>
    </div>
  );
}
