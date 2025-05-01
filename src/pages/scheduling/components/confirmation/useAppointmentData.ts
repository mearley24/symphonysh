
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface AppointmentDetails {
  date?: Date | string;
  selectedTime?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  message?: string;
  service?: string;
}

export function useAppointmentData() {
  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetails | null>(null);
  const location = useLocation();
  
  useEffect(() => {
    console.log("Loading appointment data");
    
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

  return appointmentDetails;
}
