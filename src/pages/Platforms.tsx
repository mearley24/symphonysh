import { Link } from "react-router-dom";
import {
  ArrowRight,
  Phone,
  ArrowLeft,
  Home,
  Radio,
  Smartphone,
  Layers,
  ChevronDown,
  CheckCircle2,
  Compass,
} from "lucide-react";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import PageBackground from "../components/PageBackground";
import bgHomeIntegration from "../assets/bg-home-integration.jpg";
import { schemaProviderLocalBusiness } from "../constants/businessSchema";
import { useScrollReveal } from "../hooks/useScrollReveal";

const Platforms = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const revealRef = useScrollReveal();

  const platforms = [
    {
      icon: Layers,
      title: "Lutron HomeWorks",
      tagline: "Lutron's flagship for architectural homes.",
      description:
        "The full Lutron catalog on a single program — Ketra, Lumaris, Rania, Aviena, and Palladiom shading, with hand-crafted keypads. QS-wired or Clear Connect wireless backbones, sized to the house instead of the box.",
      bullets: [
        "Hand-crafted keypads — Alisse, Architectural, Signature",
        "Ketra and Lumaris fixtures, Palladiom shades",
        "Expands cleanly to large architectural projects",
      ],
      link: "/platforms/lutron-homeworks",
    },
    {
      icon: Radio,
      title: "Lutron RadioRA3",
      tagline: "Wireless lighting and shades for finished homes.",
      description:
        "Clear Connect Type X (CCX) wireless, Sunnata keypads and dimmers on the wall, Lumaris tunable-white LED, and Triathlon Select battery shades that install in around fifteen minutes per window.",
      bullets: [
        "Clear Connect Type X — independent of Wi-Fi",
        "Up to 200 devices per system, scales one room at a time",
        "Lumaris dimming and Triathlon Select shading native",
      ],
      link: "/platforms/lutron-radiora3",
    },
    {
      icon: Home,
      title: "Control4",
      tagline: "One experience across lighting, media, and more.",
      description:
        "Private, personalized control for lighting, entertainment, climate, security, and shades. 25,000+ compatible devices live behind Control4 App, touchscreens, on-wall keypads, and a handheld smart remote — usually sitting on top of a Lutron lighting layer.",
      bullets: [
        "Pulls many subsystems behind one keypad and app",
        "Ecosystem of 25,000+ compatible devices",
        "X4 Routines for daily scenes and away modes",
      ],
      link: "/platforms/control4",
    },
    {
      icon: Smartphone,
      title: "AVA",
      tagline: "A single physical remote built around AVA OS.",
      description:
        "Cinema Remote runs AVA OS directly with a built-in octa-core processor and IP control — no extra rack box required. Home Remote covers rooms without a TV. AVA Flows automate routines without code; the magnetic dock keeps it charged and ready.",
      bullets: [
        "Cinema Remote for media rooms and theaters",
        "Home Remote for rooms without a TV",
        "Single-piece machined aluminum, 3D Glass",
      ],
      link: "/platforms/ava",
    },
  ];

  const howWeChoose = [
    {
      title: "Lighting-first in a finished home",
      description:
        "When the walls are closed and the goal is real dimming, keypad scenes on the wall, and quiet shades, RadioRA3 is usually the start. Clean wireless retrofit, grows one room at a time.",
    },
    {
      title: "Architectural new build or deep remodel",
      description:
        "When the design calls for Ketra or Lumaris fixtures, Palladiom shading, hand-crafted keypads, and a single coordinated program, HomeWorks is the right tool — not RadioRA3 stretched.",
    },
    {
      title: "Many subsystems behind one keypad",
      description:
        "Lighting, audio, climate, security, and shades all on one app and one set of keypads usually means Control4 sitting on top of a Lutron lighting layer.",
    },
    {
      title: "TV, theater, and music done well",
      description:
        "When the household mostly wants a single physical remote that the kids and the houseguest can use, AVA is often the right answer on its own — and pairs cleanly with Control4 when scope grows.",
    },
  ];

  const faqs = [
    {
      q: "How do you pick between RadioRA3 and HomeWorks?",
      a: "RadioRA3 is Lutron's professional wireless line — Sunnata keypads, Lumaris LED, Triathlon Select shades, and the Clear Connect Type X mesh that runs independent of Wi-Fi. Excellent for finished homes and retrofits. HomeWorks is Lutron's flagship line for architectural projects: hand-crafted keypads, Ketra and Lumaris fixtures, Palladiom shades, and a single coordinated program across the house. The right pick comes down to house size, construction phase, and how custom the design needs to feel.",
    },
    {
      q: "Do Control4 and Lutron compete or cooperate?",
      a: "Cooperate. On most larger Vail Valley homes, Lutron (RadioRA3 or HomeWorks) handles lighting hardware and scenes while Control4 ties lighting, audio, climate, security, and shades together behind one app and one set of keypads. The two integrate natively.",
    },
    {
      q: "Is AVA a replacement for Control4?",
      a: "Not quite. AVA is excellent when the household mostly wants TV, theater, and music handled by a single physical remote that everyone can use. Control4 is a broader automation platform that also covers lighting, climate, shades, and security. Plenty of homes run AVA on its own; others run AVA and Control4 side by side.",
    },
    {
      q: "Can you take over a system another company set up?",
      a: "Yes. Inherited Control4, RadioRA3, HomeWorks, and AVA systems are some of our most common service calls. We read what's on the system, document it, and clean up the program until the house makes sense again.",
    },
  ];

  const platformsSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Smart Home Platforms — Lutron HomeWorks, Lutron RadioRA3, Control4, AVA",
    "provider": schemaProviderLocalBusiness,
    "description":
      "Lutron HomeWorks, Lutron RadioRA3, Control4, and AVA — the four product lines behind Vail Valley smart homes. Symphony helps choose the right line and tune it to the house.",
    "areaServed": "Vail Valley, Colorado",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a },
    })),
  };

  return (
    <PageBackground image={bgHomeIntegration}>
      <div ref={revealRef}>
        <SEO
          title="Smart Home Platforms | Lutron HomeWorks, RadioRA3, Control4, AVA"
          description="Lutron HomeWorks, Lutron RadioRA3, Control4, and AVA — the four product lines behind almost every Vail Valley smart home, with the trade-offs that actually matter."
          keywords="smart home platforms Vail Valley, Lutron HomeWorks, Lutron RadioRA3, Control4 dealer, AVA smart remote, Eagle County home automation"
          schema={[platformsSchema, faqSchema]}
          breadcrumbs={[
            { name: "Home", url: "/" },
            { name: "Platforms", url: "/platforms" },
          ]}
        />
        <Header />

        {/* Hero */}
        <section className="pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </Link>
            <p className="text-accent font-medium text-sm tracking-wide uppercase mb-3">
              Platforms
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white hero-text-shadow">
              Four product lines. The right one for your home.
            </h1>
            <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl hero-subtext-shadow">
              Lutron HomeWorks, Lutron RadioRA3, Control4, and AVA each lead with a different idea of how a smart home should feel. Architectural lighting, wireless retrofit, whole-home automation, or a single physical remote — the platform decision shapes how the house lives in five years.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/scheduling"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"
              >
                Schedule a Walkthrough <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+19705193013"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"
              >
                <Phone className="w-4 h-4" /> (970) 519-3013
              </a>
            </div>
            <p className="text-white/40 text-sm mt-6">
              Vail · Beaver Creek · Edwards · Avon · Eagle
            </p>
          </div>
        </section>

        <div className="hero-divider w-full" />

        {/* Platform cards */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
          <div className="max-w-5xl mx-auto">
            <div data-reveal className="mb-12">
              <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
                The Four Lines
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Each one is built around a different home.
              </h2>
            </div>
            <div data-reveal-children className="grid md:grid-cols-2 gap-5">
              {platforms.map((p, i) => (
                <Link
                  key={i}
                  to={p.link}
                  className="group bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-6 hover:border-accent/30 hover:bg-black/50 transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <p.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-white font-semibold text-xl mb-1">
                    {p.title}
                  </h3>
                  <p className="text-accent/80 text-sm font-medium mb-3">
                    {p.tagline}
                  </p>
                  <p className="text-white/55 text-sm leading-relaxed mb-4">
                    {p.description}
                  </p>
                  <ul className="space-y-1.5 mb-4">
                    {p.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-white/50 text-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-1 text-accent text-sm font-medium group-hover:gap-2 transition-all">
                    Explore {p.title} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How we choose */}
        <section className="py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div data-reveal className="mb-10">
              <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
                Matching Platform to Home
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                A few patterns we see almost every project.
              </h2>
            </div>
            <div data-reveal-children className="grid sm:grid-cols-2 gap-5">
              {howWeChoose.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-5 rounded-xl border border-white/8 bg-black/40 backdrop-blur-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Setup Finder link */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Compass className="w-5 h-5 text-accent" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Want a starting point?
            </h2>
            <p className="text-white/60 text-base mb-8 max-w-2xl mx-auto">
              Six quick questions about the house and how you live in it. We'll suggest a starting point — HomeWorks, RadioRA3, Control4, AVA, or just a stronger network first.
            </p>
            <Link
              to="/setup-finder"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base"
            >
              Find the right setup <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
              FAQ
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
              Choosing between the four.
            </h2>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="border border-white/8 rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.03] transition-colors"
                    aria-expanded={openFaq === i}
                  >
                    <span className="text-white font-medium text-sm sm:text-base pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-white/40 shrink-0 transition-transform duration-200 ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-white/50 text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
              When You're Ready
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Tell us about the home.
            </h2>
            <p className="text-white/60 text-base mb-8 max-w-2xl mx-auto">
              New build, finished retrofit, or an inherited system that needs attention — share the property and how you live there. We'll point you to the line that actually fits.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a
                href="tel:+19705193013"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base w-full sm:w-auto"
              >
                Call (970) 519-3013 <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/scheduling"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base w-full sm:w-auto"
              >
                <Phone className="w-4 h-4" /> Schedule a Walkthrough
              </Link>
            </div>
          </div>
        </section>

        {/* Trademark */}
        <section className="px-4 sm:px-6 pb-10 pt-10">
          <div className="max-w-4xl mx-auto">
            <p className="text-white/35 text-xs leading-relaxed">
              Lutron, HomeWorks, RadioRA3, Clear Connect, Sunnata, Ketra, Lumaris, and related trade dress and logos are trademarks or registered trademarks of Lutron Electronics Co., Inc. Control4 is a trademark of Snap One, LLC. AVA and related trade dress and logos are trademarks of their respective owners. Symphony Smart Homes is an independent smart-home integration company.
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </PageBackground>
  );
};

export default Platforms;
