import { Lightbulb, Clock, Eye, Palette } from "lucide-react";
import { useState, useEffect } from "react";
import Control4ServiceLayout, { GlassCard, StatsCard, FeatureCard, PricingItem, CTACard } from "../../components/Layout/Control4ServiceLayout";
import { Slider } from "../../components/ui/slider";
import { Switch } from "../../components/ui/switch";
import { InteractiveLightingFloorPlan } from "../../components/smart-lighting/InteractiveLightingFloorPlan";
const SmartLighting = () => {
  const [brightness, setBrightness] = useState(75);
  const [colorTemp, setColorTemp] = useState(3500);
  const [selectedScene, setSelectedScene] = useState("relax");
  const [selectedRoom, setSelectedRoom] = useState("living");
  const [isAutoMode, setIsAutoMode] = useState(false);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Smart Lighting Systems",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Symphony Smart Homes"
    },
    "description": "Intelligent lighting control for comfort, convenience, and energy savings.",
    "areaServed": "Vail Valley, Colorado"
  };

  const rooms = [
    { id: "living", name: "Living Room", lights: 6, on: true },
    { id: "kitchen", name: "Kitchen", lights: 4, on: true },
    { id: "bedroom", name: "Bedroom", lights: 3, on: false },
    { id: "office", name: "Office", lights: 2, on: true },
  ];

  const scenes = [
    { id: "relax", name: "Relax", color: "bg-amber-400", brightness: 40, temp: 2700 },
    { id: "focus", name: "Focus", color: "bg-blue-300", brightness: 90, temp: 5000 },
    { id: "party", name: "Party", color: "bg-purple-500", brightness: 80, temp: 4000 },
    { id: "sleep", name: "Sleep", color: "bg-orange-600", brightness: 10, temp: 2200 },
    { id: "sunrise", name: "Sunrise", color: "bg-yellow-400", brightness: 60, temp: 3500 },
    { id: "dinner", name: "Dinner", color: "bg-amber-500", brightness: 55, temp: 2800 },
  ];

  const currentScene = scenes.find(s => s.id === selectedScene);

  useEffect(() => {
    if (currentScene) {
      setBrightness(currentScene.brightness);
      setColorTemp(currentScene.temp);
    }
  }, [selectedScene]);

  return (
    <Control4ServiceLayout
      title="Smart Lighting"
      description="Intelligent lighting control for comfort, convenience, and energy savings in your Vail Valley home."
      keywords="smart lighting, home automation, LED lighting, dimming control, Vail Valley"
      serviceSchema={serviceSchema}
      icon={Lightbulb}
      iconGradient="from-yellow-500 to-amber-500"
      subtitle="Intelligent illumination"
    >
      <div className="space-y-4">
        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-3">
          <StatsCard value="60%" label="Savings" />
          <StatsCard value="Voice" label="Control" />
          <StatsCard value="Auto" label="Scenes" />
          <StatsCard value="∞" label="Colors" />
        </div>

        {/* Main Light Control */}
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-medium">Light Control</h3>
            <div className="flex items-center gap-2">
              <span className="text-white/60 text-sm">Auto</span>
              <Switch checked={isAutoMode} onCheckedChange={setIsAutoMode} />
            </div>
          </div>
          
          {/* Interactive Floor Plan */}
          <div className="mb-4">
            <InteractiveLightingFloorPlan
              brightness={brightness}
              colorTemp={colorTemp}
              selectedRoom={selectedRoom}
              onRoomSelect={setSelectedRoom}
            />
          </div>

          {/* Brightness */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-white/80">Brightness</label>
              <span className="text-white text-sm">{brightness}%</span>
            </div>
            <Slider
              value={[brightness]}
              onValueChange={(v) => setBrightness(v[0])}
              max={100}
              step={1}
            />
          </div>

          {/* Color Temperature */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-white/80">Color Temperature</label>
              <span className="text-white text-sm">{colorTemp}K</span>
            </div>
            <Slider
              value={[colorTemp]}
              onValueChange={(v) => setColorTemp(v[0])}
              min={2200}
              max={6500}
              step={100}
            />
            <div className="flex justify-between text-xs text-white/40 mt-1">
              <span>Warm</span>
              <span>Cool</span>
            </div>
          </div>
        </GlassCard>

        {/* Scene Selection */}
        <GlassCard className="p-4">
          <h3 className="text-white font-medium mb-3">Scenes</h3>
          <div className="grid grid-cols-3 gap-2">
            {scenes.map((scene) => (
              <button
                key={scene.id}
                onClick={() => setSelectedScene(scene.id)}
                className={`p-3 rounded-xl transition-all ${
                  selectedScene === scene.id 
                    ? "bg-accent/20 border border-accent/30" 
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className={`w-4 h-4 rounded-full ${scene.color} mx-auto mb-2`} />
                <span className="text-white text-xs">{scene.name}</span>
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Room Selection */}
        <GlassCard className="p-4">
          <h3 className="text-white font-medium mb-3">Rooms</h3>
          <div className="grid grid-cols-2 gap-2">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedRoom(room.id)}
                className={`p-3 rounded-xl flex items-center justify-between transition-all ${
                  selectedRoom === room.id 
                    ? "bg-accent/20 border border-accent/30" 
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="text-left">
                  <p className="text-white text-sm">{room.name}</p>
                  <p className="text-white/60 text-xs">{room.lights} lights</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${room.on ? "bg-yellow-400" : "bg-white/20"}`} />
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Features */}
        <div className="grid grid-cols-3 gap-3">
          <FeatureCard
            icon={Clock}
            title="Schedules"
            description="Automated routines"
            iconColor="text-blue-400"
          />
          <FeatureCard
            icon={Eye}
            title="Motion"
            description="Sensor activation"
            iconColor="text-green-400"
          />
          <FeatureCard
            icon={Palette}
            title="Colors"
            description="16M+ options"
            iconColor="text-purple-400"
          />
        </div>

        {/* Pricing */}
        <GlassCard className="p-4">
          <h3 className="text-white font-medium mb-3">Lighting Packages</h3>
          <PricingItem label="Single Room (8 lights)" price="$1,200+" />
          <PricingItem label="Multi-Room (24 lights)" price="$3,200+" />
          <PricingItem label="Whole Home" price="$6,500+" />
        </GlassCard>

        {/* CTA */}
        <CTACard
          title="Illuminate Your Life"
          description="Experience lighting that adapts to your lifestyle."
          buttonText="Schedule Demo"
          buttonLink="/scheduling?service=smart-lighting"
        />
      </div>
    </Control4ServiceLayout>
  );
};

export default SmartLighting;
