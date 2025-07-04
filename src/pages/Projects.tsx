
import { Link } from "react-router-dom";
import { ArrowRight, Camera, Monitor, Cable } from "lucide-react";
import { iPadLayout as IPadLayout } from "../components/Layout/iPadLayout";
import { iPadCard as IPadCard } from "../components/ui/ipad-card";
import { iPadButton as IPadButton } from "../components/ui/ipad-button";
import { iPadGrid as IPadGrid } from "../components/ui/ipad-grid";
import SEO from "../components/SEO";

const Projects = () => {
  const portfolioSections = [
    {
      icon: Monitor,
      title: "Home Theater",
      description: "Premium home cinema installations with cutting-edge technology",
      image: "/lovable-uploads/home theater/IMG_0509.JPG",
      link: "/photos/home-theater",
      count: "15+ installations"
    },
    {
      icon: Monitor,
      title: "Mounted TVs",
      description: "Expert TV mounting and media wall installations",
      image: "/lovable-uploads/mounted tvs/Home/IMG_0659.JPG",
      link: "/photos/mounted-tvs",
      count: "50+ installations"
    },
    {
      icon: Cable,
      title: "Wiring & Infrastructure",
      description: "Professional structured wiring and rack installations",
      image: "/lovable-uploads/wiring/IMG_0578.JPG",
      link: "/photos/wiring",
      count: "100+ projects"
    }
  ];

  return (
    <IPadLayout>
      <SEO 
        title="Our Project Portfolio - Smart Home Installations in Vail Valley"
        description="Browse our portfolio of smart home installations including home theaters, TV mounting, and structured wiring projects throughout Vail Valley, Colorado."
        keywords="smart home portfolio, home theater installation, TV mounting, structured wiring, Vail Valley projects"
      />
      
      <section className="pt-4 pb-8">
        <div className="text-center mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-white mb-2">
            Our Work
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-lg mx-auto leading-relaxed mb-4">
            Explore our portfolio of premium smart home installations throughout Vail Valley
          </p>
          <Link to="/scheduling">
            <IPadButton size="sm">
              <Camera className="w-3 h-3 mr-1" />
              Schedule Your Project
            </IPadButton>
          </Link>
        </div>

        <IPadGrid columns={1} gap="sm" className="mb-6">
          {portfolioSections.map((section, index) => (
            <Link key={index} to={section.link}>
              <IPadCard className="grid md:grid-cols-2 gap-3 items-center">
                <div className="order-2 md:order-1">
                  <section.icon className="w-6 h-6 text-accent mb-2" />
                  <h2 className="text-lg md:text-xl font-bold text-white mb-2">
                    {section.title}
                  </h2>
                  <p className="text-sm text-gray-300 mb-2 leading-relaxed">
                    {section.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-accent text-xs font-medium">
                      {section.count}
                    </span>
                    <IPadButton variant="ghost" size="sm">
                      View Gallery <ArrowRight className="w-3 h-3 ml-1" />
                    </IPadButton>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="aspect-video rounded-xl overflow-hidden bg-secondary/30">
                    <img 
                      src={section.image} 
                      alt={section.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </IPadCard>
            </Link>
          ))}
        </IPadGrid>

        <IPadCard className="text-center max-w-xl mx-auto">
          <h2 className="text-lg md:text-xl font-bold text-white mb-2">
            Ready to Start Your Project?
          </h2>
          <p className="text-sm text-gray-300 mb-4">
            Let us bring your smart home vision to life with our expert installation services.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-sm mx-auto">
            <Link to="/contact" className="w-full sm:w-auto">
              <IPadButton size="sm" className="w-full">
                Get a Quote
              </IPadButton>
            </Link>
            <Link to="/about" className="w-full sm:w-auto">
              <IPadButton variant="secondary" size="sm" className="w-full">
                Learn About Us
              </IPadButton>
            </Link>
          </div>
        </IPadCard>
      </section>
    </IPadLayout>
  );
};

export default Projects;
