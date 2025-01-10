// components/ui/card.tsx
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div
      className={`bg-white shadow-lg rounded-lg border p-6 ${className}`}
    >
      {children}
    </div>
  );
};
