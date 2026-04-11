import { Link } from "react-router-dom";
import { ArrowRight, Phone, ArrowLeft, Monitor, Cable, Film, Camera, Image } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import PageBackground from "../components/PageBackground";
import bgProjects from "../assets/bg-projects.jpg";

const projectCategories = [
  {
    title: "Home Theater",
    icon: Film,
    description:
      "From dedicated theater rooms with acoustic treatment to casual media spaces — designed for how you actually watch.",
    image: "/lovable-uploads/home theater/IMG_0979.JPG",
    link: "/photos/home-theater",
    subGalleries: [
      { name: "Featured Install", link: "/photos/home-theater/featured" },
      { name: "Eagle-Vail Theater", link: "/photos/home-theater/ev-theater" },
      { name: "Cordillera Media Room", link: "/photos/home-theater/cordillera-media-room" },
    ],
  },
  {
    title: "Mounted TVs",
    icon: Monitor,
    description:
      "Clean, level installs with hidden wiring. Every mount rated for the TV, every cable managed.",
    image: "/lovable-uploads/mounted tvs/Home/IMG_0659.JPG",
    link: "/photos/mounted-tvs",
    subGalleries: [
      { name: "Home Installs", link: "/photos/mounted-tvs/home" },
      { name: "Fireplace & Frame", link: "/photos/mounted-tvs/fp-frame" },
      { name: "Frame + Sonos", link: "/photos/mounted-tvs/frame-sonos" },
      { name: "MantelMount", link: "/photos/mounted-tvs/mantel-mount" },
      { name: "Beaver Creek Condo", link: "/photos/mounted-tvs/bc-condo-fp" },
      { name: "West Vail", link: "/photos/mounted-tvs/west-vail-bb" },
    ],
  },
  {
    title: "Wiring & Infrastructure",
    icon: Cable,
    description:
      "The work behind the walls that makes everything else possible. Cat6, HDMI, speaker wire, conduit — done right the first time.",
    image: "/lovable-uploads/wiring/IMG_1138.JPG",
    link: "/photos/wiring",
    subGalleries: [],
  },
];

const Projects = () => {
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
          <Link to="/" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>

          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-3">Our Work</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white">
            Real projects. Real homes. Vail Valley.
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl">
            Browse photos from recent installations across Eagle County — home theaters, TV mounts, and structured wiring for new construction and renovations.
          </p>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-5xl mx-auto space-y-8">
          {projectCategories.map((category, i) => (
            <div key={i} className="bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl overflow-hidden hover:border-accent/20 transition-all duration-200">
              {/* Image header - links to main gallery */}
              <Link to={category.link} className="block group">
                <div className="aspect-[16/7] relative">
                  <img src={category.image} alt={category.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-lg bg-accent/20 backdrop-blur-sm flex items-center justify-center">
                        <category.icon className="w-4.5 h-4.5 text-accent" />
                      </div>
                      <h3 className="text-white font-bold text-xl sm:text-2xl">{category.title}</h3>
                    </div>
                    <p className="text-white/60 text-sm sm:text-base max-w-xl">{category.description}</p>
                    <span className="inline-flex items-center gap-1.5 text-accent text-sm font-medium mt-3 group-hover:gap-2.5 transition-all">
                      <Camera className="w-3.5 h-3.5" /> View all photos <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>

              {/* Sub-gallery links */}
              {category.subGalleries.length > 0 && (
                <div className="px-6 py-4 border-t border-white/5">
                  <p className="text-white/40 text-xs uppercase tracking-wide font-medium mb-3">Featured Galleries</p>
                  <div className="flex flex-wrap gap-2">
                    {category.subGalleries.map((sub, j) => (
                      <Link
                        key={j}
                        to={sub.link}
                        className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Image className="w-3 h-3" />
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Ready to start your project?</h2>
          <p className="text-white/50 text-base mb-8 max-w-xl mx-auto">
            Whether it's a single TV mount or a full-home system, we'd love to help. Get in touch to discuss your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/scheduling" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base">
              Schedule a Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+19705193013" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base">
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
