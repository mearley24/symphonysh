
import { ArrowLeft, Shield, Lock, Bell, Eye, Smartphone, Wifi, Camera } from "lucide-react";
import { Link } from "react-router-dom";

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg">
    <Icon className="w-6 h-6 text-accent mb-3" />
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const SecuritySystems = () => {
  return (
    <div className="min-h-screen bg-primary">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Link to="/services" className="inline-flex items-center text-accent hover:text-accent/90 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Security Systems</h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl">
            Comprehensive security and surveillance solutions integrated with Control4 for complete peace of mind
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Integrated Security Solution</h2>
              <p className="text-gray-300 mb-6">
                Our security systems seamlessly integrate with Control4's automation platform, providing 
                unified control over your entire home security ecosystem. Monitor and manage your security 
                system through Control4's intuitive interface, whether you're at home or away.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <Lock className="w-5 h-5 text-accent mr-3" />
                  Smart lock integration and monitoring
                </li>
                <li className="flex items-center">
                  <Camera className="w-5 h-5 text-accent mr-3" />
                  HD surveillance cameras with night vision
                </li>
                <li className="flex items-center">
                  <Bell className="w-5 h-5 text-accent mr-3" />
                  Real-time alerts and notifications
                </li>
                <li className="flex items-center">
                  <Eye className="w-5 h-5 text-accent mr-3" />
                  24/7 professional monitoring available
                </li>
              </ul>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8">
              <img 
                src="/lovable-uploads/1d7a78ef-4d02-453d-aeea-81e50fb784b6.png"
                alt="Home Security System Dashboard"
                className="rounded-lg w-full h-64 object-cover mb-6"
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-white mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <FeatureCard
              icon={Lock}
              title="Smart Access Control"
              description="Manage and monitor all entry points with smart locks and access controls integrated with Control4."
            />
            <FeatureCard
              icon={Camera}
              title="Video Surveillance"
              description="HD cameras with night vision, smart motion detection, and cloud storage options."
            />
            <FeatureCard
              icon={Bell}
              title="Intelligent Alerts"
              description="Receive instant notifications for any security events or unusual activity."
            />
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg mb-16">
            <h2 className="text-2xl font-semibold text-white mb-4">Video Surveillance Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-center">
                    <Camera className="w-5 h-5 text-accent mr-3" />
                    HD cameras with wide-angle viewing
                  </li>
                  <li className="flex items-center">
                    <Eye className="w-5 h-5 text-accent mr-3" />
                    Night vision capabilities
                  </li>
                  <li className="flex items-center">
                    <Smartphone className="w-5 h-5 text-accent mr-3" />
                    Mobile access and remote viewing
                  </li>
                  <li className="flex items-center">
                    <Wifi className="w-5 h-5 text-accent mr-3" />
                    Cloud storage and local backup
                  </li>
                </ul>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1557317081-341c04601c13?auto=format&fit=crop&q=80"
                  alt="Video Surveillance"
                  className="rounded-lg w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Protect Your Home Today</h2>
            <p className="text-gray-300 mb-6">
              Let us design a comprehensive security solution tailored to your needs.
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

export default SecuritySystems;
