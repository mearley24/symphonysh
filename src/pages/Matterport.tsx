
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Home, Building, Factory } from "lucide-react";
import Header from "../components/Header";

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg">
    <Icon className="w-6 h-6 text-accent mb-3" />
    <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
    <p className="text-sm text-gray-300">{description}</p>
  </div>
);

const Matterport = () => {
  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      <section className="pt-32 px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Transform Your Space into an Immersive Digital Experience
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
              Create stunning 3D virtual tours that allow clients to explore your property from anywhere in the world.
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                to="/scheduling?service=matterport-scan" 
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-md transition-colors"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/projects" 
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-md transition-colors"
              >
                View Our Projects <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            <FeatureCard
              icon={Home}
              title="Real Estate"
              description="Create engaging virtual property tours that save time and increase buyer interest."
            />
            <FeatureCard
              icon={Building2}
              title="Hospitality"
              description="Showcase your hotel rooms and facilities with immersive 3D experiences."
            />
            <FeatureCard
              icon={Building}
              title="Commercial Spaces"
              description="Market your office spaces and retail locations with virtual walk-throughs."
            />
            <FeatureCard
              icon={Factory}
              title="Industrial"
              description="Document facilities and create digital twins for better management."
            />
          </div>

          {/* CTA Section */}
          <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-3">Ready to Get Started?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Transform your space into an immersive digital experience today. Contact us for a consultation.
            </p>
            <Link 
              to="/scheduling?service=matterport-scan" 
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-md transition-colors"
            >
              Schedule a Demo <ArrowRight className="w-5 h-5" />
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

export default Matterport;
