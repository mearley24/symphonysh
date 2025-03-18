
import { useState, useEffect, useCallback } from "react";
import { isGoogleCalendarConnected } from "@/utils/appointments/googleCalendar/auth/status";

export function useCalendarConnectionStatus() {
  const [isCalendarConnected, setIsCalendarConnected] = useState<boolean>(false);
  const [checkingConnection, setCheckingConnection] = useState<boolean>(true);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const [shouldStopChecking, setShouldStopChecking] = useState(false);

  // Function to check connection with retry logic and error handling
  const checkConnectionWithRetry = useCallback(async (attempts = 0): Promise<boolean> => {
    if (attempts >= 2 || shouldStopChecking) {
      console.log("Max connection check attempts reached or checking stopped");
      setCheckingConnection(false);
      return false;
    }

    try {
      console.log(`Checking calendar connection (attempt ${attempts + 1})`);
      const isConnected = await isGoogleCalendarConnected();
      console.log("Calendar connection status:", isConnected);
      setIsCalendarConnected(!!isConnected);
      setCheckingConnection(false);
      return !!isConnected;
    } catch (error) {
      console.error("Error checking calendar connection:", error);
      setConnectionAttempts(prev => prev + 1);
      
      // Don't retry immediately - just fail gracefully
      setCheckingConnection(false);
      return false;
    }
  }, [shouldStopChecking]);

  // Function to retry connection check manually
  const retryConnectionCheck = useCallback(() => {
    if (connectionAttempts < 3) {
      setCheckingConnection(true);
      checkConnectionWithRetry(connectionAttempts);
    }
  }, [connectionAttempts, checkConnectionWithRetry]);

  // Initial connection check
  useEffect(() => {
    let isMounted = true;
    
    const checkConnection = async () => {
      try {
        if (!isMounted) return;
        setCheckingConnection(true);
        
        const success = await checkConnectionWithRetry(0);
        
        if (!isMounted) return;
        
        if (!success && connectionAttempts < 1) {
          // Only try once more after a delay
          setTimeout(() => {
            if (isMounted) {
              checkConnectionWithRetry(connectionAttempts + 1);
            }
          }, 2000);
        } else {
          setCheckingConnection(false);
        }
      } catch (error) {
        console.error("Error in connection check effect:", error);
        if (isMounted) {
          setCheckingConnection(false);
        }
      }
    };

    // Add slight delay to avoid immediate API calls during mounting
    const timer = setTimeout(() => {
      checkConnection();
    }, 500);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      setShouldStopChecking(true);
    };
  }, []);

  return {
    isCalendarConnected,
    setIsCalendarConnected,
    checkingConnection,
    retryConnectionCheck
  };
}
