// lib/api/auth.ts
import axios from 'axios';

const API_URL = '/api/auth';

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const registerUser = async (email: string, password: string, name: string) => {
  const response = await axios.post(`${API_URL}/register`, { email, password, name });
  return response.data;
};

export const getUserProfile = async (userId: string) => {
  const response = await axios.get(`${API_URL}/profile/${userId}`);
  return response.data;
};
