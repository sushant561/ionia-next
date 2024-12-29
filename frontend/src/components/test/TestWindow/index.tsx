import React, { useState } from 'react';
import QuestionGrid from './Navigation/QuestionGrid';
import NavigationButtons from './Navigation/NavigationButtons';
import QuestionStatus from './StatusPanel/QuestionStatus';
import Legend from './StatusPanel/Legend';
import ActionButtons from './Controls/ActionButtons'; // Import ActionButtons
import LanguageSelector from './Controls/LanguageSelector';
import CandidateInfo from './Header/CandidateInfo';
import Timer from './Header/Timer';
import QuestionPanel from './QuestionPanel'; // Import QuestionPanel

interface TestWindowProps {
  examType: string;
  paperId: string;
}

const TestWindow: React.FC<TestWindowProps> = ({ examType, paperId }) => {
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [visitedQuestions, setVisitedQuestions] = useState<Set<number>>(new Set());
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Map<number, string>>(new Map());

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      setVisitedQuestions((prev) => new Set(prev.add(currentQuestion)));
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSave = () => {
    setAnsweredQuestions((prev) => new Set(prev.add(currentQuestion)));
  };

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

  const handleMark = () => {
    console.log(`Marked question ${currentQuestion} for review.`);
  };

  const handleOptionChange = (questionIndex: number, answer: string) => {
    setSelectedAnswers((prev) => {
      const updatedMap = new Map(prev);
      updatedMap.set(questionIndex, answer);
      return updatedMap;
    });
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-2 flex justify-between items-center">
        <CandidateInfo />
        <Timer />
      </header>

      {/* Main Content */}
      <main className="flex flex-1 p-4 gap-4">
        {/* Question Panel and Footer Wrapper */}
        <div className="flex flex-col flex-1 gap-4">
          {/* Question Panel */}
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
              onSave={handleSave} 
              onClear={handleClear} 
              onMark={handleMark} 
            />
            <NavigationButtons
              onNext={handleNext}
              onPrevious={handlePrevious}
              isFirstQuestion={currentQuestion === 1}
              isLastQuestion={currentQuestion === totalQuestions}
            />
          </footer>
        </div>

        {/* Status Panel and Question Grid */}
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
            />
          </div>
        </aside>
      </main>
    </div>
  );
};

export default TestWindow;
