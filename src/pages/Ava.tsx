
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Shield, 
  Video, 
  Mic, 
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
              Welcome to the Future of Smart Technology
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Your premier destination for innovative solutions tailored to modern living and business needs. Experience cutting-edge technology designed to enhance efficiency, productivity, and lifestyle.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-md transition-colors text-lg"
            >
              Explore Solutions <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <FeatureCard
              icon={Shield}
              title="Enterprise Security"
              description="State-of-the-art security features to protect your business and data."
            />
            <FeatureCard
              icon={Video}
              title="Smart Solutions"
              description="Cutting-edge technology for seamless integration and control."
            />
            <FeatureCard
              icon={Mic}
              title="Voice Control"
              description="Advanced voice recognition for effortless command of your environment."
            />
            <FeatureCard
              icon={Users}
              title="Collaborative Tools"
              description="Enhanced team productivity with integrated communication systems."
            />
            <FeatureCard
              icon={Settings}
              title="Custom Integration"
              description="Tailored solutions that adapt to your specific needs and workflows."
            />
            <FeatureCard
              icon={Headset}
              title="Expert Support"
              description="24/7 dedicated support to ensure your success with AVA solutions."
            />
          </div>

          {/* Why Choose AVA Section */}
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold text-white mb-8">Why Choose AVA</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              At AVA, we specialize in delivering innovative solutions that transform how you live and work. Our commitment to excellence drives us to provide cutting-edge technology that empowers and inspires.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <ResourceCard
                title="Business Solutions"
                description="Streamline operations and boost productivity with our enterprise-grade solutions."
                link="/contact"
              />
              <ResourceCard
                title="Smart Home Integration"
                description="Transform your living space with intelligent automation and control."
                link="/contact"
              />
              <ResourceCard
                title="Technology Innovation"
                description="Stay ahead with our constantly evolving suite of smart solutions."
                link="/contact"
              />
              <ResourceCard
                title="Customer Success"
                description="Join thousands of satisfied customers experiencing the AVA difference."
                link="/contact"
              />
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg p-12 mb-20">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience the Future?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the growing community of innovators who trust AVA for their technology needs
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-md transition-colors"
            >
              Get Started Today <ArrowRight className="w-5 h-5" />
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
