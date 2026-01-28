import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Mail, MapPin, Phone, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import SEO from "../components/SEO";
import Header from "@/components/Header";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const functionUrl = `${import.meta.env.VITE_SUPABASE_URL || "https://symphonysh.supabase.co"}/functions/v1/send-contact-email`;

      const response = await fetch(functionUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      toast({
        title: "Message Sent!",
        description: "We’ll get back to you as soon as possible.",
      });

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen c4-gradient text-white">
      <SEO
        title="Contact - Symphony Smart Homes"
        description="Contact Symphony Smart Homes in Vail Valley. Call, email, or send a message for Control4 smart home installation and support."
        keywords="contact, smart home, Control4, automation, symphony smart homes, Vail Valley"
      />

      <Header />

      <main className="pt-24 sm:pt-28">
        {/* HERO */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="c4-surface rounded-3xl p-6 sm:p-10">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Contact</h1>
            <p className="text-white/70 mt-3 max-w-2xl">
              Tell us what you’re building (or what’s not working). We’ll respond quickly.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to="/scheduling"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-5 py-3 rounded-xl font-medium transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Schedule a consultation
              </Link>
              <a
                href="tel:+19705193013"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 px-5 py-3 rounded-xl font-medium transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call (970) 519-3013
              </a>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 pb-16">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* LEFT */}
            <div className="space-y-3">
              <div className="c4-tile rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white/80" />
                  </div>
                  <div>
                    <div className="font-medium">Phone</div>
                    <a href="tel:+19705193013" className="text-white/70 hover:text-white">
                      (970) 519-3013
                    </a>
                  </div>
                </div>
              </div>

              <div className="c4-tile rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white/80" />
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <a href="mailto:info@symphonysh.com" className="text-white/70 hover:text-white">
                      info@symphonysh.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="c4-tile rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white/80" />
                  </div>
                  <div>
                    <div className="font-medium">Service Area</div>
                    <div className="text-white/70">Vail Valley, Colorado</div>
                    <div className="text-white/50 text-sm mt-1">Edwards • Vail • Beaver Creek • Avon</div>
                  </div>
                </div>
              </div>

              <div className="c4-surface rounded-3xl p-6">
                <h3 className="text-xl font-semibold">Prefer to book time?</h3>
                <p className="text-white/70 mt-2">Pick a time that works and we’ll come prepared.</p>
                <Link
                  to="/scheduling"
                  className="mt-4 inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-5 py-3 rounded-xl font-medium transition-colors"
                >
                  Schedule now <Calendar className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* RIGHT: FORM */}
            <div className="c4-surface rounded-3xl p-6 sm:p-8">
              <h2 className="text-2xl font-semibold">Send a message</h2>
              <p className="text-white/70 mt-2">We usually respond same day during business hours.</p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-accent"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-accent"
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="Tell us what you want to build (or what’s not working)"
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-accent resize-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 bg-accent hover:bg-accent/90 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Sending..." : "Send message"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
