"use client";
import { useParams } from "next/navigation";

export default function TestPage() {
  const params = useParams();
  const { testType, subject, testId } = params || {};

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary text-center mb-6">
        Test {testId} - {subject} - {testType}
      </h1>
      {/* Fetch and display questions for the testId */}
    </div>
  );
}
