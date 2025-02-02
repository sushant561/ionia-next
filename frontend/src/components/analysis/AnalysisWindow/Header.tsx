"use client"; // This marks the component as a client-side component

import { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface HeaderProps {
  attempts: string[];
}

const Header: React.FC<HeaderProps> = ({ attempts = [] }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAttempt, setSelectedAttempt] = useState("");

  // Set the default selected attempt when attempts are available
  useEffect(() => {
    if (attempts.length > 0 && !selectedAttempt) {
      setSelectedAttempt(attempts[attempts.length - 1]);
    }
  }, [attempts, selectedAttempt]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const selectAttempt = (attempt: string) => {
    setSelectedAttempt(attempt);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow">
      {/* Left Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Report Card</h1>
        <p className="text-sm text-gray-500">JEE Main 2024 (27 Jan Shift 1)</p>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* View Solution Button */}
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          View Solution
        </button>

        {/* Reattempt Button */}
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
          Reattempt
        </button>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg shadow hover:bg-gray-200 transition"
          >
            {selectedAttempt || "No Attempts"}
            <ChevronDownIcon className="w-5 h-5 ml-2" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              {attempts.map((attempt, index) => (
                <button
                  key={index}
                  onClick={() => selectAttempt(attempt)}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-100 transition ${
                    selectedAttempt === attempt ? "bg-gray-100 font-semibold" : ""
                  }`}
                >
                  {attempt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
