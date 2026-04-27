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
import ProductFamilyTree, {
  type ProductFamilyGroup,
} from "../../components/ProductFamilyTree";
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
      "Control4 design, installation, programming, and service for Vail Valley homes. Native Control4 lighting, audio, climate, security, and shades from one interface.",
    "areaServed": "Vail Valley, Colorado",
  };

  const pillars = [
    {
      icon: Lightbulb,
      title: "Lighting",
      description:
        "Native Control4 lighting — Lux keypads, dimmers, switches, and outlets in wireless and wired, plus centralized lighting modules for whole-home loads on a panel.",
    },
    {
      icon: Sparkles,
      title: "Vibrant Linear Lighting",
      description:
        "Tunable-white CCT LEDs with 90+ CRI in aluminum extrusions. Daylight mode mirrors the sun's cycle through the day to support circadian health.",
    },
    {
      icon: Volume2,
      title: "Entertainment",
      description:
        "Whole-home audio, media rooms, and theaters on one interface. Multi-room music, fast source switching, and entertainment sessions anyone can start.",
    },
    {
      icon: Thermometer,
      title: "Comfort",
      description:
        "Thermostats, zoned HVAC, and floor heat folded into the same scenes — Goodnight cools the bedroom before the shades close.",
    },
    {
      icon: Shield,
      title: "Security",
      description:
        "Cameras, smart locks, alarms, and access control inside the Control4 App. Push notifications when it matters; remote access designed to be private and secure.",
    },
    {
      icon: Sun,
      title: "Shades",
      description:
        "Motorized shades on schedules, tied to sun position, and drawn into lighting scenes so the room never goes too bright or too dark on its own.",
    },
    {
      icon: Home,
      title: "Scenes & X4 Routines",
      description:
        "Goodmorning, Goodbye/Away, Welcome, Movie/Relax, Goodnight — one tap, voice command, or scheduled X4 Routine coordinates lights, music, shades, climate, and locks. Mockupancy plays back recorded use while the house is empty.",
    },
  ];

  const services = [
    {
      icon: Sparkles,
      title: "Tailored to the family",
      description:
        "Every Control4 system is personalized by an integrator. Scenes, X4 Routines, widgets, favorites, and the home-screen layout are tuned to how the family actually uses the house.",
    },
    {
      icon: Hammer,
      title: "Service & expand existing systems",
      description:
        "Inherited a system, original dealer gone quiet, or want to add a room or audio zone? Control4 keeps growing on top of what is already there — drivers, zones, scenes, surfaces.",
    },
    {
      icon: GraduationCap,
      title: "Homeowner training & cheat sheet",
      description:
        "A short walk-through with the family at the end. The Control4 App, touchscreens, on-wall keypads, and smart remote — plus a one-page cheat sheet on the counter.",
    },
    {
      icon: Map,
      title: "Vail Valley service",
      description:
        "Local Control4 dealer support across Vail, Beaver Creek, Edwards, Avon, and Eagle — on-site and remote.",
    },
  ];

  const productFamilyRoot = {
    label: "Control4 Controller",
    sublabel: "The smart-home experience",
    href: "https://www.control4.com/the-smart-home-experience",
    external: true,
    hint: "Control4's whole-home automation platform",
    preview: {
      category: "Whole-home controller",
      description:
        "The Control4 controller is the brain of the system — it runs the local program that ties native Control4 lighting, audio, video, climate, security, and shades into one experience.",
      bestFit:
        "Whole-home projects that want one app and one keypad family across every room, including media rooms and theaters.",
      relatedTo: "Platform · Control4",
      highlights: [
        "Runs scenes and routines locally — keeps working when the internet hiccups",
        "Supports an ecosystem of 25,000+ third-party devices",
        "One platform across phone, touchscreen, keypad, and smart remote",
      ],
      officialUrl: "https://www.control4.com/the-smart-home-experience",
      ctaHref: "/scheduling?service=control4",
    },
  };

  const productFamilies: ProductFamilyGroup[] = [
    {
      title: "Control4 lighting",
      href: "https://www.control4.com/solutions/smart-lighting",
      external: true,
      description:
        "Native Control4 lighting — keypads, dimmers, switches, and outlets in wireless and wired, plus centralized modules for whole-home loads on a panel.",
      items: [
        { label: "Lux Keypads", href: "https://www.control4.com/solutions/products/wireless-keypads", external: true, hint: "Configurable keypads with custom backlit engraving — up to 34 button variations" },
        { label: "Lux Universal Dimmer", href: "https://www.control4.com/solutions/products/wireless-keypads", external: true, hint: "Dims virtually any load type" },
        { label: "Lux Switch", href: "https://www.control4.com/solutions/products/wireless-keypads", external: true, hint: "On/off for LED, incandescent, halogen, ELV/MLV, fluorescents, motors, fans" },
        { label: "Lux Outlets", href: "https://www.control4.com/solutions/products/wireless-keypads", external: true, hint: "Smart outlets in the Lux faceplate family" },
        { label: "Centralized lighting", href: "https://www.control4.com/solutions/products/wireless-keypads", external: true, hint: "Panel-mounted modules — 8 circuits per module, 120/240/277V" },
        { label: "Vibrant Linear Lighting", href: "https://www.control4.com/solutions/products/vibrant-linear-lighting", external: true, hint: "90+ CRI tunable-white linear LEDs with daylight mode" },
      ],
    },
    {
      title: "Control surfaces",
      href: "https://www.control4.com/solutions/products/",
      external: true,
      description:
        "Same personalized system, picked up wherever the family is — phone, touchscreen, wall, or remote.",
      items: [
        {
          label: "Control4 App",
          hint: "iOS and Android app, the same on every device",
          preview: {
            category: "Mobile control",
            description:
              "The Control4 App is the same experience on every phone in the house — favorites and home-screen layouts are personal to each user, but the underlying program is shared.",
            bestFit: "Owners and family members who want phone access without a separate dashboard for every subsystem.",
            relatedTo: "Control surface · Control4",
            highlights: [
              "Personal home-screen layouts per user",
              "Local control on the home network, remote access through Control4 4Sight",
              "Push alerts for the events that matter",
            ],
            officialUrl: "https://www.control4.com/solutions/products/apps/",
            ctaHref: "/scheduling?service=control4",
          },
        },
        {
          label: "Touchscreens",
          hint: "In-wall and tabletop touchscreens",
          preview: {
            category: "On-wall touchscreen",
            description:
              "Dedicated touchscreens for kitchens, primary suites, and entries — full system control without picking up a phone, and shared between everyone in the house.",
            bestFit: "Households who want a 'pick it up and use it' panel near the kitchen, entry, or primary bedroom.",
            relatedTo: "Control surface · Control4",
            highlights: [
              "In-wall and tabletop options",
              "Custom layouts, scenes, and intercom",
              "Full system view: lighting, audio, climate, cameras, shades",
            ],
            officialUrl: "https://www.control4.com/solutions/products/touchscreens",
            ctaHref: "/scheduling?service=control4",
          },
        },
        {
          label: "Keypads",
          hint: "Engraved scene keypads for guests, kids, and anyone without a phone",
          preview: {
            category: "Scene keypad",
            description:
              "Engraved on-wall keypads for the scenes the family actually uses — Welcome, Movie, Goodnight — so anyone can run the house without learning an app.",
            bestFit: "Guests, kids, housekeepers, and property managers — the people who need a one-button answer.",
            relatedTo: "Control surface · Control4",
            highlights: [
              "Engraved per-room scene labels",
              "Multiple finishes and gang configurations",
              "Pairs with Control4 Lux dimming and centralized lighting",
            ],
            officialUrl: "https://www.control4.com/solutions/products/keypads/",
            ctaHref: "/scheduling?service=control4",
          },
        },
        {
          label: "Controllers & remotes",
          hint: "Handheld smart remote and controllers for media rooms and theaters",
          preview: {
            category: "Smart remote / controller",
            description:
              "Handheld Control4 smart remote for media rooms and theaters — plus the controllers in the rack that run the local program for each zone.",
            bestFit: "Media rooms, theaters, and great rooms where the TV is the focus and a phone-only setup feels wrong.",
            relatedTo: "Control surface · Control4",
            highlights: [
              "Backlit handheld remote with system-wide control",
              "Controllers run scenes locally per zone",
              "Pairs with Sonos, Apple TV, receivers, and projectors",
            ],
            officialUrl: "https://www.control4.com/solutions/products/controllers",
            ctaHref: "/scheduling?service=control4",
          },
        },
      ],
    },
    {
      title: "Scenes & routines",
      description:
        "What the system actually does — the routines, scenes, and alerts the family lives with day to day.",
      items: [
        {
          label: "X4 Routines",
          hint: "Multi-step routines that chain lighting, AV, climate, and shades",
          preview: {
            category: "Automation engine",
            description:
              "X4 is Control4's routine engine — multi-step automations that chain lighting, AV, climate, security, and shades around real moments in the day.",
            bestFit:
              "Houses that want behavior, not just buttons — Goodmorning, Welcome, Movie, Goodnight tied to time, sun, occupancy, or events.",
            relatedTo: "Experience · Control4 OS 4",
            highlights: [
              "Triggers from time, sunrise/sunset, sensors, doors, voice, and keypads",
              "Conditional logic across multiple subsystems",
              "Personal favorites, alerts, and schedules per user",
            ],
            officialUrl: "https://www.control4.com/solutions/products/",
            ctaHref: "/scheduling?service=control4",
          },
        },
        { label: "Scenes", hint: "Welcome, Movie, Goodnight — engraved on a keypad" },
        { label: "Schedules", hint: "Time, sunrise/sunset, and conditional schedules" },
        { label: "Mockupancy", hint: "Records use and plays it back with randomization while you're away" },
        { label: "Motion sensors", hint: "Hands-free illumination in halls, baths, closets" },
        { label: "Favorites", hint: "Personal home-screen layouts per user" },
        { label: "Alerts", hint: "Push and in-app notifications for the events that matter" },
      ],
    },
    {
      title: "Connected categories",
      description:
        "Subsystems Control4 ties together under one interface — driver-supported and confirmed against the gear actually in the house.",
      items: [
        {
          label: "Audio & entertainment",
          href: "/services/audio-entertainment",
          hint: "Sonos, Denon, distributed audio, TVs, and projectors",
          preview: {
            category: "Connected category",
            description:
              "Sonos, Denon, distributed audio, TVs, and projectors all behave like one system — same favorites, same scenes, same remote.",
            bestFit: "Great rooms, kitchens, decks, and theaters that need to act as one when the family entertains.",
            relatedTo: "Connected category · Control4",
            highlights: [
              "Multi-zone audio with synchronized rooms",
              "Theaters and media rooms automated end-to-end",
              "Apple TV, Roku, cable, and streaming sources unified",
            ],
            ctaHref: "/services/audio-entertainment",
            ctaLabel: "See entertainment service",
          },
        },
        {
          label: "Climate",
          href: "/services/climate-control",
          hint: "Thermostats, mini-splits, and zoned HVAC",
          preview: {
            category: "Connected category",
            description:
              "Thermostats, mini-splits, and zoned HVAC all show up in the Control4 app and respond to scenes, schedules, and away modes.",
            bestFit: "Mountain homes with zoned heat and second-home owners who want temperature ready when they arrive.",
            relatedTo: "Connected category · Control4",
            highlights: [
              "Zoned setbacks tied to occupancy",
              "Pre-arrive warming for second homes",
              "Per-room comfort without per-room thermostats",
            ],
            ctaHref: "/services/climate-control",
            ctaLabel: "See climate service",
          },
        },
        {
          label: "Security",
          href: "/services/security-systems",
          hint: "Cameras, doorbells, and intrusion",
          preview: {
            category: "Connected category",
            description:
              "Cameras, video doorbells, smart locks, and intrusion panels — visible in the Control4 app and tied into routines like Goodbye and Goodnight.",
            bestFit: "Vacation rentals and second homes where remote eyes on the property matter every day.",
            relatedTo: "Connected category · Control4",
            highlights: [
              "Camera feeds in the app and on touchscreens",
              "Lock/unlock and intrusion arming from one place",
              "Push alerts for the events that matter",
            ],
            ctaHref: "/services/security-systems",
            ctaLabel: "See security service",
          },
        },
        {
          label: "Shades",
          href: "/services/shades",
          hint: "Motorized shades drawn into lighting scenes",
          preview: {
            category: "Connected category",
            description:
              "Motorized shades managed alongside lighting so afternoon sun, privacy, and view all behave themselves — drawn into the same scenes as Control4 lighting.",
            bestFit: "Mountain-facing great rooms and primary suites with strong afternoon sun.",
            relatedTo: "Connected category · Control4",
            highlights: [
              "Sun tracking and astronomic timeclock",
              "Per-zone privacy and blackout layers",
              "Pairs with lighting in a single scene",
            ],
            ctaHref: "/services/shades",
            ctaLabel: "See shade service",
          },
        },
        { label: "Locks & garage", hint: "Smart locks and gate/garage drivers where verified" },
        {
          label: "Networking",
          href: "/services/networking",
          hint: "Routers, switches, access points — the foundation under it all",
          preview: {
            category: "Foundation",
            description:
              "Enterprise-grade Wi-Fi, switches, and structured cabling — the foundation Control4 rides on. The system is only as reliable as the network underneath.",
            bestFit: "Houses with 30+ smart devices, work-from-home, and 4K streaming all happening at once.",
            relatedTo: "Foundation · Networking",
            highlights: [
              "Wi-Fi 6/6E coverage with no dead zones",
              "VLANs separating IoT, guest, and primary",
              "Wired backbone where it matters",
            ],
            ctaHref: "/services/networking",
            ctaLabel: "See networking service",
          },
        },
      ],
    },
    {
      title: "Ecosystem",
      href: "https://www.control4.com/solutions/catalog",
      external: true,
      description:
        "Voice and the wider ecosystem Control4 cooperates with.",
      items: [
        { label: "25,000+ compatible devices", href: "https://www.control4.com/solutions/catalog", external: true, hint: "Driver-supported third-party devices" },
        { label: "Alexa", hint: "Amazon Alexa voice control" },
        { label: "Google Assistant", hint: "Google Assistant voice control" },
        { label: "Apple HomeKit, CarPlay & Siri", hint: "Apple ecosystem integrations" },
      ],
    },
    {
      title: "Optional integrations",
      description:
        "Independent platforms Control4 can coexist with when a client already has them or specifically wants them — not required for a Control4 install.",
      items: [
        { label: "Lutron HomeWorks", href: "/platforms/lutron-homeworks", hint: "Optional pairing when a client wants Lutron-grade architectural lighting" },
        { label: "Lutron RadioRA3", href: "/platforms/lutron-radiora3", hint: "Optional pairing for finished-home retrofits already on RadioRA3" },
        { label: "AVA", href: "/platforms/ava", hint: "Optional single-remote layer for media rooms and theaters" },
        { label: "Sonos", hint: "Streaming audio under the Control4 app" },
      ],
    },
  ];

  const whyC4 = [
    {
      title: "One platform, every layer of the house",
      description:
        "A single interface — Control4 App, touchscreen, on-wall keypad, or smart remote — replaces a drawer of remotes and ten separate apps. Easy for family, friends, and you.",
    },
    {
      title: "Over 25,000 compatible devices",
      description:
        "Control4 is compatible with an ecosystem of over 25,000 third-party devices from the world's leading brands — your integrator can usually bring most of the gear already in the house into one platform.",
    },
    {
      title: "Personalized to how the house lives",
      description:
        "Every Control4 system is personalized by your integrator — automations, scenes, routines, widgets, favorites, and home-screen layouts tailored to the family's lifestyle.",
    },
    {
      title: "Private, secure, and reliable",
      description:
        "Professional hardware, wired backbone where it matters, local scenes that keep running when the internet hiccups, and remote access designed to be private and secure.",
    },
  ];

  const faqs = [
    {
      q: "Does Control4 have its own lighting, or do I need Lutron underneath?",
      a: "Control4 has its own native lighting line — Lux keypads, dimmers, switches, outlets, and centralized lighting modules — plus Vibrant Linear Lighting for tunable-white LED. A Control4 install does not require Lutron. Lutron is an option when a client already has it or specifically wants Lutron's keypad and dimming feel.",
    },
    {
      q: "Can Control4 and Lutron run together?",
      a: "Yes, but it is optional, not the default. Control4 and Lutron are independent platforms. We mix them when a homeowner already has Lutron in the walls or wants Lutron-grade architectural lighting alongside the rest of the Control4 system.",
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
      a: "Yes. Lights, keypads, scenes, routines, climate, and local audio all keep running locally. You lose remote app access from outside the house until the internet is back, but the house itself keeps working.",
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
        description="Control4 for Vail Valley homes — native Control4 lighting (Lux keypads, dimmers, centralized modules, Vibrant Linear), entertainment, security, and comfort on one platform. Control4 App, touchscreens, keypads, and smart remote. Compatible with 25,000+ third-party devices."
        keywords="Control4 Vail Valley, Control4 dealer Eagle County, Control4 lighting, Lux keypads, Vibrant Linear Lighting, Control4 installer"
        schema={[serviceSchema, faqSchema]}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Platforms", url: "/platforms" },
          { name: "Control4", url: "/platforms/control4" },
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
            Control4
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white hero-text-shadow">
            Whole-home lighting and control, one interface.
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl hero-subtext-shadow">
            The default for whole-home projects. Native Control4 lighting, scenes, audio, climate, security, and shades behind one app, one keypad family, and a smart remote.
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

      {/* 3. What Control4 Brings Together — right after hero */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            The Control4 Line
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
            One platform for lighting, entertainment, security, and comfort.
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-10 max-w-3xl">
            A personalized platform with its own native lighting line — Lux keypads, dimmers, switches, outlets, centralized modules, and Vibrant Linear LED — alongside audio, video, climate, locks, shades, and cameras. Controlled from the Control4 App, dedicated touchscreens, on-wall keypads, or a smart remote.
          </p>
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

      {/* 4. Best Fit */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Best Fit
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            Why families pick Control4.
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

      {/* 5. Control surfaces — system pieces */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Control Surfaces
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
            The Control4 App, plus every surface in the house.
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-8 max-w-3xl">
            Same personalized system on smartphones, dedicated touchscreens, on-wall keypads, and the Control4 smart remote — with favorites and home-screen layouts tailored to the family. Compatible with Amazon Alexa, Google Assistant, and Apple HomeKit (including CarPlay and Siri).
          </p>
          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            {[
              { title: "Control4 App on phone & tablet", description: "Quick access on iOS and Android — with Apple HomeKit, CarPlay, and Siri integration for the actions used every day." },
              { title: "Dedicated touchscreens", description: "In-wall and tabletop touchscreens for kitchens, primary bedrooms, and entry halls — the same personalized home screen, fixed in place." },
              { title: "On-wall keypads", description: "Engraved keypads for scenes, routines, and favorites — the interface for guests, kids, and anyone who does not want to pull out a phone." },
              { title: "Control4 smart remote", description: "A handheld designed for media rooms and theaters — entertainment sessions, lightning-fast source switching, and one-button TV on." },
            ].map((item, i) => (
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

      {/* 5b. The Control4 lineup */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" id="product-family-tree">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Your Options
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
            Explore what Control4 can include.
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-10 max-w-3xl">
            Control4 at the root, native lighting first, then control surfaces, scenes, and connected categories. Lutron and AVA appear only as optional integrations. Linked items open Control4's official product pages or an internal service page where available.
          </p>
          <ProductFamilyTree root={productFamilyRoot} groups={productFamilies} />
        </div>
      </section>

      {/* 6. Everyday Scenarios */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Everyday Scenarios
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            What the day looks like.
          </h2>
          <div className="space-y-4">
            {[
              { step: "01", title: "Goodmorning", description: "Primary bedroom keypad lights come up gently, bathroom floor heat is already on, kitchen music starts at low volume, shades rise with the sun." },
              { step: "02", title: "Goodbye/Away", description: "One tap on the kitchen keypad turns off lights, drops the thermostat setback, closes blinds in bright rooms, arms the alarm, and locks the doors." },
              { step: "03", title: "Welcome", description: "Front-door scene brings up entry, great room, and kitchen, fires up background music, and sets the right climate for the room — the house is already on when guests walk in." },
              { step: "04", title: "Movie/Relax", description: "One button on the smart remote dims the room, lowers the shades, drops the projector screen, powers the projector, and selects the right input." },
              { step: "05", title: "Goodnight", description: "Primary suite keypad shuts down the rest of the house — lights off, locks set, alarm armed, shades closed, primary bedroom lights fade to sleep." },
            ].map((item, i) => (
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

      {/* 7. How Symphony Sets It Up */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Personalized for Your Home
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            How a Control4 system fits your house.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

      {/* 8. Compare / Choose */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            Compare Platforms
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
            Control4, Lutron, or AVA?
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-8 max-w-3xl">
            Control4 is the default for whole-home projects — a full automation platform with its own native lighting. Lutron and AVA are independent platforms. Each can stand on its own; mixing is optional when it actually fits the home.
          </p>
          <div className="grid sm:grid-cols-2 gap-5 mb-6">
            <div className="bg-black/40 backdrop-blur-sm border border-accent/30 rounded-xl p-6">
              <p className="text-accent text-xs font-semibold uppercase tracking-wide mb-2">You are here · Default</p>
              <h3 className="text-white font-semibold text-lg mb-2">Control4</h3>
              <p className="text-white/55 text-sm leading-relaxed">
                One platform for lighting, entertainment, security, and comfort — with native Control4 lighting (Lux keypads, dimmers, centralized modules, Vibrant Linear). Controlled from the Control4 App, touchscreens, on-wall keypads, or smart remote.
              </p>
            </div>
            <Link
              to="/platforms/lutron-radiora3"
              className="group bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-6 hover:border-accent/30 transition-colors"
            >
              <p className="text-white/40 text-xs font-semibold uppercase tracking-wide mb-2">Alternative · Lutron lighting</p>
              <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-accent transition-colors">RadioRA3</h3>
              <p className="text-white/55 text-sm leading-relaxed mb-4">
                Lutron's wireless lighting and shade platform. Stands alone, or pairs with Control4 when a client already has it or wants the Lutron keypad feel.
              </p>
              <span className="inline-flex items-center gap-1 text-accent text-sm font-medium group-hover:gap-2 transition-all">
                Explore RadioRA3 <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
            <Link
              to="/platforms/lutron-homeworks"
              className="group bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-6 hover:border-accent/30 transition-colors"
            >
              <p className="text-white/40 text-xs font-semibold uppercase tracking-wide mb-2">Alternative · Architectural</p>
              <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-accent transition-colors">HomeWorks</h3>
              <p className="text-white/55 text-sm leading-relaxed mb-4">
                Lutron's flagship for architectural homes — Ketra, Lumaris, Palladiom, hand-crafted keypads. Optional pairing with Control4 when a client wants Lutron-grade lighting.
              </p>
              <span className="inline-flex items-center gap-1 text-accent text-sm font-medium group-hover:gap-2 transition-all">
                Explore HomeWorks <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
            <Link
              to="/platforms/ava"
              className="group bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl p-6 hover:border-accent/30 transition-colors"
            >
              <p className="text-white/40 text-xs font-semibold uppercase tracking-wide mb-2">Optional · Media remote</p>
              <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-accent transition-colors">AVA</h3>
              <p className="text-white/55 text-sm leading-relaxed mb-4">
                A single physical remote for media rooms and theaters. Stands alone, or sits alongside Control4 when one room needs a dedicated remote.
              </p>
              <span className="inline-flex items-center gap-1 text-accent text-sm font-medium group-hover:gap-2 transition-all">
                Explore AVA <ArrowRight className="w-3.5 h-3.5" />
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

      {/* FAQ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/20 backdrop-blur-sm border-y border-white/5">
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
      <section className="py-16 sm:py-24 px-4 sm:px-6">
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
                title: "Smart Lighting",
                description:
                  "How Control4 native lighting compares to Lutron — keypads, dimmers, scenes, and tunable-white LED.",
                path: "/services/smart-lighting",
              },
              {
                title: "Lutron HomeWorks",
                description:
                  "Lutron's architectural flagship — an alternative platform when a client specifically wants Lutron-grade lighting.",
                path: "/platforms/lutron-homeworks",
              },
              {
                title: "Lutron RadioRA3",
                description:
                  "Lutron's wireless line for finished-home retrofits — optional pairing with Control4 when it already exists in the house.",
                path: "/platforms/lutron-radiora3",
              },
              {
                title: "AVA Smart Remote",
                description:
                  "A single remote for media rooms and theaters. Stands alone or sits alongside Control4 in one room.",
                path: "/platforms/ava",
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