// analysis/api.ts
export const fetchAnalysisData = async (subject: string) => {
  try {
    const response = await fetch(`/exam/jee-mains/previous-year-paper/${subject}/analysis/`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};
