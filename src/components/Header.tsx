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
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="shrink-0">
              <img
                src="/lovable-uploads/1d7a78ef-4d02-453d-aeea-81e50fb784b6.png"
                alt="Symphony Smart Homes"
                className="h-9 w-auto"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
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
                      className={`inline-flex items-center gap-1 px-3 py-1.5 text-[13px] font-medium rounded-md transition-colors ${
                        isActive(link.path)
                          ? "text-white bg-white/[0.06]"
                          : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                    </Link>

                    {/* Dropdown */}
                    <div
                      className={`absolute top-full left-0 pt-1.5 transition-all duration-150 ${
                        servicesOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-1 pointer-events-none"
                      }`}
                    >
                      <div className="bg-primary border border-white/[0.08] rounded-lg shadow-2xl shadow-black/40 py-1 min-w-[200px]">
                        {serviceLinks.map((s) => (
                          <Link
                            key={s.path}
                            to={s.path}
                            className={`block px-3 py-2 text-[13px] transition-colors ${
                              isActive(s.path)
                                ? "text-white bg-white/[0.08]"
                                : "text-white/50 hover:text-white hover:bg-white/[0.05]"
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
                    className={`px-3 py-1.5 text-[13px] font-medium rounded-md transition-colors ${
                      isActive(link.path)
                        ? "text-white bg-white/[0.06]"
                        : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <a
                href="tel:+19705193013"
                className="hidden sm:inline-flex items-center gap-1.5 text-[13px] text-white/40 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>(970) 519-3013</span>
              </a>

              <Link
                to="/scheduling"
                className="hidden sm:inline-flex bg-accent hover:bg-accent/90 text-white text-[13px] font-medium px-4 py-2 rounded-md transition-colors"
              >
                Book Consultation
              </Link>

              <a
                href="tel:+19705193013"
                className="sm:hidden inline-flex items-center justify-center w-9 h-9 rounded-md text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-md text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <nav className="absolute top-16 right-0 w-64 max-h-[calc(100vh-4rem)] overflow-y-auto bg-primary border-l border-white/[0.08] shadow-2xl shadow-black/50 p-3 space-y-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                isActive(link.path)
                  ? "text-white bg-white/[0.08]"
                  : "text-white/50 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="border-t border-white/[0.06] pt-2 mt-2">
            <p className="px-3 py-1.5 text-[11px] font-medium text-white/25 uppercase tracking-wider">Services</p>
            {serviceLinks.map((s) => (
              <Link
                key={s.path}
                to={s.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                  isActive(s.path)
                    ? "text-white bg-white/[0.08]"
                    : "text-white/40 hover:text-white hover:bg-white/[0.05]"
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
              className="block w-full text-center bg-accent hover:bg-accent/90 text-white text-sm font-medium px-4 py-2.5 rounded-md transition-colors"
            >
              Book Consultation
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
