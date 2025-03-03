
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-12 px-6 text-center text-gray-400 bg-primary">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4 mb-4">
          <Link to="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
        </div>
        <p className="text-sm">
          © 2024 Symphony Smart Homes. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
