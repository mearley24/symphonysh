
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const GoogleAuth = () => {
  const { toast } = useToast();

  const handleAuth = async () => {
    const clientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;
    if (!clientId) {
      toast({
        title: "Configuration Error",
        description: "Google OAuth client ID is not configured.",
        variant: "destructive"
      });
      return;
    }

    // Generate a random state value
    const state = Math.random().toString(36).substring(7);
    sessionStorage.setItem('oauth_state', state);

    // Construct the OAuth URL
    const redirectUri = `${window.location.origin}/admin/oauth-callback`;
    const scope = encodeURIComponent('https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events');
    
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=code` +
      `&scope=${scope}` +
      `&access_type=offline` +
      `&prompt=consent` +
      `&state=${state}`;

    // Redirect to Google's OAuth page
    window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen bg-primary">
      <div className="max-w-2xl mx-auto pt-32 px-6">
        <h1 className="text-4xl font-bold text-white mb-8">Google Calendar Setup</h1>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Connect Google Calendar</h2>
            <p className="text-gray-300">
              Click the button below to connect your Google Calendar account. This will allow Symphony Smart Homes to automatically create calendar events for appointments.
            </p>
          </div>
          <Button
            onClick={handleAuth}
            size="lg"
            className="w-full bg-white hover:bg-white/90 text-primary"
          >
            Connect Google Calendar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GoogleAuth;
