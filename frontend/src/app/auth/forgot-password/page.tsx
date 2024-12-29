// frontend/app/(auth)/forgot-password/page.tsx

import { FC, useState } from 'react';
import { Input } from '../../../components/common/Input';
import { Button } from '../../../components/common/Button';
import { useRouter } from 'next/router';

const ForgotPasswordPage: FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    router.push('/auth/login'); // Redirect after password reset request
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg">
      <h2 className="text-xl mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <Input 
          label="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          type="email"
        />
        <Button label={loading ? 'Processing...' : 'Send Reset Link'} disabled={loading} />
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
