import { ArrowLeft, Volume2, Play, Pause, SkipForward, Music, Tv, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import { iPadLayout as IPadLayout } from "../../components/Layout/iPadLayout";
import { iPadCard as IPadCard } from "../../components/ui/ipad-card";
import { iPadButton as IPadButton } from "../../components/ui/ipad-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { AudioEntertainmentDemo } from "../../components/service-demos/AudioEntertainmentDemo";

const AudioEntertainment = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Audio Entertainment Systems",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Symphony Smart Homes",
      "image": "/og-image.png",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "CO",
        "addressCountry": "US"
      },
      "priceRange": "$$"
    },
    "description": "Premium multi-room audio and home theater systems for Vail Valley homes.",
    "areaServed": "Vail Valley, Colorado",
    "serviceType": "Audio Entertainment"
  };

  const features = [
    { icon: Music, title: "Multi-Room Audio", desc: "Synchronized music throughout your home" },
    { icon: Tv, title: "Home Theater", desc: "Immersive cinema experiences" },
    { icon: Headphones, title: "Streaming Integration", desc: "All your services in one place" },
    { icon: Volume2, title: "Outdoor Audio", desc: "Weather-resistant entertainment" }
  ];

  return (
    <IPadLayout>
      <SEO 
        title="Audio Entertainment Systems | Multi-Room Audio Solutions"
        description="Premium home audio and entertainment systems. Multi-room audio, home theaters, and streaming integration for Vail Valley homes."
        keywords="multi-room audio, home theater, audio entertainment, streaming systems, smart audio, Vail Valley"
      />
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      
      <section className="pt-4 pb-8">
        <Link to="/services" className="inline-flex items-center text-accent hover:text-accent/90 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Services
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Audio Entertainment</h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto mb-6">
            Create immersive audio experiences with premium home theater systems and whole-home audio solutions.
          </p>
        </div>

        {/* Interactive Demo */}
        <div className="mb-8">
          <AudioEntertainmentDemo />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <IPadCard className="text-center p-4">
            <div className="text-2xl font-bold text-white">16</div>
            <div className="text-xs text-gray-300">Audio Zones</div>
          </IPadCard>
          <IPadCard className="text-center p-4">
            <div className="text-2xl font-bold text-white">7.2.4</div>
            <div className="text-xs text-gray-300">Dolby Atmos</div>
          </IPadCard>
          <IPadCard className="text-center p-4">
            <div className="text-2xl font-bold text-white">CD</div>
            <div className="text-xs text-gray-300">Quality Wireless</div>
          </IPadCard>
          <IPadCard className="text-center p-4">
            <div className="text-2xl font-bold text-white">∞</div>
            <div className="text-xs text-gray-300">Streaming Services</div>
          </IPadCard>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {features.map((feature, index) => (
            <IPadCard key={index} className="p-4 text-center">
              <div className="bg-accent/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-white font-semibold mb-1 text-sm">{feature.title}</h3>
              <p className="text-gray-300 text-xs">{feature.desc}</p>
            </IPadCard>
          ))}
        </div>

        {/* Tabbed Content */}
        <IPadCard className="mb-8">
          <Tabs defaultValue="whole-home" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="whole-home">Whole Home Audio</TabsTrigger>
              <TabsTrigger value="theater">Home Theater</TabsTrigger>
              <TabsTrigger value="outdoor">Outdoor Entertainment</TabsTrigger>
            </TabsList>

            <TabsContent value="whole-home" className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Multi-Room Audio Systems</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Synchronized Zones</h4>
                    <p className="text-gray-300 text-sm">Play the same music throughout your home or different music in each room.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Streaming Integration</h4>
                    <p className="text-gray-300 text-sm">Access Spotify, Apple Music, Pandora, and more from one interface.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Voice Control</h4>
                    <p className="text-gray-300 text-sm">Control your music with Alexa, Google Assistant, or Siri commands.</p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">Pricing</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">4-Zone System</span>
                      <span className="text-accent font-semibold">$2,500+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">8-Zone System</span>
                      <span className="text-accent font-semibold">$4,800+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">12-Zone System</span>
                      <span className="text-accent font-semibold">$7,200+</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="theater" className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Home Theater Solutions</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Dolby Atmos</h4>
                    <p className="text-gray-300 text-sm">Immersive 3D audio that puts you in the center of the action.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">4K Projection</h4>
                    <p className="text-gray-300 text-sm">Crystal clear images with HDR support for the ultimate visual experience.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Acoustic Treatment</h4>
                    <p className="text-gray-300 text-sm">Professional room optimization for perfect sound quality.</p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">Theater Packages</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Essential 5.1</span>
                      <span className="text-accent font-semibold">$8,500+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Premium 7.2.4</span>
                      <span className="text-accent font-semibold">$15,000+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Elite Custom</span>
                      <span className="text-accent font-semibold">$25,000+</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="outdoor" className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Outdoor Entertainment</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Weather Resistant</h4>
                    <p className="text-gray-300 text-sm">IP65-rated speakers designed for Colorado mountain weather.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Landscape Integration</h4>
                    <p className="text-gray-300 text-sm">Discreet installation that blends with your outdoor design.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Pool & Patio Audio</h4>
                    <p className="text-gray-300 text-sm">Perfect sound zones for entertaining and relaxation.</p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">Outdoor Packages</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Patio System</span>
                      <span className="text-accent font-semibold">$1,800+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Pool Area</span>
                      <span className="text-accent font-semibold">$3,200+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Full Landscape</span>
                      <span className="text-accent font-semibold">$5,500+</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </IPadCard>

        {/* Call to Action */}
        <IPadCard className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Hear the Difference?</h2>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto">
            Experience how premium audio can transform your home's atmosphere. From background music to cinematic entertainment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/scheduling?service=audio-entertainment">
              <IPadButton size="md">
                Schedule Audio Demo
              </IPadButton>
            </Link>
            <Link to="/projects">
              <IPadButton variant="secondary" size="md">
                View Our Work
              </IPadButton>
            </Link>
          </div>
        </IPadCard>
      </section>
    </IPadLayout>
  );
};

export default AudioEntertainment;