
import { ArrowLeft, Sun, SunDim, Clock, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg">
    <Icon className="w-6 h-6 text-accent mb-3" />
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const Shades = () => {
  return (
    <div className="min-h-screen bg-primary">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Link to="/services" className="inline-flex items-center text-accent hover:text-accent/90 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Shades</h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl">
            Automated window treatments that respond to sunlight, weather, and your daily routines
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Privacy and Comfort, Automated</h2>
              <p className="text-gray-300 mb-6">
                Picture waking up to shades that gradually open with the sunrise, automatically closing 
                during the day's hottest hours to keep your home cool, then perfectly positioning 
                themselves for your evening movie. Our motorized shades don't just follow schedules—they 
                adapt to weather patterns and your lifestyle.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <Sun className="w-5 h-5 text-accent mr-3" />
                  Solar-responsive positioning
                </li>
                <li className="flex items-center">
                  <Clock className="w-5 h-5 text-accent mr-3" />
                  Lifestyle-based automation
                </li>
                <li className="flex items-center">
                  <Smartphone className="w-5 h-5 text-accent mr-3" />
                  Voice and app control
                </li>
              </ul>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8">
              <img 
                src="/lovable-uploads/82ceba00-9f66-4905-b5a8-be6979b7f744.png"
                alt="Shades Control Interface"
                className="rounded-lg w-full h-64 object-cover mb-6"
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-white mb-8 text-center">Intelligent Window Control</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <FeatureCard
              icon={SunDim}
              title="Dynamic Light Control"
              description="Automatically filter harsh sunlight while preserving your views and natural illumination."
            />
            <FeatureCard
              icon={Clock}
              title="Routine Integration"
              description="Coordinate with your daily schedule for privacy when needed, openness when desired."
            />
            <FeatureCard
              icon={Smartphone}
              title="Effortless Operation"
              description="Control individual shades or entire rooms with simple voice commands or mobile app."
            />
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Transform Your Windows</h2>
            <p className="text-gray-300 mb-6">
              Experience the perfect balance of privacy, comfort, and energy efficiency.
            </p>
            <Link 
              to="/scheduling?service=shades"
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

export default Shades;
