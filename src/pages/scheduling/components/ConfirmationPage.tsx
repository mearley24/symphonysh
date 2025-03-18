
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { PageLayout } from "./PageLayout";
import { BackNavigation } from "@/components/scheduling/BackNavigation";
import { getServiceName } from "@/utils/appointments/types";

interface AppointmentDetails {
  date?: Date;
  selectedTime?: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  service?: string;
}

export function ConfirmationPage() {
  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetails | null>(null);
  const location = useLocation();
  
  useEffect(() => {
    console.log("Confirmation page rendered");
    console.log("Location state:", location.state);
    
    // First try to get appointment details from router state
    let details = location.state?.appointmentDetails;
    console.log("Appointment details from state:", details);
    
    // If router state is empty, try to recover from session storage
    if (!details || !details.date) {
      console.log("No appointment details in location state, trying session storage");
      try {
        const storedDetails = sessionStorage.getItem('appointmentDetails');
        if (storedDetails) {
          details = JSON.parse(storedDetails);
          console.log("Retrieved appointment details from session storage:", details);
        }
      } catch (error) {
        console.error("Error retrieving from session storage:", error);
      }
    }
    
    // Ensure we have valid details
    if (details && (details.date || details.name)) {
      setAppointmentDetails(details);
    } else {
      console.error("No valid appointment details found in state or session storage");
    }
  }, [location]);

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
  
  console.log("Rendering confirmation with:", {
    formattedDate,
    serviceName,
    name: appointmentDetails?.name,
    email: appointmentDetails?.email
  });

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto p-6 rounded-lg">
        <BackNavigation />
        
        <div className="text-center space-y-4 mt-6">
          <h1 className="text-3xl font-bold">Appointment Confirmed</h1>
          
          {appointmentDetails ? (
            <div className="space-y-6 mt-8">
              <p className="text-xl">
                Thank you, <span className="font-semibold">{appointmentDetails.name}</span>, for scheduling a consultation with Symphony Smart Homes!
              </p>
              
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg mt-6">
                <h2 className="text-2xl font-semibold mb-4">Appointment Details</h2>
                
                <div className="space-y-2 text-lg">
                  <p><span className="font-semibold">Date:</span> {formattedDate}</p>
                  <p><span className="font-semibold">Time:</span> {appointmentDetails.selectedTime}</p>
                  <p><span className="font-semibold">Service:</span> {serviceName}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-lg">
                  We've sent a confirmation to <span className="font-semibold">{appointmentDetails.email}</span>.
                </p>
                <p className="mt-2">
                  If you need to reschedule or have any questions, please don't hesitate to contact us.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-red-500/20 border border-red-500/40 rounded-lg">
              <p>We couldn't retrieve your appointment details. Please contact us if you have any questions.</p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
