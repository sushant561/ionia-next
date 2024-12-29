// lib/utils/format.ts
export const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  export const formatScore = (score: number): string => {
    return score.toFixed(2);
  };
  