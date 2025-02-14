
import { ArrowLeft, Thermometer, Sun, Cloud, Wind, BarChart } from "lucide-react";
import { Link } from "react-router-dom";

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg">
    <Icon className="w-6 h-6 text-accent mb-3" />
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const ClimateControl = () => {
  return (
    <div className="min-h-screen bg-primary">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Link to="/services" className="inline-flex items-center text-accent hover:text-accent/90 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Climate Control</h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl">
            Smart climate control systems integrated with Control4 for optimal comfort and efficiency
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Control4 Climate Integration</h2>
              <p className="text-gray-300 mb-6">
                Our climate control solutions seamlessly integrate with Control4's automation platform, 
                allowing you to manage your home's temperature, humidity, and air quality from a single interface. 
                Create schedules, monitor energy usage, and maintain the perfect environment year-round.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <Thermometer className="w-5 h-5 text-accent mr-3" />
                  Multi-zone temperature control
                </li>
                <li className="flex items-center">
                  <BarChart className="w-5 h-5 text-accent mr-3" />
                  Energy usage monitoring
                </li>
                <li className="flex items-center">
                  <Cloud className="w-5 h-5 text-accent mr-3" />
                  Smart humidity management
                </li>
              </ul>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8">
              <img 
                src="/lovable-uploads/66b3d52b-e7b9-476b-b902-f5bd6b8a3e76.png"
                alt="Smart Climate Control System with Mobile App"
                className="rounded-lg w-full h-64 object-cover mb-6"
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-white mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <FeatureCard
              icon={Sun}
              title="Smart Scheduling"
              description="Create custom schedules that adapt to your lifestyle and daily routines."
            />
            <FeatureCard
              icon={Wind}
              title="Air Quality Control"
              description="Monitor and maintain optimal air quality with smart ventilation control."
            />
            <FeatureCard
              icon={BarChart}
              title="Energy Analytics"
              description="Track and optimize your energy usage with detailed analytics and reports."
            />
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Ready to Transform Your Home?</h2>
            <p className="text-gray-300 mb-6">
              Let us help you create the perfect climate control solution for your home.
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

export default ClimateControl;
