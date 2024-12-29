import React, { useState, useEffect } from 'react';

const Timer: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState<number>(1800); // 30 minutes timer (1800 seconds)

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="p-2 bg-red-100 text-red-800 rounded-md shadow-md">
            <p className="text-lg font-bold">
                Time Remaining:{" "}
                <span className="font-mono">
                    {minutes < 10 ? `0${minutes}` : minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
                </span>
            </p>
        </div>
    );
};

export default Timer;
