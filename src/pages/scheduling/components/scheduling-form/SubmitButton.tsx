
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  isSubmitting: boolean;
}

export function SubmitButton({ isSubmitting }: SubmitButtonProps) {
  return (
    <div className="flex justify-center">
      <Button
        type="submit"
        variant="secondary"
        size="lg"
        className="w-fit px-8 bg-white hover:bg-white/90 text-primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Scheduling..." : "Schedule Consultation"}
      </Button>
    </div>
  );
}
