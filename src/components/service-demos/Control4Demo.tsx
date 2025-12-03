import { useState } from "react";
import { 
  Shield, Camera, Lightbulb, Thermometer, Volume2, 
  Play, Pause, SkipBack, SkipForward, Shuffle, Repeat,
  Plus, Minus, Settings, Fan
} from "lucide-react";
import { Slider } from "../ui/slider";

interface Control4DemoProps {
  activeTab: string;
}

// Glass Card Component
const GlassCard = ({ 
  children, 
  className = "", 
  onClick 
}: { 
  children: React.ReactNode; 
  className?: string; 
  onClick?: () => void;
}) => (
  <div 
    className={`bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 transition-all duration-300 hover:bg-white/15 hover:border-white/30 ${onClick ? "cursor-pointer" : ""} ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

// Media Tile
const MediaTile = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  iconBg,
  image
}: { 
  title: string; 
  subtitle?: string; 
  icon?: React.ComponentType<{ className?: string }>; 
  iconBg?: string;
  image?: string;
}) => (
  <GlassCard className="p-4 flex items-center gap-3">
    {image ? (
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
    ) : Icon && (
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg || "bg-accent"}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    )}
    <div className="flex-1 min-w-0">
      <p className="text-white font-medium text-sm truncate">{title}</p>
      {subtitle && <p className="text-white/60 text-xs truncate">{subtitle}</p>}
    </div>
  </GlassCard>
);

// Security Camera Tile
const CameraTile = ({ name, location }: { name: string; location: string }) => (
  <GlassCard className="aspect-video relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
      <Camera className="w-8 h-8 text-white/30" />
    </div>
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
      <p className="text-white text-sm font-medium">{name}</p>
      <p className="text-white/60 text-xs">{location}</p>
    </div>
    <div className="absolute top-2 left-2 flex items-center gap-1">
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      <span className="text-white/80 text-xs">Now</span>
    </div>
  </GlassCard>
);

// Light Control Row
const LightControl = ({ 
  name, 
  icon: Icon, 
  value, 
  onChange 
}: { 
  name: string; 
  icon: React.ComponentType<{ className?: string }>; 
  value: number; 
  onChange: (val: number) => void;
}) => (
  <div className="flex items-center gap-4 py-3 border-b border-white/10 last:border-0">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${value > 0 ? "bg-yellow-500/20" : "bg-white/10"}`}>
      <Icon className={`w-5 h-5 ${value > 0 ? "text-yellow-400" : "text-white/50"}`} />
    </div>
    <div className="flex-1">
      <p className="text-white text-sm mb-2">{name}</p>
      <div className="flex items-center gap-3">
        <div className="bg-white/20 rounded-full px-2 py-0.5 text-xs text-white min-w-[40px] text-center">
          {value}
        </div>
        <Slider
          value={[value]}
          onValueChange={(v) => onChange(v[0])}
          max={100}
          step={1}
          className="flex-1"
        />
      </div>
    </div>
  </div>
);

// Now Playing Bar
const NowPlayingBar = () => (
  <GlassCard className="p-4 mt-auto">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center overflow-hidden">
        <div className="text-xs text-white/80 text-center p-1">
          <div className="font-bold text-[10px]">RAINY DAYS</div>
          <div className="text-[8px] opacity-75">ARE FOR SLEEPING</div>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium text-sm truncate">Dripping Rain on Concrete in the Backyard</p>
        <p className="text-white/60 text-xs">Bed</p>
      </div>
      <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
        <Settings className="w-5 h-5 text-white/80" />
      </button>
    </div>
    
    {/* Volume Control */}
    <div className="flex items-center gap-3 mb-3">
      <Volume2 className="w-5 h-5 text-white/60" />
      <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
        <Minus className="w-4 h-4 text-white" />
      </button>
      <div className="flex-1 bg-white/10 rounded-full h-1">
        <div className="bg-white/40 h-full w-1/3 rounded-full" />
      </div>
      <span className="text-white/60 text-sm min-w-[50px] text-center">Volume</span>
      <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
        <Plus className="w-4 h-4 text-white" />
      </button>
    </div>
    
    {/* Playback Controls */}
    <div className="flex items-center justify-center gap-4">
      <button className="p-2 text-white/60 hover:text-white transition-colors">
        <Shuffle className="w-5 h-5" />
      </button>
      <button className="p-2 text-white/80 hover:text-white transition-colors">
        <SkipBack className="w-6 h-6" />
      </button>
      <button className="p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors">
        <Pause className="w-6 h-6" />
      </button>
      <button className="p-2 text-white/80 hover:text-white transition-colors">
        <SkipForward className="w-6 h-6" />
      </button>
      <button className="p-2 text-white/60 hover:text-white transition-colors">
        <Repeat className="w-5 h-5" />
      </button>
    </div>
  </GlassCard>
);

export const Control4Demo = ({ activeTab }: Control4DemoProps) => {
  const [lightLevels, setLightLevels] = useState<Record<string, number>>({
    "ceiling-fan": 0,
    "sink": 0,
    "counter": 0,
    "chandelier": 0,
    "back-porch": 0,
    "ceiling": 0,
    "guest-fan": 0,
    "hall-ceiling": 0,
    "front-exterior": 100,
  });

  const updateLight = (id: string, value: number) => {
    setLightLevels(prev => ({ ...prev, [id]: value }));
  };

  if (activeTab === "listen") {
    return (
      <div className="space-y-4 flex flex-col h-full">
        {/* Media Sources Grid */}
        <div className="grid grid-cols-2 gap-3">
          <CameraTile name="Front Door" location="Now" />
          <div className="space-y-3">
            <MediaTile title="Matt's Spotify" icon={Play} iconBg="bg-green-500" />
            <MediaTile title="Living Apple TV" subtitle="Theater" icon={Play} iconBg="bg-gray-800" />
          </div>
        </div>
        
        {/* Device Tiles */}
        <div className="grid grid-cols-2 gap-3">
          <GlassCard className="p-4 flex items-center justify-center gap-3">
            <Camera className="w-6 h-6 text-white/80" />
            <div>
              <p className="text-white text-sm font-medium">Front Door</p>
              <p className="text-white/60 text-xs">Studio</p>
            </div>
          </GlassCard>
          <GlassCard className="p-4 flex items-center justify-center gap-3">
            <Camera className="w-6 h-6 text-white/80" />
            <div>
              <p className="text-white text-sm font-medium">Garage</p>
              <p className="text-white/60 text-xs">Studio</p>
            </div>
          </GlassCard>
          <GlassCard className="p-4 flex items-center justify-center gap-3">
            <Camera className="w-6 h-6 text-white/80" />
            <div>
              <p className="text-white text-sm font-medium">Backyard</p>
              <p className="text-white/60 text-xs">Studio</p>
            </div>
          </GlassCard>
          <MediaTile title="Daily Mix 1" subtitle="Matt's Spotify" icon={Play} iconBg="bg-purple-600" />
        </div>

        {/* More Sources */}
        <div className="grid grid-cols-2 gap-3">
          <MediaTile title="Living Fire TV" subtitle="Theater" icon={Play} iconBg="bg-orange-500" />
          <MediaTile title="Plex" subtitle="Theater" icon={Play} iconBg="bg-yellow-600" />
        </div>

        {/* Now Playing */}
        <div className="mt-auto pt-4">
          <NowPlayingBar />
        </div>
      </div>
    );
  }

  if (activeTab === "security") {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <CameraTile name="Front Door" location="Studio" />
          <CameraTile name="Garage" location="Studio" />
          <CameraTile name="Backyard" location="Studio" />
          <CameraTile name="Side Yard" location="Studio" />
        </div>
        
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Security Status</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-green-400 text-sm">Armed</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-green-500/20 border border-green-500/30 rounded-xl p-3 text-green-400 text-sm font-medium hover:bg-green-500/30 transition-colors">
              Stay
            </button>
            <button className="bg-white/10 border border-white/20 rounded-xl p-3 text-white text-sm font-medium hover:bg-white/20 transition-colors">
              Away
            </button>
            <button className="bg-white/10 border border-white/20 rounded-xl p-3 text-white text-sm font-medium hover:bg-white/20 transition-colors">
              Night
            </button>
            <button className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 text-red-400 text-sm font-medium hover:bg-red-500/30 transition-colors">
              Disarm
            </button>
          </div>
        </GlassCard>
      </div>
    );
  }

  if (activeTab === "comfort") {
    return (
      <div className="space-y-4">
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Climate Control</h3>
            <Thermometer className="w-5 h-5 text-blue-400" />
          </div>
          
          <div className="text-center py-6">
            <div className="text-6xl font-light text-white mb-2">72°</div>
            <p className="text-white/60 text-sm">Current Temperature</p>
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <button className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 hover:bg-blue-500/30 transition-colors">
              <Minus className="w-6 h-6" />
            </button>
            <div className="text-center">
              <p className="text-white text-2xl font-medium">70°</p>
              <p className="text-white/60 text-xs">Set Point</p>
            </div>
            <button className="w-12 h-12 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 hover:bg-orange-500/30 transition-colors">
              <Plus className="w-6 h-6" />
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <button className="bg-white/10 rounded-xl p-3 text-white text-sm hover:bg-white/20 transition-colors">
              <Fan className="w-5 h-5 mx-auto mb-1" />
              Auto
            </button>
            <button className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-3 text-blue-400 text-sm">
              <Thermometer className="w-5 h-5 mx-auto mb-1" />
              Cool
            </button>
            <button className="bg-white/10 rounded-xl p-3 text-white text-sm hover:bg-white/20 transition-colors">
              <Thermometer className="w-5 h-5 mx-auto mb-1" />
              Heat
            </button>
          </div>
        </GlassCard>
        
        {/* Room Temps */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { room: "Living Room", temp: 72 },
            { room: "Kitchen", temp: 71 },
            { room: "Master Bedroom", temp: 68 },
            { room: "Office", temp: 70 },
          ].map((item) => (
            <GlassCard key={item.room} className="p-4">
              <p className="text-white/60 text-xs mb-1">{item.room}</p>
              <p className="text-white text-2xl font-medium">{item.temp}°</p>
            </GlassCard>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === "lighting") {
    return (
      <div className="space-y-4">
        {/* Tabs */}
        <div className="flex gap-4 border-b border-white/20 pb-2">
          <button className="text-white font-medium border-b-2 border-white pb-2">Lights</button>
          <button className="text-white/60 hover:text-white/80 transition-colors pb-2">Scenes</button>
        </div>
        
        {/* Room Groups */}
        <div className="space-y-4">
          <div>
            <h4 className="text-white/60 text-xs uppercase tracking-wider mb-3">LOWER TV</h4>
            <GlassCard className="p-4">
              <div className="grid grid-cols-2 gap-x-6">
                <LightControl 
                  name="Ceiling Fan" 
                  icon={Fan} 
                  value={lightLevels["ceiling-fan"]} 
                  onChange={(v) => updateLight("ceiling-fan", v)} 
                />
                <LightControl 
                  name="Sink" 
                  icon={Lightbulb} 
                  value={lightLevels["sink"]} 
                  onChange={(v) => updateLight("sink", v)} 
                />
                <LightControl 
                  name="Counter" 
                  icon={Lightbulb} 
                  value={lightLevels["counter"]} 
                  onChange={(v) => updateLight("counter", v)} 
                />
                <LightControl 
                  name="Chandelier" 
                  icon={Lightbulb} 
                  value={lightLevels["chandelier"]} 
                  onChange={(v) => updateLight("chandelier", v)} 
                />
              </div>
            </GlassCard>
          </div>
          
          <div>
            <h4 className="text-white/60 text-xs uppercase tracking-wider mb-3">MUDROOM</h4>
            <GlassCard className="p-4">
              <div className="grid grid-cols-2 gap-x-6">
                <LightControl 
                  name="Hall Ceiling" 
                  icon={Lightbulb} 
                  value={lightLevels["hall-ceiling"]} 
                  onChange={(v) => updateLight("hall-ceiling", v)} 
                />
                <LightControl 
                  name="Ceiling" 
                  icon={Lightbulb} 
                  value={lightLevels["ceiling"]} 
                  onChange={(v) => updateLight("ceiling", v)} 
                />
                <LightControl 
                  name="Front Exterior" 
                  icon={Lightbulb} 
                  value={lightLevels["front-exterior"]} 
                  onChange={(v) => updateLight("front-exterior", v)} 
                />
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    );
  }

  // Services tab
  return (
    <div className="space-y-4">
      <GlassCard className="p-6 text-center">
        <Shield className="w-12 h-12 text-accent mx-auto mb-4" />
        <h3 className="text-white text-xl font-medium mb-2">Professional Installation</h3>
        <p className="text-white/60 text-sm mb-4">
          Experience the full Control4 ecosystem with professional installation from Symphony Smart Homes.
        </p>
        <button className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl font-medium transition-colors">
          Schedule Consultation
        </button>
      </GlassCard>
      
      <div className="grid grid-cols-2 gap-3">
        {[
          { title: "Lighting", desc: "Smart scenes & schedules", icon: Lightbulb },
          { title: "Climate", desc: "Energy-efficient comfort", icon: Thermometer },
          { title: "Security", desc: "Cameras & monitoring", icon: Shield },
          { title: "Audio/Video", desc: "Multi-room entertainment", icon: Volume2 },
        ].map((service) => (
          <GlassCard key={service.title} className="p-4">
            <service.icon className="w-8 h-8 text-accent mb-3" />
            <h4 className="text-white font-medium text-sm">{service.title}</h4>
            <p className="text-white/60 text-xs">{service.desc}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Control4Demo;
