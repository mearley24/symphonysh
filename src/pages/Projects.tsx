import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, ArrowLeft, MapPin } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import PageBackground from "../components/PageBackground";
import bgProjects from "../assets/bg-projects.jpg";
import { projects, projectCategories } from "../data/projects";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.categories.includes(activeFilter));

  return (
    <PageBackground image={bgProjects}>
      <SEO
        title="Our Work | Smart Home Projects in Vail Valley"
        description="Browse our portfolio of smart home installations: home theaters, TV mounting, and structured wiring across Vail Valley and Eagle County."
        keywords="smart home portfolio, home theater, TV mounting, wiring, Vail Valley"
      />
      <Header />

      {/* Hero */}
      <section className="pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>

          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-3">Our Work</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white">
            Real projects. Real homes. Vail Valley.
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl">
            Browse photos from recent installations across Eagle County — home theaters, TV mounts,
            and structured wiring for new construction and renovations.
          </p>
        </div>
      </section>

      {/* Filter + Project Cards */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {projectCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveFilter(cat.slug)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeFilter === cat.slug
                    ? "bg-accent text-white"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/8"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Project cards — re-keyed on filter change to trigger fade-in animation */}
          <div key={activeFilter} className="grid sm:grid-cols-2 gap-6 animate-fade-in">
            {filtered.map((project, i) => (
              <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
                className="group block bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl overflow-hidden hover:border-accent/30 transition-all duration-200"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img
                    src={project.heroPhoto}
                    alt={project.name}
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Category tags */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {project.categories.map((cat) => {
                      const found = projectCategories.find((c) => c.slug === cat);
                      return found ? (
                        <span
                          key={cat}
                          className="text-xs px-2 py-0.5 rounded bg-accent/80 text-white font-medium backdrop-blur-sm"
                        >
                          {found.label}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-white font-bold text-lg mb-1">{project.name}</h3>
                  <p className="text-white/45 text-xs flex items-center gap-1 mb-3">
                    <MapPin className="w-3 h-3" /> {project.location}
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">{project.scope}</p>
                  <span className="inline-flex items-center gap-1 text-accent text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                    View project <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}

            {filtered.length === 0 && (
              <div className="col-span-2 text-center py-12 text-white/40 text-sm">
                No projects in this category yet.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Get Started</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to start your project?
          </h2>
          <p className="text-white/50 text-base mb-8 max-w-xl mx-auto">
            Whether it's a single TV mount or a full-home system, we'd love to help. Get in touch
            to discuss your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/walkthrough"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base"
            >
              Schedule a Walkthrough <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+19705193013"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base"
            >
              <Phone className="w-4 h-4" /> Call Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </PageBackground>
  );
};

export default Projects;
