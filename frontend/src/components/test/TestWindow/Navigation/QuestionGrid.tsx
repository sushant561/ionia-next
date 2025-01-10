import React from 'react';

interface QuestionGridProps {
  totalQuestions: number;
  answeredQuestions: Set<number>;
  visitedQuestions: Set<number>;
  markedForReview: Set<number>; // New prop to handle marked-for-review questions
  onQuestionClick: (questionNumber: number) => void; // Handler to update current question
  currentQuestion: number; // Current question number to highlight the active question
}

const QuestionGrid: React.FC<QuestionGridProps> = ({
  totalQuestions,
  answeredQuestions,
  visitedQuestions,
  markedForReview,
  onQuestionClick,
  currentQuestion,
}) => {
  const renderGrid = () => {
    console.log("Rendering Grid..."); // Debugging log

    const gridItems = [];
    for (let i = 1; i <= totalQuestions; i++) {
      // console.log(i, " ' ");
      const isAnswered = answeredQuestions.has(i); // Check if question is answered
      const isVisited = visitedQuestions.has(i); // Check if question is visited
      const isMarkedForReview = markedForReview.has(i); // Check if question is marked for review
      const isActive = currentQuestion === i; // Check if question is active
      console.log("isAnswered", isAnswered);
  
      // Determine background color classes based on question state
      let bgColorClass = 'bg-gray-300 hover:bg-gray-400'; // Default (unanswered and unvisited)
  
      // If question is both answered and marked for review, apply a half-green, half-purple style
      if (isAnswered && isMarkedForReview) {
        bgColorClass = 'bg-gradient-to-r from-green-500 to-purple-500 hover:from-green-600 hover:to-purple-600';
      } else if (isMarkedForReview) {
        bgColorClass = 'bg-purple-500 hover:bg-purple-600'; // Marked-for-review questions in purple
      } else if (isAnswered) {
        bgColorClass = 'bg-green-500 hover:bg-green-600'; // Answered questions in green
      } else if (isVisited || isActive) {
        bgColorClass = 'bg-red-500 hover:bg-red-600'; // Visited or active questions in red
      } 
  
      gridItems.push(
        <div
          key={i}
          onClick={() => onQuestionClick(i)} // Call the click handler when a question is clicked
          className={`flex items-center justify-center w-10 h-10 rounded-full text-white font-bold cursor-pointer transition duration-300 ${bgColorClass}`}
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
      style={{ maxHeight: '400px', gridTemplateColumns: `repeat(auto-fill, minmax(40px, 1fr))` }} // Dynamically calculate grid layout
    >
      {renderGrid()}
    </div>
  );
};



export default QuestionGrid;
