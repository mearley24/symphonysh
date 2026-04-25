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
      "AVA Cinema Remote, Home Remote, and AVA OS installed and tuned for Vail Valley homes. One keypad for every device — IP control directly from the remote, no external processor required. AVA Flows is the simplest way to bring your home to life, with automation without coding.",
    "areaServed": "Vail Valley, Colorado",
  };

  // What AVA offers — moved up to right after the hero. Covers
  // Cinema Remote, Home Remote, AVA OS, Flows, and IP/IR control,
  // per the page-flow spec.
  const whatYouGet = [
    {
      icon: Tv,
      title: "Cinema Remote",
      description:
        "The only remote you'll ever need. Made for TV rooms, media rooms, and theaters — single-piece aluminum, 3D Glass Dynamic Keypad, built-in octa-core processor running AVA OS. No external processor required.",
    },
    {
      icon: Home,
      title: "Home Remote",
      description:
        "For spaces beyond the screen — rooms without a TV. Intuitive control for lighting, audio, and everything else, sharing the same AVA OS as Cinema Remote.",
    },
    {
      icon: Sparkles,
      title: "AVA OS",
      description:
        "A revolutionary home operating system that makes complex systems feel simple and connected. The engine behind Nano Brain and Cinema Remote — improves over time, the same on every AVA remote in the house.",
    },
    {
      icon: Users,
      title: "AVA Flows",
      description:
        "The simplest way to bring your home to life — automation without coding. Drag a button press into a sequence: shades down, lights dim, projector on, receiver to the right input.",
    },
    {
      icon: Wifi,
      title: "IP control for over 10,000 devices",
      description:
        "AVA talks to most modern gear over IP directly from the remote — faster, more reliable, two-way feedback, and no rack-mounted middleman to fail.",
    },
    {
      icon: Volume2,
      title: "IR control for over 60,000 devices",
      description:
        "Older TVs, receivers, projectors, and cable boxes still work. Cinema Remote includes built-in IR emitters so almost anything in the rack or on the wall stays controllable.",
    },
    {
      icon: Film,
      title: "Dynamic Keypad",
      description:
        "Icons shift intuitively to match the moment — TV controls when watching, lighting when not, audio when needed. Touch it, feel the mechanical click, see it, hear it.",
    },
    {
      icon: Music,
      title: "Multi-room music & audio",
      description:
        "Pairs cleanly with Sonos and Control4 audio. Start music in the kitchen, move it to the deck, drop the volume in the bedroom — instant control, one keypad.",
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

  const componentPills = [
    "AVA Cinema Remote",
    "AVA Home Remote",
    "AVA OS",
    "AVA Flows",
    "Nano Brain",
    "Dynamic Keypad",
    "3D Glass",
    "Single-piece aluminum",
    "Kiosk Mode",
    "AVA App",
    "IP control",
    "IR control",
    "Sonos integration",
    "Control4 integration",
    "Lutron integration",
    "Apple TV",
    "Roku",
    "Receivers",
    "Projectors",
    "Soundbars",
    "TVs",
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
      icon: Hammer,
      title: "Installed by pros",
      description:
        "AVA is installed by pros — that is by design. We start in the actual room with the TV wall, the rack, and the seating, and shape the Dynamic Keypad around how you watch, not a generic template.",
    },
    {
      icon: Wrench,
      title: "Pair to existing gear",
      description:
        "TV, receiver, Apple TV, soundbar, Sonos, projector — AVA pairs to what is already there over IP and IR. No rip and replace unless something is genuinely broken.",
    },
    {
      icon: Sparkles,
      title: "Build the Flows that matter",
      description:
        "Movie, Game Day, Goodnight, Music — each AVA Flow tuned to your gear, your room, and your habits. Beautifully simple, refined after the family lives with it.",
    },
    {
      icon: GraduationCap,
      title: "4-minute hand-off",
      description:
        "Training takes 4 minutes, not four days. We walk through the keypad with the family, leave a one-page cheat sheet, and let the system improve as the room gets used.",
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
        description="AVA Cinema Remote and Home Remote installed and tuned for Vail Valley homes. AVA OS makes complex systems feel simple and connected — IP control directly from the remote, no external processor required. AVA Flows is the simplest way to bring your home to life, with automation without coding."
        keywords="AVA remote Vail Valley, smart remote installer, universal remote, media room control, whole home audio"
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
            AVA OS makes complex systems feel simple and connected. Cinema Remote for TV rooms, Home Remote for everywhere else — installed by Symphony, tuned for Vail Valley homes, designed so guests, kids, and property managers actually pick it up and use it.
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

      {/* 2. What AVA Offers — moved up from middle of page */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            What AVA Offers
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
            Cinema Remote, Home Remote, AVA OS, and Flows.
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-10 max-w-3xl">
            Cinema Remote is crafted from a single piece of aluminum, with a 3D Glass Dynamic Keypad and mechanical click. Its built-in octa-core processor runs AVA OS directly — IP control directly from the Cinema Remote, no external processor required. Home Remote takes the same AVA OS experience to spaces beyond the screen. AVA Flows is the simplest way to bring your home to life, with automation without coding.
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

      {/* 4. Devices / Components */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Devices & Components
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
            What ends up in the room.
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-8 max-w-2xl">
            A short, clean rack and one or two AVA remotes per room — single-piece aluminum, magnetic charging dock, built to last. Built-in processor on Cinema Remote means less hardware in the closet.
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
            How Symphony Sets It Up
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            Tuned to your gear, your room, your family.
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
            We install all three. The right choice depends on how much of the house you actually want automated, and how often other people need to use it.
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
