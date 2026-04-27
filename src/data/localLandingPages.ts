/**
 * High-intent local landing pages for SymphonySH.
 *
 * These pages target specific service + location queries (e.g., "Control4
 * lighting Vail Valley") and complement the broader city pages in cityPages.ts.
 *
 * Keep copy concise, factual, and product-focused. Don't invent project counts,
 * physical addresses, awards, or certifications beyond what's verified elsewhere
 * in the repo.
 */

export interface LocalLandingFAQ {
  q: string;
  a: string;
}

export interface LocalLandingPlatform {
  label: string;
  href: string;
  description?: string;
}

export interface LocalLandingPage {
  /** URL slug under /service-areas/. */
  slug: string;
  metaTitle: string;
  metaDescription: string;

  /** Short uppercase eyebrow above the H1. */
  eyebrow: string;
  /** Page H1. */
  headline: string;
  /** 1-2 sentence subheadline. */
  subheadline: string;

  /** "Best fit" — short sentences describing who this page is for. */
  bestFit: string[];

  /** Local mountain/second-home context paragraph. */
  localContext: string;

  /** Common local scenarios / details. */
  localScenarios: string[];

  /** Related platforms or services to link to. */
  relatedLinks: LocalLandingPlatform[];

  faqs: LocalLandingFAQ[];

  /** Optional CTA service tag passed through to /scheduling. */
  schedulingService?: string;
}

export const localLandingPages: LocalLandingPage[] = [
  {
    slug: "vail-smart-home-installation",
    metaTitle: "Smart Home Installation in Vail, CO",
    metaDescription:
      "Local smart home installation in Vail, Colorado. Pre-wire, Control4, Lutron lighting, audio, and networking — designed for ski-in/ski-out condos and Vail Village homes.",
    eyebrow: "Vail · Eagle County, Colorado",
    headline: "Smart home installation in Vail.",
    subheadline:
      "Pre-wire, Control4, Lutron, and networking — installed and tuned for the way Vail homes actually live.",
    bestFit: [
      "New construction in Vail Village, Lionshead, or East Vail that needs the wiring done right the first time.",
      "Vacation homes that have to be ready when the family lands — temperature, lighting, music, security.",
      "Ski-in/ski-out condos with stone, log, or thick-wall construction where consumer Wi-Fi falls apart.",
    ],
    localContext:
      "Vail homes range from slope-side condos to 10,000 sq ft mountain estates, and most of them sit at 8,000 ft+ with thick walls and long cable runs. Remote access is non-negotiable for second-home owners — temperature, security, lock state, and lighting visible from anywhere. We've worked these homes long enough to know which Wi-Fi placements survive a stone fireplace and which ones don't.",
    localScenarios: [
      "Pre-wire during framing — networking, lighting, audio, shades, security all planned with the GC.",
      "Vacation-home control: arrive scenes that warm the house, departure scenes that lock it down.",
      "Ski-in/ski-out condo retrofits where original wiring didn't anticipate streaming and remote work.",
      "Property-manager interfaces with limited controls for housekeepers and rental managers.",
      "Whole-home audio across great room, deck, primary suite, and outdoor spaces.",
    ],
    relatedLinks: [
      {
        label: "Control4",
        href: "/platforms/control4",
        description: "Whole-home automation across lighting, AV, climate, security.",
      },
      {
        label: "Lutron RadioRA3",
        href: "/platforms/lutron-radiora3",
        description: "Wireless lighting and shades — clean retrofits for condos.",
      },
      {
        label: "Pre-wire",
        href: "/services/prewire",
        description: "New-construction wiring planned with your GC.",
      },
      {
        label: "Networking",
        href: "/services/networking",
        description: "Wi-Fi 6/6E built for stone, log, and thick walls.",
      },
    ],
    faqs: [
      {
        q: "Do you work on Vail Village condos and ski-in/ski-out properties?",
        a: "Yes — these are some of our most common projects. Older condo construction often means we're running cable through tight chases and above drop ceilings, and we plan around HOA rules and building access. We've done enough of these to know what's possible without opening every wall.",
      },
      {
        q: "Can you set up the home so it's ready when we arrive?",
        a: "Yes. We program arrive scenes that warm the home, raise lighting on a path through the entry, and run music or fireplace before you walk in. Departure scenes hand the house back: lights off, shades closed, climate setback, alarm armed.",
      },
      {
        q: "Does Wi-Fi need a redesign for Vail homes?",
        a: "Almost always. Stone, logs, and timber-frame construction kill consumer mesh systems. We design with enterprise-grade Wi-Fi 6/6E access points placed for actual coverage, plus a wired backbone for the devices that need it.",
      },
      {
        q: "Do you handle service for systems other companies installed?",
        a: "Yes. Inherited Control4, Lutron, and AV systems are something we see often — we read the program off the controller, document it, fix what's broken, and hand the owner clean access.",
      },
    ],
    schedulingService: "vail-install",
  },
  {
    slug: "control4-lighting-vail-valley",
    metaTitle: "Control4 Lighting in Vail Valley",
    metaDescription:
      "Control4 lighting design, installation, and programming across the Vail Valley. Engraved keypads, scenes, and Lutron lighting tied into one Control4 program.",
    eyebrow: "Vail Valley · Eagle County",
    headline: "Control4 lighting in the Vail Valley.",
    subheadline:
      "Engraved keypads, scenes, and Lutron lighting — tied into one Control4 program across the whole house.",
    bestFit: [
      "Whole-home projects that want one app, one keypad family, and consistent dimming everywhere.",
      "Mountain homes where guests, kids, and housekeepers need a one-button answer.",
      "Houses already running Lutron HomeWorks or RadioRA3 that want Control4 to tie lighting in with media, climate, and security.",
    ],
    localContext:
      "Vail Valley homes mix premium fixtures, big great rooms, and primary suites that all want different lighting at different times of day. Control4 runs lighting natively for most homes; in houses that already use Lutron HomeWorks or RadioRA3, Control4 ties that lighting in with media, climate, and security so the family gets one program: Welcome, Movie, Goodnight, engraved on a keypad and matched on the phone.",
    localScenarios: [
      "Sunrise and sunset scenes scheduled on the astronomic clock — no phones at 6am.",
      "Engraved keypads at the entry, kitchen, primary suite, and theater room.",
      "Whole-home Goodnight that closes shades, sets exterior to a low security level, and arms the alarm.",
      "Vacation Mode that runs a lived-in pattern while the house is empty.",
      "Property-manager and housekeeper interfaces that only show the lights they need.",
    ],
    relatedLinks: [
      {
        label: "Control4 platform",
        href: "/platforms/control4",
        description: "Whole-home Control4 — lighting, AV, climate, security, shades.",
      },
      {
        label: "Lutron HomeWorks",
        href: "/platforms/lutron-homeworks",
        description: "Flagship lighting backbone with native Ketra and Lumaris.",
      },
      {
        label: "Lutron RadioRA3",
        href: "/platforms/lutron-radiora3",
        description: "Residential wireless lighting that pairs cleanly with Control4.",
      },
      {
        label: "Smart lighting service",
        href: "/services/smart-lighting",
        description: "Lighting design, install, programming.",
      },
    ],
    faqs: [
      {
        q: "Do you install Control4 keypads on top of Lutron lighting?",
        a: "All the time — that's our default for whole-home projects. Lutron HomeWorks or RadioRA3 handles the dimming and the lighting program; Control4 handles whole-home scenes, AV, climate, and shades. Engraved keypads can come from either side depending on the room.",
      },
      {
        q: "Can scenes still run if the internet goes down?",
        a: "Yes. Local scenes, schedules, and routines all run on the controller. Lutron is local. The only thing that pauses is remote access from outside the house, until the connection is back.",
      },
      {
        q: "Can we add Control4 lighting to a house that already has dimmers in the wall?",
        a: "Often, yes. We replace dimmers with Lutron-compatible models where needed and add keypads in the rooms that benefit most. Whole-home Control4 lighting works best when the underlying lighting platform is consistent — RadioRA3 or HomeWorks — so we'll plan around what's already there.",
      },
      {
        q: "What does Control4 lighting cost?",
        a: "A whole-home Control4 lighting program in the Vail Valley typically runs $20,000–$100,000+ depending on number of zones, fixture types, keypad finishes, and shade scope. We quote in writing after a walk-through.",
      },
    ],
    schedulingService: "control4-lighting",
  },
  {
    slug: "lutron-radiora3-vail-valley",
    metaTitle: "Lutron RadioRA3 in Vail Valley",
    metaDescription:
      "Lutron RadioRA3 lighting and shades for Vail Valley homes. Sunnata keypads, Lumaris downlights, Triathlon shades — installed and programmed by a local integrator.",
    eyebrow: "Vail Valley · Eagle County",
    headline: "Lutron RadioRA3 in the Vail Valley.",
    subheadline:
      "Wireless residential lighting from Lutron — Sunnata keypads, Lumaris fixtures, Triathlon shades, programmed by a local integrator.",
    bestFit: [
      "Residential whole-home lighting where you want Lutron quality without HomeWorks-scale wiring.",
      "Retrofits and clean condos where opening every wall isn't an option.",
      "Homes already on RadioRA2, RA2 Select, or older Lutron that need a modern, supported platform.",
    ],
    localContext:
      "RadioRA3 is Lutron's residential wireless line — built around the Clear Connect Type X mesh. For most Vail Valley homes, it's the right answer when the priority is Lutron-grade lighting and shade quality, fast retrofits, and a program that grows one room at a time. We migrate older Lutron systems and run new RadioRA3 programs across the valley.",
    localScenarios: [
      "Retrofitting older Lutron RadioRA2 or RA2 Select to RadioRA3 while keeping compatible Type A devices.",
      "Adding Lumaris downlights and tape to a primary suite or great room.",
      "Triathlon Select wire-free shades on rooms where running power isn't practical.",
      "Engraved Sunnata keypads at entries, kitchens, and bedside.",
      "Pico Paddle remotes for tabletop scene control without rewiring.",
    ],
    relatedLinks: [
      {
        label: "RadioRA3 platform",
        href: "/platforms/lutron-radiora3",
        description: "Full RadioRA3 product line and Lutron program details.",
      },
      {
        label: "Lutron HomeWorks",
        href: "/platforms/lutron-homeworks",
        description: "Flagship Lutron line for new construction and large architectural projects.",
      },
      {
        label: "Smart lighting service",
        href: "/services/smart-lighting",
        description: "Lighting design, install, programming.",
      },
      {
        label: "Motorized shades",
        href: "/services/shades",
        description: "Triathlon, Sivoia, and Palladiom shades.",
      },
    ],
    faqs: [
      {
        q: "How is RadioRA3 different from HomeWorks?",
        a: "RadioRA3 is Lutron's residential wireless line — Sunnata keypads, Lumaris lighting, Triathlon shades — up to 100 Type X devices per processor, 200 per system. HomeWorks is the flagship wired+wireless line with the full architectural fixture catalog (Ketra, Rania, Lumaris, Aviena) and Palladiom/Alisse keypads. Most homes do well on RadioRA3; bigger projects with a lighting designer go HomeWorks.",
      },
      {
        q: "Will my old RadioRA2 devices still work?",
        a: "Most of them. RadioRA3 supports legacy Type A devices, so RadioRA2 and RA2 Select keypads, dimmers, Pico remotes, and shades typically stay in place when we migrate. We confirm device compatibility during the walk-through.",
      },
      {
        q: "Does RadioRA3 work with Control4?",
        a: "Yes. RadioRA3 integrates cleanly under Control4 — we use this combination on most whole-home projects in the Vail Valley.",
      },
      {
        q: "Can RadioRA3 do tunable white?",
        a: "Yes. Lumaris downlights and tape are tunable-white 1,800K–4,000K, native to RadioRA3, and dim to 0.1%. No third-party bridge between the can and the keypad.",
      },
    ],
    schedulingService: "radiora3",
  },
  {
    slug: "smart-home-prewire-vail-valley",
    metaTitle: "Smart Home Pre-Wire for Vail Valley New Construction",
    metaDescription:
      "Smart home pre-wire for new construction across the Vail Valley. Networking, lighting, audio, shades, and security wiring planned with your GC and electrician.",
    eyebrow: "New construction · Vail Valley",
    headline: "Smart home pre-wire for Vail Valley new construction.",
    subheadline:
      "Networking, lighting, audio, shades, and security wiring planned with your GC and electrician — before drywall closes everything in.",
    bestFit: [
      "Custom homes in framing or rough-in stage — Edwards, Eagle, Vail, Beaver Creek, Avon.",
      "Major remodels where walls are already open and the wiring should be done right the second time.",
      "Builders and GCs who want a single integrator coordinating low-voltage instead of three subs.",
    ],
    localContext:
      "Pre-wire is one of the most common calls we get — especially in Edwards, Eagle Ranch, and Haymeadow where new construction is steady. The goal is straightforward: walk the house with the architect, GC, and electrician, lock down where the cable goes, and run it before drywall. The system that gets installed in five years sits on top of wiring done now.",
    localScenarios: [
      "Networking: Cat6/6A back to a central rack location, AP locations planned with stone and timber in mind.",
      "Lighting: Lutron HomeWorks or RadioRA3 panel, dimming, keypad locations, and gang-box prep.",
      "Audio: in-ceiling and in-wall speaker locations, subwoofer pre-wires, outdoor speaker conduit.",
      "Shades: power and signal pulled to every motorized window, pocket and bracket coordination.",
      "Security & cameras: door, window, and camera home-runs to the panel location.",
      "TVs and media rooms: power, HDMI conduits, and rack location for clean wall mounts.",
    ],
    relatedLinks: [
      {
        label: "Pre-wire service",
        href: "/services/prewire",
        description: "Full pre-wire scope, process, and what to expect.",
      },
      {
        label: "Networking",
        href: "/services/networking",
        description: "Wired backbone and Wi-Fi for new construction.",
      },
      {
        label: "Smart lighting",
        href: "/services/smart-lighting",
        description: "Lutron HomeWorks and RadioRA3 design.",
      },
      {
        label: "Home integration",
        href: "/services/home-integration",
        description: "Whole-home Control4 over the pre-wire.",
      },
    ],
    faqs: [
      {
        q: "When in the build should you come out for pre-wire?",
        a: "Right after rough-in is the sweet spot — framing complete, electrical and plumbing rough-in done, drywall not yet up. We walk the house with the GC and electrician, finalize device and panel locations, and pull cable. We can come earlier for high-level planning while drawings are still being finalized.",
      },
      {
        q: "Do we need to commit to a platform during pre-wire?",
        a: "Not entirely. Most pre-wire decisions (Cat6 to every TV, speaker locations, lighting panel space, shade power) work across Lutron, Control4, and AVA. We'll lock the pieces that depend on platform choice (lighting backbone, keypad gang-box prep) once the design is clear.",
      },
      {
        q: "Do you work directly with our builder and electrician?",
        a: "Yes. Pre-wire goes faster and cleaner when there's one conversation with the GC, electrician, and us. We bring drawings, mark device locations on plans, and coordinate trim-out timing.",
      },
      {
        q: "What does smart home pre-wire cost?",
        a: "Pre-wire scope and pricing depend on home size, lighting platform, audio zones, shade count, and camera count. For a Vail Valley custom build, pre-wire alone typically runs from a few thousand for small homes to tens of thousands for large architectural projects. We provide a written estimate after the design walk-through.",
      },
    ],
    schedulingService: "prewire",
  },
];
