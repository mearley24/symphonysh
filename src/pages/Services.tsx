
import { Link } from "react-router-dom";
import { ArrowRight, Home, Volume2, Shield, Lightbulb, Thermometer, Wifi, Wrench, Sun } from "lucide-react";
import { iPadLayout as IPadLayout } from "../components/Layout/iPadLayout";
import { iPadCard as IPadCard } from "../components/ui/ipad-card";
import { iPadButton as IPadButton } from "../components/ui/ipad-button";
import { iPadGrid as IPadGrid } from "../components/ui/ipad-grid";
import SEO from "../components/SEO";

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Home Automation",
      description: "Complete Control4 integration for seamless smart home control",
      link: "/services/home-integration",
      features: ["Unified system control", "Custom automation", "Remote access"]
    },
    {
      icon: Volume2,
      title: "Audio & Entertainment",
      description: "Premium home theater and multi-room audio systems",
      link: "/services/audio-entertainment",
      features: ["Home theaters", "Multi-room audio", "Streaming integration"]
    },
    {
      icon: Shield,
      title: "Security",
      description: "Advanced security solutions integrated with your smart home",
      link: "/services/security-systems",
      features: ["Smart cameras", "Access control", "Mobile monitoring"]
    },
    {
      icon: Lightbulb,
      title: "Smart Lighting",
      description: "Intelligent lighting control throughout your home",
      link: "/services/smart-lighting",
      features: ["Automated scenes", "Energy efficiency", "Voice control"]
    },
    {
      icon: Thermometer,
      title: "Climate Control",
      description: "Smart HVAC systems for optimal comfort and efficiency",
      link: "/services/climate-control",
      features: ["Smart thermostats", "Zone control", "Energy savings"]
    },
    {
      icon: Wifi,
      title: "Networking",
      description: "Robust network infrastructure for your connected home",
      link: "/services/networking",
      features: ["WiFi optimization", "Wired networks", "Enterprise grade"]
    },
    {
      icon: Sun,
      title: "Shades",
      description: "Automated window treatments for privacy and energy efficiency",
      link: "/services/shades",
      features: ["Motorized shades", "Smart scheduling", "Solar integration"]
    },
    {
      icon: Wrench,
      title: "Maintenance",
      description: "Ongoing support to keep your smart home running perfectly",
      link: "/services/maintenance",
      features: ["Regular updates", "24/7 support", "System optimization"]
    }
  ];

  return (
    <IPadLayout>
      <SEO 
        title="Smart Home Services - Control4 Automation in Vail Valley"
        description="Complete smart home services including Control4 automation, home theaters, security systems, smart lighting, and more in Vail Valley, Colorado."
        keywords="smart home services, Control4, home automation, home theater, security systems, smart lighting, Vail Valley"
      />
      
      <section className="pt-4 pb-8">
        <div className="text-center mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-white mb-2">
            Our Services
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-lg mx-auto leading-relaxed">
            Comprehensive smart home solutions designed to enhance your lifestyle
          </p>
        </div>

        <IPadGrid columns={2} gap="sm" className="mb-6">
          {services.map((service, index) => (
            <Link key={index} to={service.link}>
              <IPadCard className="h-full p-4">
                <div className="flex flex-col h-full">
                  <service.icon className="w-5 h-5 text-accent mb-2" />
                  <h3 className="text-sm font-semibold text-white mb-1">{service.title}</h3>
                  <p className="text-gray-300 mb-2 text-xs leading-relaxed flex-grow">{service.description}</p>
                  
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1 text-xs text-gray-400">
                      {service.features.map((feature, idx) => (
                        <span key={idx} className="flex items-center">
                          <ArrowRight className="w-2 h-2 text-accent mr-1 flex-shrink-0" />
                          {feature}
                          {idx < service.features.length - 1 && <span className="mx-1">•</span>}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <IPadButton variant="ghost" size="sm" className="text-xs px-4 py-2">
                      Learn More <ArrowRight className="w-2 h-2" />
                    </IPadButton>
                  </div>
                </div>
              </IPadCard>
            </Link>
          ))}
        </IPadGrid>

        <IPadCard className="text-center max-w-xl mx-auto">
          <h2 className="text-lg md:text-xl font-bold text-white mb-2">
            Ready to Get Started?
          </h2>
          <p className="text-sm text-gray-300 mb-4">
            Let us design the perfect smart home solution for your needs.
          </p>
          <Link to="/scheduling">
            <IPadButton size="sm">
              Schedule Your Consultation <ArrowRight className="w-3 h-3" />
            </IPadButton>
          </Link>
        </IPadCard>
      </section>
    </IPadLayout>
  );
};

export default Services;
