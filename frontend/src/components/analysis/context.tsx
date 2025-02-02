// analysis/context.tsx
"use client"; // Mark this file as a client component

import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchAnalysisData } from './api';

interface AnalysisContextType {
  data: any;
  subject: string;
  setSubject: (subject: string) => void;
  loading: boolean;
  error: string | null;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const useAnalysisContext = () => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysisContext must be used within an AnalysisProvider');
  }
  return context;
};

interface AnalysisProviderProps {
  children: React.ReactNode;
}

export const AnalysisProvider: React.FC<AnalysisProviderProps> = ({ children }) => {
  const [subject, setSubject] = useState<string>('Overall');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const fetchedData = await fetchAnalysisData(subject);
        setData(fetchedData);
        setError(null);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [subject]);

  return (
    <AnalysisContext.Provider value={{ data, subject, setSubject, loading, error }}>
      {children}
    </AnalysisContext.Provider>
  );
};
