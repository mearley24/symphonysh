import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { 
  ArrowRight, Home, Volume2, Shield, Lightbulb, Thermometer, 
  Wifi, Wrench, Sun, Grid3X3, Heart, Star, Settings 
} from "lucide-react";
import SEO from "../components/SEO";

const Services = () => {
  const location = useLocation();

  const services = [
    {
      icon: Home,
      title: "Home Automation", 
      description: "Unified smart home control",
      link: "/services/home-integration",
      gradient: "from-blue-600 to-purple-700",
      badge: "Popular"
    },
    {
      icon: Volume2,
      title: "Audio & Entertainment",
      description: "Multi-room audio & theater",
      link: "/services/audio-entertainment", 
      gradient: "from-purple-600 to-pink-700",
    },
    {
      icon: Shield,
      title: "Security",
      description: "Cameras & access control",
      link: "/services/security-systems",
      gradient: "from-red-500 to-pink-600",
    },
    {
      icon: Lightbulb,
      title: "Smart Lighting",
      description: "Intelligent illumination",
      link: "/services/smart-lighting",
      gradient: "from-yellow-500 to-amber-600",
    },
    {
      icon: Thermometer,
      title: "Climate Control",
      description: "Smart temperature management",
      link: "/services/climate-control",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Wifi,
      title: "Networking",
      description: "Enterprise-grade WiFi",
      link: "/services/networking",
      gradient: "from-green-500 to-teal-500",
    },
    {
      icon: Sun,
      title: "Shades",
      description: "Automated window treatments",
      link: "/services/shades",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: Wrench,
      title: "Maintenance",
      description: "24/7 support & service",
      link: "/services/maintenance",
      gradient: "from-orange-500 to-red-500",
    }
  ];

  const bottomNav = [
    { icon: Home, label: "Home", path: "/services/home-integration" },
    { icon: Grid3X3, label: "Services", path: "/services" },
    { icon: Heart, label: "Projects", path: "/projects" },
    { icon: Star, label: "About", path: "/about" },
    { icon: Settings, label: "Contact", path: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white overflow-hidden">
      <SEO 
        title="Smart Home Services - Control4 Automation in Vail Valley"
        description="Complete smart home services including Control4 automation, home theaters, security systems, smart lighting, and more in Vail Valley, Colorado."
        keywords="smart home services, Control4, home automation, home theater, security systems, smart lighting, Vail Valley"
      />
      
      {/* Status Bar */}
      <div className="h-6 bg-black/30 flex items-center justify-between px-6 text-xs text-white/60">
        <span>Symphony</span>
        <span>●●●●● LTE</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600">
            <Grid3X3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">Services</h1>
            <p className="text-xs text-white/60">Smart Home Solutions</p>
          </div>
        </div>
        <Link 
          to="/scheduling" 
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors"
        >
          Schedule
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-24 px-4 py-4" style={{ maxHeight: 'calc(100vh - 140px)' }}>
        <div className="space-y-4">
          {/* Hero Card */}
          <div className="bg-gradient-to-br from-purple-600/30 to-blue-600/30 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <h2 className="text-xl font-bold text-white mb-2">Smart Home Ecosystem</h2>
            <p className="text-white/70 text-sm mb-4">
              Complete integration of lighting, climate, security, and entertainment—all controlled from one interface.
            </p>
            <Link 
              to="/services/home-integration"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition-colors"
            >
              Explore Control4 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-2 gap-3">
            {services.map((service, index) => (
              <Link key={index} to={service.link}>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:scale-[1.02] relative overflow-hidden group">
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                  
                  {/* Badge */}
                  {service.badge && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-accent/20 text-accent text-[10px] rounded-full">
                      {service.badge}
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-3`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-1">{service.title}</h3>
                    <p className="text-white/60 text-xs">{service.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { value: "500+", label: "Projects" },
              { value: "15+", label: "Years" },
              { value: "24/7", label: "Support" },
              { value: "5★", label: "Rating" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-3 text-center">
                <div className="text-lg font-bold text-white">{stat.value}</div>
                <div className="text-[10px] text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 text-center">
            <h3 className="text-lg font-bold text-white mb-2">Ready to Get Started?</h3>
            <p className="text-white/60 text-sm mb-4">
              Schedule a free consultation with our smart home experts.
            </p>
            <Link 
              to="/scheduling"
              className="inline-block px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-xl font-medium transition-colors"
            >
              Schedule Consultation
            </Link>
          </div>
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

export default Services;
