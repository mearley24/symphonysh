
import { useState, useEffect } from "react";

type ErrorHandlerProps = {
  children: React.ReactNode;
  onError: (error: any) => void;
}

export function ErrorHandler({ children, onError }: ErrorHandlerProps) {
  const [error, setError] = useState<Error | null>(null);
  
  // Set up global error handling
  useEffect(() => {
    const originalConsoleError = console.error;
    
    console.error = (...args) => {
      // Log normally
      originalConsoleError(...args);
      
      // Check if this is a React error
      const errorMessage = args.join(' ');
      if (errorMessage.includes('React') || errorMessage.includes('Error')) {
        const newError = new Error(errorMessage);
        setError(newError);
        onError(newError);
      }
    };
    
    return () => {
      console.error = originalConsoleError;
    };
  }, [onError]);
  
  if (error) {
    return null; // Parent will handle the error display
  }
  
  return <>{children}</>;
}
