
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Index = () => {
  return (
    <div className="min-h-screen bg-primary">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-4">
              <img 
                src="/lovable-uploads/1d7a78ef-4d02-453d-aeea-81e50fb784b6.png" 
                alt="Symphony Smart Homes Logo" 
                className="h-16 w-auto"
              />
              <span className="text-white font-semibold text-xl hidden md:block">
                Symphony Smart Homes
              </span>
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
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-primary z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80"
          alt="Smart Home Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="max-w-6xl mx-auto px-6 relative z-20">
          <div className="text-center">
            <p className="text-xl text-gray-200 animate-fade-up [animation-delay:200ms] mb-8 max-w-2xl mx-auto">
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
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Experience the Future of Living</h2>
              <p className="text-gray-300">
                Our expert team designs and implements custom Control4 solutions that enhance your lifestyle 
                and simplify home management. From lighting and climate control to security and entertainment, 
                we create seamless experiences that transform how you interact with your home.
              </p>
              <Link 
                to="/contact"
                className="inline-flex items-center text-accent hover:text-accent/90 gap-2"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden animate-fade-up [animation-delay:200ms]">
                <img 
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
                  alt="Smart Home Experience"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Projects Section */}
      <section className="py-24 relative overflow-hidden bg-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12 animate-fade-up">Latest Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative group overflow-hidden rounded-lg animate-fade-up [animation-delay:200ms]">
              <img 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
                alt="Project 1"
                className="w-full aspect-video object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Modern Mountain Estate</h3>
                  <Link to="/projects" className="text-accent hover:text-accent/90 inline-flex items-center gap-2">
                    View Project <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg animate-fade-up [animation-delay:400ms]">
              <img 
                src="https://images.unsplash.com/photo-1600607687644-c7171b47104e?auto=format&fit=crop&q=80"
                alt="Project 2"
                className="w-full aspect-video object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Urban Smart Penthouse</h3>
                  <Link to="/projects" className="text-accent hover:text-accent/90 inline-flex items-center gap-2">
                    View Project <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-lg animate-fade-up [animation-delay:600ms]">
              <img 
                src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&q=80"
                alt="Project 3"
                className="w-full aspect-video object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Smart Family Home</h3>
                  <Link to="/projects" className="text-accent hover:text-accent/90 inline-flex items-center gap-2">
                    View Project <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-up">Ready to Transform Your Home?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-up [animation-delay:200ms]">
            Let us create your perfect smart home experience with Control4
          </p>
          <Link 
            to="/contact"
            className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-md font-medium inline-flex items-center gap-2 transition-colors animate-fade-up [animation-delay:400ms]"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
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
