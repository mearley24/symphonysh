
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Info, Loader2, CalendarPlus, Check } from "lucide-react";
import { getAvailableTimeSlots } from "@/utils/appointments";
import { connectToGoogleCalendar, handleGoogleAuthCallback } from "@/utils/appointments/googleCalendarUtils";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams, useNavigate } from "react-router-dom";

interface DateTimeSelectorProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  selectedTime: string | undefined;
  setSelectedTime: (time: string) => void;
}

export function DateTimeSelector({ date, setDate, selectedTime, setSelectedTime }: DateTimeSelectorProps) {
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [connectingCalendar, setConnectingCalendar] = useState(false);
  const [isCalendarConnected, setIsCalendarConnected] = useState(false);
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Check for Google auth callback on component mount
  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    
    if (code && state === 'google_auth') {
      setConnectingCalendar(true);
      
      const completeAuth = async () => {
        try {
          await handleGoogleAuthCallback();
          
          // Clear URL params and show success message
          navigate('/scheduling', { replace: true });
          
          toast({
            title: "Google Calendar Connected",
            description: "Your calendar is now connected. Available time slots will be updated accordingly.",
          });
          
          setIsCalendarConnected(true);
          
          // If date is already selected, refresh time slots
          if (date) {
            fetchTimeSlots(date);
          }
        } catch (error) {
          console.error("Failed to complete Google auth:", error);
          toast({
            title: "Connection Failed",
            description: "Could not connect to Google Calendar. Please try again.",
            variant: "destructive"
          });
        } finally {
          setConnectingCalendar(false);
        }
      };
      
      completeAuth();
    }
  }, [searchParams, toast, navigate, date]);

  // Fetch available time slots when the date changes
  useEffect(() => {
    if (date) {
      fetchTimeSlots(date);
    } else {
      setAvailableTimeSlots([]);
    }
  }, [date]);

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

  // Clear selected time if it's not in available slots
  useEffect(() => {
    if (selectedTime && availableTimeSlots.length > 0 && !availableTimeSlots.includes(selectedTime)) {
      setSelectedTime("");
    }
  }, [availableTimeSlots, selectedTime, setSelectedTime]);

  // Handle Google Calendar connection
  const handleConnectCalendar = async () => {
    setConnectingCalendar(true);
    try {
      await connectToGoogleCalendar();
      // No success toast here since we're redirecting away
    } catch (error) {
      console.error("Failed to connect to Google Calendar:", error);
      toast({
        title: "Connection Failed",
        description: "Could not connect to Google Calendar. Please try again.",
        variant: "destructive"
      });
      setConnectingCalendar(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
        <div className="flex items-center mb-4 justify-between">
          <div className="flex items-center text-blue-200 space-x-2">
            <Info size={16} />
            <p className="text-sm">Select a weekday (Monday-Friday) for your appointment</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleConnectCalendar}
            disabled={connectingCalendar || isCalendarConnected}
            className="bg-white/10 hover:bg-white/20 text-white border-white/20"
          >
            {connectingCalendar ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : isCalendarConnected ? (
              <Check className="h-4 w-4 mr-2" />
            ) : (
              <CalendarPlus className="h-4 w-4 mr-2" />
            )}
            {isCalendarConnected ? "Calendar Connected" : "Connect Calendar"}
          </Button>
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
      )}
    </div>
  );
}
