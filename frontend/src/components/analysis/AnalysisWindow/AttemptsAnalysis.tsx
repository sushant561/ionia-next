// analysis/AnalysisWindow/AttemptsAnalysis.tsx
"use client"; // Mark this as a client component


import React from 'react';
import { useAnalysisContext } from '../context';

const AttemptsAnalysis = () => {
  const { data, loading, error } = useAnalysisContext();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Attempts Analysis</h2>
      <div className="flex justify-center items-center">
        <div className="relative">
          <svg className="w-32 h-32" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="16"
              stroke="#E5E7EB"
              strokeWidth="2"
              fill="none"
            />
            <circle
              cx="18"
              cy="18"
              r="16"
              stroke="#3B82F6"
              strokeWidth="2"
              fill="none"
              strokeDasharray="100"
              strokeDashoffset={100 - data.attemptPercentage} // Assuming this value is in percentage
            />
          </svg>
          <p className="absolute inset-0 flex justify-center items-center text-lg font-semibold text-gray-700">
            {data.attemptPercentage}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default AttemptsAnalysis;
