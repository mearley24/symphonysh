
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
import Projects from "./pages/Projects";
import Ava from "./pages/Ava";
import MountedTVs from "./pages/photos/MountedTVs";
import HomeTheater from "./pages/photos/HomeTheater";
import Wiring from "./pages/photos/Wiring";
import WiringManager from "./pages/photos/WiringManager";

// TV mounting subcategories
import BCCondoFP from "./pages/photos/mounted-tvs/BCCondoFP";
import BackboxFP from "./pages/photos/mounted-tvs/BackboxFP";
import FPFrame from "./pages/photos/mounted-tvs/FPFrame";
import FrameSonos from "./pages/photos/mounted-tvs/FrameSonos";
import HP from "./pages/photos/mounted-tvs/HP";
import Home from "./pages/photos/mounted-tvs/Home";
import MantelMount from "./pages/photos/mounted-tvs/MantelMount";
import Misc from "./pages/photos/mounted-tvs/Misc";
import SingletreeFP from "./pages/photos/mounted-tvs/SingletreeFP";
import WestVailBB from "./pages/photos/mounted-tvs/WestVailBB";
import WoodMedia from "./pages/photos/mounted-tvs/WoodMedia";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for redirects from 404.html
    const params = new URLSearchParams(window.location.search);
    const redirectPath = params.get('p') || params.get('redirect');
    
    if (redirectPath) {
      // Remove the redirect parameter
      params.delete('p');
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
        <Route path="/projects" element={<Projects />} />
        <Route path="/ava" element={<Ava />} />
        
        {/* Photo gallery routes */}
        <Route path="/photos/mounted-tvs" element={<MountedTVs />} />
        <Route path="/photos/home-theater" element={<HomeTheater />} />
        <Route path="/photos/wiring" element={<Wiring />} />
        <Route path="/photos/wiring-manager" element={<WiringManager />} />
        
        {/* Mounted TVs subcategory routes */}
        <Route path="/photos/mounted-tvs/bc-condo-fp" element={<BCCondoFP />} />
        <Route path="/photos/mounted-tvs/backbox-fp" element={<BackboxFP />} />
        <Route path="/photos/mounted-tvs/fp-frame" element={<FPFrame />} />
        <Route path="/photos/mounted-tvs/frame-sonos" element={<FrameSonos />} />
        <Route path="/photos/mounted-tvs/hp" element={<HP />} />
        <Route path="/photos/mounted-tvs/home" element={<Home />} />
        <Route path="/photos/mounted-tvs/mantel-mount" element={<MantelMount />} />
        <Route path="/photos/mounted-tvs/misc" element={<Misc />} />
        <Route path="/photos/mounted-tvs/singletree-fp" element={<SingletreeFP />} />
        <Route path="/photos/mounted-tvs/west-vail-bb" element={<WestVailBB />} />
        <Route path="/photos/mounted-tvs/wood-media" element={<WoodMedia />} />
        
        {/* Add a catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
