
import { Link } from "react-router-dom";
import { ArrowRight, Home, Volume2, Shield, Lightbulb, Thermometer, Wifi, Wrench, Sun } from "lucide-react";
import { iPadLayout } from "../components/Layout/iPadLayout";
import { iPadCard } from "../components/ui/ipad-card";
import { iPadButton } from "../components/ui/ipad-button";
import { iPadGrid } from "../components/ui/ipad-grid";
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
      title: "Security Systems",
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
      title: "Smart Shades",
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
    <iPadLayout>
      <SEO 
        title="Smart Home Services - Control4 Automation in Vail Valley"
        description="Complete smart home services including Control4 automation, home theaters, security systems, smart lighting, and more in Vail Valley, Colorado."
        keywords="smart home services, Control4, home automation, home theater, security systems, smart lighting, Vail Valley"
      />
      
      <section className="pt-6 pb-12">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Our Services
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
            Comprehensive smart home solutions designed to enhance your lifestyle
          </p>
        </div>

        <iPadGrid columns={2} gap="md" className="mb-8">
          {services.map((service, index) => (
            <Link key={index} to={service.link}>
              <iPadCard className="h-full">
                <service.icon className="w-8 h-8 text-accent mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-gray-300 mb-3 text-sm leading-relaxed">{service.description}</p>
                
                <ul className="space-y-1 mb-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-gray-400 flex items-center text-xs">
                      <ArrowRight className="w-3 h-3 text-accent mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <iPadButton variant="ghost" size="sm" className="mt-auto">
                  Learn More <ArrowRight className="w-3 h-3 ml-2" />
                </iPadButton>
              </iPadCard>
            </Link>
          ))}
        </iPadGrid>

        <iPadCard className="text-center max-w-2xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
            Ready to Get Started?
          </h2>
          <p className="text-base text-gray-300 mb-5">
            Let us design the perfect smart home solution for your needs.
          </p>
          <Link to="/scheduling">
            <iPadButton size="md">
              Schedule Your Consultation <ArrowRight className="w-4 h-4 ml-2" />
            </iPadButton>
          </Link>
        </iPadCard>
      </section>
    </iPadLayout>
  );
};

export default Services;
