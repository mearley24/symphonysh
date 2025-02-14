
import { ArrowLeft, Wifi, Network, Router, Globe, Cloud } from "lucide-react";
import { Link } from "react-router-dom";

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg">
    <Icon className="w-6 h-6 text-accent mb-3" />
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const Networking = () => {
  return (
    <div className="min-h-screen bg-primary">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Link to="/services" className="inline-flex items-center text-accent hover:text-accent/90 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Home Networking</h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl">
            Enterprise-grade networking solutions integrated with Control4 for reliable smart home performance
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Control4 Network Integration</h2>
              <p className="text-gray-300 mb-6">
                Our networking solutions provide the robust foundation needed for your Control4 smart home 
                system. With enterprise-grade equipment and professional installation, we ensure reliable 
                connectivity for all your smart home devices and streaming needs.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <Router className="w-5 h-5 text-accent mr-3" />
                  Enterprise-grade networking equipment
                </li>
                <li className="flex items-center">
                  <Wifi className="w-5 h-5 text-accent mr-3" />
                  Whole-home WiFi coverage
                </li>
                <li className="flex items-center">
                  <Network className="w-5 h-5 text-accent mr-3" />
                  Network monitoring and support
                </li>
              </ul>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8">
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80"
                alt="Home Networking"
                className="rounded-lg w-full h-64 object-cover mb-6"
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-white mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <FeatureCard
              icon={Router}
              title="Professional Equipment"
              description="Enterprise-grade routers and access points for reliable performance."
            />
            <FeatureCard
              icon={Globe}
              title="Complete Coverage"
              description="Strategically placed access points for whole-home WiFi coverage."
            />
            <FeatureCard
              icon={Cloud}
              title="Remote Management"
              description="24/7 monitoring and remote support for your network."
            />
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Ready to Upgrade Your Network?</h2>
            <p className="text-gray-300 mb-6">
              Let us design a professional networking solution for your smart home.
            </p>
            <Link 
              to="/scheduling"
              className="inline-flex items-center bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Schedule a Consultation
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

export default Networking;
