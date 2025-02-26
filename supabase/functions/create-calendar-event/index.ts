
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AppointmentData {
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  service: string;
}

// Handle CORS preflight requests
async function handleCors(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
}

async function getAccessToken(supabase: any) {
  const { data: tokens, error } = await supabase
    .from('google_tokens')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) throw error;

  if (new Date(tokens.expiry) <= new Date()) {
    // Refresh the token
    const clientId = Deno.env.get('GOOGLE_OAUTH_CLIENT_ID');
    const clientSecret = Deno.env.get('GOOGLE_OAUTH_CLIENT_SECRET');

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId!,
        client_secret: clientSecret!,
        refresh_token: tokens.refresh_token,
        grant_type: 'refresh_token',
      }),
    });

    const newTokens = await response.json();

    await supabase
      .from('google_tokens')
      .upsert([
        {
          refresh_token: tokens.refresh_token,
          access_token: newTokens.access_token,
          expiry: new Date(Date.now() + newTokens.expires_in * 1000).toISOString(),
        }
      ]);

    return newTokens.access_token;
  }

  return tokens.access_token;
}

Deno.serve(async (req) => {
  // Handle CORS
  const corsResponse = await handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const { appointment } = await req.json() as { appointment: AppointmentData };
    
    const calendarId = Deno.env.get('GOOGLE_CALENDAR_ID');
    if (!calendarId) {
      throw new Error('Missing calendar ID');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const accessToken = await getAccessToken(supabase);

    // Parse appointment date and time
    const [hours, minutes] = appointment.time.split(':');
    const startDate = new Date(appointment.date);
    startDate.setHours(parseInt(hours), parseInt(minutes), 0);
    
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1);

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
          'Authorization': `Bearer ${accessToken}`,
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
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error creating calendar event:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create calendar event' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
