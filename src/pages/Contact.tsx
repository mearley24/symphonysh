import { Link } from "react-router-dom";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import PageBackground from "../components/PageBackground";
import bgContact from "../assets/bg-contact.jpg";

const Contact = () => {
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
        body: JSON.stringify({ name, email, message })
      });

      if (!response.ok) throw new Error("Failed to send message");

      toast({ title: "Message Sent!", description: "We'll get back to you as soon as possible." });
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
      toast({ title: "Error", description: "There was a problem sending your message. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary text-primary-foreground">
      <SEO
        title="Contact Us | Symphony Smart Homes"
        description="Get in touch with Symphony Smart Homes. Call, email, or send us a message. Serving Vail Valley and Eagle County, Colorado."
        keywords="contact, smart home, Vail Valley, Eagle County, phone, email"
      />
      <Header />

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>

          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-3">Contact</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white">
            Let's talk about your project.
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl">
            Give us a call, send a message, or schedule a walkthrough. No pressure — we're happy to answer questions and help you figure out what makes sense.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-secondary/30 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-5 gap-10">
            {/* Info Column */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-white font-semibold mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <a href="tel:+19705193013" className="flex items-start gap-3 text-white/60 hover:text-white transition-colors">
                    <Phone className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-medium">(970) 519-3013</p>
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
                  <div className="flex justify-between text-white/60"><span>Sunday</span><span>Closed</span></div>
                  <div className="flex justify-between text-white/60"><span>Emergency</span><span className="text-accent">24/7</span></div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="md:col-span-3">
              <div className="bg-secondary/80 border border-white/8 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-5">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-white/60 text-sm mb-1.5 block">Name</label>
                    <input
                      type="text" value={name} onChange={(e) => setName(e.target.value)} required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-accent/50 text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-1.5 block">Email</label>
                    <input
                      type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-accent/50 text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-1.5 block">Message</label>
                    <textarea
                      value={message} onChange={(e) => setMessage(e.target.value)} required rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-accent/50 text-sm resize-none"
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Prefer to schedule a time?</h2>
          <p className="text-white/50 text-base mb-8">Book a walkthrough or phone consultation at a time that works for you.</p>
          <Link to="/scheduling" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base">
            Schedule a Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
