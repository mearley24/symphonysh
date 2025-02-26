
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0';
import { format } from 'https://esm.sh/date-fns@2.30.0';

const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];

interface AppointmentData {
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  service: string;
}

Deno.serve(async (req) => {
  try {
    const { appointment } = await req.json() as { appointment: AppointmentData };
    
    // Get environment variables
    const clientEmail = Deno.env.get('GOOGLE_CLIENT_EMAIL');
    const privateKey = Deno.env.get('GOOGLE_PRIVATE_KEY')?.replace(/\\n/g, '\n');
    const calendarId = Deno.env.get('GOOGLE_CALENDAR_ID');
    
    if (!clientEmail || !privateKey || !calendarId) {
      throw new Error('Missing required Google Calendar credentials');
    }

    // Create JWT for Google Calendar API
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 3600; // 1 hour expiration

    const jwt = await new jose.SignJWT({
      scope: SCOPES.join(' ')
    })
      .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
      .setIssuer(clientEmail)
      .setAudience('https://oauth2.googleapis.com/token')
      .setExpirationTime(exp)
      .setIssuedAt(iat)
      .sign(await jose.importPKCS8(privateKey, 'RS256'));

    // Get access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }),
    });

    const { access_token } = await tokenResponse.json();

    // Parse appointment date and time
    const [hours, minutes] = appointment.time.split(':');
    const startDate = new Date(appointment.date);
    startDate.setHours(parseInt(hours), parseInt(minutes), 0);
    
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1); // 1 hour appointments

    // Create calendar event
    const event = {
      summary: `Symphony Smart Homes - ${appointment.service}`,
      description: `Consultation with ${appointment.name}\nPhone: ${appointment.phone}\nEmail: ${appointment.email}\n\nNotes: ${appointment.message || 'No additional notes'}`,
      start: {
        dateTime: startDate.toISOString(),
        timeZone: 'America/Los_Angeles',
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: 'America/Los_Angeles',
      },
      attendees: [
        { email: appointment.email },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
    };

    const calendarResponse = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      }
    );

    if (!calendarResponse.ok) {
      throw new Error('Failed to create calendar event');
    }

    return new Response(
      JSON.stringify({ message: 'Calendar event created successfully' }),
      { headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error creating calendar event:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create calendar event' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
