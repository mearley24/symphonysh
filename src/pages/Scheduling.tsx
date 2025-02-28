
import { ArrowLeft } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Header from "../components/Header";
import { format } from "date-fns";
import { supabase } from "../integrations/supabase/client";
import { Button } from "@/components/ui/button";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const serviceFromUrl = searchParams.get("service");
    if (serviceFromUrl) {
      setService(serviceFromUrl);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log("Form Data:", {
      date,
      selectedTime,
      name,
      email,
      phone,
      service,
      message
    });

    // Check each field individually and show specific error messages
    if (!date) {
      toast({
        title: "Missing Date",
        description: "Please select a date for your appointment.",
        variant: "destructive"
      });
      return;
    }

    if (!selectedTime) {
      toast({
        title: "Missing Time",
        description: "Please select a time slot for your appointment.",
        variant: "destructive"
      });
      return;
    }

    if (!name.trim()) {
      toast({
        title: "Missing Name",
        description: "Please enter your name.",
        variant: "destructive"
      });
      return;
    }

    if (!email.trim()) {
      toast({
        title: "Missing Email",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }

    if (!phone.trim()) {
      toast({
        title: "Missing Phone",
        description: "Please enter your phone number.",
        variant: "destructive"
      });
      return;
    }

    if (!service) {
      toast({
        title: "Missing Service",
        description: "Please select a service for your consultation.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Insert appointment into the database
      const formattedDate = format(date, 'yyyy-MM-dd');
      const { data: appointmentData, error } = await supabase
        .from('appointments')
        .insert([{
          date: formattedDate,
          time: selectedTime,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
          service,
          status: 'pending'
        }])
        .select();

      if (error) {
        console.error("Database error:", error);
        throw new Error("Database error: " + error.message);
      }

      console.log("Appointment created:", appointmentData);
      
      // Call the notify-appointment function to send email notification
      try {
        const notifyResponse = await supabase.functions.invoke('notify-appointment', {
          method: 'POST'
        });
        
        if (notifyResponse.error) {
          console.error("Notification error:", notifyResponse.error);
        } else {
          console.log("Notification sent:", notifyResponse.data);
        }
        
        // Try to create calendar event
        const calendarResponse = await supabase.functions.invoke('create-calendar-event', {
          method: 'POST'
        });
        
        if (calendarResponse.error) {
          console.error("Calendar error:", calendarResponse.error);
        } else {
          console.log("Calendar event created:", calendarResponse.data);
        }
      } catch (notifyError) {
        console.error("Failed to send notifications:", notifyError);
        // We don't throw here to avoid failing the whole appointment process
      }

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
      console.error("Scheduling error:", error);
      toast({
        title: "Error",
        description: "There was a problem scheduling your appointment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-white mb-4"
              asChild
            >
              <Link to="/services" className="inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Services
              </Link>
            </Button>
            <h1 className="text-4xl font-bold text-white mb-4">Schedule a Consultation</h1>
            <p className="text-lg text-gray-300 mb-8">
              Book a time to discuss your smart home project with our experts.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8" noValidate>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="bg-transparent text-white"
                    disabled={(date) => {
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
                        <Button
                          key={time}
                          type="button"
                          variant={selectedTime === time ? "default" : "secondary"}
                          onClick={() => setSelectedTime(time)}
                          className="w-full"
                        >
                          {time}
                        </Button>
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
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                className="w-fit px-8 bg-white hover:bg-white/90 text-primary"
              >
                {isSubmitting ? "Scheduling..." : "Schedule Consultation"}
              </Button>
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
