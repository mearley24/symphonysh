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
import ProductFamilyTree, {
  type ProductFamilyGroup,
} from "../../components/ProductFamilyTree";
import { schemaProviderLocalBusiness } from "../../constants/businessSchema";
import PageBackground from "../../components/PageBackground";
import ProjectProof from "../../components/ProjectProof";
import bgLighting from "../../assets/bg-lighting.jpg";

const LutronRadioRA3 = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Lutron RadioRA3 Installation & Programming",
    "provider": schemaProviderLocalBusiness,
    "description":
      "Lutron RadioRA3 — Clear Connect Type X (CCX) wireless mesh, Lumaris LED downlights and tape light, Triathlon Select smart shades, and Sunnata RF keypads — designed and programmed for Vail Valley homes.",
    "areaServed": "Vail Valley, Colorado",
  };

  const stats = [
    { label: "Platform", value: "Clear Connect Type X (CCX) — wireless mesh, independent of Wi-Fi" },
    { label: "Lighting", value: "Lumaris LED downlights, tape light, and tunable white" },
    { label: "Shades", value: "Triathlon Select wire-free roller shades — clean exposed roll" },
    { label: "Scale", value: "Up to 100 Type X devices per processor, 200 per system" },
  ];

  // The three product-line pillars of RadioRA3, per the page-flow spec.
  const pillars = [
    {
      icon: Radio,
      title: "Clear Connect Type X (CCX)",
      description:
        "RadioRA3 runs on Lutron's Clear Connect Type X wireless mesh — communicating independently of home Wi-Fi. Up to 100 Type X devices per processor and 200 per system, with backwards compatibility for most existing RadioRA2 / RA2 Select Type A devices.",
    },
    {
      icon: Lightbulb,
      title: "Lumaris LED lighting",
      description:
        "Native integration with Lumaris — downlights in 3\" and 4\" apertures (canless remodeler available), and Lumaris tape light (tunable white plus RGB + tunable white) purpose-built for RadioRA3 and HomeWorks. Tunable white from 1,800K to 4,000K, flicker-free dimming to 0.1%, 90+ CRI.",
    },
    {
      icon: Sun,
      title: "Triathlon Select smart shades",
      description:
        "A simplified smart-shade path that pairs cleanly with RadioRA3. Wire-free, battery-powered roller shades with a clean exposed roll, fixed standard sizes for fast quoting, ~15-minute installation, and roughly two-year average battery life on D-cells. Also compatible with HomeWorks and Caséta.",
    },
  ];

  // Other RadioRA3 capabilities, presented as the rest of the line.
  const moreCapabilities = [
    {
      icon: Sliders,
      title: "Sunnata RF keypads, dimmers & switches",
      description:
        "Sunnata RF Touch Dimmer with PRO LED+ Technology, Sunnata RF Switch, Sunnata RF 4-Speed Quiet Fan Control, and Sunnata RF keypads — available in 20+ colors with gloss and satin finishes, engraved per room.",
    },
    {
      icon: Sparkles,
      title: "Scenes on the wall",
      description:
        "Goodmorning, Goodbye/Away, Welcome, Movie/Relax, Goodnight — one engraved button on a Sunnata keypad takes the whole room to the right level, no app required.",
    },
    {
      icon: Smartphone,
      title: "Lutron app, schedules & voice",
      description:
        "The Lutron app on iPhone and Android, astronomic timeclock for sunrise/sunset, and voice through Alexa, Google, and Siri. Works inside the house and from the road.",
    },
    {
      icon: Layers,
      title: "Outdoor & accessories",
      description:
        "Outdoor Plug-in Switch for landscape and holiday loads, Lutron LED Tape Extrusions, Pico remotes, ceiling and wall sensors — every piece is part of the same RadioRA3 program.",
    },
  ];

  const bestFit = [
    {
      title: "Finished homes that want real lighting control",
      description:
        "Built on Clear Connect RF and starts as small as one room — keypads, dimmers, and shades drop in without opening walls or changing the power infrastructure.",
    },
    {
      title: "One room today, the whole house later",
      description:
        "Up to 100 Type X devices per processor, 200 per system. Add the kitchen this year, the primary suite next, the exterior after — all on the same program.",
    },
    {
      title: "Lumaris from the start",
      description:
        "Native integration with Lumaris downlights and tape light. No third-party bridges between the can and the keypad — tunable white and RGB live in the same scene.",
    },
    {
      title: "Older Lutron systems that have grown messy",
      description:
        "Most existing RadioRA2 and RA2 Select (Clear Connect Type A) devices stay supported alongside new Type X devices on a RadioRA3 processor — keep what works, modernize the rest.",
    },
  ];

  const productFamilyRoot = {
    label: "RadioRA3 Processor",
    sublabel: "Clear Connect Type X (CCX) wireless mesh",
    href: "https://www.lutron.com/en-US/products/pages/wholehomesystems/radiora3/overview.aspx",
    external: true,
    hint: "Up to 100 Type X devices per processor, 200 per system",
    preview: {
      category: "Wireless lighting processor",
      description:
        "RadioRA3 is Lutron's residential wireless lighting and shade platform — built around the Clear Connect Type X mesh that talks to every Sunnata, Pico, Triathlon, and Lumaris device in the house.",
      bestFit:
        "Residential whole-home lighting where you want Lutron quality without the wired infrastructure of HomeWorks.",
      relatedTo: "Lighting layer · Lutron",
      highlights: [
        "Up to 100 Type X devices per processor, 200 per system",
        "Cloud-connected, PC-programmable",
        "Sits cleanly under Control4 when the rest of the house wants automation",
      ],
      officialUrl:
        "https://www.lutron.com/en-US/products/pages/wholehomesystems/radiora3/overview.aspx",
      ctaHref: "/scheduling?service=radiora3",
    },
  };

  const productFamilies: ProductFamilyGroup[] = [
    {
      title: "Wall controls",
      description:
        "Sunnata RF dimmers, switches, fan control, and engraved keypads — plus Pico remotes for tabletop or wall use.",
      items: [
        {
          label: "Sunnata Keypads",
          hint: "Engraved scene keypads in 20+ colors and finishes",
          preview: {
            category: "Engraved scene keypad",
            description:
              "Sunnata RF keypads are the on-wall scene control for RadioRA3 — engraved with the scenes the family uses (Welcome, Movie, Goodnight) and finished to match the room.",
            bestFit:
              "Entries, kitchens, primary suites, and theaters where guests need a one-button answer instead of an app.",
            relatedTo: "Wall control · RadioRA3",
            highlights: [
              "20+ colors and finishes, custom engraving",
              "1, 2, 3, 4, 5, 7, and 10-button options",
              "LED feedback that follows the scene",
            ],
            officialUrl:
              "https://www.lutron.com/en-US/Products/Pages/SingleRoomControls/SunnataKeypads/Overview.aspx",
            ctaHref: "/scheduling?service=radiora3",
          },
        },
        {
          label: "Sunnata Dimmers & Switches",
          hint: "Touch Dimmer with PRO LED+, Touch Switch, companion devices, and 4-speed fan control",
          preview: {
            category: "Dimmer / switch",
            description:
              "Sunnata RF dimmers and switches replace a builder-grade switch in the same box — touch interface, smooth LED dimming, and full RadioRA3 integration.",
            bestFit: "Retrofits and new construction where the goal is Lutron-quality dimming on every load.",
            relatedTo: "Wall control · RadioRA3",
            highlights: [
              "Touch Dimmer with PRO LED+ technology",
              "Touch Switch and companion devices",
              "4-speed fan control",
            ],
            officialUrl:
              "https://www.lutron.com/en-US/Products/Pages/SingleRoomControls/SunnataDimmersAndSwitches/Overview.aspx",
            ctaHref: "/scheduling?service=radiora3",
          },
        },
        {
          label: "Pico Remotes",
          hint: "Tabletop or wall-mount paddle remotes",
          preview: {
            category: "Pico remote",
            description:
              "Pico is Lutron's tiny multi-function remote — used as a tabletop pedestal, in a wall plate without a junction box, or paddle-style for shades and scenes.",
            bestFit: "Bedside scenes, shade control, the room that 'needs one more button' without re-wiring.",
            relatedTo: "Wall control · RadioRA3",
            highlights: [
              "Tabletop pedestal or wall-mount in any spot",
              "Pico Paddle for shade open/close",
              "10-year battery, no wiring",
            ],
            officialUrl:
              "https://www.lutron.com/en-US/Products/Pages/Components/PicoWirelessControl/Overview.aspx",
            ctaHref: "/scheduling?service=radiora3",
          },
        },
      ],
    },
    {
      title: "Lighting",
      href: "https://www.lutron.com/en-US/Products/Pages/StandAloneControls/Lumaris/Overview.aspx",
      external: true,
      description:
        "Lumaris downlights and tape — natively integrated, no third-party bridge between the can and the keypad.",
      items: [
        {
          label: "Lumaris Downlights",
          hint: "3\" & 4\" downlights, tunable white 1,800K–4,000K, dim to 0.1%",
          preview: {
            category: "Architectural fixture",
            description:
              "Lumaris is Lutron's tunable-white downlight — natively integrated with RadioRA3 and HomeWorks. No third-party bridge between the can and the keypad.",
            bestFit:
              "Whole-home lighting plans that want warm dim, true 0.1% dimming, and a single platform from keypad to fixture.",
            relatedTo: "Lighting · RadioRA3 + HomeWorks",
            highlights: [
              "3\" and 4\" apertures",
              "Tunable white 1,800K–4,000K",
              "Smooth flicker-free dim to 0.1%",
            ],
            officialUrl:
              "https://www.lutron.com/us/en/lighting/downlights/lumaris-downlight?sku=cd6-wh-tw",
            ctaHref: "/scheduling?service=radiora3",
          },
        },
        {
          label: "Lumaris Tape Light",
          hint: "Linear tunable-white and RGB+TW tape for coves and toe-kicks",
          preview: {
            category: "Architectural tape",
            description:
              "Tunable-white and RGB+TW LED tape designed to drive cleanly off Lutron tape drivers — used in coves, toe-kicks, headboards, and stair lighting.",
            bestFit: "Architectural lighting moments where the tape is part of the design, not just an accent.",
            relatedTo: "Lighting · RadioRA3 + HomeWorks",
            highlights: [
              "Linear tunable-white and RGB+TW",
              "Aluminum extrusions for clean install",
              "Tuned with the same dimming curves as the rest of the house",
            ],
            officialUrl:
              "https://www.lutron.com/us/en/lighting/linear-tape-lights/tapelight?sku=lu-t30-tw-in",
            ctaHref: "/scheduling?service=radiora3",
          },
        },
        { label: "LED Tape Extrusions", hint: "Aluminum extrusions for Lumaris and other LED tape" },
        { label: "Outdoor Plug-in Switch", hint: "Outdoor-rated plug-in switch for landscape and holiday loads" },
      ],
    },
    {
      title: "Shades",
      href: "https://www.lutron.com/en-US/Products/Pages/ShadingSystems/Triathlon/Overview.aspx",
      external: true,
      description:
        "Wire-free Triathlon Select for fast retrofits, full-line Triathlon, and wired Sivoia QS for centralized projects.",
      items: [
        {
          label: "Triathlon Select",
          hint: "Wire-free, fixed sizes, ~2 yr battery life on D-cells",
          preview: {
            category: "Wire-free motorized shade",
            description:
              "Triathlon Select is the wire-free, fixed-size Lutron shade — battery powered, drops in fast, and integrates natively with RadioRA3.",
            bestFit:
              "Retrofits and rooms where running power to the headrail isn't practical, but Lutron-grade quality still matters.",
            relatedTo: "Shades · RadioRA3 + HomeWorks",
            highlights: [
              "Wire-free, ~2 yr battery life on D-cells",
              "Fixed sizes for fast lead time",
              "Native integration with RadioRA3",
            ],
            officialUrl:
              "https://www.lutron.com/en-US/Products/Pages/ShadingSystems/Triathlon/Overview.aspx",
            ctaHref: "/scheduling?service=radiora3",
          },
        },
        {
          label: "Triathlon",
          hint: "Full-line battery or hardwired Triathlon",
          preview: {
            category: "Battery or hardwired shade",
            description:
              "The full Triathlon line — custom sizing, battery or hardwired, the same Lutron shade quality across every opening in the house.",
            bestFit: "Whole-home shade plans where openings need custom sizing and consistent quiet motion.",
            relatedTo: "Shades · RadioRA3 + HomeWorks",
            highlights: [
              "Custom widths and heights",
              "Battery or hardwired",
              "Quiet motion, dependable repeatability",
            ],
            officialUrl:
              "https://www.lutron.com/en-US/Products/Pages/ShadingSystems/Triathlon/Overview.aspx",
            ctaHref: "/scheduling?service=radiora3",
          },
        },
        { label: "Sivoia QS", hint: "Wired QS shading system, compatible with RadioRA3 via integration" },
      ],
    },
    {
      title: "Scenes & automation",
      description:
        "The pieces that make the program quiet — sunrise/sunset, occupancy, vacation patterns.",
      items: [
        { label: "Lutron App", href: "https://www.lutron.com/en-US/Products/Pages/Apps/LutronApp/Overview.aspx", external: true, hint: "iOS & Android, programmed via Lutron's cloud designer" },
        { label: "Astronomic Timeclock", hint: "Sunrise/sunset scheduling built into RadioRA3" },
        { label: "Vacation Mode", hint: "Lived-in pattern while the family is away" },
        { label: "Occupancy & Vacancy Sensors", hint: "Ceiling and wall-mount Lutron sensors" },
      ],
    },
    {
      title: "Compatibility & integrations",
      description:
        "Existing Lutron gear and the wider smart-home stack — handled through Lutron's app and supported integrations.",
      items: [
        { label: "Type A legacy devices", hint: "Most RadioRA2 and RA2 Select devices stay supported on a RadioRA3 processor" },
        { label: "Alexa", hint: "Amazon Alexa voice control" },
        { label: "Google Assistant", hint: "Google Assistant voice control" },
        { label: "Apple Siri", hint: "Voice control through HomeKit" },
        { label: "Control4", href: "/platforms/control4", hint: "RadioRA3 integrates cleanly under Control4" },
      ],
    },
  ];

  const everydayScenes = [
    {
      step: "01",
      title: "Goodmorning",
      description:
        "Bathroom warms up gently, kitchen lights come to a friendly level, pathway and exterior fade as the sun rises over the valley. Sunrise/sunset on the astronomic clock — no tapping, no app.",
    },
    {
      step: "02",
      title: "Goodbye/Away",
      description:
        "One tap on the way out the door. The house goes dark, Vacation Mode keeps the exterior on a lived-in pattern, and the Lutron app shows the state of every room from anywhere.",
    },
    {
      step: "03",
      title: "Welcome",
      description:
        "Front-door keypad brings the entry, great room, and kitchen to the right level — guests walk into a house that already feels lived-in, not a dark foyer fumbling for switches.",
    },
    {
      step: "04",
      title: "Movie/Relax",
      description:
        "Great-room scene drops the cans, holds the wall sconces low, brings Triathlon shades down, and leaves a step-light on for the kitchen run.",
    },
    {
      step: "05",
      title: "Goodnight",
      description:
        "Primary suite keypad shuts the house down — interior lights off, exterior on a low security level, shades closed, primary bedroom fades to sleep.",
    },
  ];

  const symphonyProcess = [
    {
      icon: Sliders,
      title: "Dimmers matched to fixtures",
      description:
        "Every LED, low-voltage strip, and Lumaris tape extrusion gets the Sunnata RF model that drives it cleanly — flicker-free dimming all the way down to 0.1% on Lumaris.",
    },
    {
      icon: Layers,
      title: "Engraved keypads",
      description:
        "Sunnata RF keypads chosen in the room's color and finish, engraved with the scenes the family actually uses — Goodmorning, Welcome, Movie, Goodnight.",
    },
    {
      icon: Network,
      title: "Cloud-connected programming",
      description:
        "RadioRA3 is cloud-connected and PC-programmable. Schedules, scenes, sunrise/sunset, and Vacation Mode get tuned in software, then refined after the family lives with it.",
    },
    {
      icon: Wrench,
      title: "Service & migrate older Lutron systems",
      description:
        "RadioRA2, RA2 Select, RadioRA Classic, or HomeWorks QS Illumination that has grown tired — we migrate to RadioRA3 while keeping compatible Type A devices in place.",
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
        title="Lutron RadioRA3 — Clear Connect Type X, Lumaris & Triathlon Select"
        description="Lutron RadioRA3 in the Vail Valley — Clear Connect Type X (CCX) wireless mesh independent of Wi-Fi, Lumaris LED downlights and tape light, Triathlon Select smart shades, and Sunnata RF keypads. Native integration, no third-party bridges."
        keywords="RadioRA3 Vail Valley, Clear Connect Type X, CCX, Lumaris LED, Triathlon Select shades, Sunnata RF keypads, Lutron wireless lighting Eagle County"
        canonicalUrl="https://symphonysh.com/platforms/lutron-radiora3"
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
            Lutron's wireless line for the way homes actually live.
          </h1>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl hero-subtext-shadow">
            RadioRA3 is built on Clear Connect Type X (CCX) — Lutron's wireless mesh that runs independent of Wi-Fi — and natively drives Lumaris LED lighting (downlights and tape) and Triathlon Select smart shades from Sunnata RF keypads.
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

      {/* 3. The RadioRA3 Line — three product pillars */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            The RadioRA3 Line
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
            One platform, one keypad, three product families.
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-10 max-w-3xl">
            RadioRA3 is Lutron's residential wireless platform. The line pairs the Clear Connect Type X (CCX) wireless mesh with Lumaris LED lighting and Triathlon Select smart shades — all natively integrated, all programmed and tuned together so a single Sunnata RF keypad runs the whole room.
          </p>
          <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
            {pillars.map((item, i) => (
              <div
                key={i}
                className="bg-black/40 backdrop-blur-sm border border-accent/30 rounded-xl p-6"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-white font-semibold text-base mb-2">
                  {item.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-3">
            Plus the rest of the line
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {moreCapabilities.map((item, i) => (
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

      {/* 5. The RadioRA3 lineup */}
      <section className="py-16 sm:py-24 px-4 sm:px-6" id="product-family-tree">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            The Lineup
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
            Explore what RadioRA3 can include.
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl">
            The processor sits at the top — every branch below it runs on the same Lutron program. Linked items open Lutron's official product pages where available; not every piece needs a link.
          </p>
          <ProductFamilyTree root={productFamilyRoot} groups={productFamilies} />
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
            Designed for Your Home
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            How a RadioRA3 system actually fits your house.
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
            RadioRA3 is built around the Clear Connect Type X wireless mesh, with Lumaris LED lighting and Triathlon Select shades. It scales from one room to a whole home with paired processors. HomeWorks is Lutron's flagship — full design freedom, the entire native catalog (Ketra, Lumaris, Rania, Palladiom), hand-crafted keypads, and a wired QS or Clear Connect wireless backbone that can expand to large architectural projects.
          </p>
          <div className="grid sm:grid-cols-2 gap-5 mb-6">
            <div className="bg-black/40 backdrop-blur-sm border border-accent/30 rounded-xl p-6">
              <p className="text-accent text-xs font-semibold uppercase tracking-wide mb-2">
                You are here
              </p>
              <h3 className="text-white font-semibold text-lg mb-2">RadioRA3</h3>
              <p className="text-white/55 text-sm leading-relaxed">
                Clear Connect Type X wireless mesh. Lumaris LED lighting. Triathlon Select shades. Up to 100 Type X devices per processor, 200 per system. Native, no third-party bridges.
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
                Lutron's flagship lighting & home-automation line. Full native catalog — Ketra, Lumaris, Rania, Palladiom, Aviena — with hand-crafted keypads and a wired QS or Clear Connect wireless backbone.
              </p>
              <span className="inline-flex items-center gap-1 text-accent text-sm font-medium group-hover:gap-2 transition-all">
                Explore HomeWorks <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-x-6 gap-y-2">
            <Link
              to="/setup-finder"
              className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:gap-3 transition-all"
            >
              Not sure which one? Try the Setup Finder <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/resources/radiora3-vs-homeworks"
              className="inline-flex items-center gap-2 text-white/60 hover:text-accent text-sm font-medium transition-colors"
            >
              Read: RadioRA3 vs HomeWorks <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Real-room proof */}
      <ProjectProof
        setKey="lightingControl"
        eyebrow="Lutron in finished rooms"
        headline="The kind of rooms RadioRA3 quietly runs."
        subhead="Theater, great room, media room, bedrooms — same scenes across the home, no app in hand. RadioRA3 retrofits cleanly into the same finished spaces."
        footerLink={{ to: "/projects", label: "Browse every project" }}
        variant="light"
      />

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
            See RadioRA3 in your own house.
          </h2>
          <p className="text-white/60 text-base mb-8 max-w-2xl mx-auto">
            Tell us the rooms you'd like on RadioRA3 — kitchen, primary, great room, exterior — plus any existing Lutron gear or Lumaris/Triathlon interest. We'll plan the dimmers, keypads, lighting, and shades around it.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="tel:+19705193013"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base w-full sm:w-auto"
            >
              Call About RadioRA3 <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/scheduling?service=radiora3"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-8 py-4 rounded-lg font-medium transition-colors text-base w-full sm:w-auto"
            >
              <Phone className="w-4 h-4" /> Schedule a Walkthrough
            </Link>
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
                  "Lutron's flagship line — full native catalog, hand-crafted keypads, wired QS or Clear Connect wireless.",
                path: "/platforms/lutron-homeworks",
              },
              {
                title: "Control4 Automation",
                description:
                  "When lighting, audio, climate, security, and shades should all live behind one interface.",
                path: "/platforms/control4",
              },
              {
                title: "Triathlon Select Shades",
                description:
                  "Wire-free, battery-powered roller shades with a clean exposed roll — paired natively with RadioRA3.",
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
