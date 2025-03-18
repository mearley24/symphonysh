
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { PageLayout } from "./components/PageLayout";
import { SchedulingForm } from "./components/SchedulingForm";
import { ErrorDisplay } from "./components/ErrorDisplay";

const Scheduling = () => {
  console.log("Scheduling component rendering");
  
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [service, setService] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasRendered, setHasRendered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  // Mark component as rendered to help with debugging
  useEffect(() => {
    setHasRendered(true);
    setIsMounted(true);
    console.log("Scheduling component mounted and useEffect executed");
    
    return () => {
      setIsMounted(false);
    };
  }, []);

  // Set service from URL params
  useEffect(() => {
    if (!isMounted) return;
    
    const serviceFromUrl = searchParams.get("service");
    if (serviceFromUrl) {
      setService(serviceFromUrl);
      console.log("Service from URL:", serviceFromUrl);
    }
  }, [searchParams, isMounted]);

  // Reset any errors when component mounts
  useEffect(() => {
    if (!isMounted) return;
    setError(null);
  }, [isMounted]);

  // Handle any unexpected errors
  const handleError = (error: any) => {
    console.error("Scheduling error:", error);
    setError(error?.message || "An unexpected error occurred");
    toast({
      title: "Error",
      description: error?.message || "An unexpected error occurred. Please try again.",
      variant: "destructive"
    });
  };

  // If the component hasn't rendered yet, log it for debugging
  if (!hasRendered) {
    console.log("Scheduling component not rendered yet");
    return <div className="min-h-screen bg-primary flex items-center justify-center">
      <p className="text-white">Loading scheduling page...</p>
    </div>;
  }

  // If there was an error loading the component, show a fallback UI
  if (error) {
    console.log("Displaying error UI due to:", error);
    return <ErrorDisplay onRefresh={() => window.location.reload()} />;
  }

  console.log("Rendering Scheduling component with PageLayout");
  
  return (
    <PageLayout>
      <SchedulingForm
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
        setIsSubmitting={setIsSubmitting}
        handleError={handleError}
      />
    </PageLayout>
  );
};

// Export the component
export default Scheduling;
