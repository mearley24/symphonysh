import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu as MenuIcon, X } from "lucide-react";

const navLinks = [
  { label: "Services", path: "/services" },
  { label: "Platforms", path: "/platforms" },
  { label: "Our Work", path: "/projects" },
  { label: "About", path: "/about" },
  { label: "Resources", path: "/resources" },
  { label: "Contact", path: "/contact" },
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

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [currentPath]);

  // Escape key closes menu; lock body scroll while open
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

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
          scrolled ? "pt-2 pb-1" : "pt-5 pb-3"
        }`}>
          <div className={`flex items-center transition-all duration-500 ${
            scrolled ? "justify-between" : "flex-col items-center"
          }`}>
            {/* Logo */}
            <Link to="/" className="shrink-0 pointer-events-auto relative z-10">
              <img
                src="/lovable-uploads/symphony-logo-transparent.webp"
                alt="Symphony Smart Homes"
                className={`w-auto transition-all duration-500 ${
                  scrolled ? "h-14 sm:h-16" : "h-32 sm:h-40"
                }`}
              />
            </Link>

            {/* Scrolled: Schedule CTA + Menu button */}
            {scrolled && (
              <div className="flex items-center gap-3 pointer-events-auto">
                <Link
                  to="/scheduling"
                  className="hidden sm:inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Schedule
                </Link>
                <button
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm tracking-widest uppercase transition-colors px-[2px]"
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={menuOpen}
                  aria-controls="primary-menu"
                >
                  {menuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
                  <span>Menu</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Menu button — top-right corner when not scrolled */}
      {!scrolled && (
        <div className="fixed top-4 right-4 z-50">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-white/60 hover:text-white text-sm tracking-widest uppercase transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="primary-menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            <span>Menu</span>
          </button>
        </div>
      )}

      {/* Full-screen overlay menu — only mounted when open so closed-state links
          stay out of the DOM/accessibility/focus tree entirely. */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[60] bg-black/60 animate-in fade-in duration-200"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          {/* Menu panel — z above header (z-50) so logo can't intercept link clicks */}
          <div
            id="primary-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-[70] animate-in fade-in duration-200"
          >
            <div className="absolute inset-0 bg-primary/98 backdrop-blur-2xl" />

            {/* Close button — sits above the panel so it can always close the menu */}
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4 z-20 inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-white/80 hover:text-white text-sm tracking-widest uppercase transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
              <span>Close</span>
            </button>

            <nav className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20 overflow-y-auto">
              <div className="space-y-3 text-center">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className="group relative block text-3xl sm:text-4xl font-bold py-2 transition-colors"
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
              <div className="mt-10">
                <Link
                  to="/scheduling"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-white text-base sm:text-lg font-semibold px-8 py-4 rounded-lg transition-colors"
                >
                  Schedule a Walkthrough
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
