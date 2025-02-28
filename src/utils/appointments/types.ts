
import { SERVICES } from "@/components/scheduling/AppointmentForm";

export interface AppointmentData {
  date: Date | undefined;
  selectedTime: string | undefined;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface AppointmentNotificationPayload {
  appointment: {
    id: string;
    date: string;
    time: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    service: string;
  }
}

export interface FormattedAppointment {
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  service: string;
  status: string;
}

// Helper function to get a service name from its ID
export const getServiceName = (serviceId: string): string => {
  return SERVICES.find(s => s.id === serviceId)?.name || serviceId;
};
