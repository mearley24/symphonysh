
import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { DateTimeSelector } from "@/components/scheduling/DateTimeSelector";
import { AppointmentForm } from "@/components/scheduling/AppointmentForm";
import { submitAppointment } from "@/utils/appointmentUtils";

interface SchedulingFormProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  selectedTime: string | undefined;
  setSelectedTime: (time: string) => void;
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  message: string;
  setMessage: (message: string) => void;
  service: string;
  setService: (service: string) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
  handleError: (error: any) => void;
}

export function SchedulingForm({
  date,
  setDate,
  selectedTime,
  setSelectedTime,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  message,
  setMessage,
  service,
  setService,
  isSubmitting,
  setIsSubmitting,
  handleError
}: SchedulingFormProps) {
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log("Form Data:", {
      date,
      selectedTime,
      name,
      email,
      phone,
      service,
      message
    });

    // Validate form fields
    if (!date) {
      toast({
        title: "Missing Date",
        description: "Please select a date for your appointment.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedTime) {
      toast({
        title: "Missing Time",
        description: "Please select a time slot for your appointment.",
        variant: "destructive"
      });
      return;
    }

    if (!name.trim()) {
      toast({
        title: "Missing Name",
        description: "Please enter your name.",
        variant: "destructive"
      });
      return;
    }

    if (!email.trim()) {
      toast({
        title: "Missing Email",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }

    if (!phone.trim()) {
      toast({
        title: "Missing Phone",
        description: "Please enter your phone number.",
        variant: "destructive"
      });
      return;
    }

    if (!service) {
      toast({
        title: "Missing Service",
        description: "Please select a service for your consultation.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await submitAppointment({
        date,
        selectedTime,
        name,
        email,
        phone,
        message,
        service
      });

      toast({
        title: "Appointment Scheduled!",
        description: "We'll contact you to confirm your appointment.",
      });

      // Reset form
      setDate(undefined);
      setSelectedTime(undefined);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setService("");
      
    } catch (error: any) {
      console.error("Scheduling error:", error);
      toast({
        title: "Error",
        description: error?.message || "There was a problem scheduling your appointment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Wrap DateTimeSelector in an error boundary wrapper */}
        <div className="space-y-4">
          {/* This div wrapping the DateTimeSelector acts as our "error boundary" */}
          <div className="w-full">
            <DateTimeSelector
              date={date}
              setDate={setDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
          </div>
        </div>

        <AppointmentForm
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          message={message}
          setMessage={setMessage}
          service={service}
          setService={setService}
        />
      </div>

      <div className="flex justify-center">
        <Button
          type="submit"
          variant="secondary"
          size="lg"
          className="w-fit px-8 bg-white hover:bg-white/90 text-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Scheduling..." : "Schedule Consultation"}
        </Button>
      </div>
    </form>
  );
}
