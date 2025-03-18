
import { FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast";
import { submitAppointment } from "@/utils/appointmentUtils";
import { useFormValidation } from "./scheduling-form/FormValidation";
import { FormLayout } from "./scheduling-form/FormLayout";

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
  const { validateForm } = useFormValidation();

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
    if (!validateForm({ date, selectedTime, name, email, phone, service })) {
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
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout
      date={date}
      setDate={setDate}
      selectedTime={selectedTime}
      setSelectedTime={setSelectedTime}
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
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    />
  );
}
