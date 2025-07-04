
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
      description: "Complete Control4 automation solutions",
      link: "/services/home-integration"
    },
    {
      icon: Image,
      title: "Home Theater Systems", 
      description: "Premium entertainment experiences",
      link: "/services/audio-entertainment"
    },
    {
      icon: Wrench,
      title: "Professional Installation",
      description: "Expert setup and maintenance",
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
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
            Symphony Smart Homes
          </h1>
          <p className="text-sm md:text-base text-gray-300 mb-4 max-w-lg mx-auto leading-relaxed">
            Transform your Vail Valley home with premium Control4 automation solutions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center max-w-md mx-auto">
            <Link to="/scheduling" className="w-full sm:w-auto">
              <IPadButton size="sm" className="w-full">
                Schedule Consultation <ArrowRight className="w-3 h-3 ml-1" />
              </IPadButton>
            </Link>
            <Link to="/projects" className="w-full sm:w-auto">
              <IPadButton variant="secondary" size="sm" className="w-full">
                View Our Work <ArrowRight className="w-3 h-3 ml-1" />
              </IPadButton>
            </Link>
          </div>
        </div>

        <IPadGrid columns={3} gap="sm" className="mb-6">
          {services.map((service, index) => (
            <Link key={index} to={service.link}>
              <IPadCard className="text-center h-full flex flex-col justify-center items-center p-3">
                <service.icon className="w-6 h-6 text-accent mb-2" />
                <h3 className="text-sm font-semibold text-white mb-1">{service.title}</h3>
                <p className="text-gray-300 text-xs leading-relaxed">{service.description}</p>
              </IPadCard>
            </Link>
          ))}
        </IPadGrid>

        <IPadCard className="text-center max-w-xl mx-auto">
          <h2 className="text-lg md:text-xl font-bold text-white mb-2">
            Ready to Upgrade Your Home?
          </h2>
          <p className="text-sm text-gray-300 mb-4 max-w-md mx-auto">
            Let us create the perfect smart home experience tailored to your lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-sm mx-auto">
            <Link to="/contact" className="w-full sm:w-auto">
              <IPadButton size="sm" className="w-full">
                <Phone className="w-3 h-3 mr-1" />
                Get In Touch
              </IPadButton>
            </Link>
            <Link to="/scheduling" className="w-full sm:w-auto">
              <IPadButton variant="secondary" size="sm" className="w-full">
                <Calendar className="w-3 h-3 mr-1" />
                Book Appointment
              </IPadButton>
            </Link>
          </div>
        </IPadCard>
      </section>
    </IPadLayout>
  );
};

export default Index;
