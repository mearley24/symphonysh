import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu as MenuIcon, X } from "lucide-react";

const navLinks = [
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const serviceLinks = [
  { label: "Home Automation", path: "/services/home-integration" },
  { label: "Audio & Entertainment", path: "/services/audio-entertainment" },
  { label: "Smart Lighting", path: "/services/smart-lighting" },
  { label: "Shades", path: "/services/shades" },
  { label: "Networking", path: "/services/networking" },
  { label: "Climate Control", path: "/services/climate-control" },
  { label: "Security", path: "/services/security-systems" },
  { label: "Maintenance", path: "/services/maintenance" },
];

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) =>
    currentPath === path || (path !== "/" && currentPath.startsWith(path));

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-500"
      >
        <div className={`max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-500 ${
          scrolled ? 'pt-2 pb-1' : 'pt-5 pb-3'
        }`}>
          <div className={`flex items-center transition-all duration-500 ${
            scrolled ? 'justify-start gap-4' : 'flex-col items-center'
          }`}>
            {/* Logo */}
            <Link to="/" className="shrink-0 pointer-events-auto">
              <img
                src="/lovable-uploads/1d7a78ef-4d02-453d-aeea-81e50fb784b6.png"
                alt="Symphony Smart Homes"
                className={`w-auto transition-all duration-500 ${
                  scrolled ? 'h-14 sm:h-16' : 'h-32 sm:h-40 mb-3'
                }`}
                style={{ backgroundColor: 'hsl(0 0% 7% / 0.85)', borderRadius: '8px' }}
              />
            </Link>

            {/* Menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="pointer-events-auto inline-flex items-center gap-2 text-white/40 hover:text-white text-sm tracking-widest uppercase transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              <span>Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen overlay menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-primary/98 backdrop-blur-2xl" onClick={() => setMenuOpen(false)} />
        
        <nav className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
          {/* Main nav links */}
          <div className="space-y-2 text-center mb-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`block text-4xl sm:text-5xl font-bold py-2 transition-colors ${
                  isActive(link.path)
                    ? "text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Service sub-links */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 max-w-lg mb-14">
            {serviceLinks.map((s) => (
              <Link
                key={s.path}
                to={s.path}
                onClick={() => setMenuOpen(false)}
                className={`text-sm transition-colors ${
                  isActive(s.path)
                    ? "text-accent"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {s.label}
              </Link>
            ))}
          </div>

          {/* CTA + phone */}
          <div className="flex flex-col items-center gap-4">
            <Link
              to="/scheduling"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-white text-base font-medium px-8 py-3.5 rounded-lg transition-colors"
            >
              Book Consultation
            </Link>
            <a
              href="tel:+19705193013"
              className="inline-flex items-center gap-2.5 text-white/50 hover:text-white/80 text-lg transition-colors"
            >
              <Phone className="w-5 h-5" />
              (970) 519-3013
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
