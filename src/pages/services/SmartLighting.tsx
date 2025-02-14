
import { ArrowLeft, Lightbulb, Power, Clock, Sun, Smartphone, Palette } from "lucide-react";
import { Link } from "react-router-dom";

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg">
    <Icon className="w-6 h-6 text-accent mb-3" />
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const SmartLighting = () => {
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
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8">
              <img 
                src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&q=80"
                alt="Smart Lighting Control"
                className="rounded-lg w-full h-64 object-cover mb-6"
              />
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
