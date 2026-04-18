import { useEffect, useState } from "react";
import { format } from "date-fns";
import { getServiceName } from "@/utils/appointments/types";
import { ZAPIER_WEBHOOK_URL } from "@/constants/zapier";
import { trackScheduleSubmit } from "@/utils/tracking";

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

/**
 * Fire-and-forget Zapier webhook for new consultation requests.
 *
 * Deliberately no user-facing output. Silent failure is acceptable here —
 * the SchedulingForm already persists to sessionStorage as a backup and the
 * primary submission path writes to Supabase.
 */
export function ZapierNotifier({ appointmentDetails }: ZapierNotifierProps) {
  const [notificationSent, setNotificationSent] = useState(false);

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "Date not available";
    try {
      const dateObj = typeof date === "string" ? new Date(date) : date;
      return format(dateObj, "EEEE, MMMM d, yyyy");
    } catch {
      return "Invalid date";
    }
  };

  useEffect(() => {
    if (!appointmentDetails || notificationSent) return;

    const formattedDate = formatDate(appointmentDetails.date);
    const serviceName = appointmentDetails.service
      ? getServiceName(appointmentDetails.service)
      : "Service not specified";

    const payload = {
      appointment: {
        id: `new-${Date.now()}`,
        name: appointmentDetails.name || "Unknown",
        email: appointmentDetails.email || "No email provided",
        phone: appointmentDetails.phone || "No phone provided",
        address: appointmentDetails.address || "No address provided",
        message: appointmentDetails.message || "No message",
        service: serviceName,
        date: formattedDate,
        time: appointmentDetails.selectedTime || "Time not specified",
      },
    };

    fetch(ZAPIER_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "no-cors",
      body: JSON.stringify(payload),
    })
      .then(() => {
        setNotificationSent(true);
        trackScheduleSubmit();
      })
      .catch(() => {
        // Silent — Supabase submission is the primary path.
        setNotificationSent(true);
      });
  }, [appointmentDetails, notificationSent]);

  return null;
}
