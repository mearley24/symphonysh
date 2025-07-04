
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
            Rock-solid connectivity that powers your entire smart home without breaking a sweat
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">The Foundation of Smart Living</h2>
              <p className="text-gray-300 mb-6">
                Your smart home is only as good as its network. Buffering videos, dropped video calls, and 
                unresponsive smart devices are signs of an inadequate network. We build enterprise-grade 
                infrastructure that handles everything from 4K streaming to dozens of connected devices 
                without missing a beat.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <Router className="w-5 h-5 text-accent mr-3" />
                  Commercial-grade equipment built to last
                </li>
                <li className="flex items-center">
                  <Wifi className="w-5 h-5 text-accent mr-3" />
                  Seamless coverage in every corner
                </li>
                <li className="flex items-center">
                  <Network className="w-5 h-5 text-accent mr-3" />
                  Proactive monitoring and maintenance
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

          <h2 className="text-2xl font-semibold text-white mb-8 text-center">Enterprise-Grade Solutions</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <FeatureCard
              icon={Router}
              title="Professional Hardware"
              description="Business-class routers and switches designed for 24/7 operation and maximum performance."
            />
            <FeatureCard
              icon={Globe}
              title="Strategic Placement"
              description="Carefully positioned access points eliminate dead zones and ensure consistent speed."
            />
            <FeatureCard
              icon={Cloud}
              title="Smart Management"
              description="Automated updates, performance monitoring, and remote troubleshooting keep you connected."
            />
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Ready for Bulletproof Connectivity?</h2>
            <p className="text-gray-300 mb-6">
              Build the network foundation your smart home deserves.
            </p>
            <Link 
              to="/scheduling?service=networking"
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
