import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-primary text-primary-foreground flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-4">
          404 — Page Not Found
        </p>
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-4">Wrong turn.</h1>
        <p className="text-white/50 text-lg leading-relaxed mb-10">
          That page doesn't exist, but we can point you in the right direction.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3.5 rounded-lg font-medium transition-colors text-base"
          >
            <Home className="w-4 h-4" /> Back to Home
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-6 py-3.5 rounded-lg font-medium transition-colors text-base"
          >
            Contact Us
          </Link>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
          {[
            { label: "Services", to: "/services" },
            { label: "Our Work", to: "/projects" },
            { label: "About", to: "/about" },
            { label: "Schedule", to: "/scheduling" },
          ].map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="inline-flex items-center gap-1 text-white/40 hover:text-white text-sm transition-colors"
            >
              {label} <ArrowRight className="w-3 h-3" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
