import { Link } from "react-router-dom";
import {
  ArrowRight,
  Phone,
  ArrowLeft,
  Home,
  Lightbulb,
  Volume2,
  Thermometer,
  Shield,
  Sun,
  Wrench,
  Hammer,
  GraduationCap,
  Map,
  ChevronDown,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";
import { schemaProviderLocalBusiness } from "../../constants/businessSchema";
import PageBackground from "../../components/PageBackground";
import bgHomeIntegration from "../../assets/bg-home-integration.jpg";

const Control4 = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Control4 Home Automation",
    "provider": schemaProviderLocalBusiness,
    "description":
      "Control4 design, installation, programming, and service for Vail Valley homes. Lighting, audio, climate, security, and shades from one interface.",
    "areaServed": "Vail Valley, Colorado",
  };

  const pillars = [
    {
      icon: Lightbulb,
      title: "Lighting",
      description:
        "Keypads, dimmers, and scenes throughout the house — often paired with Lutron RadioRA3 underneath for the actual lighting load.",
    },
    {
      icon: Volume2,
      title: "Audio & Video",
      description:
        "Whole-home audio, media room and theater control, source switching, and one-button TV on for guests who just want to watch the game.",
    },
    {
      icon: Thermometer,
      title: "Climate",
      description:
        "Thermostats, zoned HVAC, and floor heat that cooperate with scenes — 'Goodnight' cools the bedroom before the shades even close.",
    },
    {
      icon: Shield,
      title: "Security",
      description:
        "Alarms, cameras, smart locks, and access control. One tap arms the system and shuts the house down for the night.",
    },
    {
      icon: Sun,
      title: "Shades",
      description:
        "Motorized shades on a schedule, tied to sun position and paired with lighting so the room never goes too bright or too dark.",
    },
    {
      icon: Home,
      title: "Scenes",
      description:
        "Morning, Away, Movie, Goodnight — one gesture coordinates lights, music, shades, thermostat, and locks together.",
    },
  ];

  const services = [
    {
      icon: Hammer,
      title: "New build & pre-wire planning",
      description:
        "We sit down with the architect and builder early. Rack location, keypad layout, speaker pre-wire, TV backboxes, network drops — all planned on the prints before drywall goes up.",
    },
    {
      icon: Wrench,
      title: "Fixing existing Control4 systems",
      description:
        "Inherited a system from the previous owner? Original dealer went quiet? We come in, document what is installed, fix what is broken, and clean up the program so it makes sense again.",
    },
    {
      icon: Sparkles,
      title: "Upgrades & expansion",
      description:
        "Add a new room, a new shade, a new audio zone, or upgrade an older controller. Built on top of what already works — no rip and replace unless it is actually warranted.",
    },
    {
      icon: GraduationCap,
      title: "Homeowner training",
      description:
        "Walk-through at the end. We show you and the family how the remotes, touchscreens, and app actually work, and leave a one-page cheat sheet on the counter.",
    },
    {
      icon: Map,
      title: "Vail Valley service",
      description:
        "Local service across Vail, Beaver Creek, Edwards, Avon, and Eagle. We will come to the property, not just diagnose over the phone.",
    },
  ];

  const whyC4 = [
    {
      title: "One app, one remote",
      description:
        "The whole house lives behind a single interface. Owners learn it once and it works the same way in every room.",
    },
    {
      title: "Integrates with almost everything",
      description:
        "Control4 plays well with Lutron, Sonos, Denon, Sony, Samsung, LG, Nest, Honeywell, Ring, and most of the gear already in the house.",
    },
    {
      title: "Handles big houses",
      description:
        "Multi-wing Vail homes, guest quarters, caretaker units, and outdoor zones all run on one system instead of five unrelated apps.",
    },
    {
      title: "Designed for reliability",
      description:
        "Professional hardware, wired backbone where it matters, and programming that does not fall over when the internet hiccups.",
    },
  ];

  const faqs = [
    {
      q: "What is the difference between Control4 and Lutron RadioRA3?",
      a: "RadioRA3 is a lighting and shade control system. Control4 is a full-home automation system that ties lighting, audio, video, climate, security, and shades together behind one interface. Many of our homes run Control4 on top of RadioRA3 — the two are designed to work together.",
    },
    {
      q: "Can you service a Control4 system another company installed?",
      a: "Yes. This is one of our most common calls. We come in, read what is on the controller, document the program, fix what is broken, and hand you a clean version of your own system.",
    },
    {
      q: "Do I need to automate the whole house on day one?",
      a: "No. Most homeowners start with the rooms they use most — kitchen, great room, primary bedroom, and a theater or media room — then expand. Control4 is designed to grow one room at a time.",
    },
    {
      q: "What does a Control4 system cost?",
      a: "A single-room setup typically starts around $3,000–$5,000. A whole-home system for a large Vail Valley property usually runs $20,000–$100,000+ depending on lighting scope, number of audio zones, theater, and shades. We provide a written proposal after the walk-through.",
    },
    {
      q: "Will it still work if the internet goes down?",
      a: "Yes. Lights, keypads, scenes, climate, and local audio keep running locally. You lose remote app access from outside the house until the internet is back, but the house itself keeps working.",
    },
    {
      q: "Can I train my housekeeper or property manager to use it?",
      a: "Of course. We leave a short cheat sheet and, for homes with a property manager, we can add a separate manager interface with only the controls they need.",
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
    <PageBackground image={bgHomeIntegration}>
      <SEO
        title="Control4 Installation & Service in Vail Valley"
        description="Control4 design, installation, programming, and service for Vail Valley homes. Lighting, audio, climate, security, and shades from one interface. New builds, retrofits, and homeowner training."
        keywords="Control4 Vail Valley, Control4 dealer Eagle County, Control4 installer, Control4 programming, Control4 service"
        schema={[serviceSchema, faqSchema]}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Control4", url: "/services/control4" },
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
            Control4
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white hero-text-shadow">
            The whole house, behind one interface.
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl hero-subtext-shadow">
            Lighting, audio, climate, security, and shades working together as one system — designed, installed, and tuned for your Vail Valley home.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:+19705193013"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"
            >
              Call About Control4 <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/scheduling?service=control4"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-7 py-4 rounded-lg font-medium transition-colors text-base"
            >
              <Phone className="w-4 h-4" /> Schedule a Walk-Through
            </Link>
          </div>
          <p className="text-white/40 text-sm mt-6">
            Vail · Beaver Creek · Edwards · Avon · Eagle
          </p>
        </div>
      </section>

      <div className="hero-divider w-full" />

      {/* Pillars */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            What Control4 Controls
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            One system. Every layer of the house.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pillars.map((item, i) => (
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

      {/* Services / What we do */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            What We Do
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            From blank walls to a working system.
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {services.map((item, i) => (
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

      {/* Why Control4 */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Why Control4
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            Why we recommend it for larger homes.
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {whyC4.map((item, i) => (
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

      {/* FAQ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            FAQ
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            Control4 Questions
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
            Whether it is a new build, a remodel, or an existing Control4 system that needs attention — send the property, what you want the house to do, and we will tell you what is realistic.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="tel:+19705193013"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base w-full sm:w-auto"
            >
              Call (970) 519-3013 <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/scheduling?service=control4"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base w-full sm:w-auto"
            >
              <Phone className="w-4 h-4" /> Schedule a Walk-Through
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
                title: "Lutron RadioRA3",
                description:
                  "The lighting layer we most often pair with Control4 for larger homes.",
                path: "/services/lutron-radiora3",
              },
              {
                title: "AVA Smart Remote",
                description:
                  "When a single remote for TV, audio, and basic control is enough on its own.",
                path: "/services/ava",
              },
              {
                title: "Home Networking",
                description:
                  "Before Control4 goes in, the network needs to be solid. This is where that happens.",
                path: "/services/networking",
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
            Control4 and related trade dress and logos are trademarks or registered trademarks of Snap One, LLC and its affiliates. Symphony Smart Homes is an independent smart-home integration company.
          </p>
        </div>
      </section>

      <Footer />
    </PageBackground>
  );
};

export default Control4;
