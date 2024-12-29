// lib/api/questions.ts
import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:5000/api';

export const getQuestionsByChapter = async (subjectId: string, chapterId: string) => {
  try {
    const response = await axios.get(`${API_URL}/questions/${subjectId}/${chapterId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw new Error('Failed to fetch questions');
  }
};

export const getQuestionById = async (questionId: string) => {
  try {
    const response = await axios.get(`${API_URL}/questions/${questionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching question:', error);
    throw new Error('Failed to fetch question');
  }
};

export const createCustomTest = async (testData: any) => {
  try {
    const response = await axios.post(`${API_URL}/tests/custom`, testData);
    return response.data;
  } catch (error) {
    console.error('Error creating custom test:', error);
    throw new Error('Failed to create custom test');
  }
};
