import { Shield, Camera, Lock, Eye, AlertTriangle, Smartphone } from "lucide-react";
import { useState } from "react";
import Control4ServiceLayout, { GlassCard, StatsCard, FeatureCard, PricingItem, CTACard } from "../../components/Layout/Control4ServiceLayout";

// Camera feed images
import cameraFrontDoor from "@/assets/camera-front-door.jpg";
import cameraGarage from "@/assets/camera-garage.jpg";
import cameraBackyard from "@/assets/camera-backyard.jpg";
import cameraSideYard from "@/assets/camera-side-yard.jpg";

const SecuritySystems = () => {
  const [securityMode, setSecurityMode] = useState<"stay" | "away" | "night" | "disarmed">("stay");

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Security Systems Installation",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Symphony Smart Homes"
    },
    "description": "Advanced smart security systems integrated with home automation.",
    "areaServed": "Vail Valley, Colorado"
  };

  const cameras = [
    { name: "Front Door", location: "Exterior", image: cameraFrontDoor },
    { name: "Garage", location: "Exterior", image: cameraGarage },
    { name: "Backyard", location: "Exterior", image: cameraBackyard },
    { name: "Side Yard", location: "Exterior", image: cameraSideYard },
  ];

  const CameraTile = ({ name, location, image }: { name: string; location: string; image: string }) => (
    <GlassCard className="aspect-video relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
        <p className="text-white text-sm font-medium">{name}</p>
        <p className="text-white/60 text-xs">{location}</p>
      </div>
      <div className="absolute top-2 left-2 flex items-center gap-1">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-white/80 text-xs">Live</span>
      </div>
    </GlassCard>
  );

  return (
    <Control4ServiceLayout
      title="Security Systems"
      description="Advanced security solutions seamlessly integrated with your smart home for complete peace of mind."
      keywords="smart security, home security cameras, access control, smart locks, Vail Valley"
      serviceSchema={serviceSchema}
      icon={Shield}
      iconGradient="from-red-500 to-pink-500"
      subtitle="Protect what matters most"
    >
      <div className="space-y-4">
        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-3">
          <StatsCard value="4K" label="Resolution" />
          <StatsCard value="24/7" label="Monitoring" />
          <StatsCard value="AI" label="Detection" />
          <StatsCard value="∞" label="Storage" />
        </div>

        {/* Camera Grid */}
        <div className="grid grid-cols-2 gap-3">
          {cameras.map((camera) => (
            <CameraTile key={camera.name} {...camera} />
          ))}
        </div>

        {/* Security Status */}
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Security Status</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-green-400 text-sm capitalize">{securityMode}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setSecurityMode("stay")}
              className={`rounded-xl p-3 text-sm font-medium transition-colors ${securityMode === "stay" ? "bg-green-500/20 border border-green-500/30 text-green-400" : "bg-white/10 text-white hover:bg-white/20"}`}
            >
              Stay
            </button>
            <button 
              onClick={() => setSecurityMode("away")}
              className={`rounded-xl p-3 text-sm font-medium transition-colors ${securityMode === "away" ? "bg-blue-500/20 border border-blue-500/30 text-blue-400" : "bg-white/10 text-white hover:bg-white/20"}`}
            >
              Away
            </button>
            <button 
              onClick={() => setSecurityMode("night")}
              className={`rounded-xl p-3 text-sm font-medium transition-colors ${securityMode === "night" ? "bg-purple-500/20 border border-purple-500/30 text-purple-400" : "bg-white/10 text-white hover:bg-white/20"}`}
            >
              Night
            </button>
            <button 
              onClick={() => setSecurityMode("disarmed")}
              className={`rounded-xl p-3 text-sm font-medium transition-colors ${securityMode === "disarmed" ? "bg-red-500/20 border border-red-500/30 text-red-400" : "bg-white/10 text-white hover:bg-white/20"}`}
            >
              Disarm
            </button>
          </div>
        </GlassCard>

        {/* Features */}
        <div className="grid grid-cols-2 gap-3">
          <FeatureCard
            icon={Camera}
            title="4K Surveillance"
            description="Crystal clear video monitoring with night vision"
            iconColor="text-blue-400"
          />
          <FeatureCard
            icon={Lock}
            title="Smart Access"
            description="Keyless entry with mobile control"
            iconColor="text-green-400"
          />
          <FeatureCard
            icon={AlertTriangle}
            title="AI Alerts"
            description="Intelligent threat detection"
            iconColor="text-yellow-400"
          />
          <FeatureCard
            icon={Eye}
            title="24/7 Watch"
            description="Professional monitoring services"
            iconColor="text-purple-400"
          />
        </div>

        {/* Pricing */}
        <GlassCard className="p-4">
          <h3 className="text-white font-medium mb-3">Security Packages</h3>
          <PricingItem label="4-Camera System" price="$2,400+" />
          <PricingItem label="8-Camera System" price="$4,200+" />
          <PricingItem label="16-Camera System" price="$7,800+" />
          <div className="mt-3 pt-3 border-t border-white/10">
            <PricingItem label="Pro Monitoring" price="$29/mo" />
          </div>
        </GlassCard>

        {/* CTA */}
        <CTACard
          title="Secure Your Peace of Mind"
          description="Protect what matters most with intelligent security."
          buttonText="Schedule Assessment"
          buttonLink="/scheduling?service=security-systems"
        />
      </div>
    </Control4ServiceLayout>
  );
};

export default SecuritySystems;
