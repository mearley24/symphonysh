
import { Link, useLocation } from "react-router-dom";
import { Phone, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = {
    services: [
      { path: "/services/home-integration", label: "Home Automation" },
      { path: "/services/audio-entertainment", label: "Audio & Entertainment" },
      { path: "/services/smart-lighting", label: "Smart Lighting" },
      { path: "/services/shades", label: "Smart Shades" },
      { path: "/services/networking", label: "Networking" },
      { path: "/services/climate-control", label: "Climate Control" },
      { path: "/services/security-systems", label: "Security Systems" },
      { path: "/services/maintenance", label: "Maintenance" },
    ],
    showcase: [
      { path: "/projects", label: "Our Projects" },
      { path: "/matterport", label: "Matterport Tours" },
    ],
    company: [
      { path: "/about", label: "About Us" },
      { path: "/contact", label: "Contact" },
    ]
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-[rgb(0,9,24)]/95 backdrop-blur-sm border-b border-white/10 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/1d7a78ef-4d02-453d-aeea-81e50fb784b6.png" 
              alt="Symphony Smart Homes Logo" 
              className="h-16 w-auto"
            />
          </Link>
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className={`text-gray-300 hover:text-white transition-colors ${
                currentPath === "/" ? "text-white" : ""
              }`}
            >
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-300 hover:text-white transition-colors">
                Services <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[rgb(0,9,24)] border-white/10">
                {menuItems.services.map((service) => (
                  <DropdownMenuItem key={service.path}>
                    <Link
                      to={service.path}
                      className="w-full text-sm text-gray-300 hover:text-white"
                    >
                      {service.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-300 hover:text-white transition-colors">
                Showcase <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[rgb(0,9,24)] border-white/10">
                {menuItems.showcase.map((item) => (
                  <DropdownMenuItem key={item.path}>
                    <Link
                      to={item.path}
                      className="w-full text-sm text-gray-300 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-300 hover:text-white transition-colors">
                Company <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[rgb(0,9,24)] border-white/10">
                {menuItems.company.map((item) => (
                  <DropdownMenuItem key={item.path}>
                    <Link
                      to={item.path}
                      className="w-full text-sm text-gray-300 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to="/ava"
              className="text-gray-300 hover:text-white transition-colors"
            >
              AVA Smart Remote
            </Link>

            <a 
              href="tel:+19705193013" 
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md transition-colors"
            >
              <Phone className="w-4 h-4" />
              (970) 519-3013
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
