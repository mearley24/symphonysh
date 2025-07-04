
import { Link } from "react-router-dom";
import { ArrowRight, Camera, Monitor, Cable } from "lucide-react";
import iPadLayout from "../components/Layout/iPadLayout";
import iPadCard from "../components/ui/ipad-card";
import iPadButton from "../components/ui/ipad-button";
import iPadGrid from "../components/ui/ipad-grid";
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
    <iPadLayout>
      <SEO 
        title="Our Project Portfolio - Smart Home Installations in Vail Valley"
        description="Browse our portfolio of smart home installations including home theaters, TV mounting, and structured wiring projects throughout Vail Valley, Colorado."
        keywords="smart home portfolio, home theater installation, TV mounting, structured wiring, Vail Valley projects"
      />
      
      <section className="pt-8 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Work
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6">
            Explore our portfolio of premium smart home installations throughout Vail Valley
          </p>
          <Link to="/scheduling">
            <iPadButton size="md">
              <Camera className="w-4 h-4 mr-2" />
              Schedule Your Project
            </iPadButton>
          </Link>
        </div>

        <iPadGrid columns={1} gap="md" className="mb-12">
          {portfolioSections.map((section, index) => (
            <Link key={index} to={section.link}>
              <iPadCard className="grid md:grid-cols-2 gap-6 items-center">
                <div className="order-2 md:order-1">
                  <section.icon className="w-10 h-10 text-accent mb-3" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {section.title}
                  </h2>
                  <p className="text-lg text-gray-300 mb-4 leading-relaxed">
                    {section.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-accent text-base font-medium">
                      {section.count}
                    </span>
                    <iPadButton variant="ghost" size="sm">
                      View Gallery <ArrowRight className="w-4 h-4 ml-2" />
                    </iPadButton>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <div className="aspect-video rounded-2xl overflow-hidden bg-secondary/30">
                    <img 
                      src={section.image} 
                      alt={section.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </iPadCard>
            </Link>
          ))}
        </iPadGrid>

        <iPadCard className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Let us bring your smart home vision to life with our expert installation services.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <Link to="/contact" className="w-full sm:w-auto">
              <iPadButton size="md" className="w-full">
                Get a Quote
              </iPadButton>
            </Link>
            <Link to="/about" className="w-full sm:w-auto">
              <iPadButton variant="secondary" size="md" className="w-full">
                Learn About Us
              </iPadButton>
            </Link>
          </div>
        </iPadCard>
      </section>
    </iPadLayout>
  );
};

export default Projects;
