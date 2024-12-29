// components/common/Button.tsx
import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

const Button: React.FC<ButtonProps> = ({ children, onClick, className = '', type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
