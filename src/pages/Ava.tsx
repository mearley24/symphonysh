
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Shield, 
  Video, 
  Mic, 
  User, 
  Users, 
  Settings,
  Headset
} from "lucide-react";
import Header from "../components/Header";

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg hover:bg-white/10 transition-all duration-300">
    <Icon className="w-8 h-8 text-accent mb-4" />
    <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const ResourceCard = ({ title, description, link }: { title: string; description: string; link: string }) => (
  <Link to={link} className="block">
    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg hover:bg-white/10 transition-all duration-300">
      <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <div className="flex items-center text-accent">
        Learn More <ArrowRight className="w-4 h-4 ml-2" />
      </div>
    </div>
  </Link>
);

const Ava = () => {
  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Secure Video Conferencing for Your Business
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Enterprise-grade security and compliance for virtual meetings and collaboration
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-md transition-colors text-lg"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <FeatureCard
              icon={Shield}
              title="Enterprise Security"
              description="End-to-end encryption and security features to protect your communications."
            />
            <FeatureCard
              icon={Video}
              title="HD Video Conferencing"
              description="Crystal clear video meetings with support for large groups."
            />
            <FeatureCard
              icon={Mic}
              title="Advanced Audio"
              description="Noise cancellation and crystal clear audio for professional meetings."
            />
            <FeatureCard
              icon={Users}
              title="Team Collaboration"
              description="Built-in tools for team messaging and file sharing."
            />
            <FeatureCard
              icon={Settings}
              title="Easy Integration"
              description="Seamlessly integrate with your existing business tools and workflows."
            />
            <FeatureCard
              icon={Headset}
              title="24/7 Support"
              description="Enterprise-grade support whenever you need assistance."
            />
          </div>

          {/* Resources Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Resources & Documentation</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <ResourceCard
                title="Getting Started Guide"
                description="Learn how to set up and configure your AVA environment."
                link="/contact"
              />
              <ResourceCard
                title="Security Overview"
                description="Detailed information about our security features and compliance."
                link="/contact"
              />
              <ResourceCard
                title="API Documentation"
                description="Technical documentation for developers and integrators."
                link="/contact"
              />
              <ResourceCard
                title="Best Practices"
                description="Tips and guidelines for optimal usage of AVA features."
                link="/contact"
              />
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg p-12 mb-20">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Communication?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already using AVA for secure video conferencing
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-md transition-colors"
            >
              Contact Sales <ArrowRight className="w-5 h-5" />
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

export default Ava;
