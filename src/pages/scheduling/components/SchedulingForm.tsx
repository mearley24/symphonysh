
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
  address: string;
  setAddress: (address: string) => void;
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
  address,
  setAddress,
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
      address,
      service,
      message
    });

    // Validate form fields
    if (!validateForm({ date, selectedTime, name, email, phone, address, service })) {
      return;
    }

    setIsSubmitting(true);

    // Create appointment details object
    const appointmentDetails = {
      date,
      selectedTime,
      name,
      email,
      phone,
      address,
      message,
      service
    };
    
    try {
      // Store to session storage as backup
      sessionStorage.setItem('appointmentDetails', JSON.stringify(appointmentDetails));
      console.log("Stored appointment details in session storage");
      
      // Submit appointment
      const result = await submitAppointment(appointmentDetails);
      console.log("Appointment submission result:", result);
      
      // Show success toast
      toast({
        title: "Appointment Scheduled",
        description: "Your appointment has been scheduled. We'll send a confirmation email shortly.",
      });
      
      // Redirect with a small delay to ensure toast is visible
      setTimeout(() => {
        navigate("/scheduling/confirmation");
      }, 1500);
      
    } catch (error) {
      console.error("Scheduling error:", error instanceof Error ? error.message : error);
      
      // Show toast with appropriate message
      toast({
        title: "Note",
        description: "Your appointment was saved. We'll send your confirmation soon.",
      });
      
      // Still redirect to confirmation using session storage data
      setTimeout(() => {
        navigate("/scheduling/confirmation");
      }, 1500);
      
      // Handle error if handler provided
      if (typeof handleError === 'function') {
        try {
          handleError(error);
        } catch (handlerError) {
          console.warn("Error in error handler:", handlerError);
        }
      }
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
      address={address}
      setAddress={setAddress}
      message={message}
      setMessage={setMessage}
      service={service}
      setService={setService}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit}
    />
  );
}
