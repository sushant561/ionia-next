import React, { useEffect, useState } from 'react';

const CandidateInfo: React.FC = () => {
    const [candidate, setCandidate] = useState<{ name: string; username: string }>({
        name: '',
        username: '',
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Safely access localStorage only in the browser
            const token = localStorage.getItem('token');

            if (token) {
                // Assuming the token is a JWT, you can decode it to get user details
                const decodedToken = JSON.parse(atob(token.split('.')[1])); // Example decoding
                const candidateName = decodedToken.fullName || 'Unknown';
                const username = decodedToken.username || '';


                setCandidate({ name: candidateName, username });
            }
        }
    }, []);

    return (
        <div className="p-4 bg-blue-100 rounded-md shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">
                {candidate.name || 'Loading...'}
            </h3>
            <p className="text-sm text-gray-600">
                User id: {candidate.username || 'Loading...'}
            </p>
        </div>
    );
};

export default CandidateInfo;
