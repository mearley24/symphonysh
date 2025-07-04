
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

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Security</h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl">
            Advanced protection that thinks ahead, keeping your family and property safe 24/7
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Peace of Mind, Automated</h2>
              <p className="text-gray-300 mb-6">
                Your security system should work smarter, not harder. Our solutions learn your routines, 
                recognize familiar faces, and distinguish between a family member arriving home and an 
                unwelcome visitor. Get instant alerts that matter, not false alarms that don't.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <Lock className="w-5 h-5 text-accent mr-3" />
                  Intelligent access control with user recognition
                </li>
                <li className="flex items-center">
                  <Camera className="w-5 h-5 text-accent mr-3" />
                  4K cameras with AI-powered motion detection
                </li>
                <li className="flex items-center">
                  <Bell className="w-5 h-5 text-accent mr-3" />
                  Smart alerts that learn your preferences
                </li>
                <li className="flex items-center">
                  <Eye className="w-5 h-5 text-accent mr-3" />
                  Optional professional monitoring services
                </li>
              </ul>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8">
              <img 
                src="/lovable-uploads/860a30b2-c8df-4e9e-b327-3efecb18a16f.png"
                alt="Comprehensive Home Security System"
                className="rounded-lg w-full h-64 object-cover mb-6"
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-white mb-8 text-center">Intelligent Protection</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <FeatureCard
              icon={Lock}
              title="Smart Entry Points"
              description="Keyless entry with facial recognition, temporary access codes, and automatic locking."
            />
            <FeatureCard
              icon={Camera}
              title="Proactive Surveillance"
              description="Cameras that recognize familiar faces and only alert you to genuine security concerns."
            />
            <FeatureCard
              icon={Bell}
              title="Contextual Alerts"
              description="Notifications that understand the difference between your dog and an intruder."
            />
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg mb-16">
            <h2 className="text-2xl font-semibold text-white mb-4">Advanced Monitoring Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-center">
                    <Camera className="w-5 h-5 text-accent mr-3" />
                    Ultra-wide field cameras with color night vision
                  </li>
                  <li className="flex items-center">
                    <Eye className="w-5 h-5 text-accent mr-3" />
                    AI-powered behavior analysis
                  </li>
                  <li className="flex items-center">
                    <Smartphone className="w-5 h-5 text-accent mr-3" />
                    Real-time mobile alerts with video clips
                  </li>
                  <li className="flex items-center">
                    <Wifi className="w-5 h-5 text-accent mr-3" />
                    Secure cloud storage with local backup
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
            <h2 className="text-2xl font-semibold text-white mb-4">Secure Your Sanctuary</h2>
            <p className="text-gray-300 mb-6">
              Experience security that adapts to your life, not the other way around.
            </p>
            <Link 
              to="/scheduling?service=security-systems"
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

export default SecuritySystems;
