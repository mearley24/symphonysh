import { Link } from "react-router-dom";
import { ArrowRight, Phone, ArrowLeft, CheckCircle2, MapPin } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import PageBackground from "../components/PageBackground";
import bgAbout from "../assets/bg-about.jpg";

const About = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Symphony Smart Homes",
    "description": "Professional smart home integration serving Vail Valley and Eagle County, Colorado.",
    "areaServed": "Vail Valley, Eagle County, Colorado",
    "telephone": "+1-970-519-3013",
  };

  return (
    <PageBackground image={bgAbout}>
      <SEO
        title="About Symphony Smart Homes | Vail Valley"
        description="Local smart home integrators serving Vail Valley and Eagle County. We design, install, and maintain reliable smart home technology."
        keywords="about symphony smart homes, smart home installer, Vail Valley, Eagle County"
        schema={serviceSchema}
      />
      <Header />

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>

          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-3">About Us</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white">
            We're a small team that does this one thing well.
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
            Symphony Smart Homes is a local smart home integration company based in Eagle County, Colorado. We design, install, and support smart home technology for homeowners and builders across the Vail Valley.
          </p>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-secondary/30 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">How We Work</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">Built on a few simple principles</h2>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { title: "Do it right the first time", description: "We take the time to plan, label, test, and document every installation. Cutting corners creates problems that cost more to fix later." },
              { title: "Keep it simple for the homeowner", description: "Technology should make your life easier, not more complicated. If you need a manual to turn on a light, something went wrong." },
              { title: "Be straight about pricing", description: "We provide detailed proposals with clear line items. No hidden fees, no bait-and-switch, no surprises on the invoice." },
              { title: "Answer the phone", description: "When you have an issue, you shouldn't have to leave a voicemail and wait three days. We respond quickly — and if we can fix it remotely, we do." },
              { title: "Plan for the future", description: "We design systems that can grow with you. Adding speakers, cameras, or automation later shouldn't require ripping out walls." },
              { title: "Stay local, stay accountable", description: "We live and work in the Vail Valley. We're not a franchise or a national chain — we're your neighbors, and our reputation depends on every job." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">What We Do</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">The short version</h2>
          <div className="text-white/50 text-base leading-relaxed space-y-4 max-w-2xl">
            <p>
              We handle smart home technology from start to finish: pre-wire and structured cabling during construction, installation and programming of AV, networking, lighting, shades, security, and automation systems, and ongoing maintenance after you move in.
            </p>
            <p>
              We work with builders, general contractors, architects, and homeowners directly. Whether it's a single TV mount or a whole-home Control4 system, we bring the same level of care and attention.
            </p>
            <p>
              Our service area covers Vail, Beaver Creek, Avon, Edwards, Eagle, Minturn, and the surrounding communities in Eagle County.
            </p>
          </div>
          <div className="flex items-center gap-2 mt-6 text-white/30 text-sm">
            <MapPin className="w-3.5 h-3.5" />
            <span>Based in Eagle County, Colorado</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-secondary/30 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
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
  );
};

export default About;
