
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const Index = () => {
  return (
    <div className="min-h-screen bg-primary">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1e1e1e]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/1d7a78ef-4d02-453d-aeea-81e50fb784b6.png" 
                alt="Symphony Smart Homes Logo" 
                className="h-32 w-auto"
              />
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/services" className="inline-flex items-center justify-between text-white px-4 py-2 hover:text-accent transition-colors">
                    Services
                  </Link>
                  <NavigationMenuContent>
                    <div className="w-[300px] p-4 space-y-3">
                      <Link to="/services/home-integration" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                        <div className="text-sm font-medium leading-none text-white">Home Integration</div>
                        <p className="line-clamp-2 text-sm leading-snug text-gray-300">
                          Complete Control4 smart home solutions
                        </p>
                      </Link>
                      <Link to="/services/audio-entertainment" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                        <div className="text-sm font-medium leading-none text-white">Audio & Entertainment</div>
                        <p className="line-clamp-2 text-sm leading-snug text-gray-300">
                          Premium multi-room audio solutions
                        </p>
                      </Link>
                      <Link to="/services/smart-lighting" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                        <div className="text-sm font-medium leading-none text-white">Smart Lighting</div>
                        <p className="line-clamp-2 text-sm leading-snug text-gray-300">
                          Automated lighting systems
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
      <section className="h-[60vh] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-primary z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80"
          alt="Smart Home Background"
          className="absolute inset-0 w-full h-full object-cover animate-[fade-in_1.5s_ease-out]"
        />
        <div className="max-w-6xl mx-auto px-6 relative z-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-[fade-up_1s_ease-out]">
              Smart Home Solutions
            </h1>
            <p className="text-xl text-gray-200 animate-[fade-up_1s_ease-out_200ms] mb-8 max-w-2xl mx-auto">
              Transform your living space with intelligent home automation solutions powered by Control4
            </p>
            <Link 
              to="/services"
              className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-md font-medium inline-flex items-center gap-2 transition-colors animate-[fade-up_1s_ease-out_400ms]"
            >
              Explore Our Solutions
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center space-y-4 animate-[fade-up_1s_ease-out]">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Smart Integration</h3>
              <p className="text-gray-300">Seamlessly connect and control all your home systems through one intuitive interface</p>
            </div>
            <div className="text-center space-y-4 animate-[fade-up_1s_ease-out_200ms]">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Energy Efficiency</h3>
              <p className="text-gray-300">Optimize your home's energy usage with intelligent automation and monitoring</p>
            </div>
            <div className="text-center space-y-4 animate-[fade-up_1s_ease-out_400ms]">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Enhanced Security</h3>
              <p className="text-gray-300">Protect your home with advanced security features and remote monitoring</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-white/5">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-[fade-up_1s_ease-out]">Ready to Transform Your Home?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-[fade-up_1s_ease-out_200ms]">
            Let us create your perfect smart home experience with Control4
          </p>
          <Link 
            to="/contact"
            className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-md font-medium inline-flex items-center gap-2 transition-colors animate-[fade-up_1s_ease-out_400ms]"
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
