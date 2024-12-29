// hooks/useTestProgress.ts
import { useState, useEffect } from 'react';

export const useTestProgress = (totalQuestions: number) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [timer, setTimer] = useState<number>(0); // Time in seconds
  const [isTestStarted, setIsTestStarted] = useState<boolean>(false);

  const startTest = () => {
    setIsTestStarted(true);
  };

  const stopTest = () => {
    setIsTestStarted(false);
  };

  const nextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const markQuestionAsAnswered = (questionNumber: number) => {
    setAnsweredQuestions(new Set(answeredQuestions.add(questionNumber)));
  };

  const startTimer = () => {
    if (!isTestStarted) return;
    setTimer(prev => prev + 1);
  };

  useEffect(() => {
    if (isTestStarted) {
      const interval = setInterval(startTimer, 1000);
      return () => clearInterval(interval);
    }
  }, [isTestStarted]);

  return {
    currentQuestion,
    answeredQuestions,
    timer,
    startTest,
    stopTest,
    nextQuestion,
    previousQuestion,
    markQuestionAsAnswered,
  };
};
