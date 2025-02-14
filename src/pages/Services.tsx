
import { ArrowRight, Home, Shield, Lightbulb, Thermometer, Camera, Speaker, Network, Sun, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

const ServiceCard = ({ icon: Icon, title, description, link }: { icon: any; title: string; description: string; link: string }) => (
  <Link to={link} className="block h-full">
    <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg hover:bg-white/10 transition-all duration-300 h-full flex flex-col">
      <Icon className="w-8 h-8 text-accent mb-4" />
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-gray-300 mb-4 flex-grow">{description}</p>
      <div className="flex items-center text-accent mt-auto">
        Learn More <ArrowRight className="w-4 h-4 ml-2" />
      </div>
    </div>
  </Link>
);

const Services = () => {
  return (
    <div className="min-h-screen bg-primary">
      <header className="fixed top-0 left-0 right-0 bg-secondary/80 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-white">
              Symphony
            </Link>
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/services" className="text-white font-medium">
                Services
              </Link>
              <Link to="/projects" className="text-gray-300 hover:text-white transition-colors">
                Projects
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-accent hover:text-accent/90 transition-colors">
                Contact
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">Our Services</h1>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-2xl mx-auto">
            Comprehensive home automation solutions powered by Control4
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={Home}
              title="Home Integration"
              description="Seamless integration of all your smart home systems."
              link="/services/home-integration"
            />
            <ServiceCard
              icon={Speaker}
              title="Audio & Entertainment"
              description="Multi-room audio systems and home theater solutions."
              link="/services/audio-entertainment"
            />
            <ServiceCard
              icon={Lightbulb}
              title="Smart Lighting"
              description="Automated lighting systems that create the perfect ambiance and save energy."
              link="/services/smart-lighting"
            />
            <ServiceCard
              icon={Sun}
              title="Smart Shades"
              description="Automated window treatments for comfort and energy efficiency."
              link="/services/shades"
            />
            <ServiceCard
              icon={Network}
              title="Networking"
              description="Enterprise-grade networking solutions for reliable smart home performance."
              link="/services/networking"
            />
            <ServiceCard
              icon={Thermometer}
              title="Climate Control"
              description="Intelligent temperature control for optimal comfort and efficiency."
              link="/services/climate-control"
            />
            <ServiceCard
              icon={Shield}
              title="Security Systems"
              description="Advanced security solutions including cameras, smart locks, and monitoring."
              link="/services/security-systems"
            />
            <ServiceCard
              icon={Wrench}
              title="Troubleshooting & Maintenance"
              description="Professional system maintenance and technical support services."
              link="/services/maintenance"
            />
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 text-center text-gray-400 bg-primary">
        <p className="text-sm">
          © 2024 Symphony Smart Homes. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Services;
