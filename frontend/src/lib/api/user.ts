// lib/api/user.ts
import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:5000/api';

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw new Error('Failed to login');
  }
};

export const registerUser = async (email: string, password: string, name: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, { email, password, name });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error('Failed to register');
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw new Error('Failed to fetch profile');
  }
};

export const updateUserProfile = async (userId: string, updatedData: any) => {
  try {
    const response = await axios.put(`${API_URL}/user/${userId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw new Error('Failed to update profile');
  }
};
