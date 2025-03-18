
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getAvailableTimeSlots } from "@/utils/appointments";

export function useTimeSlots(
  date: Date | undefined,
  selectedTime: string | undefined,
  setSelectedTime: (time: string) => void
) {
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Fetch available time slots when the date changes
  useEffect(() => {
    if (date) {
      fetchTimeSlots(date);
    } else {
      setAvailableTimeSlots([]);
    }
  }, [date]);

  // Clear selected time if it's not in available slots
  useEffect(() => {
    if (selectedTime && availableTimeSlots.length > 0 && !availableTimeSlots.includes(selectedTime)) {
      setSelectedTime("");
    }
  }, [availableTimeSlots, selectedTime, setSelectedTime]);

  const fetchTimeSlots = async (selectedDate: Date) => {
    setIsLoading(true);
    try {
      const slots = await getAvailableTimeSlots(selectedDate);
      setAvailableTimeSlots(slots);
    } catch (error) {
      console.error("Error fetching available time slots:", error);
      toast({
        title: "Error Loading Time Slots",
        description: "There was a problem loading available time slots. Please try again.",
        variant: "destructive"
      });
      setAvailableTimeSlots([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    availableTimeSlots,
    isLoading,
    fetchTimeSlots
  };
}
