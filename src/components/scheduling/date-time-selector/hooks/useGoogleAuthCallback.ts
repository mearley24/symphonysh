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
    const errorDescription = searchParams.get('error_description');
    const errorDetails = searchParams.get('error_details');
    const errorCode = searchParams.get('error_code');
    const success = searchParams.get('success');
    
    // Log all query parameters for debugging
    console.log("Auth callback parameters:", {
      code: !!code,
      state,
      error,
      errorDescription,
      errorDetails,
      errorCode,
      success
    });
    
    // Handle errors from Google Auth
    if (error) {
      setConnectingCalendar(false);
      let errorMessage = "An error occurred during Google authentication.";
      
      if (error === 'access_denied') {
        errorMessage = "Authentication was denied. Please try again.";
        setAuthError('access_denied');
      } else if (error === 'token_exchange_failed') {
        errorMessage = "Failed to complete authentication with Google.";
        if (errorDetails) {
          console.error("Token exchange error details:", errorDetails);
          errorMessage += " " + errorDetails;
        }
        if (errorCode) {
          console.error("Error code:", errorCode);
          setAuthError(`token_exchange_failed:${errorCode}`);
        } else {
          setAuthError('token_exchange_failed');
        }
      } else if (errorDescription) {
        errorMessage = `Authentication error: ${errorDescription}`;
        setAuthError(`${error}:${errorDescription}`);
      } else {
        setAuthError(error);
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
    
    // Handle success redirects from the edge function
    if (success === 'true' && state === 'google_auth') {
      setConnectingCalendar(false);
      
      // Clear URL params and show success message
      navigate('/scheduling', { replace: true });
      
      toast({
        title: "Google Calendar Connected",
        description: "Your calendar is now connected. Available time slots will be updated accordingly."
      });
      
      setIsCalendarConnected(true);
      setAuthError(null);
      
      // If date is already selected, refresh time slots
      if (date) {
        fetchTimeSlots(date);
      }
      
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
            let errorDetails = "";
            
            if (error instanceof Error) {
              errorDetails = error.message;
              
              if (error.name === "FunctionsFetchError" || 
                  error.message.includes("Failed to send a request to the Edge Function") ||
                  error.message.includes("Failed to fetch") ||
                  error.message.includes("Request timed out")) {
                errorMessage = "Could not connect to calendar service. The server might be temporarily unavailable.";
              } else if (error.message.includes("400") || error.message.includes("401") || error.message.includes("403")) {
                // Handle specific HTTP error codes
                errorMessage = "Authentication failed. This could be due to incorrect credentials or insufficient permissions.";
              }
            }
            
            // Still clear the URL params even on error
            navigate('/scheduling', { replace: true });
            
            toast({
              title: "Connection Failed",
              description: errorMessage,
              variant: "destructive"
            });
            
            setAuthError(error instanceof Error ? 
              `${error.name}:${error.message}` : 
              "Unknown error");
          } finally {
            setConnectingCalendar(false);
          }
        };
        
        completeAuth();
      }
    }
  }, [searchParams, toast, navigate, date, fetchTimeSlots, setConnectingCalendar, setIsCalendarConnected, setAuthError]);
}
