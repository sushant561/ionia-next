export interface Question {
    number: number;
    text: string;
    options: string[];
}

export interface TestSession {
    totalQuestions: number;
    answeredQuestions: Set<number>;
    visitedQuestions: Set<number>;
    timeLeft: number;
}

export interface NavigationButtonsProps {
    onNext: () => void;
    onPrevious: () => void;
    isFirstQuestion: boolean;
    isLastQuestion: boolean;
}
