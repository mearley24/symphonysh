import { Link } from "react-router-dom";
import { ArrowRight, Phone, ArrowLeft, CheckCircle2, MapPin } from "lucide-react";
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
        title="About Symphony Smart Homes | Vail Valley"
        description="Local smart home integrators serving Vail Valley and Eagle County. We design, install, and maintain reliable smart home technology."
        keywords="about symphony smart homes, smart home installer, Vail Valley, Eagle County"
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
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-3">About Us</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white hero-text-shadow">
            The Vail Valley's trusted smart home team — from first wire to final walkthrough.
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl hero-subtext-shadow">
            We design, install, and maintain smart home systems for homeowners and builders across Eagle County. Pre-wire through programming, one team handles it all.
          </p>
        </div>
      </section>

      <div className="hero-divider w-full" />

      {/* How We Work */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div data-reveal>
            <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">How We Work</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">A few things we don't compromise on</h2>
          </div>

          <div data-reveal-children className="grid sm:grid-cols-2 gap-5">
            {[
              { title: "Do it right the first time", description: "Every cable labeled, every system tested, every install documented. Shortcuts create callbacks." },
              { title: "Keep it simple for you", description: "If you need a manual to turn on a light, something went wrong. Your system should feel effortless." },
              { title: "Transparent pricing", description: "Detailed proposals with clear line items. No hidden fees, no surprises on the invoice." },
              { title: "We answer the phone", description: "When something needs attention, you get a real person — not a voicemail. Remote fixes when possible, on-site when needed." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-xl border border-white/8 bg-black/40 backdrop-blur-sm hover:border-white/10 transition-colors">
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

      {/* Meet the Founder */}
      <section data-reveal className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Leadership</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Meet the Founder</h2>
          <div className="space-y-5 text-white/65 text-base sm:text-lg leading-relaxed">
            <p>
              Matt Earley started Symphony Smart Homes after years in the AV integration industry,
              driven by a simple frustration — clients deserved better. Better communication, better
              craftsmanship, and systems that actually work after the installer leaves.
            </p>
            <p>
              Based in Eagle County, Matt personally oversees every project from first walkthrough
              to final programming. When you call Symphony, you talk to the person doing the work.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-reveal className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Get Started</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Want to work together?</h2>
          <p className="text-white/50 text-base mb-8 max-w-xl mx-auto">
            Whether you're building, renovating, or just need something fixed — give us a call or schedule a time to talk.
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
    </PageBackground>
  );
};

export default About;
