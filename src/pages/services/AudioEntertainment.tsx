
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
            Fill every corner of your home with pristine sound that follows you from room to room
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Your Personal Concert Hall</h2>
              <p className="text-gray-300 mb-6">
                Whether you're hosting a dinner party or enjoying a quiet evening, our audio solutions adapt 
                to every moment. Start your morning playlist in the bedroom, have it follow you to the kitchen, 
                and seamlessly transition to the living room—all without missing a beat.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <Speaker className="w-5 h-5 text-accent mr-3" />
                  Whole-home audio distribution
                </li>
                <li className="flex items-center">
                  <Music className="w-5 h-5 text-accent mr-3" />
                  Audiophile-grade sound quality
                </li>
                <li className="flex items-center">
                  <Wifi className="w-5 h-5 text-accent mr-3" />
                  Seamless streaming from any device
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

          <h2 className="text-2xl font-semibold text-white mb-8 text-center">Immersive Audio Solutions</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <FeatureCard
              icon={Speaker}
              title="Zone Management"
              description="Independent control for each room, or sync everything for house-wide entertainment."
            />
            <FeatureCard
              icon={Radio}
              title="Universal Access"
              description="Connect Spotify, Apple Music, Pandora, and more—your music, your way."
            />
            <FeatureCard
              icon={Settings}
              title="Mood-Based Scenes"
              description="Pre-configured audio settings for dinner parties, relaxation, or energizing workouts."
            />
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Ready to Hear the Difference?</h2>
            <p className="text-gray-300 mb-6">
              Experience how premium audio can transform your home's atmosphere.
            </p>
            <Link 
              to="/scheduling?service=audio-entertainment"
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
