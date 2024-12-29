// frontend/components/common/Input.tsx

import { FC } from 'react';

interface InputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = ({ label, type = 'text', value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input 
        type={type} 
        className="mt-1 p-2 w-full border rounded-md" 
        value={value} 
        onChange={onChange} 
      />
    </div>
  );
};
