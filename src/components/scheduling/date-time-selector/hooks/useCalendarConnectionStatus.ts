
import { useState, useEffect } from "react";
import { isGoogleCalendarConnected } from "@/utils/appointments/googleCalendar";
import { useToast } from "@/components/ui/use-toast";

export function useCalendarConnectionStatus() {
  const [isCalendarConnected, setIsCalendarConnected] = useState<boolean>(false);
  const [checkingConnection, setCheckingConnection] = useState<boolean>(true);
  const [connectionError, setConnectionError] = useState<Error | null>(null);
  const [connectionAttempts, setConnectionAttempts] = useState<number>(0);
  const [maxRetries] = useState<number>(2);
  const { toast } = useToast();

  // Function to check connection with error handling and retries
  const checkConnectionWithRetry = async (attempt: number = 0): Promise<void> => {
    try {
      setCheckingConnection(true);
      console.log(`Checking Google Calendar connection status... (Attempt ${attempt + 1})`);
      
      const isConnected = await isGoogleCalendarConnected();
      
      console.log("Google Calendar connection status:", isConnected);
      setIsCalendarConnected(isConnected);
      setConnectionError(null);
      setConnectionAttempts(0); // Reset attempts on success
    } catch (error) {
      console.error(`Failed to check Google Calendar connection (Attempt ${attempt + 1}):`, error);
      
      const errorMessage = error instanceof Error ? error.message : "Unknown error checking connection";
      
      // Check if we should retry
      if (attempt < maxRetries) {
        console.log(`Retrying connection check (${attempt + 1}/${maxRetries})...`);
        setConnectionAttempts(attempt + 1);
        
        // Exponential backoff: 1s, 2s, 4s, etc.
        const backoffTime = Math.min(1000 * Math.pow(2, attempt), 8000);
        setTimeout(() => checkConnectionWithRetry(attempt + 1), backoffTime);
        return;
      }
      
      // Max retries reached, set final error state
      setConnectionError(error instanceof Error ? error : new Error(errorMessage));
      setIsCalendarConnected(false);
      
      // Only show toast for non-timeout errors or on final attempt
      if (attempt >= maxRetries && 
          !(error instanceof Error && error.message.includes("timeout"))) {
        toast({
          title: "Connection Check Failed",
          description: "Could not check calendar connection status. Will continue without calendar integration.",
          variant: "destructive"
        });
      }
    } finally {
      // Only set checking connection to false if this is the final attempt or successful
      if (attempt >= maxRetries || isCalendarConnected) {
        setCheckingConnection(false);
      }
    }
  };

  // Check if Google Calendar is connected on component mount
  useEffect(() => {
    let isMounted = true;
    
    const checkConnection = async () => {
      if (isMounted) {
        await checkConnectionWithRetry();
      }
    };
    
    checkConnection();
    
    return () => {
      isMounted = false;
    };
  }, [toast]);

  // Function to manually retry connection check
  const retryConnectionCheck = async () => {
    setConnectionAttempts(0);
    setConnectionError(null);
    await checkConnectionWithRetry();
  };

  return {
    isCalendarConnected,
    setIsCalendarConnected,
    checkingConnection,
    connectionError,
    retryConnectionCheck
  };
}
