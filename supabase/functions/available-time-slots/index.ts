
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import { parseISO, addHours } from 'https://esm.sh/date-fns@2.30.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Default time slots (9 AM to 5 PM, with a lunch break from 12-1)
const DEFAULT_TIME_SLOTS = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
];

// Duration of each appointment in hours
const APPOINTMENT_DURATION = 1;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { date } = await req.json();
    console.log(`Checking availability for date: ${date}`);

    if (!date) {
      throw new Error('Date is required');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the latest Google token
    const { data: tokenData, error: tokenError } = await supabase
      .from('google_tokens')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);

    if (tokenError || !tokenData || tokenData.length === 0) {
      console.error('Error fetching Google token:', tokenError);
      return new Response(
        JSON.stringify({ 
          availableSlots: DEFAULT_TIME_SLOTS,
          error: 'Unable to fetch Google token'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { access_token, refresh_token, expiry } = tokenData[0];
    
    // Check if token is expired and refresh if needed
    let validToken = access_token;
    const now = new Date();
    const tokenExpiry = new Date(expiry);
    
    if (now > tokenExpiry) {
      console.log('Token expired, refreshing...');
      
      // Refresh the token (implementation depends on your OAuth flow)
      const refreshedToken = await refreshGoogleToken(refresh_token);
      validToken = refreshedToken || access_token;
    }

    // Query Google Calendar API for events on the requested date
    const startDateTime = `${date}T00:00:00Z`;
    const endDateTime = `${date}T23:59:59Z`;
    
    const calendarResponse = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(startDateTime)}&timeMax=${encodeURIComponent(endDateTime)}&singleEvents=true`,
      {
        headers: {
          'Authorization': `Bearer ${validToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!calendarResponse.ok) {
      console.error('Error fetching calendar events:', await calendarResponse.text());
      return new Response(
        JSON.stringify({ 
          availableSlots: DEFAULT_TIME_SLOTS,
          error: 'Failed to fetch calendar data'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const calendarData = await calendarResponse.json();
    const events = calendarData.items || [];
    
    // Process events to find busy time slots
    const busySlots = new Set();
    
    events.forEach((event: any) => {
      if (event.start && event.end) {
        const startTime = parseISO(event.start.dateTime || `${date}T${event.start.date}T00:00:00`);
        const endTime = parseISO(event.end.dateTime || `${date}T${event.end.date}T23:59:59`);
        
        // Add each hour that is occupied by this event
        let currentHour = new Date(startTime);
        while (currentHour < endTime) {
          busySlots.add(currentHour.toISOString().substring(11, 16));
          currentHour = addHours(currentHour, 1);
        }
      }
    });

    // Filter out busy slots from default slots
    const availableSlots = DEFAULT_TIME_SLOTS.filter(timeSlot => !busySlots.has(timeSlot));
    
    console.log('Available slots:', availableSlots);
    
    // Also get already booked appointments from the database
    const { data: appointments, error: appointmentsError } = await supabase
      .from('appointments')
      .select('date, time')
      .eq('date', date);
    
    if (appointmentsError) {
      console.error('Error fetching appointments:', appointmentsError);
    } else if (appointments && appointments.length > 0) {
      // Remove time slots that already have appointments
      const bookedTimes = new Set(appointments.map(apt => apt.time));
      const finalAvailableSlots = availableSlots.filter(slot => !bookedTimes.has(slot));
      
      console.log('Final available slots after removing booked appointments:', finalAvailableSlots);
      
      return new Response(
        JSON.stringify({ availableSlots: finalAvailableSlots }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ availableSlots }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(
      JSON.stringify({ 
        availableSlots: DEFAULT_TIME_SLOTS,
        error: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

async function refreshGoogleToken(refreshToken: string): Promise<string | null> {
  try {
    const clientId = Deno.env.get('GOOGLE_OAUTH_CLIENT_ID');
    const clientSecret = Deno.env.get('GOOGLE_OAUTH_CLIENT_SECRET');
    
    if (!clientId || !clientSecret) {
      console.error('Missing Google OAuth credentials');
      return null;
    }
    
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    });
    
    if (!tokenResponse.ok) {
      console.error('Failed to refresh token:', await tokenResponse.text());
      return null;
    }
    
    const tokenData = await tokenResponse.json();
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Calculate new expiry (tokens typically last 1 hour)
    const expiryDate = new Date();
    expiryDate.setSeconds(expiryDate.getSeconds() + tokenData.expires_in);
    
    // Update the token in the database
    const { error } = await supabase
      .from('google_tokens')
      .update({
        access_token: tokenData.access_token,
        expiry: expiryDate.toISOString(),
      })
      .eq('refresh_token', refreshToken);
    
    if (error) {
      console.error('Error updating token in database:', error);
    }
    
    return tokenData.access_token;
  } catch (error) {
    console.error('Error refreshing Google token:', error);
    return null;
  }
}
