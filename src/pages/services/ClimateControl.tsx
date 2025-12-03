import { Thermometer, Sun, Cloud, Wind, BarChart, Minus, Plus, Fan } from "lucide-react";
import { useState } from "react";
import Control4ServiceLayout, { GlassCard, StatsCard, FeatureCard, PricingItem, CTACard } from "../../components/Layout/Control4ServiceLayout";
import { Slider } from "../../components/ui/slider";

const ClimateControl = () => {
  const [temperature, setTemperature] = useState(72);
  const [setPoint, setSetPoint] = useState(70);
  const [mode, setMode] = useState<"cool" | "heat" | "auto">("cool");

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Climate Control Systems",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Symphony Smart Homes"
    },
    "description": "Intelligent climate control for perfect comfort in every room.",
    "areaServed": "Vail Valley, Colorado"
  };

  const roomTemps = [
    { room: "Living Room", temp: 72 },
    { room: "Kitchen", temp: 71 },
    { room: "Master Bedroom", temp: 68 },
    { room: "Office", temp: 70 },
  ];

  return (
    <Control4ServiceLayout
      title="Climate Control"
      description="Intelligent climate systems for perfect comfort in every room of your Vail Valley home."
      keywords="smart climate, thermostat, HVAC control, home automation, Vail Valley"
      serviceSchema={serviceSchema}
      icon={Thermometer}
      iconGradient="from-blue-500 to-cyan-500"
      subtitle="Smart temperature management"
    >
      <div className="space-y-4">
        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-3">
          <StatsCard value="±0.5°" label="Precision" />
          <StatsCard value="30%" label="Savings" />
          <StatsCard value="16" label="Zones" />
          <StatsCard value="24/7" label="Control" />
        </div>

        {/* Main Climate Control */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Climate Control</h3>
            <Thermometer className="w-5 h-5 text-blue-400" />
          </div>
          
          <div className="text-center py-4">
            <div className="text-6xl font-light text-white mb-2">{temperature}°</div>
            <p className="text-white/60 text-sm">Current Temperature</p>
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <button 
              onClick={() => setSetPoint(Math.max(60, setPoint - 1))}
              className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 hover:bg-blue-500/30 transition-colors"
            >
              <Minus className="w-6 h-6" />
            </button>
            <div className="text-center">
              <p className="text-white text-2xl font-medium">{setPoint}°</p>
              <p className="text-white/60 text-xs">Set Point</p>
            </div>
            <button 
              onClick={() => setSetPoint(Math.min(85, setPoint + 1))}
              className="w-12 h-12 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 hover:bg-orange-500/30 transition-colors"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <button 
              onClick={() => setMode("auto")}
              className={`rounded-xl p-3 text-sm transition-colors ${mode === "auto" ? "bg-green-500/20 border border-green-500/30 text-green-400" : "bg-white/10 text-white hover:bg-white/20"}`}
            >
              <Fan className="w-5 h-5 mx-auto mb-1" />
              Auto
            </button>
            <button 
              onClick={() => setMode("cool")}
              className={`rounded-xl p-3 text-sm transition-colors ${mode === "cool" ? "bg-blue-500/20 border border-blue-500/30 text-blue-400" : "bg-white/10 text-white hover:bg-white/20"}`}
            >
              <Thermometer className="w-5 h-5 mx-auto mb-1" />
              Cool
            </button>
            <button 
              onClick={() => setMode("heat")}
              className={`rounded-xl p-3 text-sm transition-colors ${mode === "heat" ? "bg-orange-500/20 border border-orange-500/30 text-orange-400" : "bg-white/10 text-white hover:bg-white/20"}`}
            >
              <Thermometer className="w-5 h-5 mx-auto mb-1" />
              Heat
            </button>
          </div>
        </GlassCard>

        {/* Room Temps Grid */}
        <div className="grid grid-cols-2 gap-3">
          {roomTemps.map((item) => (
            <GlassCard key={item.room} className="p-4">
              <p className="text-white/60 text-xs mb-1">{item.room}</p>
              <p className="text-white text-2xl font-medium">{item.temp}°</p>
            </GlassCard>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-3">
          <FeatureCard
            icon={Sun}
            title="Predictive"
            description="Pre-conditions before you arrive"
            iconColor="text-yellow-400"
          />
          <FeatureCard
            icon={Wind}
            title="Air Quality"
            description="Fresh air ventilation control"
            iconColor="text-cyan-400"
          />
          <FeatureCard
            icon={BarChart}
            title="Analytics"
            description="Track energy usage patterns"
            iconColor="text-green-400"
          />
        </div>

        {/* Pricing */}
        <GlassCard className="p-4">
          <h3 className="text-white font-medium mb-3">Climate Packages</h3>
          <PricingItem label="Single Zone" price="$800+" />
          <PricingItem label="Multi-Zone (4)" price="$2,400+" />
          <PricingItem label="Whole Home" price="$4,500+" />
        </GlassCard>

        {/* CTA */}
        <CTACard
          title="Perfect Comfort Awaits"
          description="Experience intelligent climate control that adapts to your lifestyle."
          buttonText="Schedule Consultation"
          buttonLink="/scheduling?service=climate-control"
        />
      </div>
    </Control4ServiceLayout>
  );
};

export default ClimateControl;
