// analysis/AnalysisWindow/index.tsx
"use client"; // Mark this file as a client component if it uses client hooks

import React from 'react';
import Header from './Header';
import Tabs from './Tabs';
import Summary from './Summary';
import AttemptsAnalysis from './AttemptsAnalysis';
import QualityTimeSpent from './QualityTimeSpent';
import SubjectWiseTime from './SubjectWiseTime';
import { AnalysisProvider } from '../context';

const AnalysisWindow = () => {
  return (
    <AnalysisProvider>
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-8 space-y-6">
        <Header />
        <Tabs />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Summary />
          <AttemptsAnalysis />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <QualityTimeSpent />
          <SubjectWiseTime />
        </div>
      </div>
    </AnalysisProvider>
  );
};

export default AnalysisWindow;
