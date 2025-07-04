
import { Link } from "react-router-dom";
import { ArrowRight, Home, Wrench, Calendar, Image, Phone } from "lucide-react";
import { iPadLayout as IPadLayout } from "../components/Layout/iPadLayout";
import { iPadCard as IPadCard } from "../components/ui/ipad-card";
import { iPadButton as IPadButton } from "../components/ui/ipad-button";
import { iPadGrid as IPadGrid } from "../components/ui/ipad-grid";
import SEO from "../components/SEO";

const Index = () => {
  const services = [
    {
      icon: Home,
      title: "Smart Home Integration",
      description: "Complete Control4 automation solutions for seamless living",
      link: "/services/home-integration"
    },
    {
      icon: Image,
      title: "Home Theater Systems", 
      description: "Premium entertainment experiences with cutting-edge technology",
      link: "/services/audio-entertainment"
    },
    {
      icon: Wrench,
      title: "Professional Installation",
      description: "Expert setup and maintenance by certified technicians",
      link: "/services/maintenance"
    }
  ];

  return (
    <IPadLayout>
      <SEO 
        title="Symphony Smart Homes - Premium Home Automation in Vail Valley"
        description="Transform your Vail Valley home with Control4 smart home automation. Expert installation of home theaters, lighting, security, and integrated smart home systems."
        keywords="smart home automation, Control4, home theater, Vail Valley, Colorado, home integration, smart lighting, security systems"
      />
      
      <section className="pt-4 pb-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 leading-tight">
              Symphony Smart Homes
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent/60 mx-auto mb-4"></div>
            <p className="text-base md:text-lg text-gray-300 mb-2 max-w-xl mx-auto leading-relaxed">
              Transform your Vail Valley home with premium Control4 automation solutions
            </p>
            <p className="text-sm text-gray-400 max-w-lg mx-auto">
              Professional installation • Ongoing support • Luxury experience
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-sm mx-auto">
            <Link to="/scheduling" className="w-full sm:w-auto">
              <IPadButton size="md" className="w-full">
                Schedule Consultation <ArrowRight className="w-4 h-4" />
              </IPadButton>
            </Link>
            <Link to="/projects" className="w-full sm:w-auto">
              <IPadButton variant="secondary" size="md" className="w-full">
                View Our Work <ArrowRight className="w-4 h-4" />
              </IPadButton>
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <IPadGrid columns={3} gap="sm" className="mb-8">
          {services.map((service, index) => (
            <Link key={index} to={service.link} className="group">
              <IPadCard className="text-center h-full flex flex-col justify-between p-4 group-hover:border-accent/30 transition-all duration-300">
                <div>
                  <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <service.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-300 text-xs leading-relaxed">{service.description}</p>
                </div>
                <div className="mt-4">
                  <span className="text-accent text-xs font-medium group-hover:text-accent/80 transition-colors">
                    Learn More →
                  </span>
                </div>
              </IPadCard>
            </Link>
          ))}
        </IPadGrid>

        {/* CTA Section */}
        <IPadCard className="text-center max-w-2xl mx-auto bg-gradient-to-br from-white/10 to-white/5 border-white/20">
          <div className="max-w-xl mx-auto">
            <h2 className="text-lg md:text-xl font-bold text-white mb-3">
              Ready to Elevate Your Home Experience?
            </h2>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              Join hundreds of satisfied homeowners in Vail Valley who trust Symphony Smart Homes 
              for their automation needs. Let us create the perfect smart home experience tailored to your lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
              <Link to="/contact" className="w-full sm:w-auto">
                <IPadButton size="md" className="w-full">
                  <Phone className="w-4 h-4" />
                  Get In Touch
                </IPadButton>
              </Link>
              <Link to="/scheduling" className="w-full sm:w-auto">
                <IPadButton variant="secondary" size="md" className="w-full">
                  <Calendar className="w-4 h-4" />
                  Book Consultation
                </IPadButton>
              </Link>
            </div>
          </div>
        </IPadCard>

        {/* Trust Indicators */}
        <div className="text-center mt-8 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span className="text-xs">Control4 Certified Dealers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span className="text-xs">10+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span className="text-xs">Vail Valley Specialists</span>
            </div>
          </div>
        </div>
      </section>
    </IPadLayout>
  );
};

export default Index;
