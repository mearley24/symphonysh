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
    "name": "AVA Smart Remote & Media Control",
    "provider": schemaProviderLocalBusiness,
    "description":
      "AVA premium remote and audio/video control for Vail Valley homes. Replace cluttered remotes with one simple, family-friendly interface for TVs, audio, and media rooms.",
    "areaServed": "Vail Valley, Colorado",
  };

  const whatAvaDoes = [
    {
      icon: Tv,
      title: "One remote, every screen",
      description:
        "TV, receiver, Apple TV, cable box, soundbar — all behind one elegant remote. No more guessing which of five wands turns the TV on.",
    },
    {
      icon: Volume2,
      title: "Whole-home audio, simply",
      description:
        "Start music in the kitchen, move it to the deck, drop the volume in the bedroom. AVA pairs cleanly with Sonos and Control4 audio.",
    },
    {
      icon: Film,
      title: "Media rooms & theaters",
      description:
        "Movie Night lowers the shades, dims the lights, fires up the projector, and selects the right input. One button, every time.",
    },
    {
      icon: Users,
      title: "Guest-friendly",
      description:
        "Designed to be handed to a houseguest, a kid, or a property manager without a fifteen-minute tutorial.",
    },
  ];

  const replacesClutter = [
    {
      title: "The coffee table graveyard",
      description:
        "Three or four dusty remotes, one of them always missing a battery. AVA consolidates them into one.",
    },
    {
      title: "The 'which input was it again'",
      description:
        "Watching a movie should not require remembering HDMI 2 vs HDMI 4. AVA switches inputs as part of a scene, not a separate step.",
    },
    {
      title: "The app-in-every-room problem",
      description:
        "One app for Sonos, another for the TV, another for shades. AVA hands the everyday stuff to a physical remote so the app is optional.",
    },
    {
      title: "The 'nobody else can use the system'",
      description:
        "If the owner is the only person in the house who can turn the TV on, the system has failed. AVA fixes that.",
    },
  ];

  const whenAva = [
    {
      title: "When AVA makes sense",
      description:
        "Primarily a media and audio house. One or two TVs, a media room or theater, whole-home audio. You want simple, physical control without committing to a full Control4 system.",
      icon: Sparkles,
    },
    {
      title: "When Control4 makes sense",
      description:
        "Lighting scenes, shades, climate, and security all need to live behind the same interface. Larger homes, more systems, more integration — Control4 handles more layers than AVA was built for.",
      icon: Home,
    },
    {
      title: "When Sonos alone is enough",
      description:
        "Audio-only, no theater, no coordinated TV control. Sonos on its own with the Sonos app is often the right answer and we will say so.",
      icon: Music,
    },
  ];

  const faqs = [
    {
      q: "Is AVA a replacement for Control4?",
      a: "Not exactly. AVA is a premium remote and media control experience — it is excellent for TV, audio, and media rooms. Control4 is a full-home automation system that also handles lighting, climate, shades, and security. In larger homes we often run both.",
    },
    {
      q: "Does AVA work with Sonos?",
      a: "Yes. AVA integrates with Sonos so you can start, stop, and move music with the remote, and include audio in scenes like Dinner or Movie Night.",
    },
    {
      q: "Can AVA run a theater or media room?",
      a: "Yes. One-button Movie Night scenes — shades down, lights dim, projector or TV on, receiver to the right input, Apple TV ready — are one of the things AVA does best.",
    },
    {
      q: "Will my family actually be able to use it?",
      a: "That is the point. The remote is designed so that anyone who can use a TV remote can use AVA. We set it up specifically around how your rooms are used, not around a demo program.",
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
        title="AVA Smart Remote & Media Control in Vail Valley"
        description="AVA premium remote and audio/video control for Vail Valley homes. Replace messy remotes with one simple, family-friendly interface for TVs, whole-home audio, and media rooms."
        keywords="AVA remote Vail Valley, smart remote installer, universal remote, media room control, whole home audio"
        schema={[serviceSchema, faqSchema]}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "AVA", url: "/services/ava" },
        ]}
      />
      <Header />

      {/* Hero */}
      <section className="pt-36 sm:pt-44 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Services
          </Link>
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-3">
            AVA
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white hero-text-shadow">
            One remote the whole family can use.
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl hero-subtext-shadow">
            A premium remote and media control experience for TVs, audio, theaters, and whole-home sound — set up so guests, kids, and property managers can actually use it.
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

      {/* What AVA Does */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            What AVA Does
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            Simple media control, done properly.
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {whatAvaDoes.map((item, i) => (
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

      {/* Replaces the clutter */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            What AVA Replaces
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            The clutter goes away.
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {replacesClutter.map((item, i) => (
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

      {/* When AVA vs Control4 vs Sonos */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Right Fit
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
            AVA vs Control4 vs Sonos alone.
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-10 max-w-3xl">
            We install all three. The right choice depends on how much of the house you actually want automated, and how often other people need to use it.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {whenAva.map((item, i) => (
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

      {/* FAQ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
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

      {/* Final CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Get Started
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Want to see it in your own room?
          </h2>
          <p className="text-white/60 text-base mb-8 max-w-2xl mx-auto">
            Send a couple of photos of the TV wall, a list of the gear (TV, receiver, streamer, soundbar, Sonos) and we will tell you what the AVA setup actually looks like for your house.
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
                title: "Control4",
                description:
                  "When the whole house — lights, shades, climate, and security — should live behind one interface.",
                path: "/services/control4",
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
                path: "/services/lutron-radiora3",
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
      <section className="px-4 sm:px-6 pb-10">
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
