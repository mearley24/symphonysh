import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Cable, Monitor } from "lucide-react";
import SEO from "../components/SEO";
import Header from "@/components/Header";

const portfolioSections = [
  {
    icon: Monitor,
    title: "Home Theaters",
    description: "Premium home cinema installations.",
    image: "/lovable-uploads/home theater/IMG_0979.JPG",
    link: "/photos/home-theater",
  },
  {
    icon: Monitor,
    title: "Mounted TVs",
    description: "Clean TV mounting + media wall installs.",
    image: "/lovable-uploads/mounted tvs/Home/IMG_0659.JPG",
    link: "/photos/mounted-tvs",
  },
  {
    icon: Cable,
    title: "Wiring & Infrastructure",
    description: "Structured wiring and rack installations.",
    image: "/lovable-uploads/wiring/IMG_1138.JPG",
    link: "/photos/wiring",
  },
];

const recentProjects = [
  { img: "/lovable-uploads/home theater/IMG_0980.JPG", title: "Media Room" },
  { img: "/lovable-uploads/mounted tvs/Misc/IMG_0875.JPG", title: "Living Room TV" },
  { img: "/lovable-uploads/wiring/IMG_1311.JPG", title: "Network Rack" },
  { img: "/lovable-uploads/home theater/IMG_0981.JPG", title: "Theater Seating" },
];

export default function Projects() {
  return (
    <div className="min-h-screen c4-gradient text-white">
      <SEO
        title="Projects - Symphony Smart Homes"
        description="Browse our portfolio of smart home installations across Vail Valley, Colorado."
        keywords="smart home portfolio, home theater installation, TV mounting, structured wiring, Vail Valley projects"
      />

      <Header />

      <main className="pt-24 sm:pt-28">
        {/* HERO */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="c4-surface rounded-3xl p-6 sm:p-10">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Our Work</h1>
            <p className="text-white/70 mt-3 max-w-2xl">
              A few examples of installs we’re proud of—clean wiring, thoughtful design, and systems that feel effortless.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to="/scheduling"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-5 py-3 rounded-xl font-medium transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Start a project
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 px-5 py-3 rounded-xl font-medium transition-colors"
              >
                Get a quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTIONS */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
          <div className="grid gap-3 lg:grid-cols-3">
            {portfolioSections.map((section) => (
              <Link key={section.title} to={section.link} className="block">
                <div className="c4-surface rounded-3xl overflow-hidden hover:bg-white/5 transition-colors h-full">
                  <div className="aspect-video relative">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-85"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-white font-semibold">{section.title}</div>
                          <div className="text-white/60 text-sm mt-1">{section.description}</div>
                        </div>
                        <div className="text-accent inline-flex items-center gap-1 text-sm">
                          View <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* RECENT */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-10 pb-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Recent</h2>
              <p className="text-white/70 mt-2">Quick snapshots from recent installs.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {recentProjects.map((p) => (
              <Link key={p.title} to="/projects" className="block">
                <div className="c4-tile rounded-2xl overflow-hidden hover:bg-white/5 transition-colors">
                  <div className="aspect-square relative">
                    <img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="text-white text-sm font-medium">{p.title}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <div className="c4-surface rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-semibold">Want yours to look this clean?</h3>
                <p className="text-white/70 mt-2">We’ll help you design it, install it, and support it.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 px-5 py-3 rounded-xl font-medium transition-colors"
                >
                  Get a quote
                </Link>
                <Link
                  to="/scheduling"
                  className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-5 py-3 rounded-xl font-medium transition-colors"
                >
                  Schedule
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
