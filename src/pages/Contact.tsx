import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { 
  Mail, Phone, MapPin, Home, Grid3X3, Heart, Star, Settings,
  Send, Calendar, Clock
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import SEO from "../components/SEO";

const Contact = () => {
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const bottomNav = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Grid3X3, label: "Services", path: "/services" },
    { icon: Heart, label: "Projects", path: "/projects" },
    { icon: Star, label: "About", path: "/about" },
    { icon: Settings, label: "Contact", path: "/contact" },
  ];

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
      
      if (!response.ok) {
        throw new Error(`Failed to send message`);
      }

      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white overflow-hidden">
      <SEO 
        title="Contact Us - Symphony Smart Homes" 
        description="Get in touch with our team of home automation experts at Symphony Smart Homes in Vail Valley."
        keywords="contact, smart home, automation, symphony smart homes, Vail Valley"
      />
      
      {/* Status Bar */}
      <div className="h-6 bg-black/30 flex items-center justify-between px-6 text-xs text-white/60">
        <span>Symphony</span>
        <span>●●●●● LTE</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-teal-600">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">Contact Us</h1>
            <p className="text-xs text-white/60">Get in touch</p>
          </div>
        </div>
        <Link 
          to="/scheduling" 
          className="px-4 py-2 bg-accent hover:bg-accent/90 rounded-xl text-sm font-medium transition-colors"
        >
          Schedule
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-24 px-4 py-4" style={{ maxHeight: 'calc(100vh - 140px)' }}>
        <div className="space-y-4">
          {/* Quick Contact Cards */}
          <div className="grid grid-cols-2 gap-3">
            <a href="tel:+19705193013" className="block">
              <div className="bg-gradient-to-br from-green-500/30 to-teal-600/30 backdrop-blur-md rounded-2xl border border-white/20 p-4 text-center hover:bg-white/15 transition-colors">
                <Phone className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <span className="text-white font-semibold text-sm block">Call Us</span>
                <span className="text-white/60 text-xs">(970) 519-3013</span>
              </div>
            </a>
            <a href="mailto:info@symphonysh.com" className="block">
              <div className="bg-gradient-to-br from-blue-500/30 to-purple-600/30 backdrop-blur-md rounded-2xl border border-white/20 p-4 text-center hover:bg-white/15 transition-colors">
                <Mail className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <span className="text-white font-semibold text-sm block">Email</span>
                <span className="text-white/60 text-xs">info@symphonysh.com</span>
              </div>
            </a>
          </div>

          {/* Location */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div>
                <span className="text-white font-semibold text-sm block">Our Location</span>
                <span className="text-white/60 text-xs">45 Aspen Glen Ct, Edwards, CO 81632</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-5 h-5 text-accent" />
              <span className="text-white font-semibold text-sm">Business Hours</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-white/60">Mon - Fri</span>
                <span className="text-white">8am - 6pm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Saturday</span>
                <span className="text-white">9am - 4pm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Sunday</span>
                <span className="text-white/50">Closed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Emergency</span>
                <span className="text-green-400">24/7</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-5">
            <h3 className="text-white font-semibold mb-4">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-accent text-sm"
                />
              </div>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-accent text-sm"
                />
              </div>
              <div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="Your Message"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-accent text-sm resize-none"
                />
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-accent hover:bg-accent/90 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Schedule CTA */}
          <Link to="/scheduling">
            <div className="bg-accent/20 backdrop-blur-md rounded-2xl border border-accent/30 p-5 text-center hover:bg-accent/30 transition-colors">
              <Calendar className="w-8 h-8 text-accent mx-auto mb-2" />
              <h3 className="text-white font-semibold mb-1">Schedule a Consultation</h3>
              <p className="text-white/60 text-xs">Book a free in-home assessment</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Bottom Navigation Dock */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-xl border-t border-white/10">
        <div className="flex justify-around items-center py-3 px-4">
          {bottomNav.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-all ${
                  isActive 
                    ? "text-white bg-white/10" 
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px]">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Contact;
