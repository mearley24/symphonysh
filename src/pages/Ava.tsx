
import { ArrowLeft, Download, Smartphone, Wifi, Settings, Timer } from "lucide-react";
import { Link } from "react-router-dom";

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg">
    <Icon className="w-6 h-6 text-accent mb-3" />
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const Ava = () => {
  return (
    <div className="min-h-screen bg-primary">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Link to="/" className="inline-flex items-center text-accent hover:text-accent/90 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">AVA Smart Remote</h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl">
            The future of home control in your hands. Simple, intuitive, and powerful.
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Remote Control Excellence</h2>
              <p className="text-gray-300 mb-6">
                AVA Smart Remote brings unprecedented control and simplicity to your smart home experience. 
                With its intuitive interface and powerful features, managing your home's technology has never been easier.
              </p>
              <div className="space-y-4">
                <a 
                  href="https://bxsdjxkbhjtdrrtjtyto.supabase.co/storage/v1/object/public/ava-docs/AVA_User_Manual.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download User Manual
                </a>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8">
              <img 
                src="https://bxsdjxkbhjtdrrtjtyto.supabase.co/storage/v1/object/public/ava-docs/AVA_Remote.jpg"
                alt="AVA Smart Remote"
                className="rounded-lg w-full h-64 object-cover mb-6"
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-white mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <FeatureCard
              icon={Smartphone}
              title="Intuitive Control"
              description="Simple, user-friendly interface for controlling all your smart home devices."
            />
            <FeatureCard
              icon={Wifi}
              title="Wireless Freedom"
              description="Seamless wireless connectivity for reliable control throughout your home."
            />
            <FeatureCard
              icon={Settings}
              title="Custom Programming"
              description="Fully customizable to match your specific needs and preferences."
            />
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Ready to Experience AVA?</h2>
            <p className="text-gray-300 mb-6">
              Let us help you transform your home control experience with AVA Smart Remote.
            </p>
            <Link 
              to="/scheduling?service=ava"
              className="inline-flex items-center bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Schedule a Demo
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
