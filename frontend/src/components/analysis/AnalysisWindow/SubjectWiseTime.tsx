// analysis/AnalysisWindow/SubjectWiseTime.tsx
"use client"; // Mark this as a client component

import React from 'react';
import { useAnalysisContext } from '../context';

const SubjectWiseTime = () => {
  const { data, loading, error } = useAnalysisContext();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Subject-Wise Time Spent</h2>
      <p>Insert Bar Chart Here</p>
      {/* Replace with your bar chart component */}
    </div>
  );
};

export default SubjectWiseTime;
