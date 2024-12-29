import { useState } from 'react';

export const useQuestionNavigation = (totalQuestions: number) => {
    const [currentQuestion, setCurrentQuestion] = useState<number>(1);

    const nextQuestion = () => {
        if (currentQuestion < totalQuestions) {
            setCurrentQuestion((prev) => prev + 1);
        }
    };

    const previousQuestion = () => {
        if (currentQuestion > 1) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    return {
        currentQuestion,
        nextQuestion,
        previousQuestion,
    };
};
