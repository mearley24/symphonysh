
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
    
    // Create a wrapper to avoid infinite recursion
    const errorWrapper = (...args: any[]) => {
      // First check if the error message already contains "scheduling error"
      // to prevent infinite recursion
      const errorString = args.join(' ');
      if (errorString.includes("Maximum call stack size exceeded") || 
          errorString.includes("recursion") ||
          (errorString.includes("Scheduling error") && errorString.length > 50)) {
        // Just log to original console without triggering the handler again
        originalConsoleError("Error detected but not re-processed to prevent recursion:", ...args);
        return;
      }

      // Log normally
      originalConsoleError(...args);
      
      // Check if this is a React error
      if (errorString.includes('React') || errorString.includes('Error')) {
        try {
          const newError = new Error(errorString);
          setError(newError);
          onError(newError);
        } catch (e) {
          originalConsoleError("Error in error handler:", e);
        }
      }
    };
    
    console.error = errorWrapper;
    
    return () => {
      console.error = originalConsoleError;
    };
  }, [onError]);
  
  if (error) {
    return null; // Parent will handle the error display
  }
  
  return <>{children}</>;
}
