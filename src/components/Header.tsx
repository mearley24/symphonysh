
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, ChevronDown, Menu as MenuIcon, X } from "lucide-react";

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
  { label: "AVA Smart Remote", path: "/ava" },
];

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const isActive = (path: string) =>
    currentPath === path || (path !== "/" && currentPath.startsWith(path));

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-primary/95 backdrop-blur-md border-b border-white/[0.06] z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <img
                src="/lovable-uploads/1d7a78ef-4d02-453d-aeea-81e50fb784b6.png"
                alt="Symphony Smart Homes"
                className="h-10 sm:h-14 w-auto"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.label === "Services" ? (
                  <div
                    key={link.path}
                    className="relative group"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isActive(link.path)
                          ? "text-white bg-white/[0.06]"
                          : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                    </Link>

                    {/* Mega dropdown */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 ${
                        servicesOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-1 pointer-events-none"
                      }`}
                    >
                      <div className="bg-primary border border-white/[0.08] rounded-xl shadow-2xl shadow-black/40 p-2 min-w-[220px]">
                        {serviceLinks.map((s) => (
                          <Link
                            key={s.path}
                            to={s.path}
                            className={`block px-3.5 py-2.5 text-sm rounded-lg transition-colors ${
                              isActive(s.path)
                                ? "text-white bg-white/[0.08]"
                                : "text-white/60 hover:text-white hover:bg-white/[0.05]"
                            }`}
                          >
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive(link.path)
                        ? "text-white bg-white/[0.06]"
                        : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Right side: CTA + mobile toggle */}
            <div className="flex items-center gap-3">
              <a
                href="tel:+19705193013"
                className="hidden sm:inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                (970) 519-3013
              </a>

              <Link
                to="/scheduling"
                className="hidden sm:inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                Book a Consultation
              </Link>

              {/* Mobile: phone + hamburger */}
              <a
                href="tel:+19705193013"
                className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <nav className="absolute top-16 right-0 w-72 max-h-[calc(100vh-4rem)] overflow-y-auto bg-primary border-l border-white/[0.08] shadow-2xl shadow-black/50 p-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive(link.path)
                  ? "text-white bg-white/[0.08]"
                  : "text-white/60 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="border-t border-white/[0.06] pt-2 mt-2">
            <p className="px-4 py-2 text-xs font-medium text-white/30 uppercase tracking-wider">Services</p>
            {serviceLinks.map((s) => (
              <Link
                key={s.path}
                to={s.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 text-sm rounded-lg transition-colors ${
                  isActive(s.path)
                    ? "text-white bg-white/[0.08]"
                    : "text-white/50 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                {s.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-white/[0.06] pt-3 mt-2">
            <Link
              to="/scheduling"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center bg-accent hover:bg-accent/90 text-white text-sm font-medium px-5 py-3 rounded-lg transition-colors"
            >
              Book a Consultation
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
