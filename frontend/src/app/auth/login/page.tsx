'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext'; // Import the useAuth hook

export default function LoginPage() {
  const { setToken } = useAuth(); // Destructure setToken from AuthContext
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      const accessToken = data.data.accessToken;

      // Store token in localStorage and in AuthContext
      localStorage.setItem('token', accessToken);
      setToken(accessToken); // Set the token in context

      // Use router.push to navigate to home without reloading
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating async API call
        console.log("Navigating...");
        router.push('/');
        console.log("Navigation triggered!");
    } catch (error) {
        console.error("Navigation error:", error);
    }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="other-container max-w-md mx-auto mb-10 p-6 bg-white rounded-lg shadow-md mt-24">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="mygreen w-full bg-green-700 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
        >
          Login
        </button>
      </form>

      {/* Call-to-action for new users */}
      <p className="text-center mt-6 text-gray-600">
        Don’t have an account?{' '}
        <Link href="/register" className="text-primary font-medium hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
