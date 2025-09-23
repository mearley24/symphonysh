import { ArrowLeft, Shield, Camera, Lock, Eye, AlertTriangle, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import { iPadLayout as IPadLayout } from "../../components/Layout/iPadLayout";
import { iPadCard as IPadCard } from "../../components/ui/ipad-card";
import { iPadButton as IPadButton } from "../../components/ui/ipad-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { SecuritySystemDemo } from "../../components/service-demos/SecuritySystemDemo";

const SecuritySystems = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Security Systems Installation",
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
    "description": "Advanced smart security systems integrated with home automation for Vail Valley properties.",
    "areaServed": "Vail Valley, Colorado",
    "serviceType": "Security Systems"
  };

  const features = [
    { icon: Camera, title: "4K Surveillance", desc: "Crystal clear video monitoring" },
    { icon: Lock, title: "Smart Access Control", desc: "Keyless entry with mobile control" },
    { icon: AlertTriangle, title: "AI-Powered Alerts", desc: "Intelligent threat detection" },
    { icon: Eye, title: "24/7 Monitoring", desc: "Professional monitoring services" }
  ];

  return (
    <IPadLayout>
      <SEO 
        title="Security Systems | Smart Home Security Solutions"
        description="Advanced security solutions seamlessly integrated with your smart home for complete peace of mind in Vail Valley, Colorado."
        keywords="smart security, home security cameras, access control, smart locks, security monitoring, Vail Valley"
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Security Systems</h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto mb-6">
            Advanced security solutions seamlessly integrated with your smart home for complete peace of mind.
          </p>
        </div>

        {/* Interactive Demo */}
        <div className="mb-8">
          <SecuritySystemDemo />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <IPadCard className="text-center p-4">
            <div className="text-2xl font-bold text-white">4K</div>
            <div className="text-xs text-gray-300">Video Resolution</div>
          </IPadCard>
          <IPadCard className="text-center p-4">
            <div className="text-2xl font-bold text-white">24/7</div>
            <div className="text-xs text-gray-300">Monitoring Available</div>
          </IPadCard>
          <IPadCard className="text-center p-4">
            <div className="text-2xl font-bold text-white">AI</div>
            <div className="text-xs text-gray-300">Smart Detection</div>
          </IPadCard>
          <IPadCard className="text-center p-4">
            <div className="text-2xl font-bold text-white">∞</div>
            <div className="text-xs text-gray-300">Cloud Storage</div>
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
          <Tabs defaultValue="surveillance" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="surveillance">Surveillance</TabsTrigger>
              <TabsTrigger value="access">Access Control</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            </TabsList>

            <TabsContent value="surveillance" className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Video Surveillance Systems</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">4K Resolution</h4>
                    <p className="text-gray-300 text-sm">Ultra-high definition cameras with color night vision and HDR support.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">AI Detection</h4>
                    <p className="text-gray-300 text-sm">Smart motion detection that distinguishes between people, vehicles, and animals.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Cloud & Local Storage</h4>
                    <p className="text-gray-300 text-sm">Secure cloud backup with local NVR for redundant video storage.</p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">Camera Packages</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">4-Camera System</span>
                      <span className="text-accent font-semibold">$2,400+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">8-Camera System</span>
                      <span className="text-accent font-semibold">$4,200+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">16-Camera System</span>
                      <span className="text-accent font-semibold">$7,800+</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="access" className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Smart Access Control</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Smart Locks</h4>
                    <p className="text-gray-300 text-sm">Keyless entry with fingerprint, code, and smartphone access.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Facial Recognition</h4>
                    <p className="text-gray-300 text-sm">Advanced AI that recognizes family members and trusted guests.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Temporary Access</h4>
                    <p className="text-gray-300 text-sm">Grant time-limited access to visitors, service providers, or guests.</p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">Access Solutions</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Smart Door Lock</span>
                      <span className="text-accent font-semibold">$350+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Garage Door Control</span>
                      <span className="text-accent font-semibold">$280+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Gate Access System</span>
                      <span className="text-accent font-semibold">$1,200+</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="monitoring" className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Professional Monitoring</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">24/7 Monitoring</h4>
                    <p className="text-gray-300 text-sm">Round-the-clock professional monitoring with emergency response.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Mobile Alerts</h4>
                    <p className="text-gray-300 text-sm">Instant notifications with video clips sent to your smartphone.</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Emergency Services</h4>
                    <p className="text-gray-300 text-sm">Direct connection to local police, fire, and medical services.</p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">Monitoring Plans</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Self-Monitoring</span>
                      <span className="text-accent font-semibold">Free</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Professional Basic</span>
                      <span className="text-accent font-semibold">$29/mo</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Premium Service</span>
                      <span className="text-accent font-semibold">$49/mo</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </IPadCard>

        {/* Call to Action */}
        <IPadCard className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Secure Your Peace of Mind</h2>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto">
            Protect what matters most with intelligent security that adapts to your lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/scheduling?service=security-systems">
              <IPadButton size="md">
                Schedule Security Assessment
              </IPadButton>
            </Link>
            <Link to="/projects">
              <IPadButton variant="secondary" size="md">
                View Security Projects
              </IPadButton>
            </Link>
          </div>
        </IPadCard>
      </section>
    </IPadLayout>
  );
};

export default SecuritySystems;