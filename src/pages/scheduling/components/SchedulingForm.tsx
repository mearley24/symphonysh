
import { FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast";
import { submitAppointment } from "@/utils/appointmentUtils";
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
      
      const result = await submitAppointment({
        date,
        selectedTime,
        name,
        email,
        phone,
        message,
        service
      });
      
      console.log("Appointment submission result:", result);
      
      // Check if we have notification information in the result
      if (result?.businessEmail?.success || result?.customerEmail?.success) {
        console.log("Email notifications were sent successfully!");
        toast({
          title: "Success",
          description: "Your appointment has been scheduled and confirmation emails have been sent.",
        });
      } else {
        console.log("Appointment was saved but notification status is unknown");
      }

      // Store the appointment details to pass to the confirmation page
      const appointmentDetails = {
        date,
        selectedTime,
        name,
        email,
        phone,
        message,
        service
      };

      // Navigate to the confirmation page with appointment details
      navigate("/scheduling/confirmation", { 
        state: { appointmentDetails } 
      });
      
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
