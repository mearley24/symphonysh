import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import SEO from "@/components/SEO";

type Lead = {
  id: string;
  created_at: string | null;
  name: string;
  email: string;
  message: string;
  email_sent: boolean | null;
};

export default function AdminLeads() {
  const { toast } = useToast();
  const [email, setEmail] = useState("earleystream@gmail.com");
  const [isSendingLink, setIsSendingLink] = useState(false);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  const isAuthed = !!sessionEmail;

  const allowed = useMemo(() => {
    // keep this tight; RLS is the real protection
    return sessionEmail === "earleystream@gmail.com";
  }, [sessionEmail]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSessionEmail(data.session?.user?.email ?? null);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSessionEmail(newSession?.user?.email ?? null);
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  const sendMagicLink = async () => {
    setIsSendingLink(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/admin/leads`,
        },
      });

      if (error) throw error;

      toast({
        title: "Check your email",
        description: "Magic link sent. Open it to access leads.",
      });
    } catch (e: any) {
      toast({
        title: "Login error",
        description: e?.message ?? "Unable to send magic link",
        variant: "destructive",
      });
    } finally {
      setIsSendingLink(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setLeads([]);
  };

  const loadLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("id, created_at, name, email, message, email_sent")
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) throw error;

      setLeads((data ?? []) as Lead[]);
    } catch (e: any) {
      toast({
        title: "Unable to load leads",
        description: e?.message ?? "Check RLS/policies for contact_submissions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthed && allowed) {
      void loadLeads();
    }
  }, [isAuthed, allowed]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SEO title="Admin Leads - Symphony Smart Homes" description="Admin: contact form submissions." />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Admin: Leads</h1>
            <p className="text-white/60 text-sm">Recent contact form submissions</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-white/70 hover:text-white">Home</Link>
            {isAuthed ? (
              <button
                onClick={signOut}
                className="text-sm px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15"
              >
                Sign out
              </button>
            ) : null}
          </div>
        </div>

        {!isAuthed ? (
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <h2 className="font-medium mb-2">Sign in</h2>
            <p className="text-white/60 text-sm mb-4">We’ll email you a magic link.</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/10 focus:outline-none"
                placeholder="you@example.com"
              />
              <button
                onClick={sendMagicLink}
                disabled={isSendingLink}
                className="px-4 py-2 rounded-lg bg-accent hover:bg-accent/90 disabled:opacity-50"
              >
                {isSendingLink ? "Sending…" : "Send magic link"}
              </button>
            </div>
          </div>
        ) : !allowed ? (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
            <h2 className="font-medium mb-1">Access denied</h2>
            <p className="text-white/70 text-sm">This account isn’t allowed to view leads.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm text-white/60">Signed in as: {sessionEmail}</div>
              <button
                onClick={loadLeads}
                disabled={loading}
                className="text-sm px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 disabled:opacity-50"
              >
                {loading ? "Refreshing…" : "Refresh"}
              </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="text-left px-3 py-2">Date</th>
                      <th className="text-left px-3 py-2">Name</th>
                      <th className="text-left px-3 py-2">Email</th>
                      <th className="text-left px-3 py-2">Message</th>
                      <th className="text-left px-3 py-2">Email Sent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {leads.map((l) => (
                      <tr key={l.id} className="align-top">
                        <td className="px-3 py-2 whitespace-nowrap text-white/70">
                          {l.created_at ? new Date(l.created_at).toLocaleString() : "—"}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">{l.name}</td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <a className="text-accent hover:underline" href={`mailto:${l.email}`}>{l.email}</a>
                        </td>
                        <td className="px-3 py-2 max-w-[520px]">
                          <div className="text-white/80 whitespace-pre-wrap break-words">{l.message}</div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {l.email_sent ? "Yes" : "No"}
                        </td>
                      </tr>
                    ))}
                    {leads.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-3 py-6 text-center text-white/60">
                          No submissions found.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
