import { ArrowLeft, Lightbulb, Sun, Clock, Smartphone, Zap, Eye, Palette, Play, Pause } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SEO from "../../components/SEO";
import { iPadLayout as IPadLayout } from "../../components/Layout/iPadLayout";
import { iPadCard as IPadCard } from "../../components/ui/ipad-card";
import { iPadButton as IPadButton } from "../../components/ui/ipad-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Slider } from "../../components/ui/slider";
import { Switch } from "../../components/ui/switch";

const InteractiveLightingDemo = () => {
  const [brightness, setBrightness] = useState([75]);
  const [selectedScene, setSelectedScene] = useState("relax");
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("living-room");
  const [colorTemp, setColorTemp] = useState([3000]);
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [motionSensor, setMotionSensor] = useState(false);
  const [energyUsage, setEnergyUsage] = useState(12);
  const [currentTime, setCurrentTime] = useState(new Date());

  const rooms = {
    "living-room": { name: "Living Room", lights: 6, occupied: true },
    "kitchen": { name: "Kitchen", lights: 4, occupied: false },
    "bedroom": { name: "Bedroom", lights: 3, occupied: false },
    "office": { name: "Office", lights: 2, occupied: true }
  };

  const scenes = {
    relax: { 
      color: "hsl(45, 100%, 80%)", 
      name: "Relax", 
      brightness: 40, 
      temp: 2700,
      description: "Warm, dim lighting for relaxation" 
    },
    focus: { 
      color: "hsl(210, 100%, 90%)", 
      name: "Focus", 
      brightness: 90, 
      temp: 5000,
      description: "Bright, cool light for productivity" 
    },
    party: { 
      color: "hsl(300, 100%, 70%)", 
      name: "Party", 
      brightness: 80, 
      temp: 4000,
      description: "Dynamic colors for entertainment" 
    },
    sleep: { 
      color: "hsl(20, 100%, 60%)", 
      name: "Sleep", 
      brightness: 5, 
      temp: 2200,
      description: "Very warm, minimal light for bedtime" 
    },
    sunrise: {
      color: "hsl(30, 100%, 85%)",
      name: "Sunrise",
      brightness: 60,
      temp: 3500,
      description: "Gradual morning wake-up simulation"
    },
    dinner: {
      color: "hsl(40, 100%, 75%)",
      name: "Dinner",
      brightness: 55,
      temp: 2800,
      description: "Perfect ambiance for dining"
    }
  };

  // Simulate time progression
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto mode cycling
  useEffect(() => {
    if (isAutoMode) {
      const interval = setInterval(() => {
        const sceneKeys = Object.keys(scenes);
        const currentIndex = sceneKeys.indexOf(selectedScene);
        const nextIndex = (currentIndex + 1) % sceneKeys.length;
        const nextScene = sceneKeys[nextIndex] as keyof typeof scenes;
        setSelectedScene(nextScene);
        setBrightness([scenes[nextScene].brightness]);
        setColorTemp([scenes[nextScene].temp]);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isAutoMode, selectedScene]);

  // Schedule-based automation
  useEffect(() => {
    if (scheduleEnabled) {
      const hour = currentTime.getHours();
      let autoScene = "relax";
      
      if (hour >= 6 && hour < 9) autoScene = "sunrise";
      else if (hour >= 9 && hour < 17) autoScene = "focus";
      else if (hour >= 17 && hour < 20) autoScene = "dinner";
      else if (hour >= 20 && hour < 22) autoScene = "relax";
      else autoScene = "sleep";
      
      if (selectedScene !== autoScene) {
        setSelectedScene(autoScene);
        setBrightness([scenes[autoScene as keyof typeof scenes].brightness]);
        setColorTemp([scenes[autoScene as keyof typeof scenes].temp]);
      }
    }
  }, [scheduleEnabled, currentTime]);

  // Motion sensor effect
  useEffect(() => {
    if (motionSensor && rooms[selectedRoom as keyof typeof rooms].occupied) {
      if (brightness[0] < 30) {
        setBrightness([60]);
      }
    }
  }, [motionSensor, selectedRoom]);

  // Calculate energy usage based on settings
  useEffect(() => {
    const room = rooms[selectedRoom as keyof typeof rooms];
    const baseUsage = room.lights * 8; // 8W per LED bulb
    const actualUsage = (baseUsage * brightness[0]) / 100;
    setEnergyUsage(Math.round(actualUsage));
  }, [selectedRoom, brightness]);

  const currentScene = scenes[selectedScene as keyof typeof scenes];
  const currentRoom = rooms[selectedRoom as keyof typeof rooms];

  return (
    <IPadCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Smart Lighting Control</h3>
        <div className="text-xs text-gray-300">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      
      {/* Room Selection */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {Object.entries(rooms).map(([key, room]) => (
          <button
            key={key}
            onClick={() => setSelectedRoom(key)}
            className={`p-3 rounded-lg text-xs transition-all duration-300 relative ${
              selectedRoom === key 
                ? 'bg-accent text-white' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{room.name}</span>
              {room.occupied && (
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              )}
            </div>
            <div className="text-xs opacity-70 mt-1">{room.lights} lights</div>
          </button>
        ))}
      </div>

      {/* Light Bulb Visual with Room Context */}
      <div className="flex justify-center mb-6 relative">
        <div 
          className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 relative"
          style={{ 
            backgroundColor: currentScene.color,
            opacity: brightness[0] / 100,
            boxShadow: `0 0 ${brightness[0]/2}px ${currentScene.color}`,
            filter: `hue-rotate(${(colorTemp[0] - 3000) / 10}deg)`
          }}
        >
          <Lightbulb className="w-12 h-12 text-gray-800" />
        </div>
        
        {/* Energy Usage Indicator */}
        <div className="absolute -top-2 -right-2 bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
          {energyUsage}W
        </div>
      </div>

      {/* Current Scene Info */}
      <div className="bg-white/5 rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-white font-medium text-sm">{currentScene.name} Scene</h4>
          <span className="text-accent text-sm">{currentRoom.name}</span>
        </div>
        <p className="text-gray-300 text-xs">{currentScene.description}</p>
      </div>

      {/* Scene Selector */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {Object.entries(scenes).map(([key, scene]) => (
          <button
            key={key}
            onClick={() => {
              setSelectedScene(key);
              setBrightness([scene.brightness]);
              setColorTemp([scene.temp]);
            }}
            className={`p-2 rounded-lg transition-all duration-300 ${
              selectedScene === key 
                ? 'bg-accent text-white' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <div 
              className="w-3 h-3 rounded-full mx-auto mb-1"
              style={{ backgroundColor: scene.color }}
            />
            <span className="text-xs">{scene.name}</span>
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="space-y-3 mb-4">
        {/* Brightness */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm text-gray-300">Brightness</label>
            <span className="text-white text-sm">{brightness[0]}%</span>
          </div>
          <Slider
            value={brightness}
            onValueChange={setBrightness}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Color Temperature */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm text-gray-300">Color Temperature</label>
            <span className="text-white text-sm">{colorTemp[0]}K</span>
          </div>
          <Slider
            value={colorTemp}
            onValueChange={setColorTemp}
            min={2200}
            max={6500}
            step={100}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Warm</span>
            <span>Cool</span>
          </div>
        </div>
      </div>

      {/* Advanced Features */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white/5 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white text-sm font-medium">Schedule</div>
              <div className="text-gray-300 text-xs">Auto adjust by time</div>
            </div>
            <Switch 
              checked={scheduleEnabled} 
              onCheckedChange={setScheduleEnabled}
            />
          </div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white text-sm font-medium">Motion</div>
              <div className="text-gray-300 text-xs">Sensor activation</div>
            </div>
            <Switch 
              checked={motionSensor} 
              onCheckedChange={setMotionSensor}
            />
          </div>
        </div>
      </div>

      {/* Mode Toggles */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-300">Demo Mode</span>
        <button
          onClick={() => setIsAutoMode(!isAutoMode)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
            isAutoMode ? 'bg-accent text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          {isAutoMode ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span className="text-xs">{isAutoMode ? 'Stop' : 'Auto'}</span>
        </button>
      </div>

      {/* Energy & Status Bar */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex justify-between items-center text-xs">
          <div className="text-gray-300">
            Daily Savings: <span className="text-green-400">$2.40</span>
          </div>
          <div className="text-gray-300">
            Active: <span className="text-white">{currentRoom.lights} lights</span>
          </div>
        </div>
      </div>
    </IPadCard>
  );
};

const InteractiveHouseDiagram = () => {
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [activeRoom, setActiveRoom] = useState("living-room");

  const rooms = {
    "living-room": {
      name: "Living Room",
      path: "M50 180 L200 180 L200 120 L50 120 Z",
      fact: "Smart lighting can reduce eye strain by 65% during TV watching",
      benefit: "Automated scenes for entertainment",
      color: "#4F46E5",
      lightPosition: { x: 125, y: 150 }
    },
    "kitchen": {
      name: "Kitchen", 
      path: "M200 180 L350 180 L350 120 L200 120 Z",
      fact: "Task lighting improves cooking accuracy by 40%",
      benefit: "Bright whites for food prep, warm tones for dining",
      color: "#059669",
      lightPosition: { x: 275, y: 150 }
    },
    "bedroom": {
      name: "Bedroom",
      path: "M50 120 L200 120 L200 60 L50 60 Z", 
      fact: "Circadian lighting improves sleep quality by 23%",
      benefit: "Sunrise simulation & gradual dimming",
      color: "#DC2626",
      lightPosition: { x: 125, y: 90 }
    },
    "office": {
      name: "Office",
      path: "M200 120 L350 120 L350 60 L200 60 Z",
      fact: "Proper lighting boosts productivity by 15%",
      benefit: "Focus modes & daylight mimicking",
      color: "#7C3AED", 
      lightPosition: { x: 275, y: 90 }
    }
  };

  const getCurrentRoomData = () => {
    return rooms[activeRoom as keyof typeof rooms] || rooms["living-room"];
  };

  return (
    <IPadCard className="p-6 overflow-hidden">
      <h3 className="text-lg font-semibold text-white mb-4 text-center">
        Smart Home Lighting Benefits
      </h3>
      
      {/* Interactive House SVG */}
      <div className="relative mb-6">
        <svg 
          viewBox="0 0 400 240" 
          className="w-full h-64 bg-gradient-to-b from-blue-900/20 to-blue-900/5 rounded-lg border border-white/10"
        >
          {/* House Structure */}
          <path 
            d="M50 60 L200 20 L350 60 L350 180 L50 180 Z" 
            fill="none" 
            stroke="white" 
            strokeWidth="2"
            opacity="0.3"
          />
          
          {/* Roof */}
          <path 
            d="M40 60 L200 15 L360 60 L350 60 L200 20 L50 60 Z" 
            fill="white" 
            opacity="0.1"
          />
          
          {/* Room Divisions */}
          <line x1="200" y1="60" x2="200" y2="180" stroke="white" strokeWidth="1" opacity="0.3" />
          <line x1="50" y1="120" x2="350" y2="120" stroke="white" strokeWidth="1" opacity="0.3" />
          
          {/* Interactive Room Areas */}
          {Object.entries(rooms).map(([roomId, room]) => (
            <g key={roomId}>
              {/* Room Area */}
              <path
                d={room.path}
                fill={hoveredRoom === roomId ? room.color : "transparent"}
                fillOpacity={hoveredRoom === roomId ? 0.3 : 0}
                stroke={activeRoom === roomId ? room.color : "transparent"}
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => setHoveredRoom(roomId)}
                onMouseLeave={() => setHoveredRoom(null)}
                onClick={() => setActiveRoom(roomId)}
              />
              
              {/* Light Fixture */}
              <circle
                cx={room.lightPosition.x}
                cy={room.lightPosition.y}
                r="4"
                fill={hoveredRoom === roomId || activeRoom === roomId ? room.color : "white"}
                opacity={hoveredRoom === roomId || activeRoom === roomId ? 1 : 0.6}
                className="transition-all duration-300"
              />
              
              {/* Light Glow Effect */}
              {(hoveredRoom === roomId || activeRoom === roomId) && (
                <circle
                  cx={room.lightPosition.x}
                  cy={room.lightPosition.y}
                  r="12"
                  fill={room.color}
                  opacity="0.2"
                  className="animate-pulse"
                />
              )}
              
              {/* Room Label */}
              <text
                x={room.lightPosition.x}
                y={room.lightPosition.y + 25}
                textAnchor="middle"
                className="fill-white text-xs font-medium"
                opacity={hoveredRoom === roomId ? 1 : 0.7}
              >
                {room.name}
              </text>
            </g>
          ))}
          
          {/* Energy Flow Lines */}
          <defs>
            <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#10B981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          
          {activeRoom && (
            <line
              x1="200"
              y1="200"
              x2={rooms[activeRoom as keyof typeof rooms].lightPosition.x}
              y2={rooms[activeRoom as keyof typeof rooms].lightPosition.y}
              stroke="url(#energyGradient)"
              strokeWidth="2"
              className="animate-pulse"
            />
          )}
        </svg>
        
        {/* Hover Tooltip */}
        {hoveredRoom && (
          <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-white/20 animate-fade-in">
            <div className="flex items-start space-x-3">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                style={{ backgroundColor: rooms[hoveredRoom as keyof typeof rooms].color }}
              />
              <div>
                <h4 className="text-white font-semibold text-sm mb-1">
                  {rooms[hoveredRoom as keyof typeof rooms].name}
                </h4>
                <p className="text-accent text-xs font-medium mb-1">
                  💡 {rooms[hoveredRoom as keyof typeof rooms].fact}
                </p>
                <p className="text-gray-300 text-xs">
                  {rooms[hoveredRoom as keyof typeof rooms].benefit}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Current Room Details */}
      <div className="bg-white/5 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getCurrentRoomData().color }}
            />
            <h4 className="text-white font-semibold">{getCurrentRoomData().name}</h4>
          </div>
          <Lightbulb className="w-5 h-5 text-accent" />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <Zap className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-sm">{getCurrentRoomData().fact}</p>
          </div>
          <div className="flex items-start space-x-2">
            <Eye className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-sm">{getCurrentRoomData().benefit}</p>
          </div>
        </div>
      </div>

      {/* Interactive Instructions */}
      <div className="mt-4 text-center">
        <p className="text-gray-400 text-xs">
          Hover over rooms to discover smart lighting benefits • Click to explore
        </p>
      </div>
    </IPadCard>
  );
};

const StatCard = ({ icon: Icon, number, label, suffix = "" }: { icon: any; number: number; label: string; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (count < number) {
        setCount(count + Math.ceil(number / 50));
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [count, number]);

  return (
    <IPadCard className="text-center p-4">
      <Icon className="w-8 h-8 text-accent mx-auto mb-2" />
      <div className="text-2xl font-bold text-white">{Math.min(count, number)}{suffix}</div>
      <div className="text-xs text-gray-300">{label}</div>
    </IPadCard>
  );
};

const SmartLighting = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Smart Lighting Installation",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Symphony Smart Homes",
      "image": "/og-image.png",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "CO",
        "addressCountry": "US"
      },
      "priceRange": "$$"
    },
    "description": "Professional smart lighting installation services for Vail Valley homes and businesses.",
    "areaServed": "Vail Valley, Colorado",
    "serviceType": "Smart Home Automation"
  };

  const features = [
    { icon: Zap, title: "Energy Efficient", desc: "Save up to 80% on lighting costs" },
    { icon: Eye, title: "Adaptive Lighting", desc: "Automatically adjusts to natural light" },
    { icon: Palette, title: "Color Scenes", desc: "Millions of colors for any mood" },
    { icon: Smartphone, title: "Voice Control", desc: "Works with Alexa, Google, Siri" }
  ];

  return (
    <IPadLayout>
      <SEO 
        title="Smart Lighting Solutions | Home Automation"
        description="Professional smart lighting installation and automation services. Create the perfect ambiance and save energy in your Vail Valley home."
        keywords="smart lighting, home automation, energy efficient lighting, automated lighting control, Vail Valley"
      />
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      
      <section className="pt-4 pb-8">
        <Link to="/services" className="inline-flex items-center text-accent hover:text-accent/90 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Services
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Smart Lighting</h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto mb-6">
            Transform your home with intelligent lighting that adapts to your lifestyle, saves energy, and creates the perfect ambiance for every moment.
          </p>
        </div>

        {/* Interactive Demo & House Diagram */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <InteractiveLightingDemo />
          <InteractiveHouseDiagram />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Zap} number={80} label="Energy Savings" suffix="%" />
          <StatCard icon={Clock} number={25} label="Year Lifespan" />
          <StatCard icon={Lightbulb} number={16} label="Million Colors" suffix="M" />
          <StatCard icon={Sun} number={365} label="Auto Schedules" />
        </div>

        {/* Tabbed Content */}
        <IPadCard className="mb-8">
          <Tabs defaultValue="residential" className="w-full">
            <div className="flex justify-center mb-6">
              <TabsList className="bg-white/5 border border-white/10">
                <TabsTrigger value="residential" className="data-[state=active]:bg-accent data-[state=active]:text-white">
                  Residential
                </TabsTrigger>
                <TabsTrigger value="commercial" className="data-[state=active]:bg-accent data-[state=active]:text-white">
                  Commercial
                </TabsTrigger>
                <TabsTrigger value="outdoor" className="data-[state=active]:bg-accent data-[state=active]:text-white">
                  Outdoor
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="residential" className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Residential Solutions</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Living Spaces</h4>
                  <p className="text-gray-300 text-sm">Create the perfect ambiance for relaxation, entertainment, and daily activities.</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Bedrooms</h4>
                  <p className="text-gray-300 text-sm">Wake up naturally with sunrise simulation and wind down with warm evening tones.</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Kitchen & Dining</h4>
                  <p className="text-gray-300 text-sm">Task lighting for cooking and ambient lighting for dining experiences.</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="commercial" className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Commercial Solutions</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-medium mb-3">Office Buildings</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Circadian rhythm lighting for productivity</li>
                    <li>• Occupancy-based automation</li>
                    <li>• Energy monitoring and reporting</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-3">Retail Spaces</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Dynamic lighting for product displays</li>
                    <li>• Seasonal and promotional themes</li>
                    <li>• Customer experience enhancement</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="outdoor" className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Outdoor Lighting</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80"
                    alt="Outdoor Smart Lighting"
                    className="rounded-lg w-full h-48 object-cover mb-4"
                  />
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Landscape Integration</h4>
                  <p className="text-gray-300 text-sm">Illuminate pathways, highlight architectural features, and create stunning outdoor environments that enhance security and beauty.</p>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Weather-resistant fixtures</li>
                    <li>• Motion sensing capabilities</li>
                    <li>• Astronomical time clock integration</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </IPadCard>

        {/* Call to Action */}
        <IPadCard className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Illuminate Your Space?</h2>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto">
            Experience the future of lighting with our smart automation solutions. Save energy, enhance security, and create the perfect ambiance for every moment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/scheduling?service=smart-lighting">
              <IPadButton size="md">
                Schedule Free Consultation
              </IPadButton>
            </Link>
            <Link to="/contact">
              <IPadButton variant="secondary" size="md">
                Get Quote
              </IPadButton>
            </Link>
          </div>
        </IPadCard>
      </section>
    </IPadLayout>
  );
};

export default SmartLighting;