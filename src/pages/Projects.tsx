import { Link, useLocation } from "react-router-dom";
import { 
  ArrowRight, Camera, Monitor, Cable, Home, Grid3X3, Heart, 
  Star, Settings, Play, Calendar
} from "lucide-react";
import SEO from "../components/SEO";

const Projects = () => {
  const location = useLocation();

  const bottomNav = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Grid3X3, label: "Services", path: "/services" },
    { icon: Heart, label: "Projects", path: "/projects" },
    { icon: Star, label: "About", path: "/about" },
    { icon: Settings, label: "Contact", path: "/contact" },
  ];

  const portfolioSections = [
    {
      icon: Monitor,
      title: "Home Theater",
      description: "Premium home cinema installations with cutting-edge technology",
      image: "/lovable-uploads/home theater/IMG_0979.JPG",
      link: "/photos/home-theater",
      count: "15+",
      gradient: "from-purple-600 to-pink-700"
    },
    {
      icon: Monitor,
      title: "Mounted TVs",
      description: "Expert TV mounting and media wall installations",
      image: "/lovable-uploads/mounted tvs/Home/IMG_0659.JPG",
      link: "/photos/mounted-tvs",
      count: "50+",
      gradient: "from-blue-600 to-purple-700"
    },
    {
      icon: Cable,
      title: "Wiring & Infrastructure",
      description: "Professional structured wiring and rack installations",
      image: "/lovable-uploads/wiring/IMG_1138.JPG",
      link: "/photos/wiring",
      count: "100+",
      gradient: "from-green-500 to-teal-600"
    }
  ];

  const recentProjects = [
    { img: "/lovable-uploads/home theater/IMG_0980.JPG", title: "Media Room" },
    { img: "/lovable-uploads/mounted tvs/Misc/IMG_0875.JPG", title: "Living Room TV" },
    { img: "/lovable-uploads/wiring/IMG_1311.JPG", title: "Network Rack" },
    { img: "/lovable-uploads/home theater/IMG_0981.JPG", title: "Theater Seating" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white overflow-hidden">
      <SEO 
        title="Our Project Portfolio - Smart Home Installations in Vail Valley"
        description="Browse our portfolio of smart home installations including home theaters, TV mounting, and structured wiring projects throughout Vail Valley, Colorado."
        keywords="smart home portfolio, home theater installation, TV mounting, structured wiring, Vail Valley projects"
      />
      
      {/* Status Bar */}
      <div className="h-6 bg-black/30 flex items-center justify-between px-6 text-xs text-white/60">
        <span>Symphony</span>
        <span>●●●●● LTE</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">Our Work</h1>
            <p className="text-xs text-white/60">Project Portfolio</p>
          </div>
        </div>
        <Link 
          to="/scheduling" 
          className="px-4 py-2 bg-accent hover:bg-accent/90 rounded-xl text-sm font-medium transition-colors"
        >
          Start Project
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-24 px-4 py-4" style={{ maxHeight: 'calc(100vh - 140px)' }}>
        <div className="space-y-4">
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3">
            {portfolioSections.map((section) => (
              <div key={section.title} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-3 text-center">
                <div className="text-xl font-bold text-white">{section.count}</div>
                <div className="text-[10px] text-white/60">{section.title}</div>
              </div>
            ))}
          </div>

          {/* Portfolio Sections */}
          {portfolioSections.map((section, index) => (
            <Link key={index} to={section.link}>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all hover:scale-[1.01]">
                <div className="aspect-video relative">
                  <img 
                    src={section.image} 
                    alt={section.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${section.gradient} flex items-center justify-center`}>
                      <section.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-semibold">{section.title}</h3>
                        <p className="text-white/60 text-xs">{section.description}</p>
                      </div>
                      <div className="flex items-center gap-1 text-accent">
                        <span className="text-sm">View</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* Recent Projects Grid */}
          <div>
            <h3 className="text-white/60 text-xs uppercase tracking-wider mb-3 px-1">Recent Work</h3>
            <div className="grid grid-cols-2 gap-3">
              {recentProjects.map((project, index) => (
                <Link key={index} to="/photos/home-theater">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden hover:scale-[1.02] transition-all">
                    <div className="aspect-square relative">
                      <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <span className="text-white text-xs font-medium">{project.title}</span>
                      </div>
                      <div className="absolute top-2 right-2 w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Play className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-accent/20 backdrop-blur-md rounded-2xl border border-accent/30 p-5 text-center">
            <Camera className="w-8 h-8 text-accent mx-auto mb-2" />
            <h3 className="text-white font-semibold mb-1">Start Your Project</h3>
            <p className="text-white/60 text-xs mb-4">Let us bring your smart home vision to life</p>
            <div className="flex gap-3 justify-center">
              <Link 
                to="/contact"
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition-colors"
              >
                Get a Quote
              </Link>
              <Link 
                to="/scheduling"
                className="px-4 py-2 bg-accent hover:bg-accent/90 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Schedule
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

export default Projects;
