
import { ArrowRight, Home, Shield, Lightbulb, Thermometer, Camera, Speaker } from "lucide-react";

const ServiceCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg hover:bg-white/10 transition-all duration-300">
    <Icon className="w-8 h-8 text-accent mb-4" />
    <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const Services = () => {
  return (
    <div className="min-h-screen bg-primary">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">Our Services</h1>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-2xl mx-auto">
            Comprehensive home automation solutions tailored to your lifestyle
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={Lightbulb}
              title="Smart Lighting"
              description="Automated lighting systems that create the perfect ambiance and save energy."
            />
            <ServiceCard
              icon={Shield}
              title="Security Systems"
              description="Advanced security solutions with smart locks and surveillance cameras."
            />
            <ServiceCard
              icon={Thermometer}
              title="Climate Control"
              description="Intelligent temperature control for optimal comfort and efficiency."
            />
            <ServiceCard
              icon={Speaker}
              title="Audio & Entertainment"
              description="Multi-room audio systems and home theater solutions."
            />
            <ServiceCard
              icon={Camera}
              title="Video Surveillance"
              description="HD cameras with remote monitoring and smart alerts."
            />
            <ServiceCard
              icon={Home}
              title="Home Integration"
              description="Seamless integration of all your smart home systems."
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
