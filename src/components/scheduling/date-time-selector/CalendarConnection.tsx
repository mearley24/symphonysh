
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function CalendarConnection() {
  return (
    <div>
      <Alert className="mb-4 bg-blue-500/20 border-blue-500/40">
        <Info className="h-4 w-4" />
        <AlertTitle>Email Notifications</AlertTitle>
        <AlertDescription>
          <p className="text-sm">
            Appointment confirmations will be sent via email with calendar attachments 
            that you can add to your preferred calendar application.
          </p>
        </AlertDescription>
      </Alert>
    </div>
  );
}
