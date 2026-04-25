import { Link } from "react-router-dom";
import { ArrowRight, Phone, Volume2, Shield, Lightbulb, Thermometer, Wifi, Wrench, Sun, Home, Cable, ScanLine, CheckCircle2, ChevronDown, ArrowLeft, Compass } from "lucide-react";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import PageBackground from "../components/PageBackground";
import bgServices from "../assets/bg-services.jpg";
import { schemaProviderLocalBusiness } from "../constants/businessSchema";
import { useScrollReveal } from "../hooks/useScrollReveal";

const Services = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const revealRef = useScrollReveal();

  const services = [
    { icon: Home, title: "Whole-Home Integration", description: "Lighting, audio, climate, security, and shades behind one Control4 app, one set of keypads, and one quiet routine for the whole house.", link: "/services/home-integration" },
    { icon: Volume2, title: "Audio & Home Theater", description: "Whole-home audio that follows you room to room and dedicated theaters with Dolby Atmos — tuned for the room, not just the spec sheet.", link: "/services/audio-entertainment" },
    { icon: Shield, title: "Security & Cameras", description: "Cameras, smart locks, video doorbells, and alarm monitoring tied into the same scenes that turn the house off when you leave.", link: "/services/security-systems" },
    { icon: Lightbulb, title: "Lighting & Keypads", description: "Lutron HomeWorks or RadioRA3 lighting with keypad scenes on the wall — Lumaris, Sunnata, Ketra, and Palladiom where they fit.", link: "/services/smart-lighting" },
    { icon: Thermometer, title: "Climate", description: "Zoned HVAC, floor heating, and thermostats that quietly back off when the house is empty and warm up before you arrive.", link: "/services/climate-control" },
    { icon: Wifi, title: "Networking", description: "Enterprise-grade Wi-Fi, structured cabling, and managed switching — the layer underneath that keeps every other system online.", link: "/services/networking" },
    { icon: Sun, title: "Motorized Shades", description: "Triathlon Select, Palladiom, and Sivoia shades that move with the sun, the time, or a single keypad scene.", link: "/services/shades" },
    { icon: Wrench, title: "Service & Maintenance", description: "Quiet ongoing care — firmware, remote diagnostics, second-home check-ins, and an on-site visit when something needs hands.", link: "/services/maintenance" },
    { icon: Cable, title: "Pre-Wire & Structured Wiring", description: "Clean low-voltage rough-in for network, audio, shades, and automation — pulled before insulation, planned with your trades.", link: "/services/prewire" },
  ];

  // Platforms now live on their own tab. We keep a short cross-link on the Services page.

  const alsoAvailable = [
    { icon: ScanLine, title: "Matterport 3D Scanning", description: "Immersive 3D virtual tours for real estate listings, construction documentation, and property records.", link: "/matterport" },
    { icon: Compass, title: "Setup Finder", description: "Six quick questions about the house and how you live in it. We'll suggest a starting point — HomeWorks, RadioRA3, Control4, AVA, or just a stronger network first.", link: "/setup-finder" },
  ];

  const faqs = [
    { q: "Do I need all of these at once?", a: "No. Plenty of homes start with the network and one platform — usually Lutron lighting or Control4 — and grow from there. The Setup Finder is built to help you figure out a sensible starting point without committing to a whole-home plan on day one." },
    { q: "Do these all work together?", a: "Yes — that's the point. Lighting, audio, climate, shades, and security can sit behind one Control4 app and one set of keypads, with Lutron HomeWorks or RadioRA3 doing the lighting work underneath." },
    { q: "Which brands show up most?", a: "Lutron HomeWorks and RadioRA3 for lighting and shades. Control4 for whole-home automation. AVA when the family wants a single physical remote for TV, theater, and music. Sonos, Sonance, and Araknis show up regularly underneath." },
    { q: "What if I already have a system from another company?", a: "Inherited Control4, RadioRA3, HomeWorks, and AVA systems are some of our most common service calls. We read what's there, document it, and clean up the program until the house makes sense again." },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Smart Home Services",
    "provider": schemaProviderLocalBusiness,
    "description": "Complete smart home integration services including automation, audio, security, lighting, and networking for Vail Valley homes.",
  };

  return (
    <PageBackground image={bgServices}>
      <div ref={revealRef}>
      <SEO
        title="Services | Symphony Smart Homes — Vail Valley"
        description="Lutron lighting, Control4 automation, AVA media, audio, climate, security, networking, and shades — every layer of a Vail Valley smart home, designed to feel like one calm system."
        keywords="smart home services Vail Valley, home automation Eagle County, Lutron HomeWorks, Control4 dealer, AVA remote"
        schema={serviceSchema}
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Services", url: "/services" }]}
      />
      <Header />

      {/* Hero — no reveal */}
      <section className="pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </Link>
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-3">Services</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white hero-text-shadow">
            Every layer of a smart home, tuned to feel like one room.
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl hero-subtext-shadow">
            Lighting and shades that move with the day. Audio that follows you between rooms. Cameras and locks that quietly arm when the house empties. All of it on the platforms that fit the home — Lutron, Control4, AVA — never the other way around.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/scheduling" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base">
              Schedule a Walkthrough <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+19705193013" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base">
              <Phone className="w-4 h-4" /> (970) 519-3013
            </a>
          </div>
        </div>
      </section>

      <div className="hero-divider w-full" />

      {/* Services Grid */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div data-reveal className="text-center mb-12">
            <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Services</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Nine layers, one calm experience.</h2>
            <p className="text-white/55 text-base leading-relaxed mt-4 max-w-2xl mx-auto">
              Each layer matters on its own — but the magic is when scenes, schedules, and away modes pull them together so nobody in the house is hunting for an app.
            </p>
          </div>
          <div data-reveal-children className="grid sm:grid-cols-2 gap-4">
            {services.map((service, i) => (
              <Link key={i} to={service.link} className="group">
                <div className="bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-6 h-full hover:border-accent/30 hover:bg-black/50 transition-all duration-200">
                  <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <service.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{service.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{service.description}</p>
                  <span className="inline-flex items-center gap-1 text-accent text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                    See what's included <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms cross-link (now a dedicated tab) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div data-reveal className="text-center mb-8">
            <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Platforms</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">The systems underneath all of it.</h2>
            <p className="text-white/55 text-base leading-relaxed max-w-2xl mx-auto">
              Lutron HomeWorks, Lutron RadioRA3, Control4, and AVA each fit a different kind of home. The platform decision shapes how the house feels in five years — so it's the first one we walk through.
            </p>
          </div>
          <div data-reveal className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              to="/platforms"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"
            >
              Compare platforms <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/setup-finder"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"
            >
              <Compass className="w-4 h-4" /> Find the right setup
            </Link>
          </div>
        </div>
      </section>

      {/* Also Available */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div data-reveal className="text-center mb-8">
            <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Also Available</p>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Additional Services</h2>
          </div>
          <div data-reveal-children className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {alsoAvailable.map((item, i) => (
              <Link key={i} to={item.link} className="group">
                <div className="bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-6 h-full hover:border-accent/30 hover:bg-black/50 transition-all duration-200">
                  <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                  <span className="inline-flex items-center gap-1 text-accent text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                    See what's included <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Integrated */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div data-reveal className="text-center mb-12">
            <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Why It Adds Up</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Each layer earns its keep — together they disappear.</h2>
          </div>
          <div data-reveal-children className="grid sm:grid-cols-2 gap-5">
            {[
              { title: "One keypad, one app", description: "Lights, music, locks, cameras, shades, and thermostats from a single keypad on the wall, the AVA remote, or the Control4 app — never a five-app scavenger hunt." },
              { title: "Scenes that know each other", description: "Goodbye dims the lights, drops the heat, locks the doors, and arms the cameras with one tap. Goodnight does the rest." },
              { title: "Easier to live with — and maintain", description: "One team designed it, documented it, and stays reachable. No vendor finger-pointing when something needs a small tune." },
              { title: "Grows with the house", description: "Start with the network and the rooms you use most. Add scenes, theaters, and exterior lighting later without ripping anything out." },
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
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-3xl mx-auto">
          <div data-reveal className="text-center mb-12">
            <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">FAQ</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Things people ask early on.</h2>
          </div>
          <div data-reveal-children className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/8 rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.03] transition-colors" aria-expanded={openFaq === i}>
                  <span className="text-white font-medium text-sm sm:text-base pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-white/40 shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 pt-0">
                    <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section data-reveal className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">When You're Ready</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Walk us through your home.</h2>
          <p className="text-white/55 text-base mb-8 max-w-xl mx-auto">
            New build, finished retrofit, or an existing system that needs attention — share what you're working with and how you live there. We'll help map it out without pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/scheduling" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base">
              Schedule a Walkthrough <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+19705193013" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base">
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

export default Services;
