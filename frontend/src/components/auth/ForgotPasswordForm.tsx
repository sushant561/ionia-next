// components/auth/ForgotPasswordForm.tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send reset link');
      }

      setMessage('Password reset link sent to your email.');
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
      {message && <p className="text-center">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
