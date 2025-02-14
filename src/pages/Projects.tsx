
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

  const photoAlbums = [
    {
      title: "Home Theater Systems",
      description: "Custom-designed entertainment spaces that deliver immersive experiences.",
      images: [
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80",
      ],
    },
    {
      title: "Smart Lighting Solutions",
      description: "Automated lighting systems that enhance ambiance and energy efficiency.",
      images: [
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">Our Projects</h1>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-2xl mx-auto">
            Discover our latest smart home transformations
          </p>

          {/* Photo Albums Section */}
          <div className="space-y-16 mb-20">
            {photoAlbums.map((album, index) => (
              <div key={index} className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-white mb-2">{album.title}</h3>
                  <p className="text-gray-300">{album.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {album.images.map((image, imageIndex) => (
                    <div 
                      key={imageIndex} 
                      className="aspect-video rounded-lg overflow-hidden group cursor-pointer"
                    >
                      <img 
                        src={image} 
                        alt={`${album.title} - Image ${imageIndex + 1}`} 
                        className="w-full h-full object-cover transform transition-all duration-300 scale-95 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
              <div className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden bg-white/5">
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
