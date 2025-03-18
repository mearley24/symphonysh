
import { useState, useEffect, useRef } from "react";

export function useErrorHandling() {
  const [error, setError] = useState<string | null>(null);
  const [componentError, setComponentError] = useState<Error | null>(null);
  const [hasFatalError, setHasFatalError] = useState(false);
  const hasLoggedError = useRef(false);
  const apiErrorCount = useRef(0);

  // Error boundary functionality
  useEffect(() => {
    console.log("DateTimeSelector useEffect running");
    const originalConsoleError = console.error;
    console.error = (...args) => {
      // Log normally but also capture React errors
      originalConsoleError(...args);
      
      const errorMessage = args.join(' ');
      if (
        (errorMessage.includes('React') || errorMessage.includes('Error')) && 
        !errorMessage.includes('Failed to fetch') &&
        !hasLoggedError.current
      ) {
        hasLoggedError.current = true;
        setComponentError(new Error(errorMessage));
      }
    };
    
    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  return {
    error,
    setError,
    componentError,
    setComponentError,
    hasFatalError,
    setHasFatalError,
    hasLoggedError,
    apiErrorCount
  };
}
