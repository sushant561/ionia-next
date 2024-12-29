// frontend/components/practice/ResultPage.tsx

import { FC } from 'react';
import AnswerSummary from './AnswerSummary';

interface ResultPageProps {
  score: number;
  totalQuestions: number;
  answersSummary: Array<{ selected: string; correct: string }>;
}

const ResultPage: FC<ResultPageProps> = ({ score, totalQuestions, answersSummary }) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Test Results</h2>
      <div className="mt-4">
        <div>Score: {score}/{totalQuestions}</div>
        <div>Percentage: {Math.floor((score / totalQuestions) * 100)}%</div>
      </div>
      <div className="mt-6">
        {answersSummary.map((summary, index) => (
          <AnswerSummary
            key={index}
            selectedAnswer={summary.selected}
            correctAnswer={summary.correct}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultPage;
