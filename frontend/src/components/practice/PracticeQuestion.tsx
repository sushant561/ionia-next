// components/practice/PracticeQuestion.tsx
import { FC } from 'react';

interface PracticeQuestionProps {
  questionId: string;
  question: string;
  options: string[];
  onAnswerSelected: (answer: string) => void;
}

const PracticeQuestion: FC<PracticeQuestionProps> = ({ questionId, question, options, onAnswerSelected }) => {
  return (
    <div className="mb-6">
      <p className="text-xl font-medium mb-4">{question}</p>
      <div className="space-y-2">
        {options.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              type="radio"
              id={`${questionId}-option${index}`}
              name={questionId}
              value={option}
              onChange={(e) => onAnswerSelected(e.target.value)}
              className="mr-2"
            />
            <label htmlFor={`${questionId}-option${index}`} className="text-sm">
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticeQuestion;
