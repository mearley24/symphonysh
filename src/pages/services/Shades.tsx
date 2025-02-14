
import { ArrowLeft, Sun, SunDim, Clock, Remote, Smartphone } from "lucide-react";
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

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Smart Shades</h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl">
            Automated window treatments integrated with Control4 for enhanced comfort and energy efficiency
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Control4 Shades Integration</h2>
              <p className="text-gray-300 mb-6">
                Our smart shading solutions seamlessly integrate with Control4, allowing you to automate 
                your window treatments for optimal comfort, privacy, and energy efficiency. Create schedules, 
                scenes, and control your shades from any Control4 interface.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <Sun className="w-5 h-5 text-accent mr-3" />
                  Automated sun protection
                </li>
                <li className="flex items-center">
                  <Clock className="w-5 h-5 text-accent mr-3" />
                  Scheduled operations
                </li>
                <li className="flex items-center">
                  <Remote className="w-5 h-5 text-accent mr-3" />
                  Multi-device control
                </li>
              </ul>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8">
              <img 
                src="https://images.unsplash.com/photo-1439337153520-7082a56a81f4?auto=format&fit=crop&q=80"
                alt="Smart Shades"
                className="rounded-lg w-full h-64 object-cover mb-6"
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-white mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <FeatureCard
              icon={SunDim}
              title="Light Control"
              description="Automatically adjust shades based on sunlight and time of day."
            />
            <FeatureCard
              icon={Clock}
              title="Smart Scheduling"
              description="Create custom schedules that align with your daily routines."
            />
            <FeatureCard
              icon={Smartphone}
              title="Remote Control"
              description="Control your shades from anywhere using the Control4 app."
            />
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Enhance Your Home's Comfort</h2>
            <p className="text-gray-300 mb-6">
              Let us design the perfect smart shading solution for your home.
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

export default Shades;
