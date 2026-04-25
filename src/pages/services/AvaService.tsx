import { Link } from "react-router-dom";
import {
  ArrowRight,
  Phone,
  ArrowLeft,
  Tv,
  Volume2,
  Music,
  Film,
  Home,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  Users,
  Wifi,
  Hammer,
  Wrench,
  GraduationCap,
} from "lucide-react";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";
import ProductFamilyTree, {
  type ProductFamilyGroup,
} from "../../components/ProductFamilyTree";
import { schemaProviderLocalBusiness } from "../../constants/businessSchema";
import PageBackground from "../../components/PageBackground";
import bgAudio from "../../assets/bg-audio.jpg";

const AvaService = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AVA Cinema Remote, Home Remote & AVA OS",
    "provider": schemaProviderLocalBusiness,
    "description":
      "AVA Cinema Remote and Home Remote, both running AVA OS, with AVA Flows for automation without coding. Cinema Remote includes a built-in octa-core processor for IP control directly from the remote — no external processor required. Installed and tuned for Vail Valley homes.",
    "areaServed": "Vail Valley, Colorado",
  };

  // The AVA product line — Cinema Remote, Home Remote, AVA OS, Flows,
  // and the hardware/UX details that come with them. No unverified
  // device-count claims on this page.
  const whatYouGet = [
    {
      icon: Tv,
      title: "Cinema Remote",
      description:
        "The only remote you'll ever need for TV rooms, media rooms, and theaters. Single-piece machined aluminum, 3D Glass Dynamic Keypad, and a built-in octa-core processor running AVA OS — IP control directly from the remote, no external processor required.",
    },
    {
      icon: Home,
      title: "Home Remote",
      description:
        "For spaces beyond the screen — rooms without a TV. Intuitive control for lighting, audio, climate, and everything in-between, sharing the same AVA OS experience as Cinema Remote.",
    },
    {
      icon: Sparkles,
      title: "AVA OS",
      description:
        "The home operating system that makes complex systems feel simple and connected. AVA OS runs on the remote itself and stays consistent across every AVA remote in the house.",
    },
    {
      icon: Users,
      title: "AVA Flows",
      description:
        "Automation without coding. Drag a button press into a sequence — shades down, lights dim, projector on, receiver to the right input — and the room lands on the moment in one tap.",
    },
    {
      icon: Film,
      title: "Dynamic Keypad",
      description:
        "Adapts to the moment. TV controls when watching, lighting when not, audio when needed. Touch it, feel the mechanical click, see it, hear it.",
    },
    {
      icon: Wifi,
      title: "IP control, no extra processor",
      description:
        "Cinema Remote talks to modern gear over IP directly from the keypad — two-way feedback, no rack-mounted middleman to fail. Older gear stays controllable through built-in IR.",
    },
    {
      icon: Music,
      title: "Lights, music, climate, everything in-between",
      description:
        "AVA controls lights, music, climate, and everything in-between — Sonos, Control4 audio, Lutron lighting and shades all line up behind a single keypad in the room.",
    },
    {
      icon: Volume2,
      title: "Built to last",
      description:
        "Single-piece machined aluminum, 3D Glass, and a mechanical click — designed to live on the coffee table and feel premium every time it's picked up.",
    },
  ];

  const bestFit = [
    {
      title: "Made for more than the TV",
      description:
        "Cinema Remote is dynamic — it adapts to every moment. Seamless control over lights, music, climate, and everything in-between. One-room or multi-room, the same remote scales with the house.",
    },
    {
      title: "Houses where everyone needs to pick it up",
      description:
        "Sit back and relax — training takes 4 minutes, not four days. AVA is designed so guests, kids, and property managers can walk in and use the room without a tutorial.",
    },
    {
      title: "Replacing aging universal remotes",
      description:
        "Harmony, Logitech, and other legacy universals with broken databases and flaky IR are one of the main reasons homeowners call us about AVA.",
    },
    {
      title: "Pairs with Lutron and Control4",
      description:
        "AVA handles the TV, audio, and the rooms beyond the screen. Lutron handles the lighting load. Control4 ties the wider house together when needed. Clean systems, one beautifully simple keypad.",
    },
  ];

  const productFamilyRoot = {
    label: "AVA OS",
    sublabel: "AVA's home operating system",
    href: "https://www.ava.com/ava-os",
    external: true,
    hint: "AVA's operating system — the brain behind every remote and keypad",
  };

  const productFamilies: ProductFamilyGroup[] = [
    {
      title: "Hardware",
      description:
        "Single-piece aluminum, 3D Glass, mechanical click — and a built-in octa-core processor inside Cinema Remote, so there's less hardware in the closet.",
      items: [
        { label: "Cinema Remote", href: "https://www.ava.com/cinema-remote", external: true, hint: "Flagship remote for media rooms and theaters, with built-in processor" },
        { label: "Home Remote", href: "https://www.ava.com/home-remote", external: true, hint: "Whole-home remote for rooms beyond the screen" },
        { label: "Nano Brain", hint: "Compact processor option for installs without a Cinema Remote" },
      ],
    },
    {
      title: "Control engine",
      href: "https://support.ava.com/hc/en-us/articles/17380276206877--Device-Control-and-AVA-OS",
      external: true,
      description:
        "The logic AVA OS runs underneath — flows, dynamic keypads, and direct device control.",
      items: [
        { label: "AVA Flows", hint: "Multi-step automation logic tied to events" },
        { label: "Dynamic Keypad", hint: "AVA's on-wall scene keypad" },
        { label: "IP control", hint: "Network control of receivers, displays, and streamers" },
        { label: "IR / CEC", hint: "Legacy IR and HDMI-CEC control where IP isn't available" },
      ],
    },
    {
      title: "Interfaces",
      description:
        "The places the family touches AVA day to day — handheld, on the wall, on the phone, or shared kiosk.",
      items: [
        { label: "AVA App", href: "https://www.ava.com/ava-os", external: true, hint: "iOS and Android control" },
        { label: "Kiosk Mode", hint: "Locked-down touch surface for shared spaces" },
      ],
    },
    {
      title: "Rooms",
      description:
        "Where AVA shows up in the home — built around the screen first, then the rooms beyond it.",
      items: [
        { label: "TV & cinema rooms", hint: "Theaters, media rooms, primary TVs" },
        { label: "Music, lighting, climate", hint: "Whole-home control beyond the screen" },
        { label: "Multi-room flows", hint: "Flows that span rooms and zones" },
      ],
    },
    {
      title: "Plays well with",
      description:
        "How AVA cooperates with the rest of the gear in the rack and on the wall.",
      items: [
        { label: "Sonos", href: "/services/audio-entertainment", hint: "Whole-home audio control" },
        { label: "Control4", href: "/platforms/control4", hint: "Sits alongside or under a Control4 program" },
        { label: "Lutron", href: "/platforms/lutron-homeworks", hint: "Lighting and shades control" },
        { label: "Apple TV / Roku", hint: "IP and IR control of streaming players" },
        { label: "AV receivers", hint: "Denon, Marantz, Yamaha, and others" },
        { label: "Projectors & TVs", hint: "Sony, JVC, Epson, LG, Samsung, and others" },
        { label: "Soundbars", hint: "Sonos, Sennheiser, Samsung, and others" },
      ],
    },
  ];

  const everydayScenarios = [
    {
      step: "01",
      title: "Movie",
      description:
        "Cinema Remote — one tap. Shades down, lights dim, projector on, receiver to the right input, Apple TV ready. Icons shift intuitively to the watch experience.",
    },
    {
      step: "02",
      title: "Game day",
      description:
        "Living-room flow: TV on, the right channel, surround up, kitchen audio synced for the half-time crowd. Hand the keypad to whoever is closest — they will figure it out.",
    },
    {
      step: "03",
      title: "Beyond the screen",
      description:
        "Home Remote in the kitchen drops the dining lights, raises the great room a notch, starts a Sonos playlist inside and on the deck. The same AVA experience, no TV needed.",
    },
    {
      step: "04",
      title: "Goodnight",
      description:
        "Last tap of the night powers down the TV stack cleanly, settles the receiver, and tells the lighting system the family is done. Sit back and relax.",
    },
  ];

  const symphonyProcess = [
    {
      icon: Wrench,
      title: "Pairs to existing gear",
      description:
        "TV, receiver, Apple TV, soundbar, Sonos, projector — Cinema Remote pairs to what is already there over IP first, falling back to built-in IR for older gear.",
    },
    {
      icon: Sparkles,
      title: "Flows tuned to the room",
      description:
        "Movie, Game Day, Music, Goodnight — each AVA Flow shaped around your gear, your seating, and the habits the room actually has. Refined after the family lives with it.",
    },
    {
      icon: GraduationCap,
      title: "4-minute hand-off",
      description:
        "Training takes 4 minutes, not four days. The Dynamic Keypad adapts to what's happening, the icons shift intuitively, and the system improves as the room gets used.",
    },
    {
      icon: Hammer,
      title: "AVA is installed by pros",
      description:
        "AVA is installed by pros — that's by design. The keypad layout is tuned to the actual TV wall, rack, and seating, not a generic template.",
    },
  ];

  const faqs = [
    {
      q: "Is AVA a replacement for Control4?",
      a: "Not exactly. AVA is the only remote you'll ever need for the room — Cinema Remote runs AVA OS with a built-in octa-core processor and controls TVs, audio, lighting, climate, and everything in-between directly over IP. Control4 is a wider personalized smart-home platform with on-wall keypads, touchscreens, and an app for the whole house. In larger homes we often install both — AVA in the rooms, Control4 across the house.",
    },
    {
      q: "Does AVA work with Sonos?",
      a: "Yes. AVA integrates with Sonos so you can start, stop, and move music with the remote, and include audio in scenes like Dinner or Movie Night.",
    },
    {
      q: "Can AVA run a theater or media room?",
      a: "Yes. Cinema Remote was made for it. One-tap Movie Flows — shades down, lights dim, projector or TV on, receiver to the right input, Apple TV ready — are exactly what AVA OS and the Dynamic Keypad were designed for.",
    },
    {
      q: "Will my family actually be able to use it?",
      a: "That is the point. AVA's training takes 4 minutes, not four days. Icons shift intuitively to match the moment, the keypad has a real mechanical click, and Symphony tunes the layout around how your rooms are actually used. Sit back and relax.",
    },
    {
      q: "Can I still use the Sonos and TV apps?",
      a: "Yes. AVA does not take anything away — the native apps still work. AVA just means you rarely need to reach for them.",
    },
    {
      q: "Can you replace my existing Harmony / Logitech / universal remote?",
      a: "Yes. Aging universal remotes with broken databases and flaky IR blasters are one of the main reasons homeowners call us about AVA.",
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
    <PageBackground image={bgAudio}>
      <SEO
        title="AVA Cinema Remote, Home Remote & AVA OS in Vail Valley"
        description="The AVA line — Cinema Remote and Home Remote, both running AVA OS, with AVA Flows for automation without coding. Cinema Remote includes a built-in octa-core processor and Dynamic Keypad — IP control directly from the remote, no external processor required."
        keywords="AVA remote Vail Valley, AVA Cinema Remote, AVA Home Remote, AVA OS, AVA Flows, smart remote installer"
        schema={[serviceSchema, faqSchema]}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Platforms", url: "/platforms" },
          { name: "AVA", url: "/platforms/ava" },
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
            AVA
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white hero-text-shadow">
            One keypad. Every device. Beautifully simple.
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl hero-subtext-shadow">
            AVA OS makes complex systems feel simple and connected. Cinema Remote runs AVA OS on a built-in octa-core processor for TV rooms; Home Remote takes the same experience to spaces beyond the screen. AVA Flows handles the automation — no coding.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:+19705193013"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"
            >
              Call About AVA <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/scheduling?service=ava"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"
            >
              <Phone className="w-4 h-4" /> Schedule a Demo
            </Link>
          </div>
          <p className="text-white/40 text-sm mt-6">
            Vail · Beaver Creek · Edwards · Avon · Eagle
          </p>
        </div>
      </section>

      <div className="hero-divider w-full" />

      {/* 2. The AVA Line — product family overview */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            The AVA Line
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
            Cinema Remote, Home Remote, AVA OS, AVA Flows.
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-10 max-w-3xl">
            Cinema Remote is crafted from a single piece of machined aluminum, with a 3D Glass Dynamic Keypad and a built-in octa-core processor running AVA OS — IP control directly from the remote, no external processor required. Home Remote brings the same AVA OS experience to rooms beyond the screen. AVA Flows is the automation layer that runs the room.
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

      {/* 3. Best Fit */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Best Fit
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            Where AVA is the right answer.
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

      {/* 4. The AVA lineup */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5" id="product-family-tree">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            The Lineup
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
            Explore what AVA can include.
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl">
            AVA OS sits at the top — every branch below it runs on the same operating system. Linked items open AVA's official product pages where available; not every piece needs a link.
          </p>
          <ProductFamilyTree root={productFamilyRoot} groups={productFamilies} />
        </div>
      </section>

      {/* 5. Everyday Scenarios */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Everyday Scenarios
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            What the day looks like.
          </h2>
          <div className="space-y-4">
            {everydayScenarios.map((item, i) => (
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
      </section>

      {/* 6. How Symphony Sets It Up */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Tuned for Your Room
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            How AVA fits your gear, your room, your family.
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
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

      {/* 7. Compare / Choose */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            AVA vs Control4 vs Sonos alone
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
            Three honest options.
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-8 max-w-3xl">
            The right choice depends on how much of the house actually needs to be automated, and how often other people need to use it.
          </p>
          <div className="grid sm:grid-cols-3 gap-5 mb-6">
            <div className="bg-black/40 backdrop-blur-sm border border-accent/30 rounded-xl p-6">
              <p className="text-accent text-xs font-semibold uppercase tracking-wide mb-2">You are here</p>
              <h3 className="text-white font-semibold text-lg mb-2">AVA</h3>
              <p className="text-white/55 text-sm leading-relaxed">
                One keypad, every device. AVA OS makes complex systems feel simple and connected — Cinema Remote for TV rooms, Home Remote for spaces beyond the screen. AVA Flows is the simplest way to bring automation to life, without coding.
              </p>
            </div>
            <Link
              to="/platforms/control4"
              className="group bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-6 hover:border-accent/30 transition-colors"
            >
              <p className="text-white/40 text-xs font-semibold uppercase tracking-wide mb-2">Whole-home automation</p>
              <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-accent transition-colors">Control4</h3>
              <p className="text-white/55 text-sm leading-relaxed mb-4">
                When lighting, shades, climate, and security all need to live behind the same interface.
              </p>
              <span className="inline-flex items-center gap-1 text-accent text-sm font-medium group-hover:gap-2 transition-all">
                Explore Control4 <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
            <div className="bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-6">
              <p className="text-white/40 text-xs font-semibold uppercase tracking-wide mb-2">Audio only</p>
              <h3 className="text-white font-semibold text-lg mb-2">Sonos alone</h3>
              <p className="text-white/55 text-sm leading-relaxed">
                Audio-only, no theater, no coordinated TV control. Sonos on its own with the Sonos app is often the right answer and we will say so.
              </p>
            </div>
          </div>
          <Link
            to="/setup-finder"
            className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:gap-3 transition-all"
          >
            Not sure which one? Try the Setup Finder <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            FAQ
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            AVA Questions
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

      {/* 9. Final CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Get Started
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Touch it, feel it, see it in your own room.
          </h2>
          <p className="text-white/60 text-base mb-8 max-w-2xl mx-auto">
            Send a couple of photos of the TV wall and a list of the gear — TV, receiver, streamer, soundbar, Sonos, projector — and we will tell you exactly what Cinema Remote, Home Remote, and AVA OS look like in your house.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="tel:+19705193013"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base w-full sm:w-auto"
            >
              Call (970) 519-3013 <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/scheduling?service=ava"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base w-full sm:w-auto"
            >
              <Phone className="w-4 h-4" /> Schedule a Demo
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
                title: "Control4",
                description:
                  "Personalized smart home platform — lighting, entertainment, security, and comfort, compatible with an ecosystem of over 25,000 third-party devices.",
                path: "/platforms/control4",
              },
              {
                title: "Audio & Home Theater",
                description:
                  "Speakers, theaters, and whole-home audio — the gear AVA ties together.",
                path: "/services/audio-entertainment",
              },
              {
                title: "Lutron RadioRA3",
                description:
                  "Lighting and shades that can be folded into AVA or Control4 scenes.",
                path: "/platforms/lutron-radiora3",
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

      {/* Trademark */}
      <section className="px-4 sm:px-6 pb-10 pt-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-white/35 text-xs leading-relaxed">
            AVA and related trade dress and logos are trademarks of their respective owners. Sonos is a registered trademark of Sonos, Inc. Control4 is a trademark of Snap One, LLC. Symphony Smart Homes is an independent smart-home integration company.
          </p>
        </div>
      </section>

      <Footer />
    </PageBackground>
  );
};

export default AvaService;
