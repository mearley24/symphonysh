import { useEffect, useState } from "react";
import { format } from "date-fns";
import { getServiceName } from "@/utils/appointments/types";
import { ZAPIER_WEBHOOK_URL } from "@/constants/zapier";

interface ZapierNotifierProps {
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

export function ZapierNotifier({ appointmentDetails }: ZapierNotifierProps) {
  const [notificationSent, setNotificationSent] = useState(false);

  // Helper function to format date for display
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
      
      console.log("Prepared Zapier webhook payload:", JSON.stringify(payload, null, 2));
      
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

  return null; // This is a non-visual component
}
