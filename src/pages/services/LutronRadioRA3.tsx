import { Link } from "react-router-dom";
import {
  ArrowRight,
  Phone,
  ArrowLeft,
  Radio,
  Layers,
  Sparkles,
  Home,
  CheckCircle2,
  ChevronDown,
  FileText,
  ExternalLink,
  Camera,
  AlertTriangle,
  Network,
  Sliders,
  Hammer,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";
import { schemaProviderLocalBusiness } from "../../constants/businessSchema";
import PageBackground from "../../components/PageBackground";
import bgLighting from "../../assets/bg-lighting.jpg";

const LutronRadioRA3 = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Lutron RadioRA3 Installation & Programming",
    "provider": schemaProviderLocalBusiness,
    "description":
      "RadioRA3 installation, programming, troubleshooting, and upgrade support for Vail Valley homes. Lighting scenes, keypads, shades, processors, and dimmers.",
    "areaServed": "Vail Valley, Colorado",
  };

  const stats = [
    { label: "Wireless", value: "Clear Connect RF control" },
    { label: "Retrofit Ready", value: "No wall-opening just to add control" },
    { label: "One Room to Whole Home", value: "Expandable as the house grows" },
    { label: "App · Voice · Keypad", value: "Scenes for everyday moments" },
  ];

  const systemCards = [
    {
      icon: Radio,
      title: "Reliable wireless control",
      description:
        "RadioRA3 uses Lutron's Clear Connect RF instead of leaning on Wi-Fi. Keypads, dimmers, and shades keep responding even when the internet goes down.",
    },
    {
      icon: Layers,
      title: "Start small, expand naturally",
      description:
        "One room today, the whole house later. We design the system so new keypads, dimmers, and shades drop in without rewiring what already works.",
    },
    {
      icon: Sparkles,
      title: "Scenes for real life",
      description:
        "Morning, Cook, Dinner, Movie, Goodnight — one press brings the whole room to the right level. No fiddling with ten dimmers.",
    },
    {
      icon: Home,
      title: "Built for larger homes",
      description:
        "Multi-wing Vail Valley homes, guest quarters, caretaker units, and outdoor lighting all run on one coordinated RadioRA3 system.",
    },
  ];

  const whereWeHelp = [
    {
      icon: Wrench,
      title: "Older Lutron systems",
      description:
        "HomeWorks, RadioRA Classic, RA2, or Caseta that has grown messy. We assess what is worth keeping and what should move to RadioRA3.",
    },
    {
      icon: Sliders,
      title: "LEDs that dim cleanly",
      description:
        "Flicker, buzz, and drop-outs are usually a dimmer-load mismatch. We pair the right Lutron dimmer with the fixture so it actually dims to 1%.",
    },
    {
      icon: Layers,
      title: "Clean installation",
      description:
        "Matching Lutron wallplates, proper keypad engraving, and processors tucked into the rack instead of zip-tied to a shelf.",
    },
    {
      icon: Network,
      title: "Network and app access",
      description:
        "Static IP, proper port forwarding where needed, and Lutron app access that actually works from the road — not just on the home Wi-Fi.",
    },
    {
      icon: Sparkles,
      title: "Programming that makes sense",
      description:
        "Button labels the family actually uses. Scenes tuned to how the room is lived in, not a demo program leftover from day one.",
    },
    {
      icon: Hammer,
      title: "System design before drywall",
      description:
        "For new builds we walk the plans with the architect and builder, mark keypad locations, and size the processor so nothing is bolted on later.",
    },
    {
      icon: AlertTriangle,
      title: "Troubleshooting without the runaround",
      description:
        "If the original installer is gone or unresponsive, we come in, read the existing program, and get the system working again.",
    },
  ];

  const componentPills = [
    "Dimmers",
    "Sunnata Dimmers",
    "Maestro Dimmers",
    "Plug-In Dimmer",
    "Switches",
    "Sunnata Switches",
    "Maestro Switches",
    "RF Relay Module",
    "Keypads",
    "Sunnata Keypads",
    "seeTouch Keypads",
    "Table Top Keypads",
    "Pico Wireless",
    "RadioRA3 Processor",
    "Repeaters",
    "Power Modules",
    "CCO Module",
    "Visor Control",
    "Ceiling Sensors",
    "Wall Sensors",
    "Receptacles",
    "Network Port",
    "Wallplates",
    "Shades",
  ];

  const commonWork = [
    {
      step: "01",
      title: "The scenes feel off",
      description:
        "Buttons do the wrong thing, scenes are too bright or too dim, and nobody can remember what any of them are supposed to do. We re-walk the house and re-tune the program room by room.",
    },
    {
      step: "02",
      title: "The lights do not dim well",
      description:
        "A handful of fixtures flicker, buzz, or snap off near the bottom. Almost always a dimmer-to-load mismatch. We swap to the right Lutron dimmer and set proper low-end trim.",
    },
    {
      step: "03",
      title: "The controls are confusing",
      description:
        "Five-button keypads with cryptic engraving. We simplify the button layout, relabel, and cut unused buttons so the wall makes sense at a glance.",
    },
    {
      step: "04",
      title: "The system grew messy",
      description:
        "New shades, new dimmers, and a handful of Pico remotes taped up over the years. We consolidate the program, clean up the rack, and document what is actually installed.",
    },
  ];

  const officialResources = [
    {
      title: "Application Notes",
      description:
        "Lutron's own guides for specific install scenarios — load types, integration, and design.",
      href: "https://support.lutron.com/us/en/product/radiora3/documents/application-notes",
    },
    {
      title: "Installation Guide",
      description:
        "The manufacturer's step-by-step for installing RadioRA3 processors, dimmers, and keypads.",
      href: "https://support.lutron.com/us/en/product/radiora3/documents/installation-guide",
    },
    {
      title: "All RadioRA3 Documents",
      description:
        "Full document library for RadioRA3 — spec sheets, troubleshooting, and release notes.",
      href: "https://support.lutron.com/us/en/product/radiora3/documents",
    },
  ];

  const beforeWeCome = [
    {
      icon: Camera,
      title: "Device photos",
      description:
        "A photo of the keypad, dimmer, processor, and the rack or closet. The front of the device plus the model number on the side.",
    },
    {
      icon: AlertTriangle,
      title: "Symptoms",
      description:
        "Which room, which button, and what actually happens. 'Kitchen scene is too dim' tells us more than 'the lights are weird.'",
    },
    {
      icon: Home,
      title: "System context",
      description:
        "Roughly when the system was installed, who installed it, and whether there is a rack, network switch, or app login already in place.",
    },
    {
      icon: FileText,
      title: "Recent changes",
      description:
        "New bulbs, a remodel, a new router, a recent power outage, or work by another trade. Small details save a trip.",
    },
  ];

  const faqs = [
    {
      q: "Can you help me find the model number?",
      a: "Yes. Pull the wallplate, and the model number is printed on the side of the dimmer or keypad — usually starts with RR, RRD, HWRS, or similar. For the processor, the label is on the side or bottom. Send a photo and we will identify it.",
    },
    {
      q: "When do I need two RadioRA3 processors?",
      a: "When the house is large enough that one processor cannot keep every device in reliable RF range, or when device count exceeds what one processor supports. Large mountain homes with detached structures (caretaker unit, barn, outdoor lighting) are the common case. We plan this up front.",
    },
    {
      q: "What should I use for under-cabinet lighting?",
      a: "It depends on the driver. Line-voltage LED strips typically run on a Lutron LED+ dimmer. Low-voltage strips with an external driver need a 0-10V or ELV dimmer matched to the driver. We size this per fixture, not per room.",
    },
    {
      q: "Pico remote or companion dimmer?",
      a: "A companion dimmer gives you a physical slider on the second location and looks like the main dimmer. A Pico is a smaller, wireless remote — great for bedside tables, kitchen islands, or a quick add to a three-way circuit without rewiring.",
    },
    {
      q: "Can RadioRA3 integrate with Sonos?",
      a: "Yes. RadioRA3 and Sonos integrate so a keypad button can start music, pause it, or tie music into a scene. We set this up through the supported integration rather than flaky third-party workarounds.",
    },
    {
      q: "Can you reset or reprogram devices?",
      a: "Yes — dimmers, keypads, and processors can be reset, re-associated, and reprogrammed. If the original programmer is gone, we read what is on the system, document it, and rebuild or clean up the program from there.",
    },
  ];

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
    <PageBackground image={bgLighting}>
      <SEO
        title="Lutron RadioRA3 Installation & Programming in Vail Valley"
        description="RadioRA3 installation, programming, troubleshooting, and upgrade support for Vail Valley homes. Symphony Smart Homes helps with lighting scenes, keypads, shades, processors, dimmers, and support."
        keywords="RadioRA3 Vail Valley, Lutron RadioRA3 installer, RadioRA3 programming, Lutron keypads, RadioRA3 processor, Lutron dimmers Eagle County"
        schema={[serviceSchema, faqSchema]}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Lutron RadioRA3", url: "/services/lutron-radiora3" },
        ]}
      />
      <Header />

      {/* Hero — no eyebrow per spec */}
      <section className="pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Services
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white hero-text-shadow">
            RadioRA3, made simple.
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl hero-subtext-shadow">
            Smart lighting, shades, keypads, app control, and voice control — professionally installed and tuned for the way your Vail Valley home actually lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:+19705193013"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"
            >
              Call About RadioRA3 <ArrowRight className="w-4 h-4" />
            </a>
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

      {/* RadioRA3 System */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            RadioRA3 System
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
            Control that feels built into the home.
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-10 max-w-3xl">
            RadioRA3 is a professionally installed wireless control system for lighting, shades, keypads, schedules, scenes, and whole-home comfort. Symphony makes the system feel less like technology and more like the house working the way it should.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {systemCards.map((item, i) => (
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

      {/* Where We Help */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Where We Help
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            The RA3 issues homeowners actually call about.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whereWeHelp.map((item, i) => (
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

      {/* RA3 Components */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            RA3 Components
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
            Tell us what part you see.
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-8 max-w-2xl">
            Not sure what the thing on your wall is called? Snap a photo and mention whichever of these looks closest. We will take it from there.
          </p>
          <div className="flex flex-wrap gap-2">
            {componentPills.map((pill) => (
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

      {/* Common RA3 Work */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Common RA3 Work
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            What usually needs fixing.
          </h2>
          <div className="space-y-4">
            {commonWork.map((item, i) => (
              <div
                key={i}
                className="flex gap-5 p-5 rounded-xl border border-white/8 bg-black/40 backdrop-blur-sm"
              >
                <span className="text-accent font-semibold text-sm shrink-0 w-8">
                  {item.step}
                </span>
                <div>
                  <h3 className="text-white font-semibold mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Resources */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Official Resources
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            When the manual matters, we point to the real one.
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {officialResources.map((r, i) => (
              <a
                key={i}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-6 hover:border-accent/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  {r.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  {r.description}
                </p>
                <span className="inline-flex items-center gap-1 text-accent text-sm font-medium mt-auto group-hover:gap-2 transition-all">
                  Open on Lutron.com <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Before We Come Out */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Before We Come Out
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            Send the details that save a trip.
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {beforeWeCome.map((item, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 rounded-xl border border-white/8 bg-black/40 backdrop-blur-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
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

      {/* FAQ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            FAQ
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            RadioRA3 Questions
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

      {/* Final CTA — centered on mobile and desktop */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Get Started
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Tell us what the house is doing.
          </h2>
          <p className="text-white/60 text-base mb-8 max-w-2xl mx-auto">
            Send the property location, what is not working, and a few photos of the keypad, dimmer, processor, rack, or room. We will help turn "the lights are acting weird" into a clear next step.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="tel:+19705193013"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base w-full sm:w-auto"
            >
              Call About RadioRA3 <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="tel:+19705193013"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base w-full sm:w-auto"
            >
              <Phone className="w-4 h-4" /> (970) 519-3013
            </a>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
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
                title: "Smart Lighting",
                description:
                  "The broader category — dimmers, keypads, scenes, and schedules across platforms.",
                path: "/services/smart-lighting",
              },
              {
                title: "Control4 Automation",
                description:
                  "When lighting, audio, climate, and shades should all live behind one interface.",
                path: "/services/control4",
              },
              {
                title: "Motorized Shades",
                description:
                  "Lutron shades that wake up with the sun and tuck in at sunset — tied to the same keypads.",
                path: "/services/shades",
              },
              {
                title: "Not sure what you need?",
                description:
                  "Answer a few questions and we will suggest a starting point.",
                path: "/setup-finder",
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

      {/* Trademark note */}
      <section className="px-4 sm:px-6 pb-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-white/35 text-xs leading-relaxed">
            Lutron, RadioRA3, Clear Connect, HomeWorks, Sunnata, Ketra, and related trade dress and logos are trademarks or registered trademarks of Lutron Electronics Co., Inc. in the U.S. and/or other countries. Symphony Smart Homes is an independent smart-home integration company.
          </p>
        </div>
      </section>

      <Footer />
    </PageBackground>
  );
};

export default LutronRadioRA3;
