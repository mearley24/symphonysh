import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BackNavigation } from "@/components/scheduling/BackNavigation";

interface AppointmentDetails {
  date?: Date | string;
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
    
    // Function to safely parse stored data
    const safelyParseData = (dataString: string | null): AppointmentDetails | null => {
      if (!dataString) return null;
      
      try {
        const parsedData = JSON.parse(dataString);
        console.log("Successfully parsed data:", parsedData);
        return parsedData;
      } catch (error) {
        console.error("Error parsing data:", error);
        return null;
      }
    };
    
    // First try to get appointment details from router state
    let details = location.state?.appointmentDetails;
    console.log("Appointment details from state:", details);
    
    // If router state is empty, try to recover from session storage
    if (!details || !details.date) {
      console.log("No appointment details in location state, trying session storage");
      try {
        const storedDetails = sessionStorage.getItem('appointmentDetails');
        console.log("Raw session storage data:", storedDetails);
        
        if (storedDetails) {
          details = safelyParseData(storedDetails);
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

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <BackNavigation />
        
        {appointmentDetails ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Appointment Confirmed</h2>
            <p>Thank you for your booking.</p>
          </div>
        ) : (
          <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-6">
            <p className="text-white">No appointment details found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
