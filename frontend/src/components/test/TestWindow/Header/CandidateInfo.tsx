import React from 'react';

const CandidateInfo: React.FC = () => {
    const candidate = {
        name: 'John Doe',
        rollNumber: '12345',
    };

    return (
        <div className="p-4 bg-blue-100 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">{candidate.name}</h3>
            <p className="text-sm text-gray-600">Roll Number: {candidate.rollNumber}</p>
        </div>
    );
};

export default CandidateInfo;
