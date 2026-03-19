import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { 
  ArrowRight, Home, Volume2, Shield, Lightbulb, Thermometer, 
  Wifi, Wrench, Sun, Grid3X3, Heart, Star, Settings, Play,
  Phone, Calendar, MapPin, Tv
} from "lucide-react";
import SEO from "../components/SEO";

const Index = () => {
  const location = useLocation();

  const allServices = [
    { icon: Home, title: "Automation", link: "/services/home-integration", gradient: "from-blue-600 to-purple-700", desc: "Control4 integration" },
    { icon: Volume2, title: "Audio", link: "/services/audio-entertainment", gradient: "from-purple-600 to-pink-700", desc: "Multi-room & theater" },
    { icon: Shield, title: "Security", link: "/services/security-systems", gradient: "from-red-500 to-pink-600", desc: "Cameras & access" },
    { icon: Lightbulb, title: "Lighting", link: "/services/smart-lighting", gradient: "from-yellow-500 to-amber-600", desc: "Smart illumination" },
    { icon: Thermometer, title: "Climate", link: "/services/climate-control", gradient: "from-blue-500 to-cyan-500", desc: "HVAC control" },
    { icon: Wifi, title: "Networking", link: "/services/networking", gradient: "from-green-500 to-teal-500", desc: "Enterprise WiFi" },
    { icon: Sun, title: "Shades", link: "/services/shades", gradient: "from-amber-500 to-orange-500", desc: "Window automation" },
    { icon: Wrench, title: "Maintenance", link: "/services/maintenance", gradient: "from-orange-500 to-red-500", desc: "24/7 support" },
  ];

  const bottomNav = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Grid3X3, label: "Services", path: "/services" },
    { icon: Heart, label: "Projects", path: "/projects" },
    { icon: Star, label: "About", path: "/about" },
    { icon: Settings, label: "Contact", path: "/contact" },
  ];

  const stats = [
    { value: "500+", label: "Projects" },
    { value: "15+", label: "Years" },
    { value: "24/7", label: "Support" },
    { value: "5★", label: "Rating" },
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white overflow-hidden flex flex-col">
      <SEO 
        title="Symphony Smart Homes - Premium Home Automation in Vail Valley"
        description="Transform your Vail Valley home with Control4 smart home automation. Expert installation of home theaters, lighting, security, and integrated smart home systems."
        keywords="smart home automation, Control4, home theater, Vail Valley, Colorado, home integration, smart lighting, security systems"
      />
      
      {/* Status Bar */}
      <div className="h-6 bg-black/30 flex items-center justify-between px-6 text-xs text-white/60 shrink-0">
        <span>Symphony</span>
        <span>●●●●● LTE</span>
      </div>

      {/* Main Dashboard Content */}
      <div className="flex-1 overflow-hidden px-4 py-3 flex flex-col gap-3 pb-20">
        
        {/* Hero Row — Logo + text left, accent image right */}
        <div className="flex items-center gap-4 bg-gradient-to-r from-purple-600/30 to-blue-600/30 backdrop-blur-md rounded-2xl border border-white/15 p-4 shrink-0">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <img 
                src="/lovable-uploads/1d7a78ef-4d02-453d-aeea-81e50fb784b6.png" 
                alt="Symphony Smart Homes" 
                className="h-10 w-auto"
              />
              <div>
                <h1 className="text-lg font-bold text-white leading-tight">Symphony Smart Homes</h1>
                <p className="text-white/60 text-xs">Premium Control4 Automation</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-white/50 text-xs mb-3">
              <MapPin className="w-3 h-3" />
              <span>Vail Valley, Colorado</span>
            </div>
            <div className="flex gap-2">
              <Link 
                to="/services/home-integration"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-lg text-xs font-medium transition-colors"
              >
                <Play className="w-3 h-3" /> Live Demo
              </Link>
              <Link 
                to="/scheduling"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent hover:bg-accent/90 rounded-lg text-xs font-medium transition-colors"
              >
                Schedule <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
          {/* Small accent image */}
          <div className="w-28 h-28 rounded-xl overflow-hidden shrink-0 border border-white/10">
            <img 
              src="/lovable-uploads/home theater/IMG_0979.JPG" 
              alt="Home Theater Installation" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-2 shrink-0">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white/8 backdrop-blur-md rounded-xl border border-white/10 p-2 text-center">
              <div className="text-base font-bold text-white">{stat.value}</div>
              <div className="text-[10px] text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Services Grid — 4x2 */}
        <div className="flex-1 grid grid-cols-4 grid-rows-2 gap-2 min-h-0">
          {allServices.map((service, index) => (
            <Link key={index} to={service.link} className="min-h-0">
              <div className={`bg-gradient-to-br ${service.gradient} rounded-xl p-3 h-full flex flex-col justify-between transition-all duration-200 hover:scale-[1.02] hover:shadow-lg`}>
                <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center mb-1.5">
                  <service.icon className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm leading-tight">{service.title}</h3>
                  <p className="text-white/70 text-[10px] leading-tight mt-0.5">{service.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Actions Row */}
        <div className="grid grid-cols-3 gap-2 shrink-0">
          <a href="tel:+19705193013" className="bg-white/8 backdrop-blur-md rounded-xl border border-white/10 p-3 text-center hover:bg-white/12 transition-colors">
            <Phone className="w-5 h-5 text-green-400 mx-auto mb-1" />
            <span className="text-white text-xs font-medium block">(970) 519-3013</span>
            <span className="text-white/40 text-[10px]">Call Now</span>
          </a>
          <Link to="/scheduling" className="bg-accent/20 backdrop-blur-md rounded-xl border border-accent/30 p-3 text-center hover:bg-accent/30 transition-colors">
            <Calendar className="w-5 h-5 text-accent mx-auto mb-1" />
            <span className="text-white text-xs font-medium block">Schedule</span>
            <span className="text-white/40 text-[10px]">Free Consult</span>
          </Link>
          <Link to="/projects" className="bg-white/8 backdrop-blur-md rounded-xl border border-white/10 p-3 text-center hover:bg-white/12 transition-colors">
            <Tv className="w-5 h-5 text-purple-400 mx-auto mb-1" />
            <span className="text-white text-xs font-medium block">Portfolio</span>
            <span className="text-white/40 text-[10px]">View Work</span>
          </Link>
        </div>
      </div>

      {/* Bottom Navigation Dock */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-xl border-t border-white/10">
        <div className="flex justify-around items-center py-3 px-4">
          {bottomNav.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-all ${
                  isActive 
                    ? "text-white bg-white/10" 
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px]">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;
