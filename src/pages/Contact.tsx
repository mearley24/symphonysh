import { Link } from "react-router-dom";
import {
  BUSINESS_NAME, BUSINESS_URL, BUSINESS_EMAIL, BUSINESS_PHONE_E164,
  BUSINESS_ADDRESS, BUSINESS_GEO, BUSINESS_OPENING_HOURS,
  BUSINESS_AREA_SERVED_PLACES, BUSINESS_HAS_MAP_URL, BUSINESS_SAME_AS,
} from "../constants/businessSchema";
import { useState } from "react";
import { trackPhoneClick } from "../utils/tracking";
import {
  Phone, Mail, MapPin, Clock, Send, ArrowLeft, ArrowRight,
  MessageSquare, Calendar, ShieldCheck,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import PageBackground from "../components/PageBackground";
import bgContact from "../assets/bg-contact.jpg";
import { useScrollReveal } from "../hooks/useScrollReveal";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const revealRef = useScrollReveal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const functionUrl = `${import.meta.env.VITE_SUPABASE_URL || "https://symphonysh.supabase.co"}/functions/v1/send-contact-email`;
      const response = await fetch(functionUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });

      if (!response.ok) throw new Error("Failed to send message");

      toast({
        title: "Message sent",
        description: "We'll get back to you shortly. For anything urgent, call (970) 519-3013.",
      });
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      toast({
        title: "We couldn't send your message",
        description:
          "Please try again, or reach us directly at info@symphonysh.com or (970) 519-3013.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageBackground image={bgContact}>
      <div ref={revealRef}>
      <SEO
        title="Contact Us | Symphony Smart Homes"
        description="Get in touch with Symphony Smart Homes. Call, email, or send us a message. Serving Vail Valley and Eagle County, Colorado."
        keywords="contact, smart home, Vail Valley, Eagle County, phone, email"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Contact", url: "/contact" }]}
        schema={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: BUSINESS_NAME,
          description: "Contact Symphony Smart Homes for smart home installation, maintenance, and consultation in Vail Valley and Eagle County, Colorado.",
          url: BUSINESS_URL,
          telephone: BUSINESS_PHONE_E164,
          email: BUSINESS_EMAIL,
          address: BUSINESS_ADDRESS,
          geo: BUSINESS_GEO,
          openingHoursSpecification: BUSINESS_OPENING_HOURS,
          areaServed: BUSINESS_AREA_SERVED_PLACES,
          hasMap: BUSINESS_HAS_MAP_URL,
          ...(BUSINESS_SAME_AS.length > 0 ? { sameAs: BUSINESS_SAME_AS } : {}),
        }}
      />
      <Header />

      {/* Hero — no reveal */}
      <section className="pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-3">Contact</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white hero-text-shadow">
            Let's talk about your project.
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl hero-subtext-shadow">
            Give us a call, send a message, or schedule a walkthrough. No pressure — we're happy to answer questions and help you figure out what makes sense.
          </p>
        </div>
      </section>

      <div className="hero-divider w-full" />

      {/* Contact Info + Form */}
      <section data-reveal className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-5 gap-10">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-white font-semibold mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <a href="tel:+19705193013" onClick={trackPhoneClick} className="flex items-start gap-3 text-white/60 hover:text-white transition-colors cursor-pointer">
                    <Phone className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium group-hover:text-white">(970) 519-3013</p>
                      <p className="text-sm">Call or text</p>
                    </div>
                  </a>
                  <a href="mailto:info@symphonysh.com" className="flex items-start gap-3 text-white/60 hover:text-white transition-colors">
                    <Mail className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">info@symphonysh.com</p>
                      <p className="text-sm">Email us anytime</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-3 text-white/60">
                    <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">Eagle County, Colorado</p>
                      <p className="text-sm">Serving the Vail Valley</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" /> Business Hours
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white/60"><span>Mon – Fri</span><span className="text-white">8am – 6pm</span></div>
                  <div className="flex justify-between text-white/60"><span>Saturday</span><span className="text-white">9am – 4pm</span></div>
                  <div className="flex justify-between text-white/60"><span>Sunday</span><span className="text-white/40">Emergency calls only</span></div>
                </div>
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-5">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-white/60 text-sm mb-1.5 block">Name</label>
                    <input
                      type="text" value={name} onChange={(e) => setName(e.target.value)} required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 text-sm transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-1.5 block">Email</label>
                    <input
                      type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 text-sm transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-1.5 block">Message</label>
                    <textarea
                      value={message} onChange={(e) => setMessage(e.target.value)} required rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 text-sm resize-none transition-all"
                      placeholder="Tell us about your project or question"
                    />
                  </div>
                  <button
                    type="submit" disabled={isSubmitting}
                    className="w-full py-3 bg-accent hover:bg-accent/90 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                  <p className="text-white/30 text-xs text-center mt-3">We typically respond within a few hours during business hours.</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What happens next — reduces hesitation before reaching out */}
      <section data-reveal className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
              What Happens Next
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              No sales pitch — just a real conversation.
            </h2>
            <p className="text-white/50 text-sm sm:text-base max-w-2xl mx-auto">
              You reach a real person, not a call center. Here's what the first few days usually
              look like.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                icon: MessageSquare,
                title: "1. A quick reply",
                description:
                  "Matt reads every message. During business hours you'll usually hear back within a few hours.",
              },
              {
                icon: Calendar,
                title: "2. A walkthrough",
                description:
                  "Short phone call first, then a walkthrough of the property if it makes sense for your project.",
              },
              {
                icon: ShieldCheck,
                title: "3. A clear proposal",
                description:
                  "Itemized scope and pricing — nothing hidden, no pressure to decide on the spot.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/8 bg-black/40 backdrop-blur-sm p-5"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <step.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-white font-semibold mb-1">{step.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-white/40 text-sm mb-4">
              Prefer to lock in a time right now?
            </p>
            <Link
              to="/scheduling"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"
            >
              Schedule a Walkthrough <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </PageBackground>
  );
};

export default Contact;
