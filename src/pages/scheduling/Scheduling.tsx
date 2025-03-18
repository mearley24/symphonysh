
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { PageLayout } from "./components/PageLayout";
import { SchedulingForm } from "./components/SchedulingForm";
import { ErrorDisplay } from "./components/ErrorDisplay";
import { LoadingIndicator } from "./components/LoadingIndicator";
import { ErrorHandler } from "./components/ErrorHandler";
import { useFormState } from "./hooks/useFormState";

const Scheduling = () => {
  console.log("Scheduling component rendering");
  
  const formState = useFormState();
  const [error, setError] = useState<string | null>(null);
  const [hasRendered, setHasRendered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const navigate = useNavigate();

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
      formState.setService(serviceFromUrl);
      console.log("Service from URL:", serviceFromUrl);
    }
  }, [searchParams, isMounted, formState.setService]);

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

  // Test navigation function - for debugging
  const testNavigation = () => {
    console.log("Testing navigation to confirmation page");
    navigate("/scheduling/confirmation", {
      state: { 
        appointmentDetails: {
          date: new Date(),
          selectedTime: "10:00",
          name: "Test User",
          email: "test@example.com",
          phone: "1234567890",
          message: "Test message",
          service: "audio-entertainment"
        }
      }
    });
  };

  // If the component hasn't rendered yet, show loading indicator
  if (!hasRendered) {
    console.log("Scheduling component not rendered yet");
    return <LoadingIndicator />;
  }

  // If there was an error loading the component, show a fallback UI
  if (error) {
    console.log("Displaying error UI due to:", error);
    return <ErrorDisplay onRefresh={() => window.location.reload()} />;
  }

  console.log("Rendering Scheduling component with PageLayout");
  
  return (
    <ErrorHandler onError={handleError}>
      <PageLayout>
        <SchedulingForm
          {...formState}
          handleError={handleError}
        />
        {/* Debug button - Comment out in production */}
        {/* <button onClick={testNavigation} className="mt-4 text-sm text-gray-400">Test Navigation</button> */}
      </PageLayout>
    </ErrorHandler>
  );
};

// Export the component
export default Scheduling;
