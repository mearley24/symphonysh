import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu as MenuIcon, X } from "lucide-react";

const navLinks = [
  { label: "Services", path: "/services" },
  { label: "Our Work", path: "/projects" },
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
        className={`fixed top-0 left-0 right-0 pointer-events-none z-50 transition-all duration-300 ease-out ${
          scrolled ? "bg-black/80 backdrop-blur-lg" : ""
        }`}
      >
        <div className={`max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-500 ${
          scrolled ? 'pt-2 pb-1' : 'pt-5 pb-3'
        }`}>
          <div className={`flex items-center transition-all duration-500 ${
            scrolled ? 'justify-between' : 'flex-col items-center'
          }`}>
            {/* Logo - splits left */}
            <Link to="/" className="shrink-0 pointer-events-auto relative z-10">
              <img
                src="/lovable-uploads/symphony-logo-transparent.png"
                alt="Symphony Smart Homes"
                className={`w-auto transition-all duration-500 ${
                  scrolled ? 'h-14 sm:h-16' : 'h-32 sm:h-40 mb-3'
                }`}
              />
            </Link>

            {/* Menu - splits right */}
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
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-30 bg-black/60 transition-opacity duration-200 ease-out ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />
      {/* Menu panel */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-200 ease-out ${
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-primary/98 backdrop-blur-2xl" />
        
        <nav className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
          {/* Main nav links */}
          <div className="space-y-2 text-center mb-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="group relative block text-4xl sm:text-5xl font-bold py-2 transition-colors"
              >
                <span className={isActive(link.path) ? "text-white" : "text-white/50 group-hover:text-white transition-colors"}>
                  {link.label}
                </span>
                <span
                  className={`absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-0.5 rounded-full bg-accent transition-all duration-200 ease-out ${
                    isActive(link.path) ? "w-12" : "w-0 group-hover:w-8"
                  }`}
                />
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