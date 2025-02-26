
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [status, setStatus] = useState("Processing authentication...");

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        const storedState = sessionStorage.getItem("oauth_state");
        sessionStorage.removeItem("oauth_state"); // Clean up

        if (!code) {
          throw new Error("No authorization code received");
        }

        if (state !== storedState) {
          throw new Error("Invalid state parameter");
        }

        // Exchange the authorization code for tokens
        const redirectUri = `${window.location.origin}/admin/oauth-callback`;
        const { error } = await supabase.functions.invoke("google-auth", {
          body: { code, redirectUri }
        });

        if (error) throw error;

        setStatus("Successfully authenticated!");
        toast({
          title: "Success",
          description: "Google Calendar has been successfully connected.",
        });

        // Redirect back to the scheduling page after a short delay
        setTimeout(() => navigate("/scheduling"), 2000);

      } catch (error) {
        console.error("OAuth callback error:", error);
        setStatus("Authentication failed. Please try again.");
        toast({
          title: "Error",
          description: "Failed to complete Google Calendar authentication.",
          variant: "destructive"
        });
      }
    };

    handleCallback();
  }, [searchParams, navigate, toast]);

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 max-w-md w-full mx-4">
        <h1 className="text-2xl font-semibold text-white mb-4">Google Calendar Authentication</h1>
        <p className="text-gray-300">{status}</p>
      </div>
    </div>
  );
};

export default OAuthCallback;
