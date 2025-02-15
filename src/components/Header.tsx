
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
                Menu <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[rgb(0,9,24)] border-white/10 w-64">
                <DropdownMenuItem>
                  <Link
                    to="/services"
                    className="w-full text-sm text-gray-300 hover:text-white font-medium"
                  >
                    All Services
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem>
                  <Link
                    to="/services/home-integration"
                    className="w-full text-sm text-gray-300 hover:text-white"
                  >
                    Home Automation
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    to="/services/audio-entertainment"
                    className="w-full text-sm text-gray-300 hover:text-white"
                  >
                    Audio & Entertainment
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    to="/services/smart-lighting"
                    className="w-full text-sm text-gray-300 hover:text-white"
                  >
                    Smart Lighting
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    to="/services/shades"
                    className="w-full text-sm text-gray-300 hover:text-white"
                  >
                    Smart Shades
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    to="/services/networking"
                    className="w-full text-sm text-gray-300 hover:text-white"
                  >
                    Networking
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    to="/services/climate-control"
                    className="w-full text-sm text-gray-300 hover:text-white"
                  >
                    Climate Control
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    to="/services/security-systems"
                    className="w-full text-sm text-gray-300 hover:text-white"
                  >
                    Security Systems
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    to="/services/maintenance"
                    className="w-full text-sm text-gray-300 hover:text-white"
                  >
                    Maintenance
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem>
                  <Link
                    to="/ava"
                    className="w-full text-sm text-gray-300 hover:text-white"
                  >
                    AVA Smart Remote
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem>
                  <Link
                    to="/about"
                    className="w-full text-sm text-gray-300 hover:text-white"
                  >
                    About Us
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    to="/contact"
                    className="w-full text-sm text-gray-300 hover:text-white"
                  >
                    Contact
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to="/projects"
              className={`text-gray-300 hover:text-white transition-colors ${
                currentPath === "/projects" ? "text-white" : ""
              }`}
            >
              Our Projects
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
