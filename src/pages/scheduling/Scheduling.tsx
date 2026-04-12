
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { PageLayout } from "./components/PageLayout";
import { SchedulingForm } from "./components/SchedulingForm";
import { ErrorDisplay } from "./components/ErrorDisplay";
import { LoadingIndicator } from "./components/LoadingIndicator";
import { ErrorHandler } from "./components/ErrorHandler";
import { useFormState } from "./hooks/useFormState";

const Scheduling = () => {
  const formState = useFormState();
  const [error, setError] = useState<string | null>(null);
  const [hasRendered, setHasRendered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  // Mark component as mounted
  useEffect(() => {
    setHasRendered(true);
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  // Set service from URL params (e.g. /scheduling?service=audio-entertainment)
  useEffect(() => {
    if (!isMounted) return;
    const serviceFromUrl = searchParams.get("service");
    if (serviceFromUrl) {
      formState.setService(serviceFromUrl);
    }
  }, [searchParams, isMounted, formState.setService]);

  // Reset any errors when component mounts
  useEffect(() => {
    if (!isMounted) return;
    setError(null);
  }, [isMounted]);

  const handleError = (error: any) => {
    setError(error?.message || "An unexpected error occurred");
    toast({
      title: "Error",
      description: error?.message || "An unexpected error occurred. Please try again.",
      variant: "destructive"
    });
  };

  if (!hasRendered) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorDisplay onRefresh={() => window.location.reload()} />;
  }

  return (
    <ErrorHandler onError={handleError}>
      <PageLayout>
        <SchedulingForm
          {...formState}
          handleError={handleError}
        />
      </PageLayout>
    </ErrorHandler>
  );
};

export default Scheduling;
