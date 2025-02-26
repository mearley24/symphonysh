import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";
import Scheduling from "./pages/Scheduling";
import GoogleAuth from "./pages/admin/GoogleAuth";
import OAuthCallback from "./pages/admin/OAuthCallback";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/scheduling" element={<Scheduling />} />
        <Route path="/admin/google-auth" element={<GoogleAuth />} />
        <Route path="/admin/oauth-callback" element={<OAuthCallback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
