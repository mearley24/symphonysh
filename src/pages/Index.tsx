import { Link, useLocation } from "react-router-dom";
import { 
  ArrowRight, Home, Volume2, Shield, Lightbulb, Thermometer, 
  Wifi, Wrench, Sun, Grid3X3, Heart, Star, Settings, Play,
  Phone, Calendar, MapPin
} from "lucide-react";
import SEO from "../components/SEO";

const Index = () => {
  const location = useLocation();

  const quickServices = [
    { icon: Home, title: "Automation", link: "/services/home-integration", gradient: "from-blue-600 to-purple-700" },
    { icon: Volume2, title: "Audio", link: "/services/audio-entertainment", gradient: "from-purple-600 to-pink-700" },
    { icon: Shield, title: "Security", link: "/services/security-systems", gradient: "from-red-500 to-pink-600" },
    { icon: Lightbulb, title: "Lighting", link: "/services/smart-lighting", gradient: "from-yellow-500 to-amber-600" },
  ];

  const allServices = [
    { icon: Thermometer, title: "Climate", link: "/services/climate-control" },
    { icon: Wifi, title: "Networking", link: "/services/networking" },
    { icon: Sun, title: "Shades", link: "/services/shades" },
    { icon: Wrench, title: "Service", link: "/services/maintenance" },
  ];

  const bottomNav = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Grid3X3, label: "Services", path: "/services" },
    { icon: Heart, label: "Projects", path: "/projects" },
    { icon: Star, label: "About", path: "/about" },
    { icon: Settings, label: "Contact", path: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white overflow-hidden">
      <SEO 
        title="Symphony Smart Homes - Premium Home Automation in Vail Valley"
        description="Transform your Vail Valley home with Control4 smart home automation. Expert installation of home theaters, lighting, security, and integrated smart home systems."
        keywords="smart home automation, Control4, home theater, Vail Valley, Colorado, home integration, smart lighting, security systems"
      />
      
      {/* Status Bar */}
      <div className="h-6 bg-black/30 flex items-center justify-between px-6 text-xs text-white/60">
        <span>Symphony</span>
        <span>●●●●● LTE</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/1d7a78ef-4d02-453d-aeea-81e50fb784b6.png" 
            alt="Symphony Smart Homes" 
            className="h-10 w-auto"
          />
        </div>
        <Link 
          to="/scheduling" 
          className="px-4 py-2 bg-accent hover:bg-accent/90 rounded-xl text-sm font-medium transition-colors"
        >
          Book Now
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-24 px-4 py-4" style={{ maxHeight: 'calc(100vh - 140px)' }}>
        <div className="space-y-4">
          {/* Hero Card */}
          <div className="bg-gradient-to-br from-purple-600/40 to-blue-600/40 backdrop-blur-md rounded-2xl border border-white/20 p-6 text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Symphony Smart Homes</h1>
            <p className="text-white/70 text-sm mb-1">Premium Control4 Automation</p>
            <div className="flex items-center justify-center gap-1 text-white/50 text-xs mb-4">
              <MapPin className="w-3 h-3" />
              <span>Vail Valley, Colorado</span>
            </div>
            <div className="flex gap-3 justify-center">
              <Link 
                to="/services/home-integration"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition-colors"
              >
                <Play className="w-4 h-4" /> Live Demo
              </Link>
              <Link 
                to="/scheduling"
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 rounded-xl text-sm font-medium transition-colors"
              >
                Schedule <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Services - Large Cards */}
          <div className="grid grid-cols-2 gap-3">
            {quickServices.map((service, index) => (
              <Link key={index} to={service.link}>
                <div className={`bg-gradient-to-br ${service.gradient} rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-sm">{service.title}</h3>
                  <p className="text-white/70 text-xs mt-1">Tap to explore</p>
                </div>
              </Link>
            ))}
          </div>

          {/* More Services - Small Row */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4">
            <h3 className="text-white/60 text-xs uppercase tracking-wider mb-3">More Services</h3>
            <div className="grid grid-cols-4 gap-2">
              {allServices.map((service, index) => (
                <Link key={index} to={service.link}>
                  <div className="text-center p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                    <service.icon className="w-5 h-5 text-white/80 mx-auto mb-1" />
                    <span className="text-white/70 text-[10px]">{service.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Stats Row */}
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

          {/* Featured Project Preview */}
          <Link to="/projects">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 relative">
                <img 
                  src="/lovable-uploads/home theater/IMG_0979.JPG" 
                  alt="Featured Project" 
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-accent text-xs font-medium">Featured Project</span>
                  <h3 className="text-white font-semibold">Home Theater Installation</h3>
                  <p className="text-white/60 text-xs">View all projects →</p>
                </div>
              </div>
            </div>
          </Link>

          {/* Contact CTA */}
          <div className="grid grid-cols-2 gap-3">
            <Link to="/contact">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 text-center hover:bg-white/15 transition-colors">
                <Phone className="w-6 h-6 text-accent mx-auto mb-2" />
                <span className="text-white text-sm font-medium">Contact Us</span>
                <p className="text-white/50 text-xs mt-1">Get in touch</p>
              </div>
            </Link>
            <Link to="/scheduling">
              <div className="bg-accent/20 backdrop-blur-md rounded-2xl border border-accent/30 p-4 text-center hover:bg-accent/30 transition-colors">
                <Calendar className="w-6 h-6 text-accent mx-auto mb-2" />
                <span className="text-white text-sm font-medium">Schedule</span>
                <p className="text-white/50 text-xs mt-1">Free consultation</p>
              </div>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="bg-white/5 rounded-2xl p-4">
            <div className="flex justify-around items-center text-center">
              <div>
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1">
                  <span className="text-xs">C4</span>
                </div>
                <span className="text-white/50 text-[10px]">Certified</span>
              </div>
              <div>
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Shield className="w-4 h-4 text-white/60" />
                </div>
                <span className="text-white/50 text-[10px]">Insured</span>
              </div>
              <div>
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Star className="w-4 h-4 text-white/60" />
                </div>
                <span className="text-white/50 text-[10px]">5-Star</span>
              </div>
              <div>
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1">
                  <MapPin className="w-4 h-4 text-white/60" />
                </div>
                <span className="text-white/50 text-[10px]">Local</span>
              </div>
            </div>
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

export default Index;
