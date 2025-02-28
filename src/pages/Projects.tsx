
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

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">Our Projects</h1>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-2xl mx-auto">
            Discover our latest smart home transformations
          </p>

          {/* Photo Categories Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20">
            {photoCategories.map((category, index) => (
              <Link 
                key={index}
                to={category.path}
                className="group bg-secondary rounded-lg overflow-hidden hover:ring-2 hover:ring-accent transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm md:text-base font-semibold text-white mb-1">{category.title}</h3>
                  <p className="text-xs md:text-sm text-gray-300">{category.description}</p>
                  <div className="mt-2 flex items-center text-accent text-xs md:text-sm">
                    View Gallery
                    <ArrowRight className="ml-2 w-3 h-3" />
                  </div>
                </div>
              </Link>
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
