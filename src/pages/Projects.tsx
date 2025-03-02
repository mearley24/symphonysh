
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState("ohEAHYLpcVD");

  const matterportProjects = [
    { id: "ohEAHYLpcVD", title: "Frost Creek Residence" },
    { id: "vM2D6WVw9Jx", title: "Eagle Ranch Residence" },
    { id: "JryTWXeEypj", title: "Avon Residence" },
    { id: "thkE7sSu7S1", title: "Gypsum Residence" },
  ];

  const photoCategories = [
    {
      title: "Mounted TVs",
      description: "Professional TV mounting and installation services",
      path: "/photos/mounted-tvs",
      image: "/lovable-uploads/mounted tvs/Misc/IMG_0224.JPG",
    },
    {
      title: "Wiring",
      description: "Clean and professional wiring solutions",
      path: "/photos/wiring",
      image: "/lovable-uploads/wiring/IMG_0136.JPG",
    },
    {
      title: "Home Theater",
      description: "Custom home theater installations",
      path: "/photos/home-theater",
      image: "/lovable-uploads/home theater/IMG_0921.JPG",
    },
  ];

  const featuredProjects = [
    {
      title: "Luxury Mountain Home Integration",
      description: "Complete smart home integration including lighting, audio, security, and climate control",
      image: "/lovable-uploads/home theater/IMG_0958.JPG",
      tags: ["Smart Lighting", "Audio", "Security", "Climate"],
    },
    {
      title: "Custom Home Theater Installation",
      description: "High-end projector and surround sound system with acoustic treatments",
      image: "/lovable-uploads/home theater/IMG_0980.JPG",
      tags: ["Home Theater", "Audio", "Lighting"],
    },
    {
      title: "Fireplace TV Mount With Concealed Wiring",
      description: "Clean installation with all cables hidden within the wall",
      image: "/lovable-uploads/mounted tvs/BC Condo FP/IMG_0677.JPG",
      tags: ["TV Mounting", "Wiring", "Design"],
    },
    {
      title: "Whole-Home Audio System",
      description: "Seamless audio integration across multiple rooms with smartphone control",
      image: "/lovable-uploads/mounted tvs/Frame Sonos/IMG_0022.JPG",
      tags: ["Audio", "Networking", "Integration"],
    },
  ];

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">Our Projects</h1>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-2xl mx-auto">
            Discover our latest smart home transformations
          </p>

          {/* Featured Projects Section */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredProjects.map((project, index) => (
                <div 
                  key={index}
                  className="bg-secondary/40 rounded-lg overflow-hidden hover:bg-secondary/60 transition-all duration-300 border border-white/10"
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="bg-accent/20 text-accent text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo Categories Section */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Project Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {photoCategories.map((category, index) => (
                <Link 
                  key={index}
                  to={category.path}
                  className="group bg-secondary/40 rounded-lg overflow-hidden hover:bg-secondary/60 transition-all duration-300 border border-white/10"
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-1">{category.title}</h3>
                    <p className="text-sm text-gray-300 mb-2">{category.description}</p>
                    <div className="flex items-center text-accent text-sm">
                      View Gallery
                      <ArrowRight className="ml-2 w-3 h-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Matterport Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Virtual Tours</h2>
            <div className="space-y-8">
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {matterportProjects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setSelectedProject(project.id)}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      selectedProject === project.id
                        ? "bg-accent text-white"
                        : "bg-white/5 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {project.title}
                  </button>
                ))}
              </div>
              <div className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden bg-white/5 border border-white/10">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://my.matterport.com/show/?m=${selectedProject}`}
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; fullscreen; web-share; xr-spatial-tracking;"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 text-center text-gray-400 bg-primary">
        <p className="text-sm">
          © 2024 Symphony Smart Homes. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Projects;
