
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AppointmentDetailsProps {
  appointmentDetails: any;
}

export function AppointmentDetails({ appointmentDetails }: AppointmentDetailsProps) {
  // Format date for display
  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "Not specified";
    try {
      const dateObj = typeof date === "string" ? new Date(date) : date;
      return dateObj.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  // If there are no details, show a warning
  if (!appointmentDetails) {
    return (
      <Alert variant="destructive" className="bg-red-500/20 border-red-500/40 mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Unable to retrieve appointment details. Please contact us for assistance.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="glass-dark p-6 rounded-lg shadow-lg text-left text-white">
      <p className="mb-2">
        <span className="font-semibold">Date:</span>{" "}
        {formatDate(appointmentDetails.date)}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Time:</span>{" "}
        {appointmentDetails.selectedTime || "Not specified"}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Name:</span>{" "}
        {appointmentDetails.name || "Not provided"}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Email:</span>{" "}
        {appointmentDetails.email || "Not provided"}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Phone:</span>{" "}
        {appointmentDetails.phone || "Not provided"}
      </p>
      {appointmentDetails.address && (
        <p className="mb-2">
          <span className="font-semibold">Address:</span>{" "}
          {appointmentDetails.address}
        </p>
      )}
      <p className="mb-2">
        <span className="font-semibold">Service:</span>{" "}
        {appointmentDetails.service
          ? appointmentDetails.service.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())
          : "Not specified"}
      </p>
      {appointmentDetails.message && (
        <div className="mt-4">
          <p className="font-semibold mb-1">Message:</p>
          <p className="italic">{appointmentDetails.message}</p>
        </div>
      )}
    </div>
  );
}
