import { Link } from "react-router-dom";
import {
  ArrowRight,
  Phone,
  ArrowLeft,
  Layers,
  Home,
  Sparkles,
  Sliders,
  Hammer,
  Cpu,
  Sun,
  Palette,
  ChevronDown,
  CheckCircle2,
  Network,
  Volume2,
} from "lucide-react";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";
import { schemaProviderLocalBusiness } from "../../constants/businessSchema";
import PageBackground from "../../components/PageBackground";
import bgLighting from "../../assets/bg-lighting.jpg";

const LutronHomeWorks = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Lutron HomeWorks Design & Installation",
    "provider": schemaProviderLocalBusiness,
    "description":
      "Lutron HomeWorks design, installation, programming, and service for luxury Vail Valley homes. Architectural lighting, Ketra, Lumaris, hand-crafted keypads, QS wired and Clear Connect wireless, motorized shades, and whole-home control.",
    "areaServed": "Vail Valley, Colorado",
  };

  const stats = [
    { label: "Scale", value: "Built for 50,000+ sq ft estates" },
    { label: "Zones", value: "Up to 10,000 lighting zones" },
    { label: "Backbone", value: "QS wired, Clear Connect wireless, or both" },
    { label: "Catalog", value: "Native Ketra, Lumaris, Palladiom shades" },
  ];

  const whatItIs = [
    {
      icon: Layers,
      title: "Lutron's flagship platform",
      description:
        "HomeWorks is Lutron's top-of-the-line system — built for estates, architectural homes, and deep remodels where design freedom and reliability are non-negotiable.",
    },
    {
      icon: Palette,
      title: "Keypads as architectural hardware",
      description:
        "Hand-crafted keypads in the full Lutron line — Palladiom, seeTouch, and Alisse — in finishes and engravings chosen to match the room, not stamped out of a catalog.",
    },
    {
      icon: Sun,
      title: "Ketra and Lumaris light",
      description:
        "Tunable white and full-spectrum color fixtures that follow the sun, warm on dim, and make every room feel correct at every time of day.",
    },
    {
      icon: Cpu,
      title: "Wired, wireless, or both",
      description:
        "QS wired options for difficult architecture, Clear Connect RF where wireless is cleaner, and seamless integration between the two. Centralized panels where they make sense.",
    },
  ];

  const bestFit = [
    {
      title: "Large architectural homes",
      description:
        "Ski-in mountain homes, contemporary glass-and-steel builds, and legacy estates. When the lighting design is part of the architecture, HomeWorks is the platform that keeps up.",
    },
    {
      title: "New construction & deep remodels",
      description:
        "On the prints from day one. Centralized panels, conduit runs, keypad locations, fixture schedules, and shade pockets all coordinated with the architect and electrician.",
    },
    {
      title: "Thousands of loads and zones",
      description:
        "Exterior lighting, interior lighting, landscape, outbuildings, and caretaker units — all coordinated scenes. HomeWorks is sized for homes that outgrow smaller systems.",
    },
    {
      title: "Ketra, Lumaris, Palladiom shades",
      description:
        "Full native support for Lutron's premium fixture and shading catalog — the pieces RadioRA3 can use but HomeWorks is actually designed around.",
    },
  ];

  const whatWeDo = [
    {
      icon: Hammer,
      title: "Design with the architect and lighting designer",
      description:
        "We sit with the architect, interior designer, and lighting designer early. Panel location, keypad placement, fixture schedule, and shade pockets get decided on paper, not on site after drywall.",
    },
    {
      icon: Sliders,
      title: "Fixture-to-driver matching",
      description:
        "Every LED driver, fixture, and shade motor picked to work with HomeWorks — no surprises at commissioning. 0-10V, ELV, DALI, phase-cut, and Lutron-native all selected on purpose.",
    },
    {
      icon: Sparkles,
      title: "Scenes tuned to the house",
      description:
        "Welcome, Goodnight, Movie, Entertaining, Away — each programmed to how the family actually uses the rooms, and to the time of day. Scenes refined after the family lives in the house, not just at commissioning.",
    },
    {
      icon: Network,
      title: "Integration with the rest of the system",
      description:
        "Native integration into Control4 for whole-home automation, AVA for media rooms, Sonos for audio, plus climate, security, and voice where it makes sense.",
    },
  ];

  const experience = [
    {
      title: "The house follows the sun",
      description:
        "Ketra and Lumaris warm with the day. Shades rise with the sunrise, rest at mid-day, and drop again before dusk. The house never feels like fluorescent office light at 10pm.",
    },
    {
      title: "One button, the whole wing",
      description:
        "Welcome at the front door brings the entry, great room, kitchen, and main hallway up to the right level. Goodnight in the primary closes the house down without walking through every room.",
    },
    {
      title: "Elegant hardware on the wall",
      description:
        "No plastic panels in the living room. Engraved keypads, matching wallplates, and a layout the owner can read without squinting.",
    },
    {
      title: "Reliable, quiet, and serviceable",
      description:
        "Wired backbone where it matters, local scenes that keep running when the internet hiccups, and a program we document so the next service call — from us or anyone else — does not start from scratch.",
    },
  ];

  const capabilities = [
    "HomeWorks processors & panels",
    "QS wired backbone",
    "Clear Connect RF",
    "Palladiom keypads",
    "seeTouch keypads",
    "Alisse keypads",
    "Sunnata dimmers & switches",
    "Ketra full-spectrum light",
    "Lumaris tunable light",
    "Palladiom shades",
    "Triathlon shades",
    "Sivoia QS shades",
    "Occupancy & vacancy sensors",
    "Daylight sensors",
    "Astronomic timeclock",
    "Lutron Connect cloud tools",
    "Control4 integration",
    "AVA integration",
    "Sonos integration",
    "Voice assistants",
  ];

  const commonProjects = [
    {
      step: "01",
      title: "New construction with a lighting designer",
      description:
        "Architect, lighting designer, and electrician on site. We coordinate panels, keypad locations, fixture schedule, and shade pockets early so nothing has to be re-cut later.",
    },
    {
      step: "02",
      title: "Deep remodel of a legacy home",
      description:
        "Existing Lutron HomeWorks QS, RadioRA Classic, or HomeWorks QS Illumination that has grown tired. We retain what is worth keeping, migrate the rest, and give the house a modern HomeWorks program without gutting it.",
    },
    {
      step: "03",
      title: "Inherited system, no installer",
      description:
        "The original programmer is unreachable and the app access is gone. We read what is on the processor, rebuild the documentation, and hand the owner a clean, maintainable program.",
    },
    {
      step: "04",
      title: "Adding Ketra or Lumaris to an existing home",
      description:
        "Existing HomeWorks processor, new tunable light in the primary wing. We size the drivers, plan the fixture schedule, and fold the new zones into the existing keypad program.",
    },
  ];

  const compareToRA3 = [
    {
      title: "RadioRA3",
      description:
        "Wireless, retrofit-friendly, up to 400 devices with paired processors. Perfect for existing homes, scalable smart lighting, and most finished houses. Grows one room at a time.",
      link: "/platforms/lutron-radiora3",
      linkLabel: "RadioRA3 details",
    },
    {
      title: "HomeWorks",
      description:
        "Wired or wireless, centralized panels, up to 10,000 zones, native Ketra/Lumaris/Palladiom, hand-crafted keypads. Designed for architectural homes and luxury whole-home lighting.",
      link: "/platforms/lutron-homeworks",
      linkLabel: "HomeWorks details",
    },
  ];

  const faqs = [
    {
      q: "How is HomeWorks different from RadioRA3?",
      a: "RadioRA3 is Lutron's professional wireless platform — excellent for retrofits, scalable smart lighting, and most homes. HomeWorks is Lutron's flagship platform designed for architectural and luxury projects. HomeWorks supports wired QS backbones, very large zone counts (up to 10,000), centralized panels, and native Ketra/Lumaris/Palladiom shades. For very large estates and architect-led designs, HomeWorks is the right tool.",
    },
    {
      q: "Do I have to do the whole house at once?",
      a: "No. HomeWorks can be phased — start with the primary living areas and primary wing, add the exterior and guest wing later. We plan the processor, panels, and conduit on day one so the later phases drop in cleanly.",
    },
    {
      q: "Does HomeWorks need to be wired?",
      a: "Not necessarily. HomeWorks supports both QS wired and Clear Connect wireless. Wired QS is the right choice for difficult architecture, very large zone counts, and centralized panel designs. Wireless is great for retrofits and outlying zones. Most of our HomeWorks projects are a mix.",
    },
    {
      q: "Can HomeWorks integrate with Control4, AVA, and Sonos?",
      a: "Yes. HomeWorks integrates natively with Control4 and is designed to cooperate with whole-home automation platforms. AVA, Sonos, Savant, voice assistants, and most other subsystems can all be tied in.",
    },
    {
      q: "We have Ketra fixtures already — can HomeWorks drive them?",
      a: "Yes. Ketra is natively supported by HomeWorks. Same for Lumaris tunable white and Palladiom shades. This is actually one of the main reasons to choose HomeWorks over other platforms.",
    },
    {
      q: "What does a HomeWorks system cost?",
      a: "HomeWorks is a flagship platform and pricing reflects that. Projects typically start in the mid five figures for a primary wing and run well into six figures for a full architectural home with Ketra, Palladiom shades, and centralized panels. We provide a written proposal after walking the house and coordinating with the design team.",
    },
  ];

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
    <PageBackground image={bgLighting}>
      <SEO
        title="Lutron HomeWorks Design & Installation in Vail Valley"
        description="Lutron HomeWorks design, installation, programming, and service for luxury Vail Valley homes — architectural lighting, Ketra, Lumaris, hand-crafted keypads, QS wired and Clear Connect wireless, motorized shades, and whole-home control."
        keywords="Lutron HomeWorks Vail Valley, HomeWorks dealer Colorado, architectural lighting Eagle County, Ketra installer, Lumaris lighting, Palladiom shades, luxury smart home"
        schema={[serviceSchema, faqSchema]}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Platforms", url: "/platforms" },
          { name: "Lutron HomeWorks", url: "/platforms/lutron-homeworks" },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/platforms"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Platforms
          </Link>
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-3">
            Lutron HomeWorks
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white hero-text-shadow">
            The lighting system for architectural homes.
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl hero-subtext-shadow">
            Lutron's flagship platform for luxury lighting and whole-home automation — designed, installed, and tuned around how the house is actually meant to look and feel.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:+19705193013"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"
            >
              Call About HomeWorks <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/scheduling?service=homeworks"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"
            >
              <Phone className="w-4 h-4" /> Schedule a Design Meeting
            </Link>
          </div>
          <p className="text-white/40 text-sm mt-6">
            Vail · Beaver Creek · Edwards · Avon · Eagle
          </p>
        </div>
      </section>

      <div className="hero-divider w-full" />

      {/* Stats strip */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-4 sm:p-5"
            >
              <p className="text-accent text-xs sm:text-sm font-medium uppercase tracking-wide mb-2">
                {s.label}
              </p>
              <p className="text-white/70 text-sm leading-relaxed">{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. What HomeWorks offers — kept right after stats */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            What HomeWorks Offers
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
            Built for uncompromising lighting and automation.
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-10 max-w-3xl">
            HomeWorks is designed for homes where the lighting is part of the architecture. Native support for the full Lutron catalog, hand-crafted keypads, wired and wireless backbones, and a platform Lutron builds around their most demanding projects.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {whatItIs.map((item, i) => (
              <div
                key={i}
                className="bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-6"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best fit */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Best Fit
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            Where HomeWorks is the right answer.
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {bestFit.map((item, i) => (
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

      {/* 5. System pieces / Capabilities */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            System Pieces
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
            What HomeWorks covers natively.
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-8 max-w-2xl">
            HomeWorks is designed around Lutron's full catalog — processors, panels, fixtures, shades, keypads, sensors, and cloud tools — with native integration into the rest of your smart-home stack.
          </p>
          <div className="flex flex-wrap gap-2">
            {capabilities.map((pill) => (
              <span
                key={pill}
                className="px-3 py-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-sm text-white/70 text-xs sm:text-sm"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Everyday Scenes — what the family notices */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Everyday Scenes
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            What the family actually notices.
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {experience.map((item, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 rounded-xl border border-white/8 bg-black/40 backdrop-blur-sm"
              >
                <Sparkles className="w-5 h-5 text-accent shrink-0 mt-0.5" />
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

      {/* 7. How Symphony designs and programs it */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            How Symphony Sets It Up
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            From design meeting to living in the house.
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {whatWeDo.map((item, i) => (
              <div
                key={i}
                className="bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-6"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <p className="text-accent font-medium text-sm tracking-wide uppercase mb-3">
              Common HomeWorks Projects
            </p>
            <div className="space-y-4">
              {commonProjects.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-5 p-5 rounded-xl border border-white/8 bg-black/40 backdrop-blur-sm"
                >
                  <span className="text-accent font-semibold text-sm shrink-0 w-8">
                    {item.step}
                  </span>
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
        </div>
      </section>

      {/* 8. Compare / Choose — HomeWorks vs RadioRA3 + Setup Finder */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            HomeWorks vs RadioRA3
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
            Two Lutron platforms. Two different homes.
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-10 max-w-3xl">
            Both are Lutron. Both are excellent. RadioRA3 is the right tool for wireless retrofits and scalable smart lighting. HomeWorks is the right tool for architectural homes, luxury whole-home lighting, and projects that need centralized panels and native Ketra/Lumaris/Palladiom.
          </p>
          <div className="grid sm:grid-cols-2 gap-5 mb-6">
            {compareToRA3.map((c, i) => {
              const isHere = c.link === "/platforms/lutron-homeworks";
              return (
                <div
                  key={i}
                  className={`bg-black/40 backdrop-blur-sm border rounded-xl p-6 ${
                    isHere ? "border-accent/30" : "border-white/8"
                  }`}
                >
                  {isHere && (
                    <p className="text-accent text-xs font-semibold uppercase tracking-wide mb-2">
                      You are here
                    </p>
                  )}
                  <h3 className="text-white font-semibold text-lg mb-2">{c.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed mb-4">
                    {c.description}
                  </p>
                  {!isHere && (
                    <Link
                      to={c.link}
                      className="inline-flex items-center gap-1 text-accent text-sm font-medium hover:gap-2 transition-all"
                    >
                      {c.linkLabel} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
          <Link
            to="/setup-finder"
            className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:gap-3 transition-all"
          >
            Not sure which one? Try the Setup Finder <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            FAQ
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            HomeWorks Questions
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
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Get Started
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Tell us about the house.
          </h2>
          <p className="text-white/60 text-base mb-8 max-w-2xl mx-auto">
            New construction, a deep remodel, or an existing HomeWorks system that needs attention — send the property, the architect and lighting designer (if involved), and what you want the house to do. We will walk the plans or the house and tell you what is realistic.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="tel:+19705193013"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base w-full sm:w-auto"
            >
              Call (970) 519-3013 <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/scheduling?service=homeworks"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base w-full sm:w-auto"
            >
              <Phone className="w-4 h-4" /> Schedule a Design Meeting
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Related
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Keep exploring
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                title: "Lutron RadioRA3",
                description:
                  "The wireless Lutron platform — retrofit-friendly and great for most finished homes.",
                path: "/platforms/lutron-radiora3",
              },
              {
                title: "Control4 Automation",
                description:
                  "The whole-home automation layer that often sits on top of HomeWorks lighting.",
                path: "/platforms/control4",
                icon: Home,
              },
              {
                title: "Motorized Shades",
                description:
                  "Palladiom, Triathlon, and Sivoia shades — native in HomeWorks and tied to scenes.",
                path: "/services/shades",
                icon: Sun,
              },
              {
                title: "Whole-Home Audio",
                description:
                  "Sonos, Denon, and dedicated distributed audio alongside the lighting program.",
                path: "/services/audio-entertainment",
                icon: Volume2,
              },
            ].map((s, i) => (
              <Link
                key={i}
                to={s.path}
                className="group flex items-start justify-between gap-4 p-5 rounded-xl border border-white/8 bg-black/40 backdrop-blur-sm hover:border-accent/30 transition-colors"
              >
                <div>
                  <h3 className="text-white font-semibold mb-1 group-hover:text-accent transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {s.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-accent shrink-0 mt-1 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trademark */}
      <section className="px-4 sm:px-6 pb-10 pt-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-white/35 text-xs leading-relaxed">
            Lutron, HomeWorks, RadioRA3, Clear Connect, Sunnata, Ketra, Lumaris, Palladiom, Sivoia, Triathlon, seeTouch, Alisse, and related trade dress and logos are trademarks or registered trademarks of Lutron Electronics Co., Inc. in the U.S. and/or other countries. Symphony Smart Homes is an independent smart-home integration company.
          </p>
        </div>
      </section>

      <Footer />
    </PageBackground>
  );
};

export default LutronHomeWorks;
