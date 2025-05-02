
import { Routes, Route } from "react-router-dom";
import Scheduling from "./pages/scheduling";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import { ConfirmationPage } from "./pages/scheduling/components/ConfirmationPage";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Ava from "./pages/Ava";
import Matterport from "./pages/Matterport";

// Photo gallery pages
import HomeTheater from "./pages/photos/HomeTheater";
import Featured from "./pages/photos/home-theater/Featured";
import EVTheater from "./pages/photos/home-theater/EVTheater";
import CordilleraMediaRoom from "./pages/photos/home-theater/CordilleraMediaRoom";
import MountedTVs from "./pages/photos/MountedTVs";
import Wiring from "./pages/photos/Wiring";
import WiringManager from "./pages/photos/WiringManager";

// Mounted TVs subcategories
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

// Service pages
import AudioEntertainment from "./pages/services/AudioEntertainment";
import ClimateControl from "./pages/services/ClimateControl";
import HomeIntegration from "./pages/services/HomeIntegration";
import Maintenance from "./pages/services/Maintenance";
import Networking from "./pages/services/Networking";
import SecuritySystems from "./pages/services/SecuritySystems";
import Shades from "./pages/services/Shades";
import SmartLighting from "./pages/services/SmartLighting";

function App() {
  try {
    console.log("App rendering, routes being set up");
    
    return (
      <>
        <Toaster />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/index" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/ava" element={<Ava />} />
          <Route path="/matterport" element={<Matterport />} />
          
          {/* Photo gallery routes */}
          <Route path="/photos/home-theater" element={<HomeTheater />} />
          <Route path="/photos/home-theater/featured" element={<Featured />} />
          <Route path="/photos/home-theater/ev-theater" element={<EVTheater />} />
          <Route path="/photos/home-theater/cordillera-media-room" element={<CordilleraMediaRoom />} />
          <Route path="/photos/mounted-tvs" element={<MountedTVs />} />
          
          {/* Mounted TVs subcategories */}
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
          
          <Route path="/photos/wiring" element={<Wiring />} />
          <Route path="/photos/wiring-manager" element={<WiringManager />} />
          
          {/* Service routes */}
          <Route path="/services/audio-entertainment" element={<AudioEntertainment />} />
          <Route path="/services/climate-control" element={<ClimateControl />} />
          <Route path="/services/home-integration" element={<HomeIntegration />} />
          <Route path="/services/maintenance" element={<Maintenance />} />
          <Route path="/services/networking" element={<Networking />} />
          <Route path="/services/security-systems" element={<SecuritySystems />} />
          <Route path="/services/shades" element={<Shades />} />
          <Route path="/services/smart-lighting" element={<SmartLighting />} />
          
          {/* Scheduling routes */}
          <Route path="/scheduling" element={<Scheduling />} />
          <Route path="/scheduling/confirmation" element={<ConfirmationPage />} />
          
          {/* 404 route should be the last one */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    );
  } catch (error) {
    console.error("Error in App component:", error);
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Application Error</h1>
        <p>We're sorry, but something went wrong.</p>
        <button 
          onClick={() => window.location.href = '/'} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Home Page
        </button>
      </div>
    );
  }
}

export default App;
