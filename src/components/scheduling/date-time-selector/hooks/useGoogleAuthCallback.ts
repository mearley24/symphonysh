
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { handleGoogleAuthCallback } from "@/utils/appointments/googleCalendar";

/**
 * Hook to handle Google auth callback
 */
export function useGoogleAuthCallback(
  date: Date | undefined, 
  fetchTimeSlots: (date: Date) => Promise<void>,
  setConnectingCalendar: (connecting: boolean) => void,
  setIsCalendarConnected: (connected: boolean) => void,
  setAuthError: (error: string | null) => void
) {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

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
      
      const callbackResult = handleGoogleAuthCallback();
      
      if (callbackResult && callbackResult.completeAuth) {
        const completeAuth = async () => {
          try {
            const result = await callbackResult.completeAuth();
            
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
          } catch (error) {
            console.error("Failed to complete Google auth:", error);
            
            // Determine if it's an edge function error
            let errorMessage = "Could not connect to Google Calendar. Please try again.";
            
            if (error instanceof Error && 
                (error.name === "FunctionsFetchError" || 
                 error.message.includes("Failed to send a request to the Edge Function") ||
                 error.message.includes("Failed to fetch") ||
                 error.message.includes("Request timed out"))) {
              errorMessage = "Could not connect to calendar service. The server might be temporarily unavailable.";
            }
            
            // Still clear the URL params even on error
            navigate('/scheduling', { replace: true });
            
            toast({
              title: "Connection Failed",
              description: errorMessage,
              variant: "destructive"
            });
            
            setAuthError(error instanceof Error ? error.message : "Unknown error");
          } finally {
            setConnectingCalendar(false);
          }
        };
        
        completeAuth();
      }
    }
  }, [searchParams, toast, navigate, date, fetchTimeSlots, setConnectingCalendar, setIsCalendarConnected, setAuthError]);
}
