// analysis/AnalysisWindow/Tabs.tsx
"use client"; // Mark this file as a client component if it uses client hooks
import React from 'react';
import { useAnalysisContext } from '../context';

const Tabs = () => {
  const { setSubject } = useAnalysisContext();
  const tabs = ['Overall', 'Physics', 'Chemistry', 'Mathematics'];

  return (
    <div className="flex space-x-4 border-b-2 border-gray-200 pb-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setSubject(tab)}
          className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md focus:outline-none"
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
