// types/user.ts
export type UserProfile = {
    id: string;
    name: string;
    email: string;
    contactInfo: string;
    performanceStats: {
      totalTests: number;
      averageScore: number;
      accuracy: number;
      topicStrengths: { [topic: string]: number };
      topicWeaknesses: { [topic: string]: number };
    };
  };
  
  export type AuthenticatedUser = {
    id: string;
    email: string;
    name: string;
    token: string;
  };
  