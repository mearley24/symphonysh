
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { PageLayout } from "./components/PageLayout";
import { SchedulingForm } from "./components/SchedulingForm";
import { ErrorDisplay } from "./components/ErrorDisplay";
import { LoadingIndicator } from "./components/LoadingIndicator";
import { ErrorHandler } from "./components/ErrorHandler";
import { useFormState } from "./hooks/useFormState";
import SEO from "../../components/SEO";

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
      <SEO
        title="Schedule a Walkthrough"
        description="Book a free on-site walkthrough with Symphony Smart Homes. Vail Valley & Eagle County — Control4, Lutron, AVA, pre-wire, and full-home integration."
        keywords="schedule smart home walkthrough, Vail Valley, Eagle County, Control4 consultation, Lutron, AVA, pre-wire"
        canonicalUrl="https://symphonysh.com/scheduling"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Schedule", url: "/scheduling" },
        ]}
      />
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
