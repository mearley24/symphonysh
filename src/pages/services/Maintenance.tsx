
import { ArrowLeft, Wrench, Check, List, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg">
    <Icon className="w-6 h-6 text-accent mb-3" />
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const Maintenance = () => {
  return (
    <div className="min-h-screen bg-primary">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Link to="/services" className="inline-flex items-center text-accent hover:text-accent/90 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Troubleshooting & Maintenance</h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl">
            Professional maintenance and support services to keep your smart home running smoothly
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Professional Support Services</h2>
              <p className="text-gray-300 mb-6">
                Our team of certified technicians provides comprehensive maintenance and troubleshooting 
                services to ensure your Control4 system performs optimally. We offer both scheduled 
                maintenance and rapid response support when issues arise.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <Wrench className="w-5 h-5 text-accent mr-3" />
                  Regular system maintenance
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-accent mr-3" />
                  Performance optimization
                </li>
                <li className="flex items-center">
                  <List className="w-5 h-5 text-accent mr-3" />
                  System updates and upgrades
                </li>
                <li className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-accent mr-3" />
                  Emergency support
                </li>
              </ul>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8">
              <h3 className="text-xl font-semibold text-white mb-4">Maintenance Plans</h3>
              <ul className="space-y-4">
                <li className="bg-white/5 p-4 rounded-lg">
                  <h4 className="text-lg font-medium text-white mb-2">Quarterly Maintenance</h4>
                  <p className="text-gray-300">Regular system checks and updates every 3 months</p>
                </li>
                <li className="bg-white/5 p-4 rounded-lg">
                  <h4 className="text-lg font-medium text-white mb-2">Annual Service</h4>
                  <p className="text-gray-300">Comprehensive yearly system inspection and optimization</p>
                </li>
                <li className="bg-white/5 p-4 rounded-lg">
                  <h4 className="text-lg font-medium text-white mb-2">Priority Support</h4>
                  <p className="text-gray-300">24/7 emergency support with guaranteed response times</p>
                </li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-white mb-8 text-center">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <FeatureCard
              icon={Wrench}
              title="System Diagnostics"
              description="Comprehensive system checks and performance analysis to identify and prevent issues."
            />
            <FeatureCard
              icon={Check}
              title="Preventive Maintenance"
              description="Regular maintenance to ensure optimal performance and prevent system failures."
            />
            <FeatureCard
              icon={AlertCircle}
              title="Emergency Support"
              description="Rapid response technical support for urgent system issues and failures."
            />
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Keep Your System Running Smoothly</h2>
            <p className="text-gray-300 mb-6">
              Contact us to learn more about our maintenance plans and support services.
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

export default Maintenance;
