// frontend/components/practice/AnswerSummary.tsx

import { FC } from 'react';

interface AnswerSummaryProps {
  selectedAnswer: string;
  correctAnswer: string;
}

const AnswerSummary: FC<AnswerSummaryProps> = ({ selectedAnswer, correctAnswer }) => {
  return (
    <div className="p-4 border rounded-lg">
      <h4 className="text-lg font-semibold">Answer Summary</h4>
      <div className="mt-2">
        <div>Your Answer: {selectedAnswer}</div>
        <div>Correct Answer: {correctAnswer}</div>
      </div>
    </div>
  );
};

export default AnswerSummary;
