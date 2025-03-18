
-- Create a table to store Google Calendar tokens
CREATE TABLE IF NOT EXISTS public.google_calendar_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL UNIQUE,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  expiry_date BIGINT,
  token_type TEXT,
  scope TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add RLS policies
ALTER TABLE public.google_calendar_tokens ENABLE ROW LEVEL SECURITY;

-- Only allow authenticated users to read their own tokens
CREATE POLICY "Users can read their own tokens"
  ON public.google_calendar_tokens
  FOR SELECT
  USING (auth.uid()::text = user_id);

-- Let the service role manage all tokens (for edge functions)
CREATE POLICY "Service role can manage all tokens"
  ON public.google_calendar_tokens
  USING (true)
  WITH CHECK (true);
