
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
      
      <section className="pt-20 pb-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Symphony Smart Homes
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your Vail Valley home with premium Control4 automation solutions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/scheduling">
              <iPadButton size="lg" className="w-full sm:w-auto">
                Schedule Consultation <ArrowRight className="w-5 h-5 ml-2" />
              </iPadButton>
            </Link>
            <Link to="/projects">
              <iPadButton variant="secondary" size="lg" className="w-full sm:w-auto">
                View Our Work <ArrowRight className="w-5 h-5 ml-2" />
              </iPadButton>
            </Link>
          </div>
        </div>

        <iPadGrid columns={3} gap="lg" className="mb-16">
          {services.map((service, index) => (
            <Link key={index} to={service.link}>
              <iPadCard>
                <service.icon className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed">{service.description}</p>
              </iPadCard>
            </Link>
          ))}
        </iPadGrid>

        <iPadCard className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Upgrade Your Home?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let us create the perfect smart home experience tailored to your lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <iPadButton size="lg">
                <Phone className="w-5 h-5 mr-2" />
                Get In Touch
              </iPadButton>
            </Link>
            <Link to="/scheduling">
              <iPadButton variant="secondary" size="lg">
                <Calendar className="w-5 h-5 mr-2" />
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
