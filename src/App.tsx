
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import SmartLighting from "./pages/services/SmartLighting";
import SecuritySystems from "./pages/services/SecuritySystems";
import ClimateControl from "./pages/services/ClimateControl";
import AudioEntertainment from "./pages/services/AudioEntertainment";
import VideoSurveillance from "./pages/services/VideoSurveillance";
import HomeIntegration from "./pages/services/HomeIntegration";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/smart-lighting" element={<SmartLighting />} />
          <Route path="/services/security-systems" element={<SecuritySystems />} />
          <Route path="/services/climate-control" element={<ClimateControl />} />
          <Route path="/services/audio-entertainment" element={<AudioEntertainment />} />
          <Route path="/services/video-surveillance" element={<VideoSurveillance />} />
          <Route path="/services/home-integration" element={<HomeIntegration />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
