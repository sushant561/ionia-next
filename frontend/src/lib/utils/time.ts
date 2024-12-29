// lib/utils/time.ts

export const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  export const startCountdown = (initialTime: number, onTimeUp: () => void): NodeJS.Timeout => {
    return setInterval(() => {
      if (initialTime <= 0) {
        clearInterval(timer);
        onTimeUp();
      }
      initialTime -= 1;
    }, 1000);
  };
  