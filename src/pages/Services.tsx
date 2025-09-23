import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowRight, Home, Volume2, Shield, Lightbulb, Thermometer, Wifi, Wrench, Sun, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { iPadLayout as IPadLayout } from "../components/Layout/iPadLayout";
import { iPadCard as IPadCard } from "../components/ui/ipad-card";
import { iPadButton as IPadButton } from "../components/ui/ipad-button";
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
    <IPadLayout>
      <SEO 
        title="Smart Home Services - Control4 Automation in Vail Valley"
        description="Complete smart home services including Control4 automation, home theaters, security systems, smart lighting, and more in Vail Valley, Colorado."
        keywords="smart home services, Control4, home automation, home theater, security systems, smart lighting, Vail Valley"
      />
      
      <section className="pt-4 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Smart Home Services
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience the future of home automation with our comprehensive suite of integrated smart home solutions
          </p>
        </div>

        {/* Main Featured Service Display */}
        <div className="mb-8">
          <IPadCard className="p-0 overflow-hidden relative">
            <div className={`bg-gradient-to-br ${currentServiceData.gradient} p-8 text-white relative`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-8 gap-4 h-full">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div key={i} className="border border-white/20 rounded"></div>
                  ))}
                </div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-4 bg-white/20 rounded-xl backdrop-blur-sm">
                      <currentServiceData.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{currentServiceData.title}</h2>
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
                      onClick={() => setIsAutoRotating(!isAutoRotating)}
                      className="bg-white/20 hover:bg-white/30 text-white border-none"
                    >
                      {isAutoRotating ? <Maximize2 className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
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

                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <p className="text-lg text-white/90 mb-6 leading-relaxed">
                      {currentServiceData.preview}
                    </p>
                    
                    <div className="flex flex-wrap gap-3 mb-6">
                      {currentServiceData.features.map((feature, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <Link to={currentServiceData.link}>
                      <IPadButton className="bg-white text-gray-900 hover:bg-white/90">
                        Explore {currentServiceData.title} <ArrowRight className="w-4 h-4 ml-2" />
                      </IPadButton>
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
            </div>

            {/* Progress Indicator */}
            <div className="p-4 bg-white/5">
              <div className="flex justify-center space-x-2">
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
          </IPadCard>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {services.map((service, index) => (
            <Link key={index} to={service.link}>
              <IPadCard 
                className={`h-32 p-4 transition-all duration-300 cursor-pointer ${
                  index === currentService 
                    ? 'border-accent bg-accent/10 scale-105' 
                    : 'hover:border-accent/30 hover:scale-105'
                } ${
                  hoveredService === index ? 'animate-scale-in' : ''
                }`}
              >
                <div className="flex flex-col items-center text-center h-full justify-center space-y-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${service.gradient} transition-transform duration-300 ${
                    hoveredService === index ? 'scale-110' : ''
                  }`}>
                    <service.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xs font-semibold text-white">{service.title}</h3>
                  <p className="text-gray-400 text-xs leading-tight line-clamp-1">
                    {service.features[0]}
                  </p>
                </div>
              </IPadCard>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="flex justify-center">
          <IPadCard className="text-center max-w-2xl p-6">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">
                Ready to Transform Your Home?
              </h2>
              <p className="text-sm text-gray-300">
                Let our experts design a custom smart home solution tailored to your lifestyle and needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <Link to="/scheduling">
                  <IPadButton className="w-full sm:w-auto">
                    Schedule Consultation <ArrowRight className="w-4 h-4 ml-2" />
                  </IPadButton>
                </Link>
                <Link to="/projects">
                  <IPadButton variant="secondary" className="w-full sm:w-auto">
                    View Our Work
                  </IPadButton>
                </Link>
              </div>
            </div>
          </IPadCard>
        </div>
      </section>
    </IPadLayout>
  );
};

export default Services;