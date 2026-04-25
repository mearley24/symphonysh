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
      icon: Home,
      title: "Control4",
      tagline: "Our default for whole-home lighting and control.",
      description:
        "Lighting, scenes, audio, climate, security, and shades behind one app, one set of keypads, and a handheld remote. 25,000+ compatible devices and X4 Routines for daily scenes.",
      bullets: [
        "Default for Symphony whole-home projects",
        "One app, one keypad family across the house",
        "Lighting, audio, climate, shades on a single program",
      ],
      link: "/platforms/control4",
    },
    {
      icon: Layers,
      title: "Lutron HomeWorks",
      tagline: "Architectural lighting option for luxury homes.",
      description:
        "Lutron's flagship line — Ketra, Lumaris, Palladiom shading, hand-crafted keypads. The right call when the design demands Lutron-grade lighting on a single coordinated program.",
      bullets: [
        "Hand-crafted keypads — Alisse, Architectural, Signature",
        "Ketra and Lumaris fixtures, Palladiom shades",
        "Best fit: large architectural new builds and remodels",
      ],
      link: "/platforms/lutron-homeworks",
    },
    {
      icon: Radio,
      title: "Lutron RadioRA3",
      tagline: "Lutron lighting for finished homes and retrofits.",
      description:
        "Clear Connect Type X wireless, Sunnata keypads, Lumaris tunable-white LED, and Triathlon Select battery shades. Grows one room at a time.",
      bullets: [
        "Clear Connect Type X — independent of Wi-Fi",
        "Up to 200 devices per system",
        "Clean retrofit for closed walls",
      ],
      link: "/platforms/lutron-radiora3",
    },
    {
      icon: Smartphone,
      title: "AVA",
      tagline: "One simple remote for media and rooms.",
      description:
        "A single physical remote running AVA OS — great in media rooms, theaters, or as a household-friendly remote. Stands alone or pairs with Control4 when scope grows.",
      bullets: [
        "Cinema Remote for media rooms and theaters",
        "Home Remote for rooms without a TV",
        "Best as a room-first or media-first option",
      ],
      link: "/platforms/ava",
    },
  ];

  const howWeChoose = [
    {
      title: "Whole-home lighting and control",
      description:
        "Control4 is our default — lighting scenes, audio, climate, and shades behind one app and one keypad family.",
    },
    {
      title: "Lutron-grade architectural lighting",
      description:
        "When the design calls for Ketra, Lumaris, Palladiom shading, and hand-crafted keypads, HomeWorks is the right tool.",
    },
    {
      title: "Lutron lighting in a finished home",
      description:
        "Closed walls, real dimming, and keypad scenes — RadioRA3 retrofits cleanly without opening drywall.",
    },
    {
      title: "Media room or remote-first household",
      description:
        "AVA is excellent on its own when the priority is a single, simple remote for TV, theater, and music.",
    },
  ];

  const faqs = [
    {
      q: "Which platform is the default?",
      a: "Control4 is our default for whole-home lighting and control — lighting scenes, audio, climate, security, and shades behind one app and one keypad family. Lutron HomeWorks and RadioRA3 are the right call when the home needs Lutron-grade lighting. AVA is great on its own for media rooms or remote-first households.",
    },
    {
      q: "Do these systems run independently?",
      a: "Yes. Control4, Lutron, and AVA are independent platforms. We pick the one that fits the home and only mix when it actually helps — you're not locked into running all three.",
    },
    {
      q: "How do you pick between RadioRA3 and HomeWorks?",
      a: "RadioRA3 is Lutron's professional wireless line — Sunnata keypads, Lumaris LED, Triathlon Select shades, Clear Connect Type X mesh. Great for retrofits. HomeWorks is the architectural flagship — hand-crafted keypads, Ketra, Palladiom, a single coordinated program across the house.",
    },
    {
      q: "Is AVA a replacement for Control4?",
      a: "Different scope. AVA is a single physical remote for media. Control4 is a broader platform for lighting, audio, climate, shades, and security. Plenty of homes run AVA alone; some pair it with Control4 in media rooms.",
    },
    {
      q: "Can you take over a system another company set up?",
      a: "Yes. Inherited Control4, RadioRA3, HomeWorks, and AVA systems are common service calls. We read what's there, document it, and clean up the program.",
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
              Four independent platforms. Pick what fits.
            </h1>
            <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl hero-subtext-shadow">
              Control4 is our default for whole-home lighting and control. Lutron HomeWorks and RadioRA3 are independent options when the home calls for Lutron-grade lighting. AVA is great on its own as a single remote — standalone or mixed when it makes sense.
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
                Independent systems. Pick the one that fits.
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
              Six questions about the house. We'll point to a starting point — Control4, HomeWorks, RadioRA3, AVA, or a stronger network first.
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
              New build, retrofit, or an inherited system — share the property and how you live there. We'll point to the line that fits.
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
