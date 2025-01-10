import React, { useState } from 'react';
import QuestionGrid from './Navigation/QuestionGrid';
import NavigationButtons from './Navigation/NavigationButtons';
import QuestionStatus from './StatusPanel/QuestionStatus';
import Legend from './StatusPanel/Legend';
import ActionButtons from './Controls/ActionButtons';
import LanguageSelector from './Controls/LanguageSelector';
import CandidateInfo from './Header/CandidateInfo';
import Timer from './Header/Timer';
import QuestionPanel from './QuestionPanel';

interface TestWindowProps {
  examType: string;
  paperId: string;
}

const TestWindow: React.FC<TestWindowProps> = ({ examType, paperId }) => {
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [visitedQuestions, setVisitedQuestions] = useState<Set<number>>(new Set());
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set());
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Map<number, string>>(new Map());
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');

  // Next Question Handler
  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      setVisitedQuestions((prev) => new Set(prev.add(currentQuestion)));
    }
  };

  // Previous Question Handler
  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Save Answer for Current Question
  const handleSaveNext = () => {
    if (!selectedAnswers.has(currentQuestion)) {
      alert('Please choose an option before saving and moving to the next question.');
    } else {
      setAnsweredQuestions((prev) => new Set(prev.add(currentQuestion)));
      handleNext();
    }
  };

  // Clear Answer for Current Question
  const handleClear = () => {
    setAnsweredQuestions((prev) => {
      const updatedSet = new Set(prev);
      updatedSet.delete(currentQuestion);
      return updatedSet;
    });
    setSelectedAnswers((prev) => {
      const updatedMap = new Map(prev);
      updatedMap.delete(currentQuestion);
      return updatedMap;
    });
  };

  // Save and Mark for Review
  const handleSaveMark = () => {
    if (!selectedAnswers.has(currentQuestion)) {
      alert('Please choose an option before marking the question for review.');
    } else {
      setAnsweredQuestions((prev) => new Set(prev.add(currentQuestion)));
      setMarkedForReview((prev) => new Set(prev.add(currentQuestion)));
      handleNext();
    }
  };

  // Mark for Review and Move to Next
  const handleMarkNext = () => {
    setMarkedForReview((prev) => new Set(prev.add(currentQuestion)));
    handleNext();
  };

  // Option Change Handler
  const handleOptionChange = (questionIndex: number, answer: string) => {
    setSelectedAnswers((prev) => {
      const updatedMap = new Map(prev);
      updatedMap.set(questionIndex, answer);
      return updatedMap;
    });
    setAnsweredQuestions((prev) => new Set(prev.add(questionIndex)));
  };

  // Language Change Handler
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    console.log(`Language changed to: ${language}`);
  };

  // Handle Question Click (from QuestionGrid)
  const handleQuestionClick = (questionNumber: number) => {
    setCurrentQuestion(questionNumber);
    setVisitedQuestions((prev) => new Set(prev.add(questionNumber)));
  };

  // Submit Handler
  const handleSubmit = async () => {
    const payload = {
      examType,
      paperId,
      answers: Array.from(selectedAnswers).map(([questionNumber, answer]) => ({
        questionNumber,
        answer,
      })),
      metadata: {
        totalQuestions,
        answeredQuestions: Array.from(answeredQuestions),
        visitedQuestions: Array.from(visitedQuestions),
        markedForReview: Array.from(markedForReview),
        selectedLanguage,
      },
    };

    console.log('Submitting payload:', payload);

    try {
      const response = await fetch('https://your-backend-endpoint.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Submission successful!');
        console.log('Backend response:', result);
      } else {
        const error = await response.text();
        alert(`Submission failed: ${error}`);
        console.error('Error response:', error);
      }
    } catch (err) {
      console.error('Error submitting data:', err);
      alert('An error occurred while submitting the test. Please try again.');
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 p-2 flex justify-between items-center">
        <CandidateInfo />
        <Timer />
        <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={handleLanguageChange} />
      </header>

      <main className="flex flex-1 p-4 gap-4">
        <div className="flex flex-col flex-1 gap-4">
          <section className="bg-white border border-gray-100 rounded p-4 flex-1">
            <QuestionPanel
              examType={examType}
              paperId={paperId}
              currentQuestion={currentQuestion}
              selectedAnswers={selectedAnswers}
              handleOptionChange={handleOptionChange}
              setTotalQuestions={setTotalQuestions}
              setAnsweredQuestions={setAnsweredQuestions}
            />
          </section>

          <footer className="flex flex-col gap-2">
            <ActionButtons
              onSaveNext={handleSaveNext}
              onClear={handleClear}
              onSaveMark={handleSaveMark}
              onMarkNext={handleMarkNext}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <NavigationButtons
              onNext={handleNext}
              onPrevious={handlePrevious}
              isFirstQuestion={currentQuestion === 1}
              isLastQuestion={currentQuestion === totalQuestions}
            />
          </footer>
        </div>

        <aside className="w-80 flex flex-col gap-4">
          <div className="bg-white border border-gray-200 rounded p-4">
            <QuestionStatus />
            <Legend />
          </div>
          <div className="bg-white border border-gray-200 rounded p-4">
            <QuestionGrid
              totalQuestions={totalQuestions}
              answeredQuestions={answeredQuestions}
              visitedQuestions={visitedQuestions}
              markedForReview={markedForReview}
              onQuestionClick={handleQuestionClick}
              currentQuestion={currentQuestion}
            />
          </div>
        </aside>
      </main>
    </div>
  );
};

export default TestWindow;
