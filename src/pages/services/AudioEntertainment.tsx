import { Volume2, Music, Tv, Headphones, Play, Pause, SkipBack, SkipForward, Plus, Minus } from "lucide-react";
import { useState } from "react";
import Control4ServiceLayout, { GlassCard, StatsCard, FeatureCard, PricingItem, CTACard } from "../../components/Layout/Control4ServiceLayout";
import { Slider } from "../../components/ui/slider";

const AudioEntertainment = () => {
  const [volume, setVolume] = useState(45);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeZone, setActiveZone] = useState("living");

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Audio Entertainment Systems",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Symphony Smart Homes"
    },
    "description": "Premium multi-room audio and home theater systems.",
    "areaServed": "Vail Valley, Colorado"
  };

  const zones = [
    { id: "living", name: "Living Room", playing: "Jazz Classics", volume: 65 },
    { id: "kitchen", name: "Kitchen", playing: "Morning Mix", volume: 45 },
    { id: "patio", name: "Patio", playing: "Chill Vibes", volume: 55 },
    { id: "bedroom", name: "Bedroom", playing: "Sleep Sounds", volume: 20 },
  ];

  const sources = [
    { name: "Spotify", icon: Music, color: "bg-green-500" },
    { name: "Apple TV", icon: Tv, color: "bg-gray-700" },
    { name: "Plex", icon: Play, color: "bg-yellow-600" },
    { name: "AirPlay", icon: Headphones, color: "bg-blue-500" },
  ];

  return (
    <Control4ServiceLayout
      title="Audio Entertainment"
      description="Premium multi-room audio and home theater systems for Vail Valley homes."
      keywords="multi-room audio, home theater, audio entertainment, streaming systems, Vail Valley"
      serviceSchema={serviceSchema}
      icon={Volume2}
      iconGradient="from-purple-600 to-pink-600"
      subtitle="Multi-room audio & theater"
    >
      <div className="space-y-4">
        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-3">
          <StatsCard value="16" label="Zones" />
          <StatsCard value="7.2.4" label="Atmos" />
          <StatsCard value="Hi-Fi" label="Quality" />
          <StatsCard value="∞" label="Sources" />
        </div>

        {/* Now Playing */}
        <GlassCard className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600 to-pink-700 flex items-center justify-center">
              <Music className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">Jazz Classics</p>
              <p className="text-white/60 text-sm">Living Room</p>
            </div>
          </div>
          
          {/* Volume Control */}
          <div className="flex items-center gap-3 mb-4">
            <Volume2 className="w-5 h-5 text-white/60" />
            <Slider
              value={[volume]}
              onValueChange={(v) => setVolume(v[0])}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-white/60 text-sm w-10 text-right">{volume}%</span>
          </div>
          
          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-4">
            <button className="p-2 text-white/60 hover:text-white transition-colors">
              <SkipBack className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-4 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button className="p-2 text-white/60 hover:text-white transition-colors">
              <SkipForward className="w-6 h-6" />
            </button>
          </div>
        </GlassCard>

        {/* Zone Selection */}
        <GlassCard className="p-4">
          <h3 className="text-white font-medium mb-3">Audio Zones</h3>
          <div className="space-y-2">
            {zones.map((zone) => (
              <button
                key={zone.id}
                onClick={() => setActiveZone(zone.id)}
                className={`w-full p-3 rounded-xl flex items-center justify-between transition-colors ${
                  activeZone === zone.id ? "bg-accent/20 border border-accent/30" : "bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Volume2 className={`w-5 h-5 ${activeZone === zone.id ? "text-accent" : "text-white/60"}`} />
                  <div className="text-left">
                    <p className="text-white text-sm">{zone.name}</p>
                    <p className="text-white/60 text-xs">{zone.playing}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: `${zone.volume}%` }} />
                  </div>
                  <span className="text-white/60 text-xs w-8">{zone.volume}%</span>
                </div>
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Sources */}
        <GlassCard className="p-4">
          <h3 className="text-white font-medium mb-3">Sources</h3>
          <div className="grid grid-cols-4 gap-2">
            {sources.map((source) => (
              <button
                key={source.name}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-center"
              >
                <div className={`w-10 h-10 ${source.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                  <source.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-white/80 text-xs">{source.name}</span>
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Features */}
        <div className="grid grid-cols-2 gap-3">
          <FeatureCard
            icon={Music}
            title="Multi-Room"
            description="Synchronized audio throughout"
            iconColor="text-purple-400"
          />
          <FeatureCard
            icon={Tv}
            title="Home Theater"
            description="Dolby Atmos surround"
            iconColor="text-blue-400"
          />
        </div>

        {/* Pricing */}
        <GlassCard className="p-4">
          <h3 className="text-white font-medium mb-3">Audio Packages</h3>
          <PricingItem label="4-Zone System" price="$2,500+" />
          <PricingItem label="8-Zone System" price="$4,800+" />
          <PricingItem label="Home Theater 7.2.4" price="$15,000+" />
        </GlassCard>

        {/* CTA */}
        <CTACard
          title="Experience Premium Audio"
          description="Fill every room with crystal-clear sound."
          buttonText="Schedule Demo"
          buttonLink="/scheduling?service=audio-entertainment"
        />
      </div>
    </Control4ServiceLayout>
  );
};

export default AudioEntertainment;
