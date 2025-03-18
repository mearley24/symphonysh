
import { useState, useEffect } from "react";
import { isGoogleCalendarConnected } from "@/utils/appointments/googleCalendar";
import { useToast } from "@/components/ui/use-toast";

export function useCalendarConnectionStatus() {
  const [isCalendarConnected, setIsCalendarConnected] = useState<boolean>(false);
  const [checkingConnection, setCheckingConnection] = useState<boolean>(true);
  const [connectionError, setConnectionError] = useState<Error | null>(null);
  const { toast } = useToast();

  // Check if Google Calendar is connected on component mount
  useEffect(() => {
    let isMounted = true;
    
    async function checkConnection() {
      try {
        setCheckingConnection(true);
        console.log("Checking Google Calendar connection status...");
        
        const isConnected = await isGoogleCalendarConnected();
        
        if (isMounted) {
          console.log("Google Calendar connection status:", isConnected);
          setIsCalendarConnected(isConnected);
          setConnectionError(null);
        }
      } catch (error) {
        console.error("Error checking Google Calendar connection:", error);
        
        if (isMounted) {
          setConnectionError(error instanceof Error ? error : new Error("Unknown error checking connection"));
          setIsCalendarConnected(false);
          
          // Show toast for connection check error, but only if it's not a timeout
          if (!(error instanceof Error && error.message.includes("timeout"))) {
            toast({
              title: "Connection Check Failed",
              description: "Could not check calendar connection status.",
              variant: "destructive"
            });
          }
        }
      } finally {
        if (isMounted) {
          setCheckingConnection(false);
        }
      }
    }
    
    checkConnection();
    
    return () => {
      isMounted = false;
    };
  }, [toast]);

  return {
    isCalendarConnected,
    setIsCalendarConnected,
    checkingConnection,
    connectionError
  };
}
