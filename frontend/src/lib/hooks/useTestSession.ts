import { useState, useEffect } from 'react';

export const useTestSession = () => {
    const [timeLeft, setTimeLeft] = useState<number>(1800); // 30 minutes timer (1800 seconds)

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return {
        timeLeft,
    };
};
