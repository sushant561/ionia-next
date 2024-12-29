// components/common/Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div>{children}</div>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
