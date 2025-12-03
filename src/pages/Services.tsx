import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowRight, Home, Volume2, Shield, Lightbulb, Thermometer, Wifi, Wrench, Sun, ChevronLeft, ChevronRight, Maximize2, Play } from "lucide-react";
import { Control4Layout } from "../components/Layout/Control4Layout";
import { Control4Card } from "../components/ui/control4-card";
import { Control4Button } from "../components/ui/control4-button";
import { Button } from "../components/ui/button";
import SEO from "../components/SEO";

const Services = () => {
  const [currentService, setCurrentService] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const services = [
    {
      icon: Home,
      title: "Home Automation", 
      description: "Control4 integration for seamless smart home control",
      link: "/services/home-integration",
      features: ["Unified system control", "Custom automation", "Remote access"],
      gradient: "from-blue-600 to-purple-700",
      preview: "Smart home control at your fingertips with integrated lighting, climate, and entertainment systems."
    },
    {
      icon: Volume2,
      title: "Audio & Entertainment",
      description: "Premium home theater and multi-room audio systems",
      link: "/services/audio-entertainment", 
      features: ["Home theaters", "Multi-room audio", "Streaming integration"],
      gradient: "from-purple-600 to-pink-700",
      preview: "Immersive audio experiences with wireless multi-room streaming and cinema-quality sound."
    },
    {
      icon: Shield,
      title: "Security",
      description: "Advanced security solutions integrated with your smart home",
      link: "/services/security-systems",
      features: ["Smart cameras", "Access control", "Mobile monitoring"],
      gradient: "from-red-600 to-orange-700",
      preview: "Complete security monitoring with smart cameras, locks, and 24/7 mobile access."
    },
    {
      icon: Lightbulb,
      title: "Smart Lighting",
      description: "Intelligent lighting control throughout your home",
      link: "/services/smart-lighting",
      features: ["Smart scenes", "Energy efficiency", "Voice control"],
      gradient: "from-yellow-500 to-orange-600",
      preview: "Dynamic lighting that adapts to your lifestyle with voice control and energy savings."
    },
    {
      icon: Thermometer,
      title: "Climate Control",
      description: "Smart HVAC systems for optimal comfort and efficiency",
      link: "/services/climate-control",
      features: ["Smart thermostats", "Zone control", "Energy savings"],
      gradient: "from-green-500 to-teal-600",
      preview: "Intelligent climate systems that learn your preferences and optimize energy usage."
    },
    {
      icon: Wifi,
      title: "Networking",
      description: "Robust network infrastructure for your connected home",
      link: "/services/networking",
      features: ["WiFi optimization", "Wired networks", "Enterprise grade"],
      gradient: "from-cyan-500 to-blue-600",
      preview: "Enterprise-grade networking with seamless WiFi coverage throughout your entire home."
    },
    {
      icon: Sun,
      title: "Shades",
      description: "Window treatments for privacy and energy efficiency",
      link: "/services/shades",
      features: ["Motorized shades", "Smart scheduling", "Solar integration"],
      gradient: "from-amber-500 to-yellow-600",
      preview: "Automated window treatments that respond to sunlight and enhance energy efficiency."
    },
    {
      icon: Wrench,
      title: "Maintenance",
      description: "Ongoing support to keep your smart home running perfectly",
      link: "/services/maintenance",
      features: ["Regular updates", "24/7 support", "System optimization"],
      gradient: "from-gray-600 to-slate-700",
      preview: "Professional maintenance and support to keep your smart home systems running smoothly."
    }
  ];

  // Auto-rotate through services
  useEffect(() => {
    if (isAutoRotating) {
      const timer = setInterval(() => {
        setCurrentService((prev) => (prev + 1) % services.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [isAutoRotating, services.length]);

  const nextService = () => {
    setCurrentService((prev) => (prev + 1) % services.length);
    setIsAutoRotating(false);
  };

  const prevService = () => {
    setCurrentService((prev) => (prev - 1 + services.length) % services.length);
    setIsAutoRotating(false);
  };

  const currentServiceData = services[currentService];

  return (
    <Control4Layout showHeader={false} className="h-screen overflow-hidden">
      <SEO 
        title="Smart Home Services - Control4 Automation in Vail Valley"
        description="Complete smart home services including Control4 automation, home theaters, security systems, smart lighting, and more in Vail Valley, Colorado."
        keywords="smart home services, Control4, home automation, home theater, security systems, smart lighting, Vail Valley"
      />
      
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/30">
          <div className="flex items-center gap-6">
            <Link to="/">
              <img 
                src="/lovable-uploads/1d7a78ef-4d02-453d-aeea-81e50fb784b6.png" 
                alt="Symphony Smart Homes Logo" 
                className="h-12 w-auto hover:opacity-80 transition-opacity"
              />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Smart Home Ecosystem</h1>
              <p className="text-slate-400 text-sm">Integrated solutions for modern living</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Control4Button 
              variant="secondary" 
              size="sm"
              onClick={() => setIsAutoRotating(!isAutoRotating)}
            >
              {isAutoRotating ? 'Pause' : 'Auto Tour'} <Play className="w-4 h-4 ml-2" />
            </Control4Button>
            <Link to="/scheduling">
              <Control4Button size="sm">
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </Control4Button>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 grid lg:grid-cols-3 gap-6 p-6 overflow-hidden">
          
          {/* Left - Featured Service */}
          <div className="lg:col-span-2">
            <Control4Card variant="glass" className="h-full p-0 overflow-hidden">
              <div className={`bg-gradient-to-br ${currentServiceData.gradient} h-full relative`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-12 gap-2 h-full p-4">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <div key={i} className="border border-white/20 rounded"></div>
                    ))}
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-4 bg-white/20 rounded-xl backdrop-blur-sm">
                        <currentServiceData.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">{currentServiceData.title}</h2>
                        <p className="text-white/80">{currentServiceData.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={prevService}
                        className="bg-white/20 hover:bg-white/30 text-white border-none"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={nextService}
                        className="bg-white/20 hover:bg-white/30 text-white border-none"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex-1 flex items-center">
                    <div className="grid md:grid-cols-2 gap-8 items-center w-full">
                      <div>
                        <p className="text-lg text-white/90 mb-6 leading-relaxed">
                          {currentServiceData.preview}
                        </p>
                        
                        <div className="flex flex-wrap gap-3 mb-6">
                          {currentServiceData.features.map((feature, idx) => (
                            <span 
                              key={idx} 
                              className="px-3 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm text-white"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>

                        <Link to={currentServiceData.link}>
                          <Control4Button className="bg-white text-gray-900 hover:bg-white/90">
                            Explore {currentServiceData.title} <ArrowRight className="w-4 h-4 ml-2" />
                          </Control4Button>
                        </Link>
                      </div>

                      <div className="relative">
                        <div className="aspect-square bg-white/10 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                          <currentServiceData.icon className="w-32 h-32 text-white/30" />
                          <div className="absolute inset-4 border-2 border-white/20 rounded-xl animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Indicator */}
                  <div className="flex justify-center space-x-2 mt-6">
                    {services.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentService(index);
                          setIsAutoRotating(false);
                        }}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === currentService 
                            ? 'w-8 bg-white' 
                            : 'w-2 bg-white/30 hover:bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Control4Card>
          </div>

          {/* Right - Services Grid */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">All Services</h3>
              <div className="grid grid-cols-1 gap-3">
                {services.map((service, index) => (
                  <Link key={index} to={service.link}>
                    <Control4Card 
                      variant={index === currentService ? "elevated" : "default"}
                      glow={index === currentService}
                      className="p-4 transition-all duration-300 cursor-pointer hover:scale-105"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${service.gradient} transition-transform duration-300`}>
                          <service.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold text-sm">{service.title}</h4>
                          <p className="text-slate-400 text-xs">{service.features[0]}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500" />
                      </div>
                    </Control4Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Control4Layout>
  );
};

export default Services;