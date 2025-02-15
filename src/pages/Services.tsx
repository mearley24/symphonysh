
import { ArrowRight, Home, Shield, Lightbulb, Thermometer, Camera, Speaker, Network, Sun, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

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
      <Header />
      <main className="pt-28">
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">Our Services</h1>
            <p className="text-xl text-gray-300 text-center mb-16 max-w-2xl mx-auto">
              Experience the future of home control with AVA Smart Remote
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard
                icon={Home}
                title="Home Automation"
                description="Simple, intuitive control of your smart home devices with AVA."
                link="/services/home-integration"
              />
              <ServiceCard
                icon={Speaker}
                title="Audio & Entertainment"
                description="Control your TV, music, and streaming services from a single remote."
                link="/services/audio-entertainment"
              />
              <ServiceCard
                icon={Lightbulb}
                title="Smart Lighting"
                description="Effortlessly control your smart lights and create perfect ambiance."
                link="/services/smart-lighting"
              />
              <ServiceCard
                icon={Sun}
                title="Smart Shades"
                description="Manage your automated window treatments with ease."
                link="/services/shades"
              />
              <ServiceCard
                icon={Network}
                title="Networking"
                description="Setup and optimization for reliable smart home connectivity."
                link="/services/networking"
              />
              <ServiceCard
                icon={Thermometer}
                title="Climate Control"
                description="Smart thermostat control for comfort and energy savings."
                link="/services/climate-control"
              />
              <ServiceCard
                icon={Shield}
                title="Security Systems"
                description="Monitor and control your smart security devices."
                link="/services/security-systems"
              />
              <ServiceCard
                icon={Wrench}
                title="Troubleshooting & Setup"
                description="Expert setup and support for your AVA Smart Remote system."
                link="/services/maintenance"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Services;
