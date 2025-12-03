import { Sun, SunDim, Clock, Smartphone, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import Control4ServiceLayout, { GlassCard, StatsCard, FeatureCard, PricingItem, CTACard } from "../../components/Layout/Control4ServiceLayout";
import { Slider } from "../../components/ui/slider";

const Shades = () => {
  const [shadePositions, setShadePositions] = useState({
    living: 75,
    bedroom: 100,
    kitchen: 50,
    office: 25
  });

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Smart Shades",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Symphony Smart Homes"
    },
    "description": "Automated window treatments for privacy, comfort, and energy efficiency.",
    "areaServed": "Vail Valley, Colorado"
  };

  const updateShade = (room: keyof typeof shadePositions, value: number) => {
    setShadePositions(prev => ({ ...prev, [room]: value }));
  };

  const ShadeControl = ({ room, label }: { room: keyof typeof shadePositions; label: string }) => (
    <GlassCard className="p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-white text-sm">{label}</span>
        <span className="text-white/60 text-xs">{shadePositions[room]}%</span>
      </div>
      
      {/* Visual shade representation */}
      <div className="relative h-24 bg-gradient-to-b from-sky-400/30 to-sky-600/30 rounded-lg mb-3 overflow-hidden">
        <div 
          className="absolute top-0 left-0 right-0 bg-slate-700/90 transition-all duration-300"
          style={{ height: `${100 - shadePositions[room]}%` }}
        >
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-slate-600" />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={() => updateShade(room, Math.min(100, shadePositions[room] + 25))}
          className="flex-1 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
        >
          <ChevronUp className="w-4 h-4 mx-auto text-white/80" />
        </button>
        <button 
          onClick={() => updateShade(room, Math.max(0, shadePositions[room] - 25))}
          className="flex-1 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
        >
          <ChevronDown className="w-4 h-4 mx-auto text-white/80" />
        </button>
      </div>
    </GlassCard>
  );

  return (
    <Control4ServiceLayout
      title="Smart Shades"
      description="Automated window treatments that respond to sunlight, weather, and your daily routines."
      keywords="smart shades, motorized blinds, window automation, Vail Valley"
      serviceSchema={serviceSchema}
      icon={Sun}
      iconGradient="from-amber-500 to-orange-500"
      subtitle="Automated window treatments"
    >
      <div className="space-y-4">
        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-3">
          <StatsCard value="30%" label="Energy Saved" />
          <StatsCard value="Auto" label="Sun Tracking" />
          <StatsCard value="Voice" label="Control" />
          <StatsCard value="Quiet" label="Operation" />
        </div>

        {/* Scene Buttons */}
        <GlassCard className="p-4">
          <h3 className="text-white font-medium mb-3">Quick Scenes</h3>
          <div className="grid grid-cols-4 gap-2">
            {[
              { name: "Open All", action: () => setShadePositions({ living: 100, bedroom: 100, kitchen: 100, office: 100 }) },
              { name: "Close All", action: () => setShadePositions({ living: 0, bedroom: 0, kitchen: 0, office: 0 }) },
              { name: "Morning", action: () => setShadePositions({ living: 75, bedroom: 50, kitchen: 100, office: 100 }) },
              { name: "Movie", action: () => setShadePositions({ living: 0, bedroom: 25, kitchen: 50, office: 0 }) },
            ].map((scene) => (
              <button
                key={scene.name}
                onClick={scene.action}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white text-xs transition-colors"
              >
                {scene.name}
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Shade Controls Grid */}
        <div className="grid grid-cols-2 gap-3">
          <ShadeControl room="living" label="Living Room" />
          <ShadeControl room="bedroom" label="Bedroom" />
          <ShadeControl room="kitchen" label="Kitchen" />
          <ShadeControl room="office" label="Office" />
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-3">
          <FeatureCard
            icon={SunDim}
            title="Light Control"
            description="Filter harsh sunlight automatically"
            iconColor="text-amber-400"
          />
          <FeatureCard
            icon={Clock}
            title="Scheduled"
            description="Set daily routines & scenes"
            iconColor="text-blue-400"
          />
          <FeatureCard
            icon={Smartphone}
            title="App Control"
            description="Control from anywhere"
            iconColor="text-green-400"
          />
        </div>

        {/* Pricing */}
        <GlassCard className="p-4">
          <h3 className="text-white font-medium mb-3">Shade Packages</h3>
          <PricingItem label="Single Window" price="$450+" />
          <PricingItem label="Room Package (4)" price="$1,600+" />
          <PricingItem label="Whole Home" price="$4,000+" />
        </GlassCard>

        {/* CTA */}
        <CTACard
          title="Transform Your Windows"
          description="Experience the perfect balance of privacy, comfort, and efficiency."
          buttonText="Schedule Consultation"
          buttonLink="/scheduling?service=shades"
        />
      </div>
    </Control4ServiceLayout>
  );
};

export default Shades;
