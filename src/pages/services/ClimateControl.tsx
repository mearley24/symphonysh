
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
            Perfect comfort in every room, automatically adjusted to your preferences and the weather outside
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Comfort That Anticipates</h2>
              <p className="text-gray-300 mb-6">
                Forget about walking into rooms that are too hot or too cold. Our intelligent climate systems 
                learn your preferences, track weather patterns, and even consider your daily schedule to 
                ensure every space is perfectly comfortable before you arrive.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <Thermometer className="w-5 h-5 text-accent mr-3" />
                  Precision zone control for every room
                </li>
                <li className="flex items-center">
                  <BarChart className="w-5 h-5 text-accent mr-3" />
                  Real-time energy optimization
                </li>
                <li className="flex items-center">
                  <Cloud className="w-5 h-5 text-accent mr-3" />
                  Automatic humidity balancing
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

          <h2 className="text-2xl font-semibold text-white mb-8 text-center">Intelligent Climate Features</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <FeatureCard
              icon={Sun}
              title="Predictive Heating"
              description="Your home starts warming up before you wake up, cooling down before you sleep."
            />
            <FeatureCard
              icon={Wind}
              title="Air Quality Management"
              description="Automatic ventilation control maintains fresh, healthy air throughout your home."
            />
            <FeatureCard
              icon={BarChart}
              title="Efficiency Analytics"
              description="Track energy usage patterns and receive suggestions for maximum savings."
            />
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Experience Perfect Comfort</h2>
            <p className="text-gray-300 mb-6">
              Discover how intelligent climate control can enhance your comfort while reducing energy costs.
            </p>
            <Link 
              to="/scheduling?service=climate-control"
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
