import React from 'react';

const Legend: React.FC = () => {
    return (
        <div className="space-y-4">
            <p className="text-sm text-gray-700">
                <span className="inline-block w-4 h-4 bg-blue-500 border rounded-full mr-2"></span>
                Visited - Question visited but not answered
            </p>
            <p className="text-sm text-gray-700">
                <span className="inline-block w-4 h-4 bg-green-500 border rounded-full mr-2"></span>
                Answered - Question answered
            </p>
        </div>
    );
};

export default Legend;
