// analysis/hooks/useAnalysisData.ts
import { useAnalysisContext } from '../context';

export const useAnalysisData = () => {
  const { data, subject, setSubject, loading, error } = useAnalysisContext();
  return { data, subject, setSubject, loading, error };
};
