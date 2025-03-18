
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface TimeSlotsProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  selectedTime: string | undefined;
  setSelectedTime: (time: string) => void;
  isLoading: boolean;
  availableTimeSlots: string[];
}

export function TimeSlots({
  date,
  setDate,
  selectedTime,
  setSelectedTime,
  isLoading,
  availableTimeSlots
}: TimeSlotsProps) {
  if (!date) return null;

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
      <h3 className="text-lg font-medium text-white mb-4">Available Times</h3>
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-white/70" />
        </div>
      ) : availableTimeSlots.length > 0 ? (
        <div className="grid grid-cols-3 gap-2">
          {availableTimeSlots.map((time) => (
            <Button
              key={time}
              type="button"
              variant={selectedTime === time ? "default" : "secondary"}
              onClick={() => setSelectedTime(time)}
              className="w-full"
            >
              {time}
            </Button>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 space-y-4">
          <p className="text-white/70">
            No available time slots for this date. Please select another date.
          </p>
          <Button 
            variant="outline" 
            onClick={() => setDate(undefined)}
            className="bg-white/10 hover:bg-white/20 text-white border-white/20"
          >
            Choose a Different Date
          </Button>
        </div>
      )}
    </div>
  );
}
