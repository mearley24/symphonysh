import { ArrowLeft, Lightbulb, Sun, Clock, Smartphone, Zap, Eye, Palette, Play, Pause } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SEO from "../../components/SEO";
import { iPadLayout as IPadLayout } from "../../components/Layout/iPadLayout";
import { iPadCard as IPadCard } from "../../components/ui/ipad-card";
import { iPadButton as IPadButton } from "../../components/ui/ipad-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Slider } from "../../components/ui/slider";

const InteractiveLightingDemo = () => {
  const [brightness, setBrightness] = useState([75]);
  const [selectedScene, setSelectedScene] = useState("relax");
  const [isAutoMode, setIsAutoMode] = useState(false);

  const scenes = {
    relax: { color: "hsl(45, 100%, 80%)", name: "Relax", brightness: 40 },
    focus: { color: "hsl(210, 100%, 90%)", name: "Focus", brightness: 90 },
    party: { color: "hsl(300, 100%, 70%)", name: "Party", brightness: 80 },
    sleep: { color: "hsl(20, 100%, 60%)", name: "Sleep", brightness: 15 }
  };

  useEffect(() => {
    if (isAutoMode) {
      const interval = setInterval(() => {
        const sceneKeys = Object.keys(scenes);
        const currentIndex = sceneKeys.indexOf(selectedScene);
        const nextIndex = (currentIndex + 1) % sceneKeys.length;
        setSelectedScene(sceneKeys[nextIndex]);
        setBrightness([scenes[sceneKeys[nextIndex] as keyof typeof scenes].brightness]);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isAutoMode, selectedScene]);

  const currentScene = scenes[selectedScene as keyof typeof scenes];

  return (
    <IPadCard className="p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Interactive Lighting Control</h3>
      
      {/* Light Bulb Visual */}
      <div className="flex justify-center mb-6">
        <div 
          className="w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 relative"
          style={{ 
            backgroundColor: currentScene.color,
            opacity: brightness[0] / 100,
            boxShadow: `0 0 ${brightness[0]}px ${currentScene.color}`
          }}
        >
          <Lightbulb className="w-16 h-16 text-gray-800" />
        </div>
      </div>

      {/* Scene Selector */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {Object.entries(scenes).map(([key, scene]) => (
          <button
            key={key}
            onClick={() => {
              setSelectedScene(key);
              setBrightness([scene.brightness]);
            }}
            className={`p-3 rounded-xl transition-all duration-300 ${
              selectedScene === key 
                ? 'bg-accent text-white' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <div 
              className="w-4 h-4 rounded-full mx-auto mb-1"
              style={{ backgroundColor: scene.color }}
            />
            <span className="text-xs">{scene.name}</span>
          </button>
        ))}
      </div>

      {/* Brightness Slider */}
      <div className="mb-4">
        <label className="text-sm text-gray-300 mb-2 block">Brightness: {brightness[0]}%</label>
        <Slider
          value={brightness}
          onValueChange={setBrightness}
          max={100}
          step={1}
          className="w-full"
        />
      </div>

      {/* Auto Mode Toggle */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-300">Auto Scene Demo</span>
        <button
          onClick={() => setIsAutoMode(!isAutoMode)}
          className={`p-2 rounded-lg transition-colors ${
            isAutoMode ? 'bg-accent text-white' : 'bg-white/10 text-gray-300'
          }`}
        >
          {isAutoMode ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
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

        {/* Interactive Demo Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <InteractiveLightingDemo />
          
          <div>
            <IPadCard className="p-6 h-full">
              <h3 className="text-lg font-semibold text-white mb-4">Why Smart Lighting?</h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3 group">
                    <div className="bg-accent/20 p-2 rounded-lg group-hover:bg-accent/30 transition-colors">
                      <feature.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm">{feature.title}</h4>
                      <p className="text-gray-300 text-xs">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </IPadCard>
          </div>
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