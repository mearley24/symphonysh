
import { format } from "date-fns";
import { getServiceName } from "@/utils/appointments/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AppointmentDetailsProps {
  appointmentDetails: {
    date?: Date | string;
    selectedTime?: string;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    message?: string;
    service?: string;
  } | null;
}

export function AppointmentDetails({ appointmentDetails }: AppointmentDetailsProps) {
  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "Date not available";
    
    try {
      // Check if date is a string and needs parsing
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return format(dateObj, 'EEEE, MMMM d, yyyy');
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  // Format date as needed
  const formattedDate = appointmentDetails?.date ? formatDate(appointmentDetails.date) : "Date not available";
  
  // Get service name from ID
  const serviceName = appointmentDetails?.service ? getServiceName(appointmentDetails.service) : "Service not available";
  
  if (!appointmentDetails) {
    return (
      <div className="p-6 bg-red-500/20 border border-red-500/40 rounded-lg">
        <p className="text-white">We couldn't retrieve your appointment details. Please contact us if you have any questions.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <p className="text-xl text-white">
        Thank you, <span className="font-semibold text-white">{appointmentDetails.name}</span>, for scheduling a consultation with Symphony Smart Homes!
      </p>
      
      <Card className="border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl text-white">Appointment Details</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-3 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-white/10 rounded-md">
              <p className="font-semibold text-accent">Date</p>
              <p className="text-white">{formattedDate}</p>
            </div>
            
            <div className="p-3 bg-white/10 rounded-md">
              <p className="font-semibold text-accent">Time</p>
              <p className="text-white">{appointmentDetails.selectedTime}</p>
            </div>
          </div>
          
          <div className="p-3 bg-white/10 rounded-md">
            <p className="font-semibold text-accent">Service</p>
            <p className="text-white">{serviceName}</p>
          </div>
          
          <div className="p-3 bg-white/10 rounded-md">
            <p className="font-semibold text-accent">Address</p>
            <p className="text-white">{appointmentDetails.address || "Not provided"}</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
        <p className="text-lg text-white">
          We've sent a confirmation to <span className="font-semibold text-white">{appointmentDetails.email}</span>.
        </p>
        <p className="mt-2 text-white">
          If you need to reschedule or have any questions, please don't hesitate to contact us.
        </p>
      </div>
    </div>
  );
}
