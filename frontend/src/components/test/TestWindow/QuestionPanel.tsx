import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

interface OptionProps {
  option: string;
  optionIndex: number;
  questionNumber: number;
  selectedAnswer: number | undefined;
  handleOptionChange: (questionNumber: number, answerIndex: number) => void;
}

const QuestionOptions: React.FC<OptionProps> = ({
  option,
  optionIndex,
  questionNumber,
  selectedAnswer,
  handleOptionChange,
}) => (
  <div className="flex items-center space-x-2">
    <input
      type="radio"
      id={`option-${questionNumber}-${optionIndex}`}
      name={`question-${questionNumber}`}
      value={option}
      checked={selectedAnswer === optionIndex}
      onChange={() => handleOptionChange(questionNumber, optionIndex)}
      className="form-radio text-blue-600"
    />
    <label htmlFor={`option-${questionNumber}-${optionIndex}`} className="text-md">
      {option}
    </label>
  </div>
);

interface QuestionPanelProps {
  examType: string;
  paperId: string;
  currentQuestion: number;
  selectedAnswers: Map<number, number>;
  handleOptionChange: (questionIndex: number, answerOptionIndex: number, questionId: string) => void;
  setTotalQuestions: (total: number) => void;
  setAnsweredQuestions: (answeredQuestions: Set<number>) => void;
  handleQuestionIds: (ids: string[]) => void;
}

const QuestionPanel: React.FC<QuestionPanelProps> = React.memo(
  ({
    examType,
    paperId,
    currentQuestion,
    selectedAnswers,
    handleOptionChange,
    setTotalQuestions,
    setAnsweredQuestions,
    handleQuestionIds,
  }) => {
    const [questions, setQuestions] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const hasFetchedData = useRef(false); // Track if data has already been fetched

    useEffect(() => {
      if (hasFetchedData.current) return; // Prevent re-fetch if already fetched

      hasFetchedData.current = true; // Set flag to true once data is fetched

      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4000/api/v1/previous-year-papers/get/${paperId}`
          );
          const questionData = response.data.data.questions;

          setQuestions(questionData);

          // Extract question IDs and pass to parent
          const ids = questionData.map((question: any) => question._id);
          handleQuestionIds(ids);

          setTotalQuestions(questionData.length);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };

      fetchData();
    }, [paperId, setTotalQuestions, handleQuestionIds]);

    if (loading) return <p>Loading questions...</p>;

    const currentQuestionData = questions[currentQuestion - 1];

    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Question {currentQuestion}</h3>
        <p className="text-md mb-6">{currentQuestionData?.question}</p>

        <div className="space-y-4">
          {currentQuestionData?.options.map((option: string, index: number) => (
            <QuestionOptions
              key={index}
              option={option}
              optionIndex={index}
              questionNumber={currentQuestion}
              selectedAnswer={selectedAnswers.get(currentQuestion)}
              handleOptionChange={(qNumber, aIndex) =>
                handleOptionChange(qNumber, aIndex, currentQuestionData._id)
              }
            />
          ))}
        </div>
      </div>
    );
  }
);

export default QuestionPanel;
