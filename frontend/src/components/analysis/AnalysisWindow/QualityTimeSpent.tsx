// analysis/AnalysisWindow/QualityTimeSpent.tsx
"use client"; // Mark this as a client component

import React from 'react';
import { useAnalysisContext } from '../context';

const QualityTimeSpent = () => {
  const { data, loading, error } = useAnalysisContext();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Quality of Time Spent</h2>
      <p>Insert Bar Chart Here</p>
      {/* You can replace this with your actual chart component */}
    </div>
  );
};

export default QualityTimeSpent;
