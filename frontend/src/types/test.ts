// types/test.ts
export type Question = {
    id: string;
    text: string;
    options: string[];
    correctAnswer: string;
    difficulty: 'easy' | 'medium' | 'hard';
  };
  
  export type Test = {
    id: string;
    name: string;
    description: string;
    subject: string;
    questions: Question[];
    duration: number;  // Duration in minutes
    totalMarks: number;
  };
  
  export type TestResult = {
    testId: string;
    userId: string;
    score: number;
    accuracy: number;
    timeTaken: number;
    detailedResults: {
      questionId: string;
      correctAnswer: string;
      userAnswer: string;
    }[];
  };
  