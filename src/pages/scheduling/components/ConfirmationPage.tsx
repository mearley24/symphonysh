
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { PageLayout } from "./PageLayout";
import { BackNavigation } from "@/components/scheduling/BackNavigation";
import { getServiceName } from "@/utils/appointments/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

// Zapier webhook URL
const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/22322669/2cwoj8b/";

export function ConfirmationPage() {
  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetails | null>(null);
  const [notificationSent, setNotificationSent] = useState(false);
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

  // Send appointment data to Zapier webhook
  useEffect(() => {
    if (appointmentDetails && !notificationSent) {
      console.log("Sending appointment details to Zapier webhook");
      
      const formattedDate = formatDate(appointmentDetails.date);
      const serviceName = appointmentDetails?.service ? getServiceName(appointmentDetails.service) : "Service not available";
      
      // Format the data for Zapier - ensure address is included
      const payload = {
        appointment: {
          id: `new-${Date.now()}`,
          name: appointmentDetails.name || 'Unknown',
          email: appointmentDetails.email || 'No email provided',
          phone: appointmentDetails.phone || 'No phone provided',
          address: appointmentDetails.address || 'No address provided',
          message: appointmentDetails.message || 'No message',
          service: serviceName,
          date: formattedDate,
          time: appointmentDetails.selectedTime || 'Time not specified',
          raw_data: JSON.stringify(appointmentDetails)
        }
      };
      
      // Send to Zapier webhook
      try {
        fetch(ZAPIER_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          mode: "no-cors", // Required for cross-origin webhook calls
          body: JSON.stringify(payload)
        }).then(() => {
          console.log("Zapier webhook triggered with payload:", payload);
          setNotificationSent(true);
        });
      } catch (error) {
        console.error("Error triggering Zapier webhook:", error);
      }
    }
  }, [appointmentDetails, notificationSent]);

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

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto p-6 rounded-lg">
        <BackNavigation />
        
        <div className="text-center space-y-6 mt-8 animate-fade-up text-white">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-white">Appointment Confirmed</h1>
            
            {appointmentDetails ? (
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
            ) : (
              <div className="p-6 bg-red-500/20 border border-red-500/40 rounded-lg">
                <p className="text-white">We couldn't retrieve your appointment details. Please contact us if you have any questions.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
