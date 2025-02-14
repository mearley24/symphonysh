
import { ArrowLeft, Lightbulb, Power, Clock, Sun, Smartphone, Palette, LampCeiling, LampWallDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg">
    <Icon className="w-6 h-6 text-accent mb-3" />
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

type LightingLoad = {
  id: number;
  title: string;
  icon: any;
  position: { top: string; left: string };
};

const SmartLighting = () => {
  const [activeLoad, setActiveLoad] = useState<number | null>(null);

  const lightingLoads: LightingLoad[] = [
    {
      id: 1,
      title: "Under Cabinet Lighting",
      icon: LampWallDown,
      position: { top: "70%", left: "30%" },
    },
    {
      id: 2,
      title: "Pendant Lights",
      icon: LampCeiling,
      position: { top: "30%", left: "50%" },
    },
    {
      id: 3,
      title: "Recessed Lighting",
      icon: Lightbulb,
      position: { top: "20%", left: "70%" },
    },
  ];

  return (
    <div className="min-h-screen bg-primary">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Link to="/services" className="inline-flex items-center text-accent hover:text-accent/90 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Smart Lighting Solutions</h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl">
            Transform your home's ambiance with intelligent lighting control powered by Control4
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Control4 Integration</h2>
              <p className="text-gray-300 mb-6">
                Our smart lighting solutions seamlessly integrate with Control4's powerful automation platform, 
                giving you complete control over your home's lighting from a single interface. Whether you're 
                using the Control4 app, touchscreen panels, or voice commands, managing your lighting has never 
                been easier.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <Power className="w-5 h-5 text-accent mr-3" />
                  Central control of all lighting fixtures
                </li>
                <li className="flex items-center">
                  <Clock className="w-5 h-5 text-accent mr-3" />
                  Automated schedules and scenes
                </li>
                <li className="flex items-center">
                  <Smartphone className="w-5 h-5 text-accent mr-3" />
                  Mobile app control from anywhere
                </li>
              </ul>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 relative">
              <img 
                src="https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&q=80"
                alt="Smart Kitchen Lighting Control"
                className="rounded-lg w-full h-64 object-cover mb-6"
              />
              {lightingLoads.map((load) => (
                <div
                  key={load.id}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                  style={{ top: load.position.top, left: load.position.left }}
                  onMouseEnter={() => setActiveLoad(load.id)}
                  onMouseLeave={() => setActiveLoad(null)}
                >
                  <div className="relative">
                    <load.icon className="w-6 h-6 text-accent" />
                    {activeLoad === load.id && (
                      <div className="absolute left-full ml-2 whitespace-nowrap bg-black/80 text-white text-sm px-2 py-1 rounded">
                        {load.title}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-white mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <FeatureCard
              icon={Sun}
              title="Daylight Harvesting"
              description="Automatically adjust lighting based on natural light levels to save energy and maintain optimal brightness."
            />
            <FeatureCard
              icon={Clock}
              title="Smart Scheduling"
              description="Create automated schedules that align with your daily routines and lifestyle patterns."
            />
            <FeatureCard
              icon={Palette}
              title="Scene Creation"
              description="Design custom lighting scenes for different occasions, moods, and activities."
            />
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Ready to Transform Your Home?</h2>
            <p className="text-gray-300 mb-6">
              Let us help you design the perfect smart lighting solution for your home.
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Get Started
            </Link>
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

export default SmartLighting;
