import { ArrowLeft, Home, Zap, Lock, Settings, Wifi, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg">
    <Icon className="w-6 h-6 text-accent mb-3" />
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const HomeIntegration = () => {
  return (
    <div className="min-h-screen bg-primary">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Link to="/services" className="inline-flex items-center text-accent hover:text-accent/90 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Home Integration</h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl">
            Seamless integration of all your smart home systems with Control4
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Complete Control4 Integration</h2>
              <p className="text-gray-300 mb-6">
                Transform your home into a fully integrated smart living space with Control4 at its heart. 
                Connect and control all your systems - lighting, climate, security, entertainment, and more - 
                through a single, intuitive interface.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <Settings className="w-5 h-5 text-accent mr-3" />
                  Unified system control
                </li>
                <li className="flex items-center">
                  <Wifi className="w-5 h-5 text-accent mr-3" />
                  Reliable connectivity
                </li>
                <li className="flex items-center">
                  <Globe className="w-5 h-5 text-accent mr-3" />
                  Remote access and control
                </li>
              </ul>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8">
              <img 
                src="/lovable-uploads/646c1725-c4e5-4cf9-9670-0d9633402150.png"
                alt="Smart Home Control Interface with Automated Features"
                className="rounded-lg w-full h-64 object-cover mb-6"
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-white mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <FeatureCard
              icon={Home}
              title="Complete Integration"
              description="Seamlessly connect all your smart home systems into one cohesive ecosystem."
            />
            <FeatureCard
              icon={Zap}
              title="Automation"
              description="Create powerful automation routines that make your home work for you."
            />
            <FeatureCard
              icon={Lock}
              title="Secure Platform"
              description="Enterprise-grade security protecting your smart home network and data."
            />
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Ready for Complete Home Automation?</h2>
            <p className="text-gray-300 mb-6">
              Let us create your perfect integrated smart home experience.
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

export default HomeIntegration;
