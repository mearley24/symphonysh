import { ArrowLeft, Volume2, Music, Tv, Headphones, Home, Shield, Lightbulb, Thermometer, Wifi, Sun, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import { Control4Layout } from "../../components/Layout/Control4Layout";
import { Control4Card } from "../../components/ui/control4-card";
import { Control4Button } from "../../components/ui/control4-button";
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

  const ecosystemConnections = [
    { icon: Home, title: "Home Automation", desc: "Integrate with scenes", link: "/services/home-integration" },
    { icon: Lightbulb, title: "Smart Lighting", desc: "Sync lights with music", link: "/services/smart-lighting" },
    { icon: Shield, title: "Security", desc: "Audio alerts & monitoring", link: "/services/security-systems" },
    { icon: Thermometer, title: "Climate", desc: "Ambient audio zones", link: "/services/climate-control" }
  ];

  return (
    <Control4Layout showHeader={false} className="h-screen overflow-hidden">
      <SEO 
        title="Audio Entertainment Systems | Multi-Room Audio Solutions"
        description="Premium home audio and entertainment systems. Multi-room audio, home theaters, and streaming integration for Vail Valley homes."
        keywords="multi-room audio, home theater, audio entertainment, streaming systems, smart audio, Vail Valley"
      />
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/30">
          <div className="flex items-center space-x-4">
            <Link to="/services" className="flex items-center text-slate-300 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Services
            </Link>
            <div className="w-px h-6 bg-slate-600"></div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-700 rounded-lg">
                <Volume2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Audio Entertainment</h1>
                <p className="text-sm text-slate-400">Multi-room audio & home theater</p>
              </div>
            </div>
          </div>
          <Link to="/scheduling?service=audio-entertainment">
            <Control4Button size="sm">Schedule Demo</Control4Button>
          </Link>
        </div>

        {/* Main Content - Split Layout */}
        <div className="flex-1 grid lg:grid-cols-2 gap-6 p-6 overflow-hidden">
          {/* Left Side - Interactive Demo */}
          <div className="flex flex-col">
            <Control4Card variant="glass" className="flex-1 p-6">
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">Live Demo</h2>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Interactive</span>
                </div>
                <div className="flex-1 min-h-0">
                  <AudioEntertainmentDemo />
                </div>
              </div>
            </Control4Card>
          </div>

          {/* Right Side - Content */}
          <div className="flex flex-col space-y-4 overflow-hidden">
            
            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-3">
              <Control4Card className="text-center p-4">
                <div className="text-2xl font-bold text-white">16</div>
                <div className="text-xs text-slate-400">Zones</div>
              </Control4Card>
              <Control4Card className="text-center p-4">
                <div className="text-2xl font-bold text-white">7.2.4</div>
                <div className="text-xs text-slate-400">Atmos</div>
              </Control4Card>
              <Control4Card className="text-center p-4">
                <div className="text-2xl font-bold text-white">CD</div>
                <div className="text-xs text-slate-400">Quality</div>
              </Control4Card>
              <Control4Card className="text-center p-4">
                <div className="text-2xl font-bold text-white">∞</div>
                <div className="text-xs text-slate-400">Services</div>
              </Control4Card>
            </div>

            {/* Tabbed Content */}
            <Control4Card variant="elevated" className="flex-1 min-h-0">
              <Tabs defaultValue="solutions" className="h-full flex flex-col">
                <TabsList className="grid w-full grid-cols-3 m-6 mb-4">
                  <TabsTrigger value="solutions">Solutions</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                  <TabsTrigger value="ecosystem">Ecosystem</TabsTrigger>
                </TabsList>

                <div className="flex-1 px-6 pb-6 overflow-auto">
                  <TabsContent value="solutions" className="space-y-4 mt-0">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/30">
                          <div className="flex items-center space-x-3 mb-2">
                            <Music className="w-5 h-5 text-purple-400" />
                            <h4 className="text-white font-medium">Multi-Room Audio</h4>
                          </div>
                          <p className="text-slate-300 text-sm">Synchronized music throughout your home with individual zone control.</p>
                        </div>
                        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/30">
                          <div className="flex items-center space-x-3 mb-2">
                            <Tv className="w-5 h-5 text-blue-400" />
                            <h4 className="text-white font-medium">Home Theater</h4>
                          </div>
                          <p className="text-slate-300 text-sm">Immersive cinema experiences with Dolby Atmos surround sound.</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/30">
                          <div className="flex items-center space-x-3 mb-2">
                            <Headphones className="w-5 h-5 text-green-400" />
                            <h4 className="text-white font-medium">Streaming</h4>
                          </div>
                          <p className="text-slate-300 text-sm">All your favorite services integrated into one seamless interface.</p>
                        </div>
                        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/30">
                          <div className="flex items-center space-x-3 mb-2">
                            <Sun className="w-5 h-5 text-orange-400" />
                            <h4 className="text-white font-medium">Outdoor Audio</h4>
                          </div>
                          <p className="text-slate-300 text-sm">Weather-resistant entertainment for patios and pool areas.</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="pricing" className="space-y-4 mt-0">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-lg border border-slate-700/30">
                          <h4 className="text-white font-semibold mb-3">Multi-Room Packages</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-slate-300 text-sm">4-Zone System</span>
                              <span className="text-purple-400 font-semibold">$2,500+</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-300 text-sm">8-Zone System</span>
                              <span className="text-purple-400 font-semibold">$4,800+</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-300 text-sm">12-Zone System</span>
                              <span className="text-purple-400 font-semibold">$7,200+</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-lg border border-slate-700/30">
                          <h4 className="text-white font-semibold mb-3">Theater Packages</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-slate-300 text-sm">Essential 5.1</span>
                              <span className="text-purple-400 font-semibold">$8,500+</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-300 text-sm">Premium 7.2.4</span>
                              <span className="text-purple-400 font-semibold">$15,000+</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-300 text-sm">Elite Custom</span>
                              <span className="text-purple-400 font-semibold">$25,000+</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="ecosystem" className="space-y-4 mt-0">
                    <div className="space-y-4">
                      <p className="text-slate-300 text-sm">Your audio system integrates seamlessly with other smart home components:</p>
                      <div className="grid grid-cols-2 gap-3">
                        {ecosystemConnections.map((connection, index) => (
                          <Link key={index} to={connection.link} className="block">
                            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:border-slate-600/50 transition-colors group">
                              <div className="flex items-start space-x-3">
                                <div className="p-2 bg-slate-700/50 rounded-lg group-hover:bg-slate-600/50 transition-colors">
                                  <connection.icon className="w-4 h-4 text-slate-300" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-white font-medium text-sm mb-1">{connection.title}</h4>
                                  <p className="text-slate-400 text-xs">{connection.desc}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-slate-400 transition-colors" />
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </Control4Card>
          </div>
        </div>
      </div>
    </Control4Layout>
  );
};

export default AudioEntertainment;