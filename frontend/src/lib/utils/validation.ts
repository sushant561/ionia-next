// lib/utils/validation.ts
export const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };
  
  export const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };
  
  export const validateTestInput = (input: string | number): boolean => {
    if (typeof input === 'string') {
      return input.trim().length > 0;
    }
    return !isNaN(input) && input > 0;
  };
  