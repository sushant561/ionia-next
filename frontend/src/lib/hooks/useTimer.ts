// lib/hooks/useTimer.ts
import { useState, useEffect } from 'react';

export const useTimer = (initialTime: number) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = (newTime: number) => {
    setTimeLeft(newTime);
    setIsRunning(false);
  };

  return {
    timeLeft,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
  };
};
