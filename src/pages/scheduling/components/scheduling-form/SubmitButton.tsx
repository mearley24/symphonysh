
import { ArrowRight } from "lucide-react";

interface SubmitButtonProps {
  isSubmitting: boolean;
}

export function SubmitButton({ isSubmitting }: SubmitButtonProps) {
  return (
    <div className="flex justify-center pt-2">
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-10 py-4 rounded-lg font-medium transition-all text-base shadow-lg shadow-accent/20 hover:shadow-accent/30 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Scheduling…" : "Schedule Consultation"}
        {!isSubmitting && <ArrowRight className="w-4 h-4" />}
      </button>
    </div>
  );
}
