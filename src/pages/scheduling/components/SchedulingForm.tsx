
import { FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast";
import { submitAppointment } from "@/utils/appointments"; 
import { useFormValidation } from "./scheduling-form/FormValidation";
import { FormLayout } from "./scheduling-form/FormLayout";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
      // Log that we're starting the appointment submission
      console.log("Starting appointment submission process...");
      
      const appointmentDetails = {
        date,
        selectedTime,
        name,
        email,
        phone,
        message,
        service
      };
      
      // Store the appointment details to session storage before submitting
      // This is our primary fallback mechanism
      try {
        sessionStorage.setItem('appointmentDetails', JSON.stringify(appointmentDetails));
        console.log("Stored appointment details in session storage");
      } catch (storageError) {
        console.warn("Failed to store in session storage:", storageError);
      }
      
      // Submit the appointment
      const result = await submitAppointment(appointmentDetails);
      
      console.log("Appointment submission result:", result);
      
      // Show success toast
      toast({
        title: "Success",
        description: "Your appointment has been scheduled successfully.",
      });

      console.log("Redirecting to confirmation page");
      
      // Use direct navigation to avoid infinite loops
      window.location.href = "/scheduling/confirmation";
      
    } catch (error) {
      console.error("Scheduling error:", error instanceof Error ? error.message : error);
      
      toast({
        title: "Error",
        description: "There was a problem scheduling your appointment. Please try again.",
        variant: "destructive"
      });
      
      if (typeof handleError === 'function') {
        // Prevent recursive error handling
        try {
          handleError(error);
        } catch (handlerError) {
          console.warn("Error in error handler:", handlerError);
        }
      }
      
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
