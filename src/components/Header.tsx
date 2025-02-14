
import { Link, useLocation } from "react-router-dom";
import { Phone } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/services", label: "Services" },
    { path: "/projects", label: "Projects" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

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
            {navItems.map((item) => (
              currentPath !== item.path && (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              )
            ))}
            <a 
              href="tel:+1234567890" 
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
