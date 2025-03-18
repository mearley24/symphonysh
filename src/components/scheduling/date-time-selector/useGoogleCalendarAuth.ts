
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { 
  handleGoogleAuthCallback, 
  isGoogleCalendarConnected 
} from "@/utils/appointments/googleCalendar";

export function useGoogleCalendarAuth(date: Date | undefined, fetchTimeSlots: (date: Date) => Promise<void>) {
  const [connectingCalendar, setConnectingCalendar] = useState(false);
  const [isCalendarConnected, setIsCalendarConnected] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [checkingConnection, setCheckingConnection] = useState(true);
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Check if calendar is connected on mount
  useEffect(() => {
    const checkCalendarConnection = async () => {
      try {
        setCheckingConnection(true);
        const connected = await isGoogleCalendarConnected();
        setIsCalendarConnected(connected);
        console.log("Google Calendar connection status:", connected);
      } catch (error) {
        console.error("Error checking calendar connection:", error);
      } finally {
        setCheckingConnection(false);
      }
    };
    
    checkCalendarConnection();
  }, []);
  
  // Check for Google auth callback on component mount
  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
    
    // Handle errors from Google Auth
    if (error) {
      setConnectingCalendar(false);
      let errorMessage = "An error occurred during Google authentication.";
      
      if (error === 'access_denied') {
        errorMessage = "Authentication was denied. Please try again.";
        setAuthError('access_denied');
      }
      
      // Clear URL params and show error message
      navigate('/scheduling', { replace: true });
      
      toast({
        title: "Calendar Connection Failed",
        description: errorMessage,
        variant: "destructive"
      });
      
      return;
    }
    
    if (code && state === 'google_auth') {
      setConnectingCalendar(true);
      
      const completeAuth = async () => {
        try {
          const result = await handleGoogleAuthCallback();
          
          if (result && result.error) {
            setAuthError(result.error);
            toast({
              title: "Calendar Connection Failed",
              description: "Could not connect to Google Calendar. Please try again.",
              variant: "destructive"
            });
          } else {
            // Clear URL params and show success message
            navigate('/scheduling', { replace: true });
            
            toast({
              title: "Google Calendar Connected",
              description: "Your calendar is now connected. Available time slots will be updated accordingly.",
            });
            
            setIsCalendarConnected(true);
            setAuthError(null);
            
            // If date is already selected, refresh time slots
            if (date) {
              fetchTimeSlots(date);
            }
          }
        } catch (error) {
          console.error("Failed to complete Google auth:", error);
          toast({
            title: "Connection Failed",
            description: "Could not connect to Google Calendar. Please try again.",
            variant: "destructive"
          });
        } finally {
          setConnectingCalendar(false);
        }
      };
      
      completeAuth();
    }
  }, [searchParams, toast, navigate, date, fetchTimeSlots]);

  return {
    connectingCalendar,
    setConnectingCalendar,
    isCalendarConnected,
    authError,
    checkingConnection
  };
}
