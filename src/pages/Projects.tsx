import { Link } from "react-router-dom";
import { ArrowRight, Phone, ArrowLeft, Monitor, Cable } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import PageBackground from "../components/PageBackground";
import bgProjects from "../assets/bg-projects.jpg";

const Projects = () => {
  const portfolioSections = [
    {
      title: "Home Theater",
      description: "Dedicated media rooms and home cinema installations with premium audio and video equipment.",
      image: "/lovable-uploads/home theater/IMG_0979.JPG",
      link: "/photos/home-theater",
    },
    {
      title: "Mounted TVs",
      description: "Clean TV installations with concealed wiring — over fireplaces, in bedrooms, media walls, and more.",
      image: "/lovable-uploads/mounted tvs/Home/IMG_0659.JPG",
      link: "/photos/mounted-tvs",
    },
    {
      title: "Wiring & Infrastructure",
      description: "Structured cabling, network racks, and low-voltage rough-in work for new builds and renovations.",
      image: "/lovable-uploads/wiring/IMG_1138.JPG",
      link: "/photos/wiring",
    },
  ];

  return (
    <div className="min-h-screen bg-primary text-primary-foreground">
      <SEO
        title="Our Work | Smart Home Projects in Vail Valley"
        description="Browse our portfolio of smart home installations: home theaters, TV mounting, and structured wiring across Vail Valley and Eagle County."
        keywords="smart home portfolio, home theater, TV mounting, wiring, Vail Valley"
      />
      <Header />

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
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

      {/* Portfolio */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-secondary/30 border-y border-white/5">
        <div className="max-w-5xl mx-auto space-y-6">
          {portfolioSections.map((section, i) => (
            <Link key={i} to={section.link} className="block group">
              <div className="bg-secondary/80 border border-white/8 rounded-xl overflow-hidden hover:border-accent/30 transition-all duration-200">
                <div className="aspect-[16/7] relative">
                  <img src={section.image} alt={section.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-bold text-xl sm:text-2xl mb-1">{section.title}</h3>
                    <p className="text-white/60 text-sm sm:text-base">{section.description}</p>
                    <span className="inline-flex items-center gap-1.5 text-accent text-sm font-medium mt-3 group-hover:gap-2.5 transition-all">
                      View gallery <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
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
    </div>
  );
};

export default Projects;
