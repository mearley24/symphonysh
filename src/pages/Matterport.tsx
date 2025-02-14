
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Home, Building, Factory } from "lucide-react";
import Header from "../components/Header";

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg">
    <Icon className="w-8 h-8 text-accent mb-4" />
    <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const Matterport = () => {
  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Transform Your Space into an Immersive Digital Experience
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Create stunning 3D virtual tours that allow clients to explore your property from anywhere in the world.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-md transition-colors text-lg"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Demo Video/Image Section */}
          <div className="relative rounded-lg overflow-hidden mb-20">
            <img 
              src="https://cdn.matterport.com/wp-content/uploads/2023/06/30120543/homebuyers_prefer_3d_virtual_tours_hero-1.jpg" 
              alt="Matterport Demo"
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-white text-center">
                <h2 className="text-3xl font-bold mb-4">See it in Action</h2>
                <p className="text-lg mb-6">Experience our virtual tours firsthand</p>
                <Link 
                  to="/projects" 
                  className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-md transition-colors"
                >
                  View Demo Tours
                </Link>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
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
          <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Transform your space into an immersive digital experience today. Contact us for a consultation.
            </p>
            <Link 
              to="/contact" 
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
