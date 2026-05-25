import { Link } from "react-router-dom";
import { ArrowRight, Phone, ArrowLeft, CheckCircle2, MapPin } from "lucide-react";
import { trackPhoneClick } from "../utils/tracking";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import PageBackground from "../components/PageBackground";
import bgAbout from "../assets/bg-about.jpg";
import { aboutPageLocalBusinessSchema } from "../constants/businessSchema";
import { useScrollReveal } from "../hooks/useScrollReveal";

const About = () => {
  const serviceSchema = aboutPageLocalBusinessSchema();
  const revealRef = useScrollReveal();

  return (
    <PageBackground image={bgAbout}>
      <div ref={revealRef}>
      <SEO
        title="About Us — Vail Valley"
        description="A local Eagle County team behind smart homes across the Vail Valley. Control4 is our lead recommendation, but we work in any major platform when the home calls for it. Same faces from first walkthrough through year five."
        keywords="about symphony smart homes, Vail Valley smart home, Eagle County, local integrator"
        schema={serviceSchema}
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "About", url: "/about" }]}
      />
      <Header />

      {/* Hero — no reveal */}
      <section className="pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-3">About</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white hero-text-shadow">
            Same faces, same number, same house — from rough-in to year five.
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl hero-subtext-shadow">
            A local Eagle County team led by founder Matt Earley. The people who walk the property are the same ones who tune the routines two years later.
          </p>
        </div>
      </section>

      <div className="hero-divider w-full" />

      {/* How We Work */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div data-reveal>
            <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">How We Work</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">A few things that don't bend.</h2>
          </div>

          <div data-reveal-children className="grid sm:grid-cols-2 gap-5">
            {[
              { title: "Do it right the first time", description: "Every cable labeled, every system tested, every program documented." },
              { title: "Keep it quiet for you", description: "If the house needs a manual to turn on a light, something went wrong. Scenes on the wall, named in plain English." },
              { title: "Transparent pricing", description: "Detailed proposals with clear line items — what each platform costs and what to defer." },
              { title: "A real person picks up", description: "Reach the same team that knows your house. Remote fixes when possible, on-site when needed." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-xl border border-white/8 bg-black/40 backdrop-blur-sm hover:border-accent/20 transition-all duration-200">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-8 text-white/30 text-sm">
            <MapPin className="w-3.5 h-3.5" />
            <span>Serving Vail, Beaver Creek, Avon, Edwards, Eagle & beyond</span>
          </div>
        </div>
      </section>

      {/* Who's Behind Symphony */}
      <section data-reveal className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">The Team Behind the Work</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Who's Behind Symphony</h2>
          <div className="space-y-5 text-white/65 text-base sm:text-lg leading-relaxed">
            <p>
              Founder Matt Earley started Symphony after years in AV integration. Clients deserved cleaner work, better communication, and systems that still felt good after the trades had gone.
            </p>
            <p>
              Based in Eagle County, the team works the same homes year after year — full-time residences, second homes, family compounds. Trusted trade partners brought in where their craft fits.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-reveal className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">When You're Ready</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Walk us through the home.</h2>
          <p className="text-white/55 text-base mb-8 max-w-xl mx-auto">
            New build, retrofit, or an inherited system — share what's there. No pressure, no sales pitch.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/scheduling" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base">
              Schedule a Walkthrough <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+19705193013" onClick={trackPhoneClick} className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base">
              <Phone className="w-4 h-4" /> (970) 519-3013
            </a>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </PageBackground>
  );
};

export default About;
