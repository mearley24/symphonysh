
/**
 * Generate an iCalendar format string for the appointment
 */
export function generateICalEvent(appointment: any) {
  // Parse the date and time to create start and end times
  const startDate = new Date(appointment.date);
  const [hours, minutes] = appointment.time.split(':').map(Number);
  startDate.setHours(hours, minutes, 0, 0);
  
  // End time is 1 hour after start time
  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + 1);
  
  // Format dates for iCalendar
  const formatICalDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };
  
  const now = new Date();
  
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Symphony Smart Homes//Appointment//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
DTSTART:${formatICalDate(startDate)}
DTEND:${formatICalDate(endDate)}
DTSTAMP:${formatICalDate(now)}
ORGANIZER;CN=Symphony Smart Homes:mailto:notifications@symphonysh.com
UID:${appointment.id || Math.random().toString(36).substring(2, 15)}@symphonysh.com
ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE;CN=${appointment.name}:mailto:${appointment.email}
SUMMARY:Symphony Smart Homes: ${appointment.service} Consultation
DESCRIPTION:Consultation for ${appointment.service}.\\n\\nClient: ${appointment.name}\\nPhone: ${appointment.phone}\\nEmail: ${appointment.email}\\nAddress: ${appointment.address || 'Not provided'}\\n\\nMessage: ${appointment.message || 'No message provided'}
LOCATION:${appointment.address || 'Symphony Smart Homes'}
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT1H
ACTION:DISPLAY
DESCRIPTION:Reminder
END:VALARM
END:VEVENT
END:VCALENDAR`;
}
