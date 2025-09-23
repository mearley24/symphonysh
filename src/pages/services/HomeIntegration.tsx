import { ArrowLeft, Home, Lightbulb, Shield, Volume2, Smartphone, Zap, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import { iPadLayout as IPadLayout } from "../../components/Layout/iPadLayout";
import { iPadCard as IPadCard } from "../../components/ui/ipad-card";
import { iPadButton as IPadButton } from "../../components/ui/ipad-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { HomeAutomationDemo } from "../../components/service-demos/HomeAutomationDemo";

const HomeIntegration = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Home Integration & Automation",
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
    "description": "Professional Control4 home automation and integration services for Vail Valley homes.",
    "areaServed": "Vail Valley, Colorado",
    "serviceType": "Smart Home Automation"
  };

  const features = [
    { icon: Zap, title: "One-Touch Control", desc: "Control everything with a single tap" },
    { icon: Home, title: "Unified Experience", desc: "All systems work together seamlessly" },
    { icon: Smartphone, title: "Remote Access", desc: "Control from anywhere in the world" },
    { icon: Clock, title: "Smart Scenes", desc: "Automated routines for daily activities" }
  ];

  return (
    <IPadLayout>
      <SEO 
        title="Home Automation & Integration | Control4 Systems"
        description="Professional Control4 home automation and integration services. Unified smart home control for lighting, climate, security, and entertainment in Vail Valley."
        keywords="home automation, Control4, smart home integration, unified control, home systems, Vail Valley"
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Home Integration</h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto mb-6">
            Experience seamless smart home control with Control4 automation systems designed for modern living in Vail Valley.
          </p>
        </div>

        {/* Interactive Demo */}
        <div className="mb-8">
          <HomeAutomationDemo />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <IPadCard className="text-center p-4">
            <div className="text-2xl font-bold text-white">300+</div>
            <div className="text-xs text-gray-300">Devices Controlled</div>
          </IPadCard>
          <IPadCard className="text-center p-4">
            <div className="text-2xl font-bold text-white">50+</div>
            <div className="text-xs text-gray-300">Integrated Brands</div>
          </IPadCard>
          <IPadCard className="text-center p-4">
            <div className="text-2xl font-bold text-white">24/7</div>
            <div className="text-xs text-gray-300">System Reliability</div>
          </IPadCard>
          <IPadCard className="text-center p-4">
            <div className="text-2xl font-bold text-white">10+</div>
            <div className="text-xs text-gray-300">Years Experience</div>
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
          <Tabs defaultValue="systems" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="systems">Integrated Systems</TabsTrigger>
              <TabsTrigger value="benefits">Key Benefits</TabsTrigger>
              <TabsTrigger value="process">Our Process</TabsTrigger>
            </TabsList>

            <TabsContent value="systems" className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Systems We Integrate</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <Lightbulb className="w-6 h-6 text-accent mb-2" />
                  <h4 className="text-white font-medium mb-2">Lighting Control</h4>
                  <p className="text-gray-300 text-sm">Smart lighting scenes, automated schedules, and energy-efficient LED integration.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <Shield className="w-6 h-6 text-accent mb-2" />
                  <h4 className="text-white font-medium mb-2">Security Integration</h4>
                  <p className="text-gray-300 text-sm">Cameras, door locks, motion sensors, and alarm systems unified in one interface.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <Volume2 className="w-6 h-6 text-accent mb-2" />
                  <h4 className="text-white font-medium mb-2">Audio/Video Systems</h4>
                  <p className="text-gray-300 text-sm">Multi-room audio, home theaters, and streaming service integration.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <Zap className="w-6 h-6 text-accent mb-2" />
                  <h4 className="text-white font-medium mb-2">Climate Control</h4>
                  <p className="text-gray-300 text-sm">Smart thermostats, HVAC systems, and automated temperature management.</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="benefits" className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Why Choose Integration?</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Simplified Control</h4>
                    <p className="text-gray-300 text-xs">One app controls everything - no more juggling multiple interfaces.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Enhanced Automation</h4>
                    <p className="text-gray-300 text-xs">Systems work together intelligently to anticipate your needs.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Increased Value</h4>
                    <p className="text-gray-300 text-xs">Smart home integration significantly increases property value.</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="process" className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Integration Process</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-semibold text-sm">1</div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Discovery & Planning</h4>
                    <p className="text-gray-300 text-xs">We assess your current systems and design the integration plan.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-semibold text-sm">2</div>
                  <div>
                    <h4 className="text-white font-medium text-sm">System Installation</h4>
                    <p className="text-gray-300 text-xs">Professional installation of Control4 controllers and interfaces.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-semibold text-sm">3</div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Programming & Testing</h4>
                    <p className="text-gray-300 text-xs">Custom programming and thorough system testing for optimal performance.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-semibold text-sm">4</div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Training & Support</h4>
                    <p className="text-gray-300 text-xs">Comprehensive training and ongoing support for your new system.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </IPadCard>

        {/* Call to Action */}
        <IPadCard className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Integrate Your Home?</h2>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto">
            Transform your house into an intelligent home where everything works together seamlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/scheduling?service=home-integration">
              <IPadButton size="md">
                Schedule Consultation
              </IPadButton>
            </Link>
            <Link to="/projects">
              <IPadButton variant="secondary" size="md">
                View Projects
              </IPadButton>
            </Link>
          </div>
        </IPadCard>
      </section>
    </IPadLayout>
  );
};

export default HomeIntegration;