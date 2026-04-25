import React from "react";
import { Link } from "react-router-dom";
import { Phone, MapPin, Globe, Camera } from "lucide-react";
import { trackPhoneClick } from "../utils/tracking";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-10 px-4 sm:px-6 bg-black/40 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          {/* Col 1: Logo + tagline + phone */}
          <div>
            <img
              src="/lovable-uploads/symphony-logo-transparent.webp"
              alt="Symphony Smart Homes"
              className="h-10 w-auto mb-3"
              loading="lazy"
            />
            <p className="text-white/40 text-sm leading-relaxed mb-3">
              Professional smart home integration for the Vail Valley.
            </p>
            <a
              href="tel:+19705193013"
              onClick={trackPhoneClick}
              className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors"
            >
              <Phone className="w-3.5 h-3.5" /> (970) 519-3013
            </a>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/40 hover:text-white/70 text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/40 hover:text-white/70 text-sm transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/platforms" className="text-white/40 hover:text-white/70 text-sm transition-colors">
                  Platforms
                </Link>
              </li>
              <li>
                <Link to="/setup-finder" className="text-white/40 hover:text-white/70 text-sm transition-colors">
                  Setup Finder
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-white/40 hover:text-white/70 text-sm transition-colors">
                  Our Work
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/40 hover:text-white/70 text-sm transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/40 hover:text-white/70 text-sm transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/40 hover:text-white/70 text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/scheduling" className="text-white/40 hover:text-white/70 text-sm transition-colors">
                  Schedule a Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Service Areas */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Service Areas</h4>
            <ul className="space-y-2">
              {[
                { name: "Vail", path: "/vail" },
                { name: "Beaver Creek", path: "/beaver-creek" },
                { name: "Edwards", path: "/edwards" },
                { name: "Avon", path: "/avon" },
                { name: "Eagle", path: "/eagle" },
                { name: "Minturn", path: "/contact" },
              ].map((area) => (
                <li key={area.name}>
                  <Link to={area.path} className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm transition-colors">
                    <MapPin className="w-3 h-3 text-accent/60" />
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Symphony Smart Homes. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/symphonysmarthomes"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white/25 hover:text-white/50 text-xs transition-colors"
            >
              <Camera className="w-3.5 h-3.5" /> Instagram
            </a>
            <a
              href="https://g.page/symphonysmarthomes"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-white/25 hover:text-white/50 text-xs transition-colors"
            >
              <Globe className="w-3.5 h-3.5" /> Google
            </a>
            <Link to="/privacy" className="text-white/30 hover:text-white/50 text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white/30 hover:text-white/50 text-xs transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
