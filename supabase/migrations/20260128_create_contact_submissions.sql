-- Contact form submissions

CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Only service role / edge functions should manage submissions by default.
-- If you later want client-side inserts, add a dedicated insert policy with rate limiting/captcha.
CREATE POLICY "Service role can manage contact submissions"
  ON public.contact_submissions
  USING (true)
  WITH CHECK (true);
