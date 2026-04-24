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
      tagline: "For architectural, luxury whole-home lighting.",
      description:
        "Lutron's flagship platform for estates, architectural homes, and deep remodels. Hand-crafted keypads, Ketra and Lumaris lighting, QS wired or Clear Connect wireless, centralized panels — designed around how the house should look and feel, not what the box on the wall allows.",
      bullets: [
        "Supports very large homes (50,000+ sq ft) and up to 10,000 zones",
        "Wired QS or wireless Clear Connect, or a mix",
        "Native integration with the full Lutron catalog",
      ],
      link: "/platforms/lutron-homeworks",
    },
    {
      icon: Radio,
      title: "Lutron RadioRA3",
      tagline: "For wireless retrofits and scalable smart lighting.",
      description:
        "Professionally installed wireless control for lighting, shades, and keypads. Clear Connect RF instead of Wi-Fi, retrofit without opening walls, start one room and grow to the whole house, up to 400 devices with paired processors.",
      bullets: [
        "Clear Connect RF — works even when the internet does not",
        "Retrofits cleanly into finished homes",
        "Native Lumaris tunable white and automated shading",
      ],
      link: "/platforms/lutron-radiora3",
    },
    {
      icon: Home,
      title: "Control4",
      tagline: "For whole-home automation across many brands.",
      description:
        "Private, secure, personalized smart home control for lighting, entertainment, security, comfort, and more. Compatible with 25,000+ third-party devices and brought to every surface — phones, touchscreens, keypads, and handheld remotes.",
      bullets: [
        "Ties many subsystems into one experience",
        "Phones, touchscreens, keypads, and remotes",
        "Often runs on top of Lutron lighting",
      ],
      link: "/platforms/control4",
    },
    {
      icon: Smartphone,
      title: "AVA",
      tagline: "For elegant, room-first media and remote control.",
      description:
        "AVA OS makes complex systems feel simple and connected. The Cinema Remote runs AVA OS directly with a built-in processor; the Home Remote handles rooms without a TV. IP control for 10,000+ devices, IR for 60,000+, and AVA Flows for automation without code.",
      bullets: [
        "Cinema Remote for media rooms and theaters",
        "Home Remote for rooms without a TV",
        "Swiss industrial design, single-piece aluminum",
      ],
      link: "/platforms/ava",
    },
  ];

  const howWeChoose = [
    {
      title: "Lighting-first, finished home",
      description:
        "If the walls are closed and the goal is great dimming, keypad scenes, and shades, we usually start with RadioRA3. It retrofits cleanly and grows one room at a time.",
    },
    {
      title: "Architectural new build or deep remodel",
      description:
        "When the design calls for centralized panels, Ketra or Lumaris fixtures, hand-crafted keypads, and thousands of zones, HomeWorks is the right tool — not RadioRA3 with more boxes.",
    },
    {
      title: "Many subsystems, one interface",
      description:
        "Lighting, audio, climate, security, and shades all behind one app and one set of keypads usually means Control4 sitting on top of a Lutron lighting layer.",
    },
    {
      title: "Media rooms and simple whole-home audio",
      description:
        "When the family mostly wants TV, theater, and music to 'just work' for guests and kids, AVA is often the right answer on its own or alongside Control4.",
    },
  ];

  const faqs = [
    {
      q: "How do you pick between RadioRA3 and HomeWorks?",
      a: "RadioRA3 is Lutron's professional wireless platform — fantastic for retrofits, scalable smart lighting, and most finished homes. HomeWorks is Lutron's flagship platform for architectural and luxury projects where design freedom, wired backbones, Ketra/Lumaris fixtures, and very large zone counts matter. Both are designed and supported by Lutron; the right one depends on house size, construction phase, and how custom the design needs to be.",
    },
    {
      q: "Do Control4 and Lutron compete or cooperate?",
      a: "Cooperate. On many of our larger Vail Valley homes, Lutron (RadioRA3 or HomeWorks) handles the lighting hardware and scenes while Control4 ties lighting, audio, climate, security, and shades together behind one interface. The two platforms integrate natively.",
    },
    {
      q: "Is AVA a replacement for Control4?",
      a: "Not quite. AVA is excellent for TV, theater, and whole-home audio with a physical remote the family can actually use. Control4 is a broader automation platform that also handles lighting, climate, shades, and security. In some homes AVA is enough. In others, AVA and Control4 run together.",
    },
    {
      q: "Can you service a platform another company installed?",
      a: "Yes. Control4, RadioRA3, HomeWorks, and AVA systems we did not originally install are one of our most common service calls. We come in, read what is on the system, document it, and clean up the program so it makes sense again.",
    },
  ];

  const platformsSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Smart Home Platforms — Lutron HomeWorks, Lutron RadioRA3, Control4, AVA",
    "provider": schemaProviderLocalBusiness,
    "description":
      "Symphony Smart Homes designs, installs, programs, and services Lutron HomeWorks, Lutron RadioRA3, Control4, and AVA platforms for Vail Valley homes.",
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
          description="The smart home platforms Symphony designs, installs, and services in the Vail Valley — Lutron HomeWorks, Lutron RadioRA3, Control4, and AVA. We help pick the right one for your home."
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
              The systems your home actually runs on.
            </h1>
            <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl hero-subtext-shadow">
              We design, install, program, and service the platforms that matter for Vail Valley homes — Lutron HomeWorks, Lutron RadioRA3, Control4, and AVA. Each one is different, and the right choice depends on the house.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/scheduling"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"
              >
                Schedule a Walk-Through <ArrowRight className="w-4 h-4" />
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
                What We Install
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Four platforms. One team behind all of them.
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
                How We Choose
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Matching platform to house.
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
              Not sure which one is right?
            </h2>
            <p className="text-white/60 text-base mb-8 max-w-2xl mx-auto">
              Answer a few quick questions about the house and what you want it to do. We will suggest a starting point — HomeWorks, RadioRA3, Control4, AVA, or just a solid network first.
            </p>
            <Link
              to="/setup-finder"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base"
            >
              Open the Setup Finder <ArrowRight className="w-4 h-4" />
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
              Platform Questions
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
              Get Started
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Tell us about the house.
            </h2>
            <p className="text-white/60 text-base mb-8 max-w-2xl mx-auto">
              New build, remodel, or an existing system that needs attention — send the property and what you want the house to do, and we will point you to the platform that actually fits.
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
                <Phone className="w-4 h-4" /> Schedule a Walk-Through
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
