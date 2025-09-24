import { ArrowLeft, Home, Lightbulb, Shield, Volume2, Smartphone, Zap, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import { Control4Layout } from "../../components/Layout/Control4Layout";
import { Control4Card } from "../../components/ui/control4-card";
import { Control4Button } from "../../components/ui/control4-button";
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
    <Control4Layout>
      <SEO 
        title="Home Automation & Integration | Control4 Systems"
        description="Professional Control4 home automation and integration services. Unified smart home control for lighting, climate, security, and entertainment in Vail Valley."
        keywords="home automation, Control4, smart home integration, unified control, home systems, Vail Valley"
      />
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      
      <section className="pt-4 pb-8 space-y-8">
        <Link to="/services" className="inline-flex items-center text-accent hover:text-accent/90">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Services
        </Link>

        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Home Integration</h1>
          <p className="text-gray-300 text-base max-w-2xl mx-auto">
            Experience seamless smart home control with Control4 automation systems designed for modern living in Vail Valley.
          </p>
        </div>

        {/* Interactive Demo */}
        <HomeAutomationDemo />

        {/* Key Features */}
        <Control4Card>
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Why Choose Home Integration?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </Control4Card>

        {/* Systems Integration */}
        <Control4Card>
          <h2 className="text-2xl font-bold text-white mb-6">Systems We Integrate</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-lg p-6">
              <Lightbulb className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-white font-semibold mb-3">Lighting Control</h3>
              <p className="text-gray-300">Smart lighting scenes, automated schedules, and energy-efficient LED integration.</p>
            </div>
            <div className="bg-white/5 rounded-lg p-6">
              <Shield className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-white font-semibold mb-3">Security Integration</h3>
              <p className="text-gray-300">Cameras, door locks, motion sensors, and alarm systems unified in one interface.</p>
            </div>
            <div className="bg-white/5 rounded-lg p-6">
              <Volume2 className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-white font-semibold mb-3">Audio/Video Systems</h3>
              <p className="text-gray-300">Multi-room audio, home theaters, and streaming service integration.</p>
            </div>
            <div className="bg-white/5 rounded-lg p-6">
              <Zap className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-white font-semibold mb-3">Climate Control</h3>
              <p className="text-gray-300">Smart thermostats, HVAC systems, and automated temperature management.</p>
            </div>
          </div>
        </Control4Card>

        {/* Call to Action */}
        <Control4Card className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Integrate Your Home?</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Transform your house into an intelligent home where everything works together seamlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/scheduling?service=home-integration">
              <Control4Button size="lg">
                Schedule Consultation
              </Control4Button>
            </Link>
            <Link to="/projects">
              <Control4Button variant="secondary" size="lg">
                View Projects
              </Control4Button>
            </Link>
          </div>
        </Control4Card>
      </section>
    </Control4Layout>
  );
};

export default HomeIntegration;