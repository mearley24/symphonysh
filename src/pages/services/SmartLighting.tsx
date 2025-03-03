import { ArrowLeft, Lightbulb, Sun, Clock, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import Footer from "../../components/Footer";

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg">
    <Icon className="w-6 h-6 text-accent mb-3" />
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const SmartLighting = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Smart Lighting Installation",
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
    "description": "Professional smart lighting installation services integrated with Control4 for Vail Valley homes and businesses.",
    "areaServed": "Vail Valley, Colorado",
    "serviceType": "Smart Home Automation"
  };

  return (
    <div className="min-h-screen bg-primary">
      <SEO 
        title="Smart Lighting Solutions | Control4 Integration"
        description="Professional smart lighting installation and automation services integrated with Control4. Create the perfect ambiance and save energy in your Vail Valley home."
        keywords="smart lighting, home automation, Control4 lighting, energy efficient lighting, automated lighting control, Vail Valley"
      />
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Link to="/services" className="inline-flex items-center text-accent hover:text-accent/90 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Smart Lighting</h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl">
            Automated lighting systems that create the perfect ambiance and save energy
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Control4 Lighting Integration</h2>
              <p className="text-gray-300 mb-6">
                Our smart lighting solutions seamlessly integrate with Control4, allowing you to automate 
                your lights for optimal ambiance, convenience, and energy efficiency. Create scenes, schedules, 
                and control your lights from any Control4 interface.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <Sun className="w-5 h-5 text-accent mr-3" />
                  Automated sun tracking
                </li>
                <li className="flex items-center">
                  <Clock className="w-5 h-5 text-accent mr-3" />
                  Scheduled operations
                </li>
                <li className="flex items-center">
                  <Smartphone className="w-5 h-5 text-accent mr-3" />
                  Multi-device control
                </li>
              </ul>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8">
              <img 
                src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&q=80"
                alt="Smart Lighting Control Interface with Automated Features"
                className="rounded-lg w-full h-64 object-cover mb-6"
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-white mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <FeatureCard
              icon={Lightbulb}
              title="Smart Control"
              description="Control your lights from anywhere using the Control4 app."
            />
            <FeatureCard
              icon={Sun}
              title="Automated Schedules"
              description="Create custom lighting schedules that adapt to your lifestyle."
            />
            <FeatureCard
              icon={Clock}
              title="Energy Efficiency"
              description="Reduce energy consumption with automated lighting control."
            />
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Ready to Transform Your Lighting?</h2>
            <p className="text-gray-300 mb-6">
              Let us help you design the perfect smart lighting solution for your home.
            </p>
            <Link 
              to="/scheduling?service=smart-lighting"
              className="inline-flex items-center bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SmartLighting;
