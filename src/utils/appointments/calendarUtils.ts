
import { AppointmentNotificationPayload } from "./types";

interface CalendarEventProps {
  title: string;
  description: string;
  location: string;
  startDate: Date;
  startTime: string;
  durationMinutes: number;
  name: string;
  email: string;
}

// Create calendar event for the appointment
export async function createCalendarEvent(appointment: any, serviceName: string): Promise<any> {
  console.log("Creating calendar event...");
  try {
    // Create a simple calendar event object
    return {
      id: appointment?.id || "appointment-" + Date.now(),
      htmlLink: "#",
      status: "created"
    };
  } catch (calendarInvocationError) {
    console.error("Calendar function invocation error:", calendarInvocationError);
    console.log("Continuing despite calendar function error");
    // Don't throw here to avoid failing the appointment process
  }
  return null;
}

// Generate and download an iCalendar (.ics) file
export function generateICalendarFile(event: CalendarEventProps): void {
  // Parse the start time
  const [hours, minutes] = event.startTime.split(':').map(Number);
  
  // Set the start date/time
  const startDate = new Date(event.startDate);
  startDate.setHours(hours || 0, minutes || 0, 0, 0);
  
  // Calculate end time (start time + duration)
  const endDate = new Date(startDate);
  endDate.setMinutes(endDate.getMinutes() + event.durationMinutes);
  
  // Format dates for iCalendar (YYYYMMDDTHHmmssZ)
  const formatICalDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };
  
  // Generate a unique ID for this event
  const eventId = `appointment-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  
  // Create the iCalendar content
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Symphony Smart Homes//Appointment Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${eventId}@symphonysh.com`,
    `DTSTART:${formatICalDate(startDate)}`,
    `DTEND:${formatICalDate(endDate)}`,
    `DTSTAMP:${formatICalDate(new Date())}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.location}`,
    'STATUS:CONFIRMED',
    `ORGANIZER;CN=Symphony Smart Homes:mailto:info@symphonysh.com`,
    event.email ? `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN=${event.name}:mailto:${event.email}` : '',
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].filter(Boolean).join('\r\n');
  
  // Create a Blob containing the iCalendar data
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  
  // Create a download link and trigger it
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'symphony-appointment.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
