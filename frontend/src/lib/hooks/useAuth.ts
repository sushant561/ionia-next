// lib/hooks/useAuth.ts
import { useState } from 'react';
import { loginUser, registerUser, getUserProfile } from '../api/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      setUser(data.user);
    } catch (err) {
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const data = await registerUser(email, password, name);
      setUser(data.user);
    } catch (err) {
      setError('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async (userId: string) => {
    try {
      const profile = await getUserProfile(userId);
      setUser(profile);
    } catch (err) {
      setError('Failed to fetch profile');
    }
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    fetchProfile,
    logout,
  };
};
