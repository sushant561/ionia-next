import React from 'react';

interface QuestionGridProps {
  totalQuestions: number;
  answeredQuestions: Set<number>;
  visitedQuestions: Set<number>;
}

const QuestionGrid: React.FC<QuestionGridProps> = ({ totalQuestions, answeredQuestions, visitedQuestions }) => {
  const renderGrid = () => {
    const gridItems = [];
    for (let i = 1; i <= totalQuestions; i++) {
      const isAnswered = answeredQuestions.has(i);
      const isVisited = visitedQuestions.has(i);
      gridItems.push(
        <div
          key={i}
          className={`flex items-center justify-center w-10 h-10 rounded-full text-white font-bold cursor-pointer transition duration-300 ${
            isAnswered
              ? 'bg-green-500 hover:bg-green-600'
              : isVisited
              ? 'bg-yellow-500 hover:bg-yellow-600'
              : 'bg-gray-300 hover:bg-gray-400'
          }`}
        >
          {i}
        </div>
      );
    }
    return gridItems;
  };

  return (
    <div
      className="grid grid-cols-5 lg:grid-cols-4 gap-2 overflow-y-auto"
      style={{ maxHeight: '400px' }} // Set max height for scrollable container
    >
      {renderGrid()}
    </div>
  );
};

export default QuestionGrid;
