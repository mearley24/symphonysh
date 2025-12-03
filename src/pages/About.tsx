import { Link, useLocation } from "react-router-dom";
import { 
  Check, Home, Grid3X3, Heart, Star, Settings, 
  Award, Users, Clock, Shield, MapPin, Phone
} from "lucide-react";
import SEO from "../components/SEO";

const About = () => {
  const location = useLocation();

  const bottomNav = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Grid3X3, label: "Services", path: "/services" },
    { icon: Heart, label: "Projects", path: "/projects" },
    { icon: Star, label: "About", path: "/about" },
    { icon: Settings, label: "Contact", path: "/contact" },
  ];

  const stats = [
    { value: "15+", label: "Years Experience", icon: Clock },
    { value: "500+", label: "Projects Completed", icon: Award },
    { value: "100%", label: "Satisfaction", icon: Star },
    { value: "24/7", label: "Support", icon: Shield },
  ];

  const whyChooseUs = [
    "Control4 Certified Dealers",
    "Expert installation team",
    "24/7 support service",
    "Custom solutions",
    "Latest technology",
    "Local Vail Valley specialists",
  ];

  const values = [
    "Quality excellence",
    "Customer satisfaction",
    "Innovation focus",
    "Reliable service",
    "Transparent pricing",
    "Long-term partnerships",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white overflow-hidden">
      <SEO 
        title="About Us - Symphony Smart Homes" 
        description="Learn about Symphony Smart Homes and our mission to transform houses into intelligent, efficient living spaces in Vail Valley."
        keywords="smart home, home automation, about us, symphony smart homes, Vail Valley"
      />
      
      {/* Status Bar */}
      <div className="h-6 bg-black/30 flex items-center justify-between px-6 text-xs text-white/60">
        <span>Symphony</span>
        <span>●●●●● LTE</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600">
            <Star className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">About Us</h1>
            <p className="text-xs text-white/60">Our Story & Mission</p>
          </div>
        </div>
        <Link 
          to="/contact" 
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-colors"
        >
          Contact
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-24 px-4 py-4" style={{ maxHeight: 'calc(100vh - 140px)' }}>
        <div className="space-y-4">
          {/* Hero */}
          <div className="bg-gradient-to-br from-amber-500/30 to-orange-600/30 backdrop-blur-md rounded-2xl border border-white/20 p-6 text-center">
            <img 
              src="/lovable-uploads/1d7a78ef-4d02-453d-aeea-81e50fb784b6.png" 
              alt="Symphony Smart Homes" 
              className="h-12 w-auto mx-auto mb-3"
            />
            <h2 className="text-xl font-bold text-white mb-2">Symphony Smart Homes</h2>
            <p className="text-white/70 text-sm">
              Leading the way in smart home automation technology in Vail Valley
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-3 text-center">
                <stat.icon className="w-5 h-5 text-accent mx-auto mb-1" />
                <div className="text-lg font-bold text-white">{stat.value}</div>
                <div className="text-[9px] text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Mission */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-5">
            <h3 className="text-white font-semibold mb-3">Our Mission</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              At Symphony Smart Homes, we're dedicated to transforming houses into intelligent, 
              efficient, and comfortable living spaces. Our mission is to bring the future of 
              home automation to your doorstep with solutions that enhance your lifestyle.
            </p>
          </div>

          {/* Why Choose Us & Values */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4">
              <h3 className="text-white font-semibold text-sm mb-3">Why Choose Us</h3>
              <div className="space-y-2">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-accent flex-shrink-0" />
                    <span className="text-white/70 text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4">
              <h3 className="text-white font-semibold text-sm mb-3">Our Values</h3>
              <div className="space-y-2">
                {values.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-accent flex-shrink-0" />
                    <span className="text-white/70 text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-5">
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-5 h-5 text-accent" />
              <h3 className="text-white font-semibold">Our Team</h3>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-3">
              Our team consists of certified Control4 professionals with decades of combined 
              experience in home automation, audio/video systems, and network infrastructure.
            </p>
            <div className="flex items-center gap-2 text-white/50 text-xs">
              <MapPin className="w-3 h-3" />
              <span>Proudly serving Vail Valley, Colorado</span>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-accent/20 backdrop-blur-md rounded-2xl border border-accent/30 p-5 text-center">
            <h3 className="text-white font-semibold mb-2">Ready to Get Started?</h3>
            <p className="text-white/60 text-sm mb-4">
              Let us transform your home into a smart living space.
            </p>
            <div className="flex gap-3 justify-center">
              <Link 
                to="/contact"
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition-colors"
              >
                <Phone className="w-4 h-4 inline mr-2" />
                Contact Us
              </Link>
              <Link 
                to="/scheduling"
                className="px-4 py-2 bg-accent hover:bg-accent/90 rounded-xl text-sm font-medium transition-colors"
              >
                Schedule Consultation
              </Link>
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

export default About;
