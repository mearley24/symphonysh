
import { Button } from "@/components/ui/button";
import { Loader2, Clock, CalendarX } from "lucide-react";
import { useState, useEffect } from "react";

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
  const [bookedTimeSlots, setBookedTimeSlots] = useState<string[]>([]);
  const [pastTimeSlots, setPastTimeSlots] = useState<string[]>([]);
  
  useEffect(() => {
    if (!date) return;
    
    // Identify past time slots if the date is today
    const now = new Date();
    const isToday = date.getDate() === now.getDate() && 
                    date.getMonth() === now.getMonth() && 
                    date.getFullYear() === now.getFullYear();
    
    if (isToday) {
      const currentHour = now.getHours();
      const allStandardTimeSlots = [9, 10, 11, 13, 14, 15, 16, 17].map(hour => `${hour}:00`);
      
      // Time slots that have passed
      const pastSlots = allStandardTimeSlots.filter(timeSlot => {
        const hour = parseInt(timeSlot.split(':')[0], 10);
        return hour <= currentHour;
      });
      
      setPastTimeSlots(pastSlots);
      
      // Booked slots are those that are in standard time slots but not in available slots
      // Exclude past slots from this calculation
      const futureStandardSlots = allStandardTimeSlots.filter(slot => !pastSlots.includes(slot));
      setBookedTimeSlots(futureStandardSlots.filter(slot => !availableTimeSlots.includes(slot)));
    } else {
      // For future dates, booked slots are standard slots not in available slots
      const allStandardTimeSlots = [9, 10, 11, 13, 14, 15, 16, 17].map(hour => `${hour}:00`);
      setBookedTimeSlots(allStandardTimeSlots.filter(slot => !availableTimeSlots.includes(slot)));
      setPastTimeSlots([]);
    }
  }, [date, availableTimeSlots]);

  if (!date) return null;

  // Helper function to check if a time slot is selectable
  const isTimeSlotSelectable = (timeSlot: string) => {
    return availableTimeSlots.includes(timeSlot) && 
           !pastTimeSlots.includes(timeSlot) && 
           !bookedTimeSlots.includes(timeSlot);
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
      <h3 className="text-lg font-medium text-white mb-4">Available Times</h3>
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-white/70" />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {[9, 10, 11, 13, 14, 15, 16, 17].map((hour) => {
            const timeSlot = `${hour}:00`;
            const isPastTime = pastTimeSlots.includes(timeSlot);
            const isBooked = bookedTimeSlots.includes(timeSlot);
            const isSelectable = isTimeSlotSelectable(timeSlot);
            
            return (
              <Button
                key={timeSlot}
                type="button"
                variant={selectedTime === timeSlot ? "default" : "secondary"}
                onClick={() => isSelectable && setSelectedTime(timeSlot)}
                className={`w-full ${!isSelectable ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={!isSelectable}
              >
                {timeSlot}
                {isPastTime && (
                  <span className="ml-1 text-xs flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    (Past)
                  </span>
                )}
                {isBooked && !isPastTime && (
                  <span className="ml-1 text-xs flex items-center gap-1">
                    <CalendarX className="h-3 w-3" />
                    (Booked)
                  </span>
                )}
              </Button>
            );
          })}
        </div>
      )}
      
      {availableTimeSlots.length === 0 && !isLoading && (
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
