
import { ArrowRight, Home, Shield, Lightbulb, Thermometer, Camera, Speaker } from "lucide-react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg hover:bg-white/10 transition-all duration-300">
    <Icon className="w-8 h-8 text-accent mb-4" />
    <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-primary">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-white font-semibold text-xl">
              Symphony Smart Homes
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-white">Services</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <Link to="/services/networking" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                        <div className="text-sm font-medium leading-none text-white">Networking</div>
                        <p className="line-clamp-2 text-sm leading-snug text-gray-300">
                          Enterprise-grade networking solutions
                        </p>
                      </Link>
                      <Link to="/services/smart-lighting" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                        <div className="text-sm font-medium leading-none text-white">Smart Lighting</div>
                        <p className="line-clamp-2 text-sm leading-snug text-gray-300">
                          Automated lighting systems
                        </p>
                      </Link>
                      <Link to="/services/security-systems" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                        <div className="text-sm font-medium leading-none text-white">Security</div>
                        <p className="line-clamp-2 text-sm leading-snug text-gray-300">
                          Advanced security solutions
                        </p>
                      </Link>
                      <Link to="/services" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                        <div className="text-sm font-medium leading-none text-white">View All Services</div>
                        <p className="line-clamp-2 text-sm leading-snug text-gray-300">
                          Explore our complete range of solutions
                        </p>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/projects" className="text-white px-4 py-2 hover:text-accent transition-colors">
                    Projects
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/about" className="text-white px-4 py-2 hover:text-accent transition-colors">
                    About
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/contact" className="text-white px-4 py-2 hover:text-accent transition-colors">
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-up">
              Symphony Smart Homes
            </h1>
            <p className="text-xl text-gray-300 animate-fade-up [animation-delay:200ms] mb-8 max-w-2xl mx-auto">
              Transform your living space with intelligent home automation solutions powered by Control4
            </p>
            <Link 
              to="/services"
              className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-md font-medium inline-flex items-center gap-2 transition-colors animate-fade-up [animation-delay:400ms]"
            >
              Explore Our Solutions
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Why Choose Symphony?</h2>
              <p className="text-gray-300 mb-6">
                We specialize in creating seamless, intelligent living spaces using Control4's powerful 
                automation platform. Our expert team designs and implements custom solutions that enhance 
                your lifestyle and simplify home management.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-accent mr-3" />
                  Professional installation and support
                </li>
                <li className="flex items-center">
                  <Home className="w-5 h-5 text-accent mr-3" />
                  Customized automation solutions
                </li>
                <li className="flex items-center">
                  <Lightbulb className="w-5 h-5 text-accent mr-3" />
                  Energy-efficient technologies
                </li>
              </ul>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8">
              <img 
                src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80"
                alt="Smart Home Integration"
                className="rounded-lg w-full h-64 object-cover"
              />
            </div>
          </div>

          <h2 className="text-3xl font-semibold text-white text-center mb-8">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Link to="/services/smart-lighting">
              <FeatureCard
                icon={Lightbulb}
                title="Smart Lighting"
                description="Intelligent lighting systems that adapt to your lifestyle and enhance your home's ambiance."
              />
            </Link>
            <Link to="/services/climate-control">
              <FeatureCard
                icon={Thermometer}
                title="Climate Control"
                description="Advanced temperature and humidity control for optimal comfort in every room."
              />
            </Link>
            <Link to="/services/security-systems">
              <FeatureCard
                icon={Shield}
                title="Security Systems"
                description="Comprehensive security solutions with smart cameras, locks, and 24/7 monitoring."
              />
            </Link>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Ready to Transform Your Home?</h2>
            <p className="text-gray-300 mb-6">
              Let us create your perfect smart home experience with Control4
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 text-center text-gray-400 bg-primary">
        <p className="text-sm">
          © 2024 Symphony Smart Homes. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
