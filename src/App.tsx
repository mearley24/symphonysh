import React from 'react';
import { Route, Routes } from 'react-router-dom';
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

function App() {
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
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/scheduling" element={<Scheduling />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </div>
  );
}

export default App;
