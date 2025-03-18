
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CalendarPlus, Check, AlertTriangle, RefreshCw } from "lucide-react";
import { connectToGoogleCalendar } from "@/utils/appointments/googleCalendar";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface CalendarConnectionProps {
  isCalendarConnected: boolean;
  connectingCalendar: boolean;
  checkingConnection: boolean;
  authError: string | null;
  setConnectingCalendar: (connecting: boolean) => void;
  retryConnectionCheck?: () => Promise<void>;
}

export function CalendarConnection({
  isCalendarConnected,
  connectingCalendar,
  checkingConnection,
  authError,
  setConnectingCalendar,
  retryConnectionCheck
}: CalendarConnectionProps) {
  const { toast } = useToast();
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [edgeFunctionError, setEdgeFunctionError] = useState<boolean>(false);
  const [detailedError, setDetailedError] = useState<string | null>(null);
  const [showTroubleshooting, setShowTroubleshooting] = useState<boolean>(false);

  // Handle Google Calendar connection
  const handleConnectCalendar = async () => {
    if (connectingCalendar || isCalendarConnected || checkingConnection) {
      console.log("Button clicked but already in progress or connected - ignoring");
      return;
    }
    
    setConnectingCalendar(true);
    setConnectionError(null);
    setEdgeFunctionError(false);
    setDetailedError(null);
    
    try {
      console.log("Trying to connect to Google Calendar...");
      await connectToGoogleCalendar();
      // No success toast here since we're redirecting away
    } catch (error) {
      console.error("Failed to connect to Google Calendar:", error);
      
      let errorMessage = "Unknown error";
      
      if (error instanceof Error) {
        errorMessage = error.message;
        setDetailedError(error.message);
        
        // Check if it's an edge function error
        if (error.name === "FunctionsFetchError" || 
            error.message.includes("Edge Function") ||
            error.message.includes("Function endpoint not found") ||
            error.message.includes("Failed to fetch") ||
            error.message.includes("Request timed out") ||
            error.message.includes("server might be unavailable") ||
            error.message.includes("not found") ||
            error.message.includes("404")) {
          setEdgeFunctionError(true);
          errorMessage = "Could not connect to Supabase Edge Functions. The functions might not be deployed correctly.";
        }
      }
      
      setConnectionError(errorMessage);
      
      toast({
        title: "Connection Failed",
        description: edgeFunctionError 
          ? "Could not connect to calendar service. Edge Functions may not be deployed properly."
          : "Could not connect to Google Calendar. Please try again later.",
        variant: "destructive"
      });
      
      setConnectingCalendar(false);
    }
  };

  // Handle retry connection check, making sure to properly handle the Promise
  const handleRetryConnectionCheck = async () => {
    if (retryConnectionCheck) {
      try {
        await retryConnectionCheck();
        toast({
          title: "Connection Check",
          description: "Retrying connection check...",
        });
      } catch (error) {
        console.error("Error retrying connection check:", error);
        toast({
          title: "Connection Check Failed",
          description: "Could not check connection status. Please try again later.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div>
      <div className="flex items-center mb-4 justify-between">
        <div className="flex items-center text-blue-200 space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleConnectCalendar}
            disabled={connectingCalendar || isCalendarConnected || checkingConnection}
            className="bg-white/10 hover:bg-white/20 text-white border-white/20"
          >
            {connectingCalendar || checkingConnection ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : isCalendarConnected ? (
              <Check className="h-4 w-4 mr-2" />
            ) : (
              <CalendarPlus className="h-4 w-4 mr-2" />
            )}
            {connectingCalendar ? "Connecting..." : 
             checkingConnection ? "Checking..." :
             isCalendarConnected ? "Calendar Connected" : 
             "Connect Calendar"}
          </Button>

          {retryConnectionCheck && !isCalendarConnected && !connectingCalendar && !checkingConnection && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRetryConnectionCheck}
              className="bg-transparent hover:bg-white/10 text-white/70 border-none"
              title="Retry connection check"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          )}
          
          {edgeFunctionError && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTroubleshooting(!showTroubleshooting)}
              className="bg-transparent hover:bg-white/10 text-white/70 border-none"
            >
              {showTroubleshooting ? "Hide Help" : "Show Help"}
            </Button>
          )}
        </div>
      </div>

      {edgeFunctionError && (
        <Alert variant="destructive" className="mb-4 bg-red-500/20 border-red-500/40">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Edge Function Error</AlertTitle>
          <AlertDescription>
            <div className="space-y-2">
              <p>Could not connect to the calendar service. The Edge Functions might not be deployed or are temporarily unavailable.</p>
              <p className="text-sm">You can still schedule appointments without connecting your calendar.</p>
              
              {showTroubleshooting && (
                <div className="mt-4 space-y-2 pt-2 border-t border-red-500/30">
                  <p className="font-semibold">Troubleshooting steps:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Ensure Edge Functions are deployed in Supabase</li>
                    <li>Verify GOOGLE_OAUTH_CLIENT_ID and GOOGLE_OAUTH_CLIENT_SECRET are set correctly in Supabase</li>
                    <li>Check that the google-auth and google-auth-callback functions exist in Supabase</li>
                    <li>Ensure you've configured the OAuth credentials correctly in Google Cloud Console</li>
                  </ol>
                </div>
              )}
              
              {detailedError && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-xs">Technical details</summary>
                  <div className="p-2 mt-1 bg-red-500/30 rounded text-xs whitespace-pre-wrap overflow-x-auto">
                    {detailedError}
                  </div>
                </details>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {(authError === 'access_denied' || (connectionError && !edgeFunctionError)) && (
        <div className="mb-4 p-3 bg-orange-500/20 border border-orange-500/40 rounded-md flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" />
          <div className="text-sm text-white/90">
            <p className="font-medium mb-1">Authentication Error</p>
            <p>{authError === 'access_denied' 
                ? "There was a problem connecting to Google Calendar. Please try again or contact support if the issue persists." 
                : connectionError || "An unknown error occurred."}</p>
            {detailedError && (
              <details className="mt-2">
                <summary className="cursor-pointer text-xs">Technical details</summary>
                <div className="p-2 mt-1 bg-orange-500/30 rounded text-xs whitespace-pre-wrap overflow-x-auto">
                  {detailedError}
                </div>
              </details>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
