
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
  address: string;
  setAddress: (address: string) => void;
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
  { id: "ava", name: "AVA Smart Remote" },
];

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 text-sm transition-all";

const labelClass = "block text-sm font-medium text-white/60 mb-1.5";

export function AppointmentForm({
  name, setName,
  email, setEmail,
  phone, setPhone,
  address, setAddress,
  message, setMessage,
  service, setService
}: AppointmentFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="service" className={labelClass}>
          Service *
        </label>
        <Select value={service} onValueChange={setService}>
          <SelectTrigger className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 h-auto text-sm focus:ring-1 focus:ring-accent/20 focus:border-accent/50 transition-all">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent className="bg-[rgb(0,9,24)] border-white/10">
            {SERVICES.map((svc) => (
              <SelectItem
                key={svc.id}
                value={svc.id}
                className="text-white hover:bg-accent/20 focus:bg-accent/20"
              >
                {svc.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="name" className={labelClass}>
          Name *
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder="Your full name"
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email *
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone *
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
          placeholder="(970) 555-1234"
        />
      </div>

      <div>
        <label htmlFor="address" className={labelClass}>
          Property Address *
        </label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={inputClass}
          placeholder="Street address or general area"
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Tell us about your project <span className="text-white/30">(optional)</span>
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="What are you looking to do? New build, retrofit, specific room…"
        />
      </div>
    </div>
  );
}

// Export the SERVICES array for use in other components
export { SERVICES };
