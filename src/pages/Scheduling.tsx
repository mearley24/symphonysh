import { ArrowLeft } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Header from "../components/Header";
import { format } from "date-fns";
import { supabase } from "../integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AVAILABLE_TIMES = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
];

const SERVICES = [
  { id: "home-integration", name: "Home Automation" },
  { id: "audio-entertainment", name: "Audio & Entertainment" },
  { id: "smart-lighting", name: "Smart Lighting" },
  { id: "shades", name: "Smart Shades" },
  { id: "networking", name: "Networking" },
  { id: "climate-control", name: "Climate Control" },
  { id: "security-systems", name: "Security Systems" },
  { id: "maintenance", name: "Troubleshooting & Maintenance" },
  { id: "matterport-scan", name: "Matterport Scan" },
];

const Scheduling = () => {
  const [searchParams] = useSearchParams();
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [service, setService] = useState<string>("");
  const { toast } = useToast();

  // Set initial service from URL parameter if available
  useEffect(() => {
    const serviceFromUrl = searchParams.get("service");
    if (serviceFromUrl) {
      setService(serviceFromUrl);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !selectedTime || !name || !email || !phone || !service) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([
          {
            date: format(date, 'yyyy-MM-dd'),
            time: selectedTime,
            name,
            email,
            phone,
            message,
            service,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      toast({
        title: "Appointment Scheduled!",
        description: "We'll contact you to confirm your appointment.",
      });

      // Reset form
      setDate(undefined);
      setSelectedTime(undefined);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setService("");
      
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem scheduling your appointment. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link 
              to="/services" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </Link>
            <h1 className="text-4xl font-bold text-white mb-4">Schedule a Consultation</h1>
            <p className="text-lg text-gray-300 mb-8">
              Book a time to discuss your smart home project with our experts.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="bg-transparent text-white"
                    disabled={(date) => {
                      // Disable past dates and weekends
                      const now = new Date();
                      now.setHours(0, 0, 0, 0);
                      return (
                        date < now ||
                        date.getDay() === 0 ||
                        date.getDay() === 6
                      );
                    }}
                  />
                </div>

                {date && (
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-4">Available Times</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {AVAILABLE_TIMES.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`p-2 rounded-md text-sm transition-colors ${
                            selectedTime === time
                              ? "bg-accent text-white"
                              : "bg-white/5 text-gray-300 hover:bg-white/10"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">
                    Service *
                  </label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger className="w-full bg-white/5 border border-white/10 text-white">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICES.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white placeholder-gray-400"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white placeholder-gray-400"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white placeholder-gray-400"
                    placeholder="(123) 456-7890"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white placeholder-gray-400"
                    placeholder="Tell us about your project..."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-md font-medium transition-colors"
                disabled={!date || !selectedTime || !name || !email || !phone || !service}
              >
                Schedule Consultation
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer className="py-12 px-6 text-center text-gray-400 bg-primary">
        <p className="text-sm">
          © 2024 Symphony Smart Homes. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Scheduling;
