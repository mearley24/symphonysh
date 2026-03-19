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
  const [activeTab, setActiveTab] = useState("home");

  const categoryTabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "services", label: "Services", icon: Grid3X3 },
    { id: "projects", label: "Projects", icon: Tv },
    { id: "contact", label: "Contact", icon: Phone },
  ];

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

      {/* Category Tabs - Centered */}
      <div className="flex justify-center px-4 py-3 border-b border-white/10">
        <div className="flex gap-2 bg-white/5 p-1 rounded-xl">
          {categoryTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-accent text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-24 px-4 py-4" style={{ maxHeight: 'calc(100vh - 140px)' }}>
        
        {/* Home Tab */}
        {activeTab === "home" && (
          <div className="space-y-4">
            {/* Hero Card */}
            <div className="bg-gradient-to-br from-purple-600/40 to-blue-600/40 backdrop-blur-md rounded-2xl border border-white/20 p-6 text-center">
              <img 
                src="/lovable-uploads/1d7a78ef-4d02-453d-aeea-81e50fb784b6.png" 
                alt="Symphony Smart Homes" 
                className="h-12 w-auto mx-auto mb-3"
              />
              <h1 className="text-xl font-bold text-white mb-1">Symphony Smart Homes</h1>
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

            {/* Quick Services - 2x2 */}
            <div className="grid grid-cols-2 gap-3">
              {allServices.slice(0, 4).map((service, index) => (
                <Link key={index} to={service.link}>
                  <div className={`bg-gradient-to-br ${service.gradient} rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02]`}>
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-2">
                      <service.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-white font-semibold text-sm">{service.title}</h3>
                    <p className="text-white/70 text-xs">{service.desc}</p>
                  </div>
                </Link>
              ))}
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

            {/* Featured Project */}
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
          </div>
        )}

        {/* Services Tab - All Services */}
        {activeTab === "services" && (
          <div className="space-y-4">
            <div className="text-center mb-2">
              <h2 className="text-lg font-bold text-white">Our Services</h2>
              <p className="text-white/60 text-xs">Complete smart home solutions</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {allServices.map((service, index) => (
                <Link key={index} to={service.link}>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 transition-all duration-300 hover:bg-white/15 hover:scale-[1.02] group">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-3`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white font-semibold text-sm">{service.title}</h3>
                    <p className="text-white/60 text-xs">{service.desc}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* View All Link */}
            <Link to="/services">
              <div className="bg-accent/20 backdrop-blur-md rounded-2xl border border-accent/30 p-4 text-center hover:bg-accent/30 transition-colors">
                <span className="text-white text-sm font-medium">View All Services</span>
                <ArrowRight className="w-4 h-4 inline ml-2" />
              </div>
            </Link>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-4">
            <div className="text-center mb-2">
              <h2 className="text-lg font-bold text-white">Our Work</h2>
              <p className="text-white/60 text-xs">Recent installations</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: "Home Theater", img: "/lovable-uploads/home theater/IMG_0979.JPG" },
                { title: "TV Mounting", img: "/lovable-uploads/mounted tvs/Home/IMG_0659.JPG" },
                { title: "Wiring", img: "/lovable-uploads/wiring/IMG_1138.JPG" },
                { title: "Media Room", img: "/lovable-uploads/home theater/IMG_0980.JPG" },
              ].map((project, index) => (
                <Link key={index} to="/projects">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden hover:scale-[1.02] transition-all">
                    <div className="aspect-square relative">
                      <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-2 left-2">
                        <span className="text-white text-sm font-medium">{project.title}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <Link to="/projects">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 text-center hover:bg-white/15 transition-colors">
                <span className="text-white text-sm font-medium">View Full Portfolio</span>
                <ArrowRight className="w-4 h-4 inline ml-2" />
              </div>
            </Link>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <div className="space-y-4">
            <div className="text-center mb-2">
              <h2 className="text-lg font-bold text-white">Get In Touch</h2>
              <p className="text-white/60 text-xs">We're here to help</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-white font-semibold mb-2">Call Us</h3>
              <p className="text-white/60 text-sm mb-4">Speak directly with our team</p>
              <a href="tel:+19705193013" className="inline-block px-6 py-3 bg-accent hover:bg-accent/90 rounded-xl text-white font-medium transition-colors">
                (970) 519-3013
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link to="/contact">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 text-center hover:bg-white/15 transition-colors h-full">
                  <Settings className="w-6 h-6 text-white/80 mx-auto mb-2" />
                  <span className="text-white text-sm font-medium">Contact Form</span>
                  <p className="text-white/50 text-xs mt-1">Send a message</p>
                </div>
              </Link>
              <Link to="/scheduling">
                <div className="bg-accent/20 backdrop-blur-md rounded-2xl border border-accent/30 p-4 text-center hover:bg-accent/30 transition-colors h-full">
                  <Calendar className="w-6 h-6 text-accent mx-auto mb-2" />
                  <span className="text-white text-sm font-medium">Schedule</span>
                  <p className="text-white/50 text-xs mt-1">Free consultation</p>
                </div>
              </Link>
            </div>

            <div className="bg-white/5 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-5 h-5 text-accent" />
                <span className="text-white text-sm">Serving Vail Valley, Colorado</span>
              </div>
              <p className="text-white/50 text-xs">
                Eagle, Vail, Avon, Beaver Creek, Edwards, and surrounding areas
              </p>
            </div>
          </div>
        )}
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
