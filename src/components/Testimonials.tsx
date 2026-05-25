import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { projects } from "../data/projects";

/**
 * "Recent Work" section on the homepage.
 *
 * Renders three hand-picked projects by slug rather than projects.slice(0,3).
 * Picking by slug means the homepage is decoupled from arbitrary array order
 * — add/remove projects elsewhere without changing which three appear here.
 *
 * To swap a card: change one of the slugs in FEATURED_SLUGS below.
 */
const FEATURED_SLUGS = [
  "frame-sonos-combo",
  "wood-media-wall",
  "singletree-fireplace",
];

const Testimonials = () => {
  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  const featured = FEATURED_SLUGS
    .map((slug) => bySlug.get(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/15 backdrop-blur-sm border-y border-white/5">
      <div className="max-w-5xl mx-auto">
        <div data-reveal className="text-center mb-12">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Recent Work
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Real installs from real Vail Valley homes
          </h2>
          <p className="text-white/50 text-sm sm:text-base max-w-2xl mx-auto mt-3">
            Every photo is a project we delivered. No stock imagery, no rendered mockups.
          </p>
        </div>

        <div data-reveal-children className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featured.map((project) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className="group relative flex flex-col rounded-xl border border-white/8 bg-black/40 backdrop-blur-sm overflow-hidden shadow-lg shadow-black/20 hover:border-accent/30 transition-all duration-200"
            >
              <div className="aspect-[16/10] relative overflow-hidden">
                <img
                  src={project.heroPhoto}
                  alt={project.name}
                  className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-white font-semibold text-base mb-1">{project.name}</h3>
                <p className="text-white/50 text-xs flex items-center gap-1 mb-3">
                  <MapPin className="w-3 h-3" /> {project.location}
                </p>
                <p className="text-white/60 text-sm leading-relaxed flex-1">{project.scope}</p>
                <span className="inline-flex items-center gap-1 text-accent text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                  View project <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors"
          >
            View all projects <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
