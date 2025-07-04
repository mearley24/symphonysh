
import { Link } from "react-router-dom";
import { ArrowRight, Home, Wrench, Calendar, Image, Phone } from "lucide-react";
import iPadLayout from "../components/Layout/iPadLayout";
import iPadCard from "../components/ui/ipad-card";
import iPadButton from "../components/ui/ipad-button";
import iPadGrid from "../components/ui/ipad-grid";
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
    <iPadLayout>
      <SEO 
        title="Symphony Smart Homes - Premium Home Automation in Vail Valley"
        description="Transform your Vail Valley home with Control4 smart home automation. Expert installation of home theaters, lighting, security, and integrated smart home systems."
        keywords="smart home automation, Control4, home theater, Vail Valley, Colorado, home integration, smart lighting, security systems"
      />
      
      <section className="pt-8 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Symphony Smart Homes
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your Vail Valley home with premium Control4 automation solutions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-lg mx-auto">
            <Link to="/scheduling" className="w-full sm:w-auto">
              <iPadButton size="md" className="w-full">
                Schedule Consultation <ArrowRight className="w-4 h-4 ml-2" />
              </iPadButton>
            </Link>
            <Link to="/projects" className="w-full sm:w-auto">
              <iPadButton variant="secondary" size="md" className="w-full">
                View Our Work <ArrowRight className="w-4 h-4 ml-2" />
              </iPadButton>
            </Link>
          </div>
        </div>

        <iPadGrid columns={3} gap="md" className="mb-12">
          {services.map((service, index) => (
            <Link key={index} to={service.link}>
              <iPadCard className="text-center aspect-square flex flex-col justify-center items-center p-6">
                <service.icon className="w-8 h-8 text-accent mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
              </iPadCard>
            </Link>
          ))}
        </iPadGrid>

        <iPadCard className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to Upgrade Your Home?
          </h2>
          <p className="text-lg text-gray-300 mb-6 max-w-xl mx-auto">
            Let us create the perfect smart home experience tailored to your lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <Link to="/contact" className="w-full sm:w-auto">
              <iPadButton size="md" className="w-full">
                <Phone className="w-4 h-4 mr-2" />
                Get In Touch
              </iPadButton>
            </Link>
            <Link to="/scheduling" className="w-full sm:w-auto">
              <iPadButton variant="secondary" size="md" className="w-full">
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </iPadButton>
            </Link>
          </div>
        </iPadCard>
      </section>
    </iPadLayout>
  );
};

export default Index;
