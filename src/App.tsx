
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import MountedTVs from "./pages/photos/MountedTVs";
import Wiring from "./pages/photos/Wiring";
import HomeTheater from "./pages/photos/HomeTheater";
import SmartLighting from "./pages/services/SmartLighting";
import SecuritySystems from "./pages/services/SecuritySystems";
import ClimateControl from "./pages/services/ClimateControl";
import AudioEntertainment from "./pages/services/AudioEntertainment";
import HomeIntegration from "./pages/services/HomeIntegration";
import Networking from "./pages/services/Networking";
import Shades from "./pages/services/Shades";
import Maintenance from "./pages/services/Maintenance";
import Matterport from "./pages/Matterport";
import Scheduling from "./pages/Scheduling";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/matterport" element={<Matterport />} />
            <Route path="/scheduling" element={<Scheduling />} />
            <Route path="/photos/mounted-tvs" element={<MountedTVs />} />
            <Route path="/photos/wiring" element={<Wiring />} />
            <Route path="/photos/home-theater" element={<HomeTheater />} />
            <Route path="/services/smart-lighting" element={<SmartLighting />} />
            <Route path="/services/security-systems" element={<SecuritySystems />} />
            <Route path="/services/climate-control" element={<ClimateControl />} />
            <Route path="/services/audio-entertainment" element={<AudioEntertainment />} />
            <Route path="/services/home-integration" element={<HomeIntegration />} />
            <Route path="/services/networking" element={<Networking />} />
            <Route path="/services/shades" element={<Shades />} />
            <Route path="/services/maintenance" element={<Maintenance />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
