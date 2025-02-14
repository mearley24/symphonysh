
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";

const ProjectCard = ({ title, description, image }: { title: string; description: string; image: string }) => (
  <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <Link 
        to="/contact"
        className="inline-flex items-center text-accent hover:text-accent/90"
      >
        Learn More <ArrowRight className="w-4 h-4 ml-2" />
      </Link>
    </div>
  </div>
);

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState("ohEAHYLpcVD");

  const matterportProjects = [
    { id: "ohEAHYLpcVD", title: "Frost Creek Residence" },
    { id: "vM2D6WVw9Jx", title: "Eagle Ranch Residence" },
    { id: "JryTWXeEypj", title: "Avon Residence" },
    { id: "thkE7sSu7S1", title: "Gypsum Residence" },
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <ProjectCard
              title="Modern Mountain Estate"
              description="Complete smart home automation with lighting, climate, and entertainment systems."
              image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80"
            />
            <ProjectCard
              title="Urban Smart Penthouse"
              description="Integrated security and comfort solutions for luxury city living."
              image="https://images.unsplash.com/photo-1600607687644-c7171b47104e?auto=format&fit=crop&q=80"
            />
            <ProjectCard
              title="Smart Family Home"
              description="Family-friendly automation with focus on safety and entertainment."
              image="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&q=80"
            />
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
