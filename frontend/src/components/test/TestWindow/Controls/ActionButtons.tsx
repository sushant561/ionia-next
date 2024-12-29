import React from 'react';

interface ActionButtonsProps {
    onSaveNext: () => void;
    onClear: () => void;
    onSaveMark: () => void;
    onMarkNext: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onSaveNext, onClear, onSaveMark, onMarkNext }) => {
    return (
        <div className="flex gap-2">
            <button
                onClick={onSaveNext}
                className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600"
            >
                SAVE & NEXT
            </button>
            <button
                onClick={onClear}
                className="px-4 py-2 bg-white border border-gray-300 text-sm font-medium rounded hover:bg-gray-50"
            >
                CLEAR
            </button>
            <button
                onClick={onSaveMark}
                className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded hover:bg-orange-600"
            >
                SAVE & MARK FOR REVIEW
            </button>
            <button
                onClick={onMarkNext}
                className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600"
            >
                MARK FOR REVIEW & NEXT
            </button>
        </div>
    );
};

export default ActionButtons;
