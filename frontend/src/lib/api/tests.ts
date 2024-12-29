// lib/api/tests.ts
import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:5000/api';

export const getTestById = async (testId: string) => {
  try {
    const response = await axios.get(`${API_URL}/tests/${testId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching test:', error);
    throw new Error('Failed to fetch test');
  }
};

export const getTestsBySubject = async (subjectId: string) => {
  try {
    const response = await axios.get(`${API_URL}/tests/${subjectId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tests:', error);
    throw new Error('Failed to fetch tests');
  }
};

export const submitTestAnswers = async (testId: string, answers: any) => {
  try {
    const response = await axios.post(`${API_URL}/tests/${testId}/submit`, answers);
    return response.data;
  } catch (error) {
    console.error('Error submitting test:', error);
    throw new Error('Failed to submit test');
  }
};
