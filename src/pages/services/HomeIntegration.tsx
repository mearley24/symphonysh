
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

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Home Automation</h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl">
            Transform your house into an intelligent living space where every system works in perfect harmony
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">The Power of Control4</h2>
              <p className="text-gray-300 mb-6">
                Imagine walking into your home and having everything respond to your presence. Lights dim to the 
                perfect level, your favorite music begins playing, the temperature adjusts automatically, and your 
                security system disarms—all without lifting a finger. This is the magic of Control4 automation.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <Settings className="w-5 h-5 text-accent mr-3" />
                  One-touch control of multiple systems
                </li>
                <li className="flex items-center">
                  <Wifi className="w-5 h-5 text-accent mr-3" />
                  Rock-solid wireless connectivity
                </li>
                <li className="flex items-center">
                  <Globe className="w-5 h-5 text-accent mr-3" />
                  Control from anywhere in the world
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

          <h2 className="text-2xl font-semibold text-white mb-8 text-center">Why Choose Integration?</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <FeatureCard
              icon={Home}
              title="Unified Experience"
              description="No more juggling multiple apps. One interface controls your entire home ecosystem effortlessly."
            />
            <FeatureCard
              icon={Zap}
              title="Smart Scenes"
              description="Create personalized experiences like 'Movie Night' or 'Good Morning' that adjust multiple systems instantly."
            />
            <FeatureCard
              icon={Lock}
              title="Enterprise Security"
              description="Military-grade encryption protects your home network and personal data around the clock."
            />
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Ready to Experience True Automation?</h2>
            <p className="text-gray-300 mb-6">
              Discover how a fully integrated smart home can simplify and enhance your daily life.
            </p>
            <Link 
              to="/scheduling?service=home-integration"
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

export default HomeIntegration;
