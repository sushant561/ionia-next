import React, { useState } from 'react';

const LanguageSelector: React.FC = () => {
    const [selectedLanguage, setSelectedLanguage] = useState<string>('English');

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLanguage(event.target.value);
    };

    return (
        <div className="flex items-center gap-2 mt-4">
            <label htmlFor="language" className="text-sm font-medium text-gray-700">
                Language:
            </label>
            <select
                id="language"
                value={selectedLanguage}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                {/* Add more languages here */}
            </select>
        </div>
    );
};

export default LanguageSelector;
