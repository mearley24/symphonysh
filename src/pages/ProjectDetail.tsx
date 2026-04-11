import { useEffect, useRef, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, MapPin, Phone } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import PageBackground from "../components/PageBackground";
import bgProjects from "../assets/bg-projects.jpg";
import { projects, projectCategories } from "../data/projects";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  // IntersectionObserver — fade-in images as they enter viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imgRefs.current.indexOf(entry.target as HTMLImageElement);
            if (index !== -1) {
              setVisibleImages((prev) => new Set(prev).add(index));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { rootMargin: "100px" }
    );

    imgRefs.current.forEach((img) => {
      if (img) observer.observe(img);
    });

    return () => observer.disconnect();
  }, [slug]);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const categoryLabels = project.categories.map((c) => {
    const found = projectCategories.find((cat) => cat.slug === c);
    return found?.label ?? c;
  });

  return (
    <PageBackground image={bgProjects}>
      <SEO
        title={`${project.name} | Symphony Smart Homes`}
        description={project.scope}
        keywords={`${project.name}, smart home installation, ${project.location}, ${categoryLabels.join(", ")}`}
      />
      <Header />

      {/* Hero text */}
      <section className="pt-36 sm:pt-44 pb-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Projects
          </Link>

          {/* Category tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categoryLabels.map((label) => (
              <span
                key={label}
                className="text-xs px-2.5 py-1 rounded bg-accent/20 text-accent font-medium"
              >
                {label}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3 text-white">
            {project.name}
          </h1>
          <p className="text-white/50 text-sm flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-accent" /> {project.location}
          </p>
        </div>
      </section>

      {/* Hero photo */}
      <div className="px-4 sm:px-6 mb-10">
        <div className="max-w-4xl mx-auto rounded-xl overflow-hidden border border-white/8">
          <div className="aspect-[16/9] relative">
            <img
              src={project.heroPhoto}
              alt={project.name}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>
      </div>

      {/* Content: gallery + sidebar */}
      <section className="py-8 px-4 sm:px-6 pb-16">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Photo gallery — 2/3 */}
          <div className="md:col-span-2">
            <p className="text-accent font-medium text-xs uppercase tracking-widest mb-4">
              Project Photos
            </p>
            <div className="grid grid-cols-2 gap-3">
              {project.photos.map((photo, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-lg overflow-hidden bg-black/30 border border-white/5"
                >
                  <img
                    ref={(el) => {
                      imgRefs.current[i] = el;
                    }}
                    src={photo}
                    alt={`${project.name} — photo ${i + 1}`}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${
                      visibleImages.has(i) ? "opacity-100" : "opacity-0"
                    }`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar — 1/3 */}
          <div className="space-y-5">
            {/* Project details */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-5">
              <p className="text-accent font-medium text-xs uppercase tracking-widest mb-4">
                Project Details
              </p>
              <div className="space-y-4">
                <div>
                  <p className="text-white/40 text-xs mb-0.5">Location</p>
                  <p className="text-white text-sm font-medium">{project.location}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-0.5">Category</p>
                  <p className="text-white text-sm">{categoryLabels.join(", ")}</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-1.5">About This Project</p>
                  <p className="text-white/60 text-sm leading-relaxed">{project.description}</p>
                </div>
              </div>
            </div>

            {/* Systems Installed — hidden when empty */}
            {project.systemsInstalled && project.systemsInstalled.length > 0 && (
              <div className="bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-5">
                <p className="text-accent font-medium text-xs uppercase tracking-widest mb-3">
                  Systems Installed
                </p>
                <ul className="space-y-1.5">
                  {project.systemsInstalled.map((system, i) => (
                    <li key={i} className="text-white/60 text-sm flex items-start gap-2">
                      <span className="text-accent mt-0.5">·</span> {system}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Testimonial — hidden when null */}
            {project.testimonial && (
              <div className="bg-black/40 backdrop-blur-sm border border-accent/20 rounded-xl p-5">
                <p className="text-accent font-medium text-xs uppercase tracking-widest mb-3">
                  Client Review
                </p>
                <blockquote className="text-white/70 text-sm leading-relaxed italic mb-3">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </blockquote>
                <p className="text-white text-sm font-medium">{project.testimonial.author}</p>
                <p className="text-white/40 text-xs">{project.testimonial.title}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Like what you see?</h2>
          <p className="text-white/50 text-base mb-7 max-w-xl mx-auto">
            Schedule a walkthrough and we'll talk through what's possible for your home.
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

export default ProjectDetail;
