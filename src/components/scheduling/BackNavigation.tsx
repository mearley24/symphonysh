
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function BackNavigation() {
  return (
    <Button
      variant="ghost"
      className="text-gray-400 hover:text-white mb-4"
      asChild
    >
      <Link to="/services" className="inline-flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to Services
      </Link>
    </Button>
  );
}
