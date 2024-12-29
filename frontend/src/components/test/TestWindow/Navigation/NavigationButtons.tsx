import React from "react";

interface NavigationButtonsProps {
  onNext: () => void;
  onPrevious: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onNext,
  onPrevious,
  isFirstQuestion,
  isLastQuestion,
}) => {
  return (
    <div className="flex justify-between items-center mt-4">
      {/* Back and Next Section */}
      <div className="flex space-x-2">
        <button
          onClick={onPrevious}
          disabled={isFirstQuestion}
          className={`px-4 py-2 border border-gray-300 rounded-md font-medium ${
            isFirstQuestion
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          &lt;&lt; BACK
        </button>
        <button
          onClick={onNext}
          disabled={isLastQuestion}
          className={`px-4 py-2 border border-gray-300 rounded-md font-medium ${
            isLastQuestion
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          NEXT &gt;&gt;
        </button>
      </div>

      {/* Submit Button */}
      <button
        className="px-6 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600"
      >
        SUBMIT
      </button>
    </div>
  );
};

export default NavigationButtons;
