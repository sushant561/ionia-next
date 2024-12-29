import { useState } from 'react';

export const useQuestionStatus = () => {
    const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
    const [visitedQuestions, setVisitedQuestions] = useState<Set<number>>(new Set());

    const markAnswered = (questionNumber: number) => {
        setAnsweredQuestions((prev) => new Set(prev.add(questionNumber)));
    };

    const markVisited = (questionNumber: number) => {
        setVisitedQuestions((prev) => new Set(prev.add(questionNumber)));
    };

    return {
        answeredQuestions,
        visitedQuestions,
        markAnswered,
        markVisited,
    };
};
