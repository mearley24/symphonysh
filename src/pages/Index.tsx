import { Link } from "react-router-dom";
import { Phone, ArrowRight, Cable, Home, Wrench, ScanLine, CheckCircle2, ChevronDown, MapPin, Sunrise, DoorClosed, Film, Moon, Compass, Layers } from "lucide-react";
import { useState } from "react";
import { trackPhoneClick } from "../utils/tracking";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import ClientTestimonials from "../components/ClientTestimonials";
import SEO from "../components/SEO";
import heroImage from "../assets/hero-smart-home.jpg";
import { localBusinessHomePageSchema } from "../constants/businessSchema";
import { useScrollReveal } from "../hooks/useScrollReveal";

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const revealRef = useScrollReveal();

  const scenes = [
    { icon: Sunrise, title: "Goodmorning", description: "Bedroom shades ease open, the kitchen warms up, and a soft path of light leads downstairs before anyone has to think about it." },
    { icon: DoorClosed, title: "Goodbye / Away", description: "One tap on the keypad — every light off, thermostat back, doors locked, cameras armed. The house quietly takes care of itself." },
    { icon: Film, title: "Movie / Relax", description: "Shades drop, the fireplace glow takes over, the room dims to a quiet wash, and the screen comes to life. No remote hunt." },
    { icon: Moon, title: "Goodnight", description: "Hallway nightlights at a fraction of full bright, exterior lights still on, primary bath in a soft amber, everything else gently off." },
  ];

  const platforms = [
    { icon: Wrench, title: "Control4", desc: "Our default for whole-home lighting, scenes, audio, climate, and shades — one app, one set of keypads.", link: "/platforms/control4", cta: "Open the Control4 page" },
    { icon: Layers, title: "Lutron HomeWorks", desc: "Architectural lighting option — Ketra, Lumaris, Palladiom, hand-crafted keypads. For luxury new builds.", link: "/platforms/lutron-homeworks", cta: "Explore HomeWorks" },
    { icon: Home, title: "Lutron RadioRA3", desc: "Wireless lighting and shades for clean retrofits — Sunnata keypads, Lumaris, Triathlon Select.", link: "/platforms/lutron-radiora3", cta: "See RadioRA3" },
    { icon: Cable, title: "AVA", desc: "AVA for media rooms that just work — one simple remote for TV, theater, and music the whole household can actually use.", link: "/platforms/ava", cta: "Meet the AVA remote" },
  ];

  const services = [
    { icon: Home, title: "Whole-Home Integration", description: "Control4 lighting, scenes, audio, climate, and shades on one app — Lutron lighting when the home calls for it.", link: "/services/home-integration" },
    { icon: Cable, title: "Pre-Wire & New Construction", description: "Low-voltage rough-in planned with your GC, electrician, and architect.", link: "/services/prewire" },
    { icon: Wrench, title: "Service & Maintenance", description: "Remote diagnostics, firmware, on-site fixes, and second-home check-ins.", link: "/services/maintenance" },
    { icon: ScanLine, title: "Matterport 3D Scanning", description: "Immersive 3D tours for listings, construction docs, and records.", link: "/matterport" },
  ];

  const steps = [
    { number: "01", title: "Walkthrough", description: "We walk the property and listen to how you actually live." },
    { number: "02", title: "Design & Proposal", description: "Clear scope, transparent line items, real numbers." },
    { number: "03", title: "Build", description: "Wiring, mounting, and programming on schedule with the rest of the trades." },
    { number: "04", title: "Handoff & Support", description: "Scenes tuned until they feel like home — then we stay reachable." },
  ];

  const differentiators = [
    { title: "Mountain homes, not suburbs", description: "Built for Eagle County weather and how these homes are actually lived in." },
    { title: "One accountable team", description: "Same faces from walkthrough through year five." },
    { title: "Quiet reliability", description: "Real platforms — Control4, Lutron, AVA. No proprietary lock-in." },
    { title: "We answer the phone", description: "Remote fixes when possible, on-site when needed." },
  ];

  const faqs = [
    { q: "How much does a project usually run?", a: "It depends on scope. A focused room or two might land around $1,500+. A full new-build system often falls in the $15,000–$80,000+ range. You'll see real numbers in a proposal — no guessing." },
    { q: "Which platforms do you work in most?", a: "Control4 is our default for whole-home lighting, scenes, audio, climate, and shades. Lutron HomeWorks and RadioRA3 are strong choices when the home calls for Lutron-grade lighting or retrofit. AVA is great as a single household remote in media rooms. They run independently and we mix only when it helps." },
    { q: "Can you take over a system another company set up?", a: "Yes. Inherited Control4, RadioRA3, HomeWorks, and AVA systems are some of our most common service calls." },
    { q: "Second home or rental — does that change anything?", a: "It changes how we design routines and remote support. Away modes, arrival scenes, and remote diagnostics so the house is ready when you land." },
    { q: "Do you work with builders, architects, and designers?", a: "All the time. Larger projects usually start at framing with the GC, electrician, and architect." },
    { q: "How long does a project take?", a: "Small rooms can be a few hours. A whole-home build runs roughly 3–6 months from rough-in to final handoff, depending on the build schedule." },
    { q: "Where do you work?", a: "Vail Valley and Eagle County — Vail, Beaver Creek, Avon, Edwards, Eagle, Minturn, and nearby." },
  ];

  const serviceSchema = localBusinessHomePageSchema();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-primary text-primary-foreground relative">
      <SEO
        title="Smart Homes for the Vail Valley | Control4, Lutron, AVA"
        description="Control4 whole-home automation by default, Lutron RadioRA3 or HomeWorks when the home calls for it, and AVA for the media room and simple remote. Vail Valley & Eagle County."
        keywords="Control4 dealer Vail Valley, Lutron RadioRA3, Lutron HomeWorks, AVA smart remote, smart home Eagle County, mountain home automation"
        canonicalUrl="https://symphonysh.com/"
        schema={[serviceSchema, faqSchema]}
      />

      {/* Full-page background image */}
      <div className="fixed inset-0 z-0">
        <img
          src={heroImage}
          alt="Smart home automation control panel in a modern Vail Valley residence"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/80 to-primary/90" />
      </div>

      <div className="relative z-10" ref={revealRef}>
        <Header />

        {/* Hero + Trust Strip pinned to window top/bottom */}
        <div className="relative min-h-screen flex flex-col">
          {/* Hero — pinned to top of window */}
          <section className="relative pt-36 sm:pt-44 overflow-hidden">
            {/* Right blob */}
            <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[120px] animate-[pulse_6s_ease-in-out_infinite]" />
            {/* Left blob — second layer with delay */}
            <div className="absolute top-1/2 left-[10%] -translate-y-1/2 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-[100px] animate-[pulse_8s_ease-in-out_2s_infinite]" />

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-0 sm:pt-2 pb-12 sm:pb-20">
              <div className="max-w-2xl mx-auto text-center">
                <p className="animate-hero-eyebrow text-accent font-semibold text-sm tracking-widest uppercase mb-4 inline-flex items-center gap-2">
                  <span className="w-8 h-px bg-accent" />
                  Vail Valley · Eagle County
                  <span className="w-8 h-px bg-accent" />
                </p>
                <h1 className="animate-fade-in text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] mb-6 text-white hero-text-shadow [animation-delay:100ms]">
                  We make smart homes that just work.
                </h1>
                <p className="animate-fade-in text-white/80 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl mx-auto hero-subtext-shadow [animation-delay:200ms]">
                  Control4 lighting and scenes for the whole home — Lutron when the home calls for it, AVA when you want one simple remote. Tuned to how you actually live.
                </p>
              </div>
            </div>
          </section>

          {/* CTA + Location — directly above trust strip */}
          <div className="animate-fade-in mt-auto flex flex-col items-center gap-3 px-4 sm:px-6 pb-4 [animation-delay:300ms]">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/scheduling"
                className="group inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-7 py-4 rounded-lg font-medium transition-all text-base shadow-lg shadow-accent/20 hover:shadow-accent/30"
              >
                Schedule a Walkthrough
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="tel:+19705193013"
                onClick={trackPhoneClick}
                className="inline-flex items-center justify-center gap-2 border border-white/40 hover:border-white/60 bg-white/10 hover:bg-white/15 text-white px-7 py-4 rounded-lg font-medium transition-all text-base backdrop-blur-md shadow-md shadow-black/30"
              >
                <Phone className="w-4 h-4" />
                (970) 519-3013
              </a>
            </div>
            <div className="inline-flex items-center gap-2 mt-1 text-white/40 text-sm">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span>Vail · Beaver Creek · Edwards · Avon · Eagle</span>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="hidden sm:flex justify-center py-3">
            <ChevronDown className="w-5 h-5 text-white animate-bounce opacity-40" />
          </div>

          {/* Trust Strip — pinned to bottom of window */}
          <section data-reveal className="border-y border-white/10 py-6 sm:py-8 px-4 sm:px-6 bg-black/30 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-5 sm:gap-6 text-center">
                <div>
                  <p className="text-white font-semibold text-base sm:text-lg">10+ Years</p>
                  <p className="text-white/65 text-sm leading-snug">In the valley</p>
                </div>
                <div>
                  <p className="text-white font-semibold text-base sm:text-lg">Licensed</p>
                  <p className="text-white/65 text-sm leading-snug">& fully insured</p>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm sm:text-lg whitespace-nowrap">
                    Control4<span className="mx-1 text-white/40">·</span>Lutron<span className="mx-1 text-white/40">·</span>AVA
                  </p>
                  <p className="text-white/65 text-sm leading-snug">Real platforms, no lock-in</p>
                </div>
                <div>
                  <p className="text-white font-semibold text-base sm:text-lg">Same-Day Response</p>
                  <p className="text-white/65 text-sm leading-snug">A real person picks up</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Scenes — the Symphony home */}
        <section className="py-16 sm:py-24 px-4 sm:px-6" id="scenes">
          <div className="max-w-5xl mx-auto">
            <div data-reveal className="text-center mb-12">
              <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">A Day at Home</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Four moments your home should already know.</h2>
              <p className="text-white/55 text-base sm:text-lg leading-relaxed mt-4 max-w-2xl mx-auto">
                Named scenes on a Control4 keypad, a Lutron keypad, or an AVA remote. You stop thinking about the system and start living in the room.
              </p>
            </div>
            <div data-reveal-children className="grid sm:grid-cols-2 gap-4">
              {scenes.map((s, i) => (
                <div key={i} className="bg-gradient-to-br from-black/60 to-black/30 backdrop-blur-sm border border-white/8 rounded-xl p-6 hover:border-accent/30 transition-all duration-200">
                  <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <s.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Platforms */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5" id="platforms">
          <div className="max-w-5xl mx-auto">
            <div data-reveal className="text-center mb-12">
              <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Platforms</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">The systems your home actually runs on.</h2>
              <p className="text-white/55 text-base leading-relaxed mt-4 max-w-2xl mx-auto">
                Control4 is our default for whole-home lighting and control. Lutron and AVA are independent options we add when the home calls for them — standalone or mixed when it makes sense.
              </p>
            </div>
            <div data-reveal-children className="grid sm:grid-cols-2 gap-4">
              {platforms.map((p, i) => (
                <Link key={i} to={p.link} className="group">
                  <div className="bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-6 h-full hover:border-accent/30 hover:bg-black/50 transition-all duration-200">
                    <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                      <p.icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">{p.title}</h3>
                    <p className="text-white/55 text-sm leading-relaxed">{p.desc}</p>
                    <span className="inline-flex items-center gap-1 text-accent text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                      {p.cta} <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div data-reveal className="mt-10 text-center">
              <Link
                to="/platforms"
                className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors"
              >
                Compare all four platforms <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Setup Finder teaser */}
        <section className="py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Compass className="w-5 h-5 text-accent" />
            </div>
            <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Not sure where to start?</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Walk through the options in three minutes.</h2>
            <p className="text-white/55 text-base mb-8 max-w-2xl mx-auto">
              Six questions about the house. We'll point to a starting point — Control4, HomeWorks, RadioRA3, AVA, or a stronger network first — no pressure to commit.
            </p>
            <Link
              to="/setup-finder"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base"
            >
              Find the Right Setup <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5" id="services">
          <div className="max-w-5xl mx-auto">
            <div data-reveal className="text-center mb-12">
              <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Services</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">From rough-in to handoff to year five.</h2>
              <p className="text-white/55 text-base leading-relaxed mt-4 max-w-2xl mx-auto">
                Pre-wire at framing, integration as the house comes together, and quiet support long after the trades are gone.
              </p>
            </div>
            <div data-reveal-children className="grid sm:grid-cols-2 gap-4">
              {services.map((service, i) => (
                <Link key={i} to={service.link} className="group">
                  <div className="bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-6 h-full hover:border-accent/30 hover:bg-gradient-to-br hover:from-accent/5 hover:to-transparent transition-all duration-200">
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
            <div data-reveal className="mt-10 text-center">
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors"
              >
                Browse every service <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div data-reveal className="text-center mb-12">
              <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">How It Works</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Walkthrough → Plan → Build → Handoff.</h2>
            </div>
            <div data-reveal-children className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <div key={i} className="relative">
                  <span className="text-accent/20 text-5xl font-bold absolute -top-2 -left-1">{step.number}</span>
                  <div className="pt-10">
                    <h3 className="text-white font-semibold text-base mb-2">{step.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Client Testimonials */}
        <ClientTestimonials />

        {/* Featured Projects */}
        <Testimonials />

        {/* Why Symphony */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
          <div className="max-w-5xl mx-auto">
            <div data-reveal className="text-center mb-12">
              <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Why Symphony</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Built for mountain homes that should just be ready.</h2>
            </div>
            <div data-reveal-children className="grid sm:grid-cols-2 gap-5">
              {differentiators.map((item, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-xl border border-white/8 hover:border-white/10 transition-colors bg-black/40 backdrop-blur-sm">
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

        {/* Meet the Team */}
        <section className="py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div data-reveal className="grid sm:grid-cols-2 gap-10 items-center">
              {/* Left: text */}
              <div>
                <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">The Team</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Same faces from first walkthrough through year five.</h2>
                <p className="text-white/50 text-base leading-relaxed mb-6">
                  A local Eagle County team led by founder Matt Earley. The people who plan the system are the ones who tune it months later.
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 text-accent hover:text-accent/80 text-sm font-medium transition-colors"
                >
                  Meet the team <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              {/* Right: stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "100+", label: "Projects Completed" },
                  { value: "10+", label: "Years in the Valley" },
                  { value: "Same Day", label: "Response Time" },
                ].map((stat, i) => (
                  <div key={i} className="bg-black/40 border border-white/8 rounded-xl p-4 text-center">
                    <p className="text-white font-bold text-2xl mb-1">{stat.value}</p>
                    <p className="text-white/40 text-xs leading-snug">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
          <div className="max-w-3xl mx-auto">
            <div data-reveal className="text-center mb-12">
              <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">FAQ</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Things people ask before reaching out.</h2>
            </div>
            <div data-reveal-children className="space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-white/8 rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                    aria-expanded={openFaq === i}
                  >
                    <span className="text-white font-medium text-sm sm:text-base pr-4">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-white/40 shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section data-reveal className="py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">When You're Ready</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Tell us about the home.</h2>
            <p className="text-white/55 text-base mb-8 max-w-xl mx-auto">
              New build, retrofit, or an inherited system — share the property and how you live there. We'll point to the platform that fits.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/scheduling"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"
              >
                Schedule a Walkthrough
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+19705193013"
                onClick={trackPhoneClick}
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"
              >
                <Phone className="w-4 h-4" />
                (970) 519-3013
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Index;
