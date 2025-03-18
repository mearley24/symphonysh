
import { Button } from "@/components/ui/button";

interface ErrorDisplayProps {
  onRefresh: () => void;
}

export function ErrorDisplay({ onRefresh }: ErrorDisplayProps) {
  return (
    <div className="min-h-screen bg-primary">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Schedule a Consultation</h1>
            <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 my-4">
              <p className="text-white">Sorry, we encountered an error loading the scheduling page. Please try refreshing the page or contact us directly.</p>
              <Button 
                onClick={onRefresh} 
                className="mt-4 bg-white text-primary hover:bg-white/90"
              >
                Refresh Page
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
