
import { ArrowLeft, Camera, Eye, Bell, Shield, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg">
    <Icon className="w-6 h-6 text-accent mb-3" />
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const VideoSurveillance = () => {
  return (
    <div className="min-h-screen bg-primary">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Link to="/services" className="inline-flex items-center text-accent hover:text-accent/90 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Video Surveillance</h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl">
            Advanced video monitoring solutions integrated with Control4 for comprehensive home security
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Control4 Camera Integration</h2>
              <p className="text-gray-300 mb-6">
                Our video surveillance systems seamlessly integrate with Control4, providing you with 
                real-time monitoring and recording capabilities. View your cameras from any Control4 
                interface, receive intelligent alerts, and ensure your home is always protected.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <Camera className="w-5 h-5 text-accent mr-3" />
                  HD camera systems
                </li>
                <li className="flex items-center">
                  <Eye className="w-5 h-5 text-accent mr-3" />
                  24/7 monitoring
                </li>
                <li className="flex items-center">
                  <Bell className="w-5 h-5 text-accent mr-3" />
                  Smart motion detection
                </li>
              </ul>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8">
              <img 
                src="https://images.unsplash.com/photo-1557317081-341c04601c13?auto=format&fit=crop&q=80"
                alt="Video Surveillance"
                className="rounded-lg w-full h-64 object-cover mb-6"
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-white mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <FeatureCard
              icon={Camera}
              title="Smart Cameras"
              description="High-definition cameras with night vision and wide-angle viewing capabilities."
            />
            <FeatureCard
              icon={Shield}
              title="Secure Recording"
              description="Cloud storage and local backup options for all your surveillance footage."
            />
            <FeatureCard
              icon={Smartphone}
              title="Mobile Access"
              description="View live feeds and recordings from anywhere using the Control4 app."
            />
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Protect Your Home</h2>
            <p className="text-gray-300 mb-6">
              Let us design a comprehensive video surveillance solution for your property.
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

export default VideoSurveillance;
