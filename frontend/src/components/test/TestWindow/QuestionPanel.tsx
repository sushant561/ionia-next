import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface OptionProps {
  option: string;
  optionIndex: number;
  questionNumber: number;
  selectedAnswer: string | undefined;
  handleOptionChange: (questionNumber: number, answer: string) => void;
}

const QuestionOptions: React.FC<OptionProps> = ({
  option,
  optionIndex,
  questionNumber,
  selectedAnswer,
  handleOptionChange,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        id={`option-${questionNumber}-${optionIndex}`}
        name={`question-${questionNumber}`}
        value={option}
        checked={selectedAnswer === option}
        onChange={() => handleOptionChange(questionNumber, option)}
        className="form-radio text-blue-600"
      />
      <label htmlFor={`option-${questionNumber}-${optionIndex}`} className="text-md">
        {option}
      </label>
    </div>
  );
};

interface QuestionPanelProps {
  examType: string;
  paperId: string;
  currentQuestion: number;
  selectedAnswers: Map<number, string>;
  handleOptionChange: (questionNumber: number, answer: string) => void;
  setTotalQuestions: (total: number) => void;
  setAnsweredQuestions: (answeredQuestions: Set<number>) => void;
}

const QuestionPanel: React.FC<QuestionPanelProps> = ({
  examType,
  paperId,
  currentQuestion,
  selectedAnswers,
  handleOptionChange,
  setTotalQuestions,
  setAnsweredQuestions,
}) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/previous-year-papers/get/${paperId}`);
        console.log(response.data);

        const questionData = response.data.data.questions.map((q: any) => ({
          id: q._id,
          question: q.question,
          options: q.options,
        }));

        setQuestions(questionData);
        setTotalQuestions(questionData.length);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [paperId, examType, setTotalQuestions]);

  if (loading) return <p>Loading questions...</p>;

  const currentQuestionData = questions[currentQuestion - 1];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      {/* Title Section */}
      <h3 className="text-xl font-semibold mb-4">Question {currentQuestion}</h3>

      {/* Question Text */}
      <p className="text-md mb-6">{currentQuestionData?.question}</p>

      {/* Options Section */}
      <div className="space-y-4">
        {currentQuestionData?.options.map((option: string, index: number) => (
          <QuestionOptions
            key={index}
            option={option}
            optionIndex={index}
            questionNumber={currentQuestion}
            selectedAnswer={selectedAnswers.get(currentQuestion)}
            handleOptionChange={handleOptionChange}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionPanel;
