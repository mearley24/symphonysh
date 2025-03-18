
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CalendarPlus, Check, AlertTriangle } from "lucide-react";
import { connectToGoogleCalendar } from "@/utils/appointments/googleCalendar";
import { useToast } from "@/components/ui/use-toast";

interface CalendarConnectionProps {
  isCalendarConnected: boolean;
  connectingCalendar: boolean;
  checkingConnection: boolean;
  authError: string | null;
  setConnectingCalendar: (connecting: boolean) => void;
}

export function CalendarConnection({
  isCalendarConnected,
  connectingCalendar,
  checkingConnection,
  authError,
  setConnectingCalendar,
}: CalendarConnectionProps) {
  const { toast } = useToast();
  const [connectionError, setConnectionError] = useState<string | null>(null);

  // Handle Google Calendar connection
  const handleConnectCalendar = async () => {
    setConnectingCalendar(true);
    setConnectionError(null);
    
    try {
      await connectToGoogleCalendar();
      // No success toast here since we're redirecting away
    } catch (error) {
      console.error("Failed to connect to Google Calendar:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      setConnectionError(errorMessage);
      
      toast({
        title: "Connection Failed",
        description: "Could not connect to Google Calendar. Please check the console for details.",
        variant: "destructive"
      });
      
      setConnectingCalendar(false);
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
        </div>
      </div>

      {(authError === 'access_denied' || connectionError) && (
        <div className="mb-4 p-3 bg-orange-500/20 border border-orange-500/40 rounded-md flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" />
          <div className="text-sm text-white/90">
            <p className="font-medium mb-1">Authentication Error</p>
            <p>{authError === 'access_denied' 
                ? "There was a problem connecting to Google Calendar. Please try again or contact support if the issue persists." 
                : connectionError || "An unknown error occurred."}</p>
          </div>
        </div>
      )}
    </div>
  );
}
