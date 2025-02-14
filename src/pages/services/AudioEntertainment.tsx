
import { ArrowLeft, Music, Speaker, Radio, Wifi, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg">
    <Icon className="w-6 h-6 text-accent mb-3" />
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const AudioEntertainment = () => {
  return (
    <div className="min-h-screen bg-primary">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Link to="/services" className="inline-flex items-center text-accent hover:text-accent/90 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Audio Entertainment</h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl">
            Premium multi-room audio solutions powered by Control4's entertainment ecosystem
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Control4 Audio Integration</h2>
              <p className="text-gray-300 mb-6">
                Experience music throughout your home with our Control4-integrated audio solutions. 
                Stream different music in every room, create custom playlists, and control everything 
                from a single interface. Perfect for both everyday enjoyment and entertaining.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <Speaker className="w-5 h-5 text-accent mr-3" />
                  Multi-room audio distribution
                </li>
                <li className="flex items-center">
                  <Music className="w-5 h-5 text-accent mr-3" />
                  High-fidelity sound quality
                </li>
                <li className="flex items-center">
                  <Wifi className="w-5 h-5 text-accent mr-3" />
                  Wireless streaming capabilities
                </li>
              </ul>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8">
              <img 
                src="https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80"
                alt="Home Audio System"
                className="rounded-lg w-full h-64 object-cover mb-6"
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-white mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <FeatureCard
              icon={Speaker}
              title="Multi-Room Audio"
              description="Play different music in every room or sync them all together for whole-house audio."
            />
            <FeatureCard
              icon={Radio}
              title="Streaming Services"
              description="Integrate with popular streaming services like Spotify, Apple Music, and more."
            />
            <FeatureCard
              icon={Settings}
              title="Custom Controls"
              description="Create personalized scenes and controls for different occasions and moods."
            />
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Elevate Your Audio Experience</h2>
            <p className="text-gray-300 mb-6">
              Let us design the perfect audio entertainment system for your home.
            </p>
            <Link 
              to="/scheduling"
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

export default AudioEntertainment;
