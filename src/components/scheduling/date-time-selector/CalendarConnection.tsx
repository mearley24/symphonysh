
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

// Define the component props interface
interface CalendarConnectionProps {
  // These are the props we need to accept
  isEmailNotificationsEnabled?: boolean;
}

export function CalendarConnection({ isEmailNotificationsEnabled = true }: CalendarConnectionProps) {
  return (
    <div className="mb-4 flex items-start gap-2 rounded-md bg-accent/20 p-3 text-sm">
      <Info className="h-5 w-5 text-accent" />
      <div>
        <p>
          When you schedule an appointment, you'll receive an email confirmation with calendar details that you can add to your calendar.
        </p>
      </div>
    </div>
  );
}
