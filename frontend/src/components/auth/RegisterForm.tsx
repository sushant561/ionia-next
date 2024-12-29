// components/auth/RegisterForm.tsx
import React, { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import { registerUser } from '../../lib/api/auth';
import { useRouter } from 'next/router';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password });
      // Redirect to login page after successful registration
      router.push('/auth/login');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold">Register</h2>
      {error && <p className="text-red-600">{error}</p>}
      <Input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">Register</Button>
    </form>
  );
};

export default RegisterForm;
