import { Link } from "react-router-dom";
import {
  ArrowRight,
  Phone,
  ArrowLeft,
  Radio,
  Layers,
  Sparkles,
  Home,
  ChevronDown,
  FileText,
  ExternalLink,
  Camera,
  AlertTriangle,
  Network,
  Sliders,
  Hammer,
  Wrench,
  Sun,
  Lightbulb,
  CheckCircle2,
  Smartphone,
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
    { label: "Wireless", value: "Clear Connect RF — not Wi-Fi" },
    { label: "Scale", value: "Up to 400 devices with paired processors" },
    { label: "Retrofit Ready", value: "No wall-opening just to add control" },
    { label: "Native Integration", value: "Lumaris light & automated shades" },
  ];

  // What RadioRA3 offers — moved up to right after the hero per the
  // page-flow spec. Covers: smart dimmers/switches, SUNNATA keypads,
  // scenes, app control, schedules/sun, automated shades, Lumaris /
  // tunable lighting, retrofit-friendly wireless control.
  const whatYouGet = [
    {
      icon: Lightbulb,
      title: "Smart dimmers & switches",
      description:
        "Lutron Sunnata and Maestro dimmers and switches that dim cleanly to 1%, match the load, and replace what is on your wall today without rewiring the room.",
    },
    {
      icon: Sliders,
      title: "SUNNATA keypads",
      description:
        "Engraved Sunnata keypads with a soft light bar that fades to show level. Scenes for the room sit on the wall — no app required.",
    },
    {
      icon: Sparkles,
      title: "Scenes for real life",
      description:
        "Morning, Cook, Dinner, Movie, Goodnight — one button takes the whole room to the right level. No fiddling with ten dimmers or three apps.",
    },
    {
      icon: Smartphone,
      title: "App & voice control",
      description:
        "The Lutron app on iPhone and Android, plus Alexa, Google, and Siri shortcuts. Works inside the house and from the road, not just on home Wi-Fi.",
    },
    {
      icon: Sun,
      title: "Schedules, sunrise & sunset",
      description:
        "RadioRA3 knows the astronomic clock for Eagle County. Exterior lights rise at dusk, pathway lights fade late, and mornings arrive on schedule.",
    },
    {
      icon: Layers,
      title: "Automated shades",
      description:
        "Sivoia, Triathlon, and Palladiom shades on the same keypads as the lights. Sun-tracking, scenes, and schedules all in one program.",
    },
    {
      icon: Sparkles,
      title: "Lumaris tunable light",
      description:
        "Native support for Lumaris — tunable white from 1800K to 4000K, dimming to 0.1%, warm-on-dim that makes a room feel like firelight at night and daylight at breakfast.",
    },
    {
      icon: Radio,
      title: "Retrofit-friendly wireless",
      description:
        "Clear Connect RF instead of Wi-Fi. Keypads, dimmers, and shades drop in without opening walls and keep responding even when the internet goes down.",
    },
  ];

  const bestFit = [
    {
      title: "Finished homes that want real lighting control",
      description:
        "RadioRA3 was built for retrofits. Add scenes, keypads, shades, and app control without tearing into drywall or rewiring rooms that already work.",
    },
    {
      title: "Multi-wing Vail Valley homes",
      description:
        "Main house, guest quarters, caretaker units, garage and outdoor lighting — all coordinated on one program with paired processors.",
    },
    {
      title: "Older Lutron systems that have grown messy",
      description:
        "HomeWorks QS Illumination, RadioRA Classic, RA2, or Caseta that has outgrown itself. We assess what is worth keeping and migrate the rest to RadioRA3.",
    },
    {
      title: "Homes that want to start small and grow",
      description:
        "One room today, the whole house later. New keypads, dimmers, and shades drop in over time without redoing what already works.",
    },
  ];

  const componentPills = [
    "Sunnata Dimmers",
    "Sunnata Switches",
    "Sunnata Keypads",
    "Maestro Dimmers",
    "Maestro Switches",
    "Pico Wireless Remotes",
    "Tabletop Keypads",
    "RadioRA3 Processor",
    "Repeaters",
    "Power Modules",
    "RF Relay Module",
    "CCO Module",
    "Visor Control",
    "Ceiling Sensors",
    "Wall Sensors",
    "Receptacles",
    "Wallplates",
    "Shades",
    "Lumaris Light",
  ];

  const everydayScenes = [
    {
      step: "01",
      title: "Morning",
      description:
        "Bathroom comes up gently, kitchen lights warm to a friendly level, exterior pathway lights fade as the sun rises over the valley. No tapping, no app.",
    },
    {
      step: "02",
      title: "Cook",
      description:
        "One button on the kitchen keypad — under-cabinet on, island down a notch, dining at a soft glow, music optional. The room is set before the burner is lit.",
    },
    {
      step: "03",
      title: "Movie",
      description:
        "Great-room scene drops the cans, holds the wall sconces low, brings the shades down, and leaves a step-light on for the kitchen run.",
    },
    {
      step: "04",
      title: "Goodnight",
      description:
        "Primary suite keypad shuts the house down — interior lights off, exterior on a low security level, shades closed, primary bedroom fades to sleep.",
    },
    {
      step: "05",
      title: "Away",
      description:
        "One tap on the way out the door. House goes dark, exterior keeps a vacation pattern, and the Lutron app shows the state of every room from anywhere.",
    },
  ];

  const symphonyProcess = [
    {
      icon: Hammer,
      title: "Walk the house with you",
      description:
        "We see how each room is actually lived in — where the family enters, where they cook, where they wind down — before recommending keypads or scenes.",
    },
    {
      icon: Sliders,
      title: "Match dimmers to fixtures",
      description:
        "Every LED, low-voltage strip, and tape light gets the right Lutron dimmer behind it. No flicker, no buzz, no drop-out at the bottom of the dim curve.",
    },
    {
      icon: Layers,
      title: "Engrave the keypads to the room",
      description:
        "Button labels the family actually uses. Scenes tuned to how the room is lived in, not a demo program leftover from day one.",
    },
    {
      icon: Network,
      title: "Network & remote app access",
      description:
        "Static IP, proper port forwarding where needed, and Lutron app access that works from the road. Documented so the next service call does not start from scratch.",
    },
    {
      icon: Wrench,
      title: "Service the system you already own",
      description:
        "Inherited an RA3 system from another installer? We read the program, document it, fix what is broken, and clean it up so the wall makes sense again.",
    },
    {
      icon: AlertTriangle,
      title: "Troubleshooting without the runaround",
      description:
        "If the original installer is gone or unresponsive, we come in, identify the device on the wall, and get the system working again — usually on the first visit.",
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
          { name: "Platforms", url: "/platforms" },
          { name: "Lutron RadioRA3", url: "/platforms/lutron-radiora3" },
        ]}
      />
      <Header />

      {/* 1. Hero */}
      <section className="pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/platforms"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Platforms
          </Link>
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-3">
            Lutron RadioRA3
          </p>
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

      {/* 2. Stats strip */}
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

      {/* 3. What RadioRA3 Offers — moved up from bottom of page */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            What RadioRA3 Offers
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
            Everything you can put on the wall, on a schedule, or in your pocket.
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-10 max-w-3xl">
            RadioRA3 is a professionally installed wireless control system for lighting, shades, keypads, schedules, scenes, and whole-home comfort. Symphony makes the system feel less like technology and more like the house working the way it should.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whatYouGet.map((item, i) => (
              <div
                key={i}
                className="bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-6"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-white font-semibold text-base mb-2">
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

      {/* 4. Best Fit */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Best Fit
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            Where RadioRA3 is the right answer.
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

      {/* 5. System Components */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            System Components
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

      {/* 6. Everyday Scenes */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Everyday Scenes
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            What the day actually looks like.
          </h2>
          <div className="space-y-4">
            {everydayScenes.map((item, i) => (
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

      {/* 7. How Symphony designs and programs it */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            How Symphony Sets It Up
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            What our team handles, end to end.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {symphonyProcess.map((item, i) => (
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

      {/* 8. Compare / Choose — RadioRA3 vs HomeWorks + Setup Finder */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            RadioRA3 vs HomeWorks
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
            Two Lutron platforms. Which one is right?
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-8 max-w-3xl">
            RadioRA3 is the right choice for most homes — wireless, retrofit-friendly, scalable to 400 devices. HomeWorks is Lutron's flagship platform for architectural homes, centralized panels, 10,000-zone designs, and Ketra or Palladiom shades.
          </p>
          <div className="grid sm:grid-cols-2 gap-5 mb-6">
            <div className="bg-black/40 backdrop-blur-sm border border-accent/30 rounded-xl p-6">
              <p className="text-accent text-xs font-semibold uppercase tracking-wide mb-2">
                You are here
              </p>
              <h3 className="text-white font-semibold text-lg mb-2">RadioRA3</h3>
              <p className="text-white/55 text-sm leading-relaxed">
                Wireless retrofits, scalable smart lighting, up to 400 devices, one room to whole home. Clear Connect RF, no Wi-Fi dependency.
              </p>
            </div>
            <Link
              to="/platforms/lutron-homeworks"
              className="group bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-6 hover:border-accent/30 transition-colors"
            >
              <p className="text-white/40 text-xs font-semibold uppercase tracking-wide mb-2">
                Flagship platform
              </p>
              <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
                HomeWorks
              </h3>
              <p className="text-white/55 text-sm leading-relaxed mb-4">
                Architectural homes, centralized panels, up to 10,000 zones, native Ketra / Lumaris / Palladiom, QS wired backbone options.
              </p>
              <span className="inline-flex items-center gap-1 text-accent text-sm font-medium group-hover:gap-2 transition-all">
                Explore HomeWorks <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
          <Link
            to="/setup-finder"
            className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:gap-3 transition-all"
          >
            Not sure which one? Try the Setup Finder <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 9. FAQ */}
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

      {/* 10. Final CTA */}
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
          <p className="text-white/40 text-xs mt-6">
            Helpful before we come out: device photos, room and symptom, install context, recent changes.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8 text-left">
            {beforeWeCome.map((item, i) => (
              <div
                key={i}
                className="flex gap-3 p-4 rounded-lg border border-white/8 bg-black/40 backdrop-blur-sm"
              >
                <item.icon className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-white font-medium text-sm mb-0.5">{item.title}</h3>
                  <p className="text-white/45 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
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
                title: "Lutron HomeWorks",
                description:
                  "Lutron's flagship platform for architectural homes, Ketra and Lumaris, and luxury whole-home lighting.",
                path: "/platforms/lutron-homeworks",
              },
              {
                title: "Control4 Automation",
                description:
                  "When lighting, audio, climate, and shades should all live behind one interface.",
                path: "/platforms/control4",
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

      {/* Official Resources */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Manufacturer Resources
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-8">
            Going deeper on RadioRA3.
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {officialResources.map((r, i) => (
              <a
                key={i}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-5 hover:border-accent/30 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                  <FileText className="w-4 h-4 text-accent" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1.5">
                  {r.title}
                </h3>
                <p className="text-white/45 text-xs leading-relaxed mb-3">
                  {r.description}
                </p>
                <span className="inline-flex items-center gap-1 text-accent text-xs font-medium mt-auto group-hover:gap-2 transition-all">
                  Open on Lutron.com <ExternalLink className="w-3 h-3" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Trademark note */}
      <section className="px-4 sm:px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-white/35 text-xs leading-relaxed">
            Lutron, RadioRA3, Clear Connect, HomeWorks, Sunnata, Lumaris, Ketra, and related trade dress and logos are trademarks or registered trademarks of Lutron Electronics Co., Inc. in the U.S. and/or other countries. Symphony Smart Homes is an independent smart-home integration company.
          </p>
        </div>
      </section>

      <Footer />
    </PageBackground>
  );
};

export default LutronRadioRA3;
