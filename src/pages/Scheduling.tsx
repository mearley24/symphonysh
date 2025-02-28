
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Header from "../components/Header";
import { BackNavigation } from "@/components/scheduling/BackNavigation";
import { DateTimeSelector } from "@/components/scheduling/DateTimeSelector";
import { AppointmentForm } from "@/components/scheduling/AppointmentForm";
import { submitAppointment } from "@/utils/appointmentUtils";

const Scheduling = () => {
  const [searchParams] = useSearchParams();
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [service, setService] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const serviceFromUrl = searchParams.get("service");
    if (serviceFromUrl) {
      setService(serviceFromUrl);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    // Check each field individually and show specific error messages
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
      
    } catch (error) {
      console.error("Scheduling error:", error);
      toast({
        title: "Error",
        description: "There was a problem scheduling your appointment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <BackNavigation />
            <h1 className="text-4xl font-bold text-white mb-4">Schedule a Consultation</h1>
            <p className="text-lg text-gray-300 mb-8">
              Book a time to discuss your smart home project with our experts.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            <div className="grid md:grid-cols-2 gap-8">
              <DateTimeSelector
                date={date}
                setDate={setDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
              />

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
              >
                {isSubmitting ? "Scheduling..." : "Schedule Consultation"}
              </Button>
            </div>
          </form>
        </div>
      </section>

      <footer className="py-12 px-6 text-center text-gray-400 bg-primary">
        <p className="text-sm">
          © 2024 Symphony Smart Homes. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Scheduling;
