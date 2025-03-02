
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Info, Loader2 } from "lucide-react";
import { getAvailableTimeSlots } from "@/utils/appointments";

interface DateTimeSelectorProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  selectedTime: string | undefined;
  setSelectedTime: (time: string) => void;
}

export function DateTimeSelector({ date, setDate, selectedTime, setSelectedTime }: DateTimeSelectorProps) {
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch available time slots when the date changes
  useEffect(() => {
    async function fetchTimeSlots() {
      if (!date) {
        setAvailableTimeSlots([]);
        return;
      }
      
      setIsLoading(true);
      try {
        const slots = await getAvailableTimeSlots(date);
        setAvailableTimeSlots(slots);
      } catch (error) {
        console.error("Error fetching available time slots:", error);
        setAvailableTimeSlots([]);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchTimeSlots();
  }, [date]);

  // Clear selected time if it's not in available slots
  useEffect(() => {
    if (selectedTime && availableTimeSlots.length > 0 && !availableTimeSlots.includes(selectedTime)) {
      setSelectedTime("");
    }
  }, [availableTimeSlots, selectedTime, setSelectedTime]);

  return (
    <div className="space-y-4">
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
        <div className="flex items-center mb-2 text-blue-200 space-x-2">
          <Info size={16} />
          <p className="text-sm">Select a weekday (Monday-Friday) for your appointment</p>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="bg-transparent text-white"
          disabled={(date) => {
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            return (
              date < now ||
              date.getDay() === 0 ||
              date.getDay() === 6
            );
          }}
        />
      </div>

      {date && (
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
            <p className="text-center py-4 text-white/70">
              No available time slots for this date. Please select another date.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
