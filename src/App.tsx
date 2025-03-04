
import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Scheduling from "./pages/Scheduling";
import AudioEntertainment from "./pages/services/AudioEntertainment";
import ClimateControl from "./pages/services/ClimateControl";
import HomeIntegration from "./pages/services/HomeIntegration";
import Maintenance from "./pages/services/Maintenance";
import Networking from "./pages/services/Networking";
import SecuritySystems from "./pages/services/SecuritySystems";
import Shades from "./pages/services/Shades";
import SmartLighting from "./pages/services/SmartLighting";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if we need to redirect based on the URL parameter
    const params = new URLSearchParams(window.location.search);
    const redirectPath = params.get('redirect');
    
    if (redirectPath) {
      // Remove the 'redirect' parameter to avoid loops
      params.delete('redirect');
      
      // Construct the new URL without the redirect parameter
      const newSearch = params.toString();
      const newPathWithSearch = redirectPath + (newSearch ? `?${newSearch}` : '');
      
      // Navigate to the intended path
      navigate(newPathWithSearch, { replace: true });
    }
  }, [navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/audio-entertainment" element={<AudioEntertainment />} />
        <Route path="/services/climate-control" element={<ClimateControl />} />
        <Route path="/services/home-integration" element={<HomeIntegration />} />
        <Route path="/services/maintenance" element={<Maintenance />} />
        <Route path="/services/networking" element={<Networking />} />
        <Route path="/services/security-systems" element={<SecuritySystems />} />
        <Route path="/services/shades" element={<Shades />} />
        <Route path="/services/smart-lighting" element={<SmartLighting />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/scheduling" element={<Scheduling />} />
        {/* Add a catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
