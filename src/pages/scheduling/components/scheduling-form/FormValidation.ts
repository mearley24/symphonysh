
import { useToast } from "@/components/ui/use-toast";

interface ValidationData {
  date: Date | undefined;
  selectedTime: string | undefined;
  name: string;
  email: string;
  phone: string;
  service: string;
}

export const useFormValidation = () => {
  const { toast } = useToast();

  const validateForm = (data: ValidationData): boolean => {
    if (!data.date) {
      toast({
        title: "Missing Date",
        description: "Please select a date for your appointment.",
        variant: "destructive"
      });
      return false;
    }

    if (!data.selectedTime) {
      toast({
        title: "Missing Time",
        description: "Please select a time slot for your appointment.",
        variant: "destructive"
      });
      return false;
    }

    if (!data.name.trim()) {
      toast({
        title: "Missing Name",
        description: "Please enter your name.",
        variant: "destructive"
      });
      return false;
    }

    if (!data.email.trim()) {
      toast({
        title: "Missing Email",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return false;
    }

    if (!data.phone.trim()) {
      toast({
        title: "Missing Phone",
        description: "Please enter your phone number.",
        variant: "destructive"
      });
      return false;
    }

    if (!data.service) {
      toast({
        title: "Missing Service",
        description: "Please select a service for your consultation.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  return { validateForm };
};
