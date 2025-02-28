
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AppointmentFormProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  message: string;
  setMessage: (message: string) => void;
  service: string;
  setService: (service: string) => void;
}

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

export function AppointmentForm({
  name, setName,
  email, setEmail,
  phone, setPhone,
  message, setMessage,
  service, setService
}: AppointmentFormProps) {
  return (
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
  );
}

// Export the SERVICES array for use in other components
export { SERVICES };
