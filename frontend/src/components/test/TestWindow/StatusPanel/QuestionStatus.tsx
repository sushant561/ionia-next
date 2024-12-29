import React from 'react';

const QuestionStatus: React.FC = () => {
    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <p className="text-sm text-gray-700">Question Status: <span className="font-semibold text-green-500">Visited & Answered</span></p>
        </div>
    );
};

export default QuestionStatus;
