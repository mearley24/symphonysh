/**
 * High-intent educational guide pages under /resources.
 *
 * These are structured comparison/checklist pages — not blog essays. They
 * answer specific search queries ("Control4 vs Lutron lighting", "smart home
 * pre-wire checklist") and route readers to the right platform/service or
 * Setup Finder.
 *
 * Positioning rules:
 * - Control4 is the default whole-home lighting/control direction.
 * - Lutron HomeWorks/RadioRA3 are fit-based options for architectural/luxury
 *   Lutron, retrofits, or shade/lighting-specific scenarios.
 * - AVA is media/room/simple-remote, not a big-project default.
 * - Systems can stand alone; mixing is optional when it makes the home easier.
 *
 * Don't invent product specs, project counts, certifications, or claims that
 * aren't already supported elsewhere in the repo.
 */

export interface GuideRecommendation {
  /** Short label e.g. "Control4 lighting" or "Lutron RadioRA3". */
  label: string;
  /** One-sentence "fits when..." description. */
  fits: string;
  /** Optional internal link to a platform/service page. */
  href?: string;
}

export interface GuideComparisonRow {
  /** Row label (e.g. "Whole-home control", "Keypad styles"). */
  label: string;
  /** Cell text per column, in order matching `comparisonColumns`. */
  cells: string[];
}

export interface GuideChecklistGroup {
  title: string;
  items: string[];
}

export interface GuideRelatedLink {
  label: string;
  href: string;
  description?: string;
}

export interface GuideFAQ {
  q: string;
  a: string;
}

export interface ResourceGuide {
  /** URL slug under /resources/. */
  slug: string;

  /** Browser <title> (without site suffix). */
  metaTitle: string;
  metaDescription: string;

  /** Short uppercase eyebrow above the H1. */
  eyebrow: string;
  /** Page H1. */
  headline: string;
  /** 1-2 sentence subheadline that answers the search query. */
  subheadline: string;

  /** Card label on the hub page (defaults to headline if omitted). */
  hubLabel?: string;
  /** Card description on the hub page (defaults to subheadline if omitted). */
  hubDescription?: string;

  /** Quick recommendations / who-it-fits section. Two to four entries. */
  recommendations: GuideRecommendation[];

  /**
   * Optional comparison table. Use for vs/comparison guides.
   * `comparisonColumns` defines the headers; each row's `cells` matches.
   */
  comparisonColumns?: string[];
  comparisonRows?: GuideComparisonRow[];

  /**
   * Optional checklist groups. Use for prewire/setup-style guides.
   */
  checklist?: GuideChecklistGroup[];

  /**
   * "What to ask during a walkthrough" — short questions a homeowner or
   * builder should bring to the conversation.
   */
  walkthroughQuestions: string[];

  /** Related platform/service links. */
  relatedLinks: GuideRelatedLink[];

  /** FAQ entries (also emitted as FAQPage schema). */
  faqs: GuideFAQ[];

  /** Optional CTA service tag passed through to /scheduling. */
  schedulingService?: string;
}

export const resourceGuides: ResourceGuide[] = [
  {
    slug: "control4-vs-lutron-lighting",
    metaTitle: "Control4 Lighting vs Lutron Lighting: Which Fits Your Home?",
    metaDescription:
      "Control4 vs Lutron lighting compared in plain language: how each one handles whole-home control, keypads, shades, and the rest of the house. Picks by home type.",
    eyebrow: "Lighting comparison",
    headline: "Control4 lighting vs Lutron lighting.",
    subheadline:
      "Both can run a whole-home lighting system. The right one depends on whether lighting stands alone or needs to lead the rest of the house.",
    hubLabel: "Control4 vs Lutron lighting",
    hubDescription:
      "Comparison of Control4 lighting and Lutron lighting (RadioRA3 / HomeWorks) by use case, control style, and how they fit with the rest of the home.",
    recommendations: [
      {
        label: "Default whole-home: Control4 lighting",
        fits: "Lighting is one piece of a larger system — audio, video, climate, security, shades all in one app and one set of keypads.",
        href: "/platforms/control4",
      },
      {
        label: "Architectural/luxury Lutron: HomeWorks",
        fits: "Lighting and shades are the centerpiece, with custom Palladiom keypads, fade quality, and a designer aesthetic that drives the project.",
        href: "/platforms/lutron-homeworks",
      },
      {
        label: "Lighting-led mid-size: Lutron RadioRA3",
        fits: "A clean Lutron lighting system on its own — Sunnata keypads, Pico remotes, optional Triathlon shades — without going to HomeWorks scale.",
        href: "/platforms/lutron-radiora3",
      },
      {
        label: "Mix when it's simpler",
        fits: "Lutron handles the lighting and shades; Control4 ties in audio, video, climate, and security. Common pairing in larger Vail Valley homes.",
      },
    ],
    comparisonColumns: ["Topic", "Control4 lighting", "Lutron HomeWorks", "Lutron RadioRA3"],
    comparisonRows: [
      {
        label: "Best fit",
        cells: [
          "Whole-home control — lighting + audio + climate + security in one system.",
          "Architectural/luxury homes where lighting and shades drive the design.",
          "Mid-size lighting/shade projects without full HomeWorks scope.",
        ],
      },
      {
        label: "Keypads",
        cells: [
          "Configurable keypads tied to scenes across all subsystems.",
          "Palladiom, Alisse, and Architectural keypads with custom engraving and finishes.",
          "Sunnata keypads and Pico remotes — clean, residential.",
        ],
      },
      {
        label: "Scene quality",
        cells: [
          "Strong scene control across the whole home; one app, one keypad logic.",
          "Industry-leading fade and dim curves on architectural-grade lighting.",
          "Same Lutron fade quality on a smaller, residential platform.",
        ],
      },
      {
        label: "Shades",
        cells: [
          "Integrates Lutron, Hunter Douglas, and others under one app.",
          "Palladiom and Sivoia QS shades designed alongside the lighting.",
          "Triathlon and Triathlon Select battery shades for retrofit-friendly installs.",
        ],
      },
      {
        label: "Beyond lighting",
        cells: [
          "Audio, video, intercom, climate, security, networking — all native.",
          "Lighting/shades only — pair with another platform for AV/climate/security.",
          "Lighting/shades only — pair with another platform for AV/climate/security.",
        ],
      },
      {
        label: "When to pick it",
        cells: [
          "You want one system to run everything; lighting is part of a bigger picture.",
          "Lighting and shades are the project; budget and design favor architectural Lutron.",
          "You want Lutron quality on a focused lighting/shade scope.",
        ],
      },
    ],
    walkthroughQuestions: [
      "Will lighting stand alone, or does it need to coordinate with audio, climate, and security?",
      "How important are keypad finishes and engraving to the architect or designer?",
      "Are shades part of this project now, later, or never?",
      "Is this a new build with full pre-wire, or a retrofit where battery shades and wireless lighting matter?",
      "Who needs control — homeowners, family, property manager, housekeeper — and at what level?",
    ],
    relatedLinks: [
      {
        label: "Control4",
        href: "/platforms/control4",
        description: "Whole-home control — the default lead system for most projects.",
      },
      {
        label: "Lutron HomeWorks",
        href: "/platforms/lutron-homeworks",
        description: "Architectural Lutron for lighting- and shade-led homes.",
      },
      {
        label: "Lutron RadioRA3",
        href: "/platforms/lutron-radiora3",
        description: "Lutron lighting and shades on a focused, mid-size platform.",
      },
      {
        label: "Setup Finder",
        href: "/setup-finder",
        description: "Three quick questions to narrow the platform direction.",
      },
    ],
    faqs: [
      {
        q: "Can Control4 control Lutron lighting?",
        a: "Yes. Control4 integrates with Lutron RadioRA3 and HomeWorks, and can run lighting scenes from Control4 keypads, the Control4 app, or remotes. We use this combination often when a home wants Lutron lighting/shades and Control4 for everything else.",
      },
      {
        q: "Do I need Control4 if I already have Lutron?",
        a: "Only if you want the rest of the home — audio, video, climate, security, intercom — running together. Lutron lighting and shades stand on their own and can stay that way.",
      },
      {
        q: "Is Lutron lighting better than Control4 lighting?",
        a: "Lutron lighting hardware (especially HomeWorks) is widely regarded for its dim/fade quality and architectural keypads. Control4 lighting is excellent and integrates with the rest of the home natively. Which is 'better' depends on whether lighting is the project or one part of it.",
      },
      {
        q: "Can I start with one and add the other later?",
        a: "Yes. We routinely phase projects: lighting first, audio/climate later, or vice versa. Pre-wire (when possible) keeps the door open without committing to a specific platform on day one.",
      },
    ],
    schedulingService: "smart-lighting",
  },

  {
    slug: "radiora3-vs-homeworks",
    metaTitle: "RadioRA3 vs HomeWorks: Which Lutron System Fits?",
    metaDescription:
      "Lutron RadioRA3 vs HomeWorks compared: scope, keypads, shade options, and which one fits residential vs architectural projects in the Vail Valley.",
    eyebrow: "Lutron comparison",
    headline: "Lutron RadioRA3 vs HomeWorks.",
    subheadline:
      "RadioRA3 is the focused residential platform. HomeWorks is the architectural one. Both are Lutron — they just target different projects.",
    hubLabel: "RadioRA3 vs HomeWorks",
    hubDescription:
      "When to choose RadioRA3 vs HomeWorks for Lutron lighting and shades — by scope, keypad style, and design intent.",
    recommendations: [
      {
        label: "RadioRA3",
        fits: "Mid-size homes that want clean Lutron lighting and shade control with Sunnata keypads and Pico remotes — without HomeWorks-level architectural detail.",
        href: "/platforms/lutron-radiora3",
      },
      {
        label: "HomeWorks",
        fits: "Architect-led builds and luxury homes where Palladiom keypads, custom finishes, and full Lutron design coordination drive the project.",
        href: "/platforms/lutron-homeworks",
      },
    ],
    comparisonColumns: ["Topic", "RadioRA3", "HomeWorks"],
    comparisonRows: [
      {
        label: "Project scope",
        cells: [
          "Residential — typically up to several dozen lighting zones, lighting and shades-focused.",
          "Architectural/luxury — large lighting layouts and integrated shade designs across the whole home.",
        ],
      },
      {
        label: "Keypads",
        cells: [
          "Sunnata keypads and Pico remotes — clean, residential look.",
          "Palladiom, Alisse, and Architectural keypads with custom engraving and finish options.",
        ],
      },
      {
        label: "Shades",
        cells: [
          "Triathlon and Triathlon Select battery shades, Sivoia QS hardwired.",
          "Palladiom shades and Sivoia QS, designed with the lighting plan.",
        ],
      },
      {
        label: "Design coordination",
        cells: [
          "Standard residential Lutron — clean spec, less project overhead.",
          "Lutron design support, layered lighting plans, often coordinated with the architect/designer.",
        ],
      },
      {
        label: "Retrofit friendliness",
        cells: [
          "Strong — Pico remotes and battery shades are friendly to existing homes.",
          "Possible, but architectural keypad finishes and wired shade backboxes lean toward new construction or major remodels.",
        ],
      },
    ],
    walkthroughQuestions: [
      "Is the architect or designer specifying Lutron, or is this a homeowner-led decision?",
      "How important are custom keypad finishes and engraving?",
      "Are shades wired and planned, or retrofit/battery?",
      "Is this a new build, gut remodel, or finished home?",
      "Will the rest of the house (audio, climate, security) live in another platform like Control4?",
    ],
    relatedLinks: [
      {
        label: "Lutron RadioRA3",
        href: "/platforms/lutron-radiora3",
      },
      {
        label: "Lutron HomeWorks",
        href: "/platforms/lutron-homeworks",
      },
      {
        label: "Smart Lighting service",
        href: "/services/smart-lighting",
      },
      {
        label: "Setup Finder",
        href: "/setup-finder",
      },
    ],
    faqs: [
      {
        q: "Can a HomeWorks home use RadioRA3 keypads?",
        a: "No — HomeWorks and RadioRA3 are separate platforms. Pick the one that fits the project. We can talk through the trade-offs on a walkthrough.",
      },
      {
        q: "Do I need HomeWorks for a high-end home?",
        a: "Not necessarily. Plenty of high-end homes use RadioRA3 or Control4 lighting and look great. HomeWorks earns its place when the architectural keypads, finish detail, or integrated shade design specifically matter.",
      },
      {
        q: "Can either system pair with Control4?",
        a: "Yes. Both RadioRA3 and HomeWorks integrate with Control4, so the home can have Lutron lighting/shades and Control4 for audio, video, climate, and security.",
      },
    ],
    schedulingService: "smart-lighting",
  },

  {
    slug: "smart-home-prewire-checklist",
    metaTitle: "Smart Home Pre-Wire Checklist for New Construction",
    metaDescription:
      "A short, practical pre-wire checklist for new construction or major remodels — what to run, where, and when, before drywall closes up the walls.",
    eyebrow: "Pre-wire checklist",
    headline: "Smart home pre-wire checklist.",
    subheadline:
      "What to run, where, and when — so the home can grow into Control4, Lutron, audio, security, and shades without tearing walls back open.",
    hubLabel: "Smart home pre-wire checklist",
    hubDescription:
      "A short, practical pre-wire checklist for new construction and major remodels — what to plan before drywall.",
    recommendations: [
      {
        label: "New construction",
        fits: "Get the integrator on site before rough-in. Wiring, conduit, and backbox locations decided alongside the GC, electrician, and architect.",
      },
      {
        label: "Major remodel",
        fits: "Same principle — pre-wire whatever is open. Don't wait until drywall to make calls about lighting, shades, or audio.",
      },
      {
        label: "Phased build-out",
        fits: "Run the wires now, install the gear later. Keeps options open without committing to specific platforms on day one.",
      },
    ],
    checklist: [
      {
        title: "Networking",
        items: [
          "Cat6 (or Cat6A) home runs to every TV, AP location, equipment closet, and high-bandwidth device.",
          "At least one access point per ~1,500 sq ft on each level — more in homes with stone, log, or thick walls.",
          "Equipment closet with airflow, dedicated circuit, and Cat6 home runs terminating in a patch panel.",
          "Outdoor AP runs for decks, hot tubs, and detached structures if applicable.",
        ],
      },
      {
        title: "Audio and video",
        items: [
          "In-ceiling and in-wall speaker pre-wire to amplifier closet — even rooms that 'might' want music later.",
          "HDMI conduit from equipment closet to display locations (TVs, projectors).",
          "TV outlet boxes with Cat6 + power + low-voltage backbox.",
          "Subwoofer locations roughed in with speaker wire and a nearby outlet.",
        ],
      },
      {
        title: "Lighting and shades",
        items: [
          "Lighting panel/closet location decided with the electrician — Control4, RadioRA3, or HomeWorks panel space planned in.",
          "Keypad locations and gang sizes coordinated with the lighting designer.",
          "Shade pockets, headers, and power locations planned before drywall — battery shades are friendlier in retrofits.",
          "Low-voltage runs to keypads where required by the lighting platform.",
        ],
      },
      {
        title: "Climate, security, and outdoor",
        items: [
          "Thermostat locations on Cat5/Cat6 if running an integrated climate system.",
          "Camera locations roughed in with Cat6 — corners of the home, driveway, garage, deck, package zone.",
          "Door/window contact wiring and door-station locations planned with the security plan.",
          "Outdoor speakers, lighting control, and snowmelt/heat-trace control if applicable.",
        ],
      },
    ],
    walkthroughQuestions: [
      "When is drywall scheduled? Are we ahead of rough-in?",
      "Has the lighting designer or electrician seen a panel/keypad layout?",
      "Where will the equipment closet live — and is it ventilated?",
      "Do shades have headers and power planned, or are we going battery in retrofits?",
      "Is there a phased plan — wire now, install gear later — that we should design around?",
    ],
    relatedLinks: [
      {
        label: "Pre-Wire service",
        href: "/services/prewire",
        description: "How we run pre-wire on new builds and remodels.",
      },
      {
        label: "Networking service",
        href: "/services/networking",
      },
      {
        label: "Smart Lighting",
        href: "/services/smart-lighting",
      },
      {
        label: "Setup Finder",
        href: "/setup-finder",
        description: "Narrow the platform direction in a few questions.",
      },
    ],
    faqs: [
      {
        q: "When should the integrator get involved?",
        a: "Before rough-in is ideal. The earliest valuable conversation is at framing — once the GC, electrician, and integrator can walk the home and agree on cable paths, panel locations, and gang sizes.",
      },
      {
        q: "Can we pre-wire without picking a platform?",
        a: "Mostly, yes. Standard structured cable, speaker wire, HDMI conduit, and camera runs are platform-neutral. A few details — keypad gang sizes, lighting panel location, low-voltage runs — depend on the platform, so we narrow that direction during pre-wire.",
      },
      {
        q: "What's the cost difference between pre-wire and retrofit?",
        a: "Pre-wire is dramatically cheaper than retrofit — typically a fraction of the cost — because the walls are open and labor is a small fraction of finished trades. We don't quote in public, but the rule of thumb is real.",
      },
      {
        q: "Do you work with our GC and architect?",
        a: "Yes — that's the way most of our Vail Valley pre-wire projects run. We coordinate with the GC, electrician, lighting designer, and architect; we don't replace any of them.",
      },
    ],
    schedulingService: "prewire",
  },

  {
    slug: "second-home-smart-home-setup",
    metaTitle: "Smart Home Setup for a Second Home in Vail Valley",
    metaDescription:
      "Smart home setup for second homes in Vail and Eagle County — remote temperature, arrival/departure scenes, networking that survives stone walls, and what a property manager actually needs.",
    eyebrow: "Second-home setup",
    headline: "Smart home setup for a Vail Valley second home.",
    subheadline:
      "Second homes have a different brief than primary residences. The system needs to keep the house safe and ready when you're not there — and easy when you are.",
    hubLabel: "Second-home smart home setup",
    hubDescription:
      "What a smart home setup actually needs for a second home in Vail Valley — remote control, arrival scenes, and property-manager interfaces.",
    recommendations: [
      {
        label: "Default: Control4",
        fits: "One app for temperature, lighting, locks, music, cameras, shades — and a simple keypad layer the housekeeper or property manager can operate.",
        href: "/platforms/control4",
      },
      {
        label: "Lighting/shade-led: Lutron + Control4",
        fits: "Lutron RadioRA3 or HomeWorks for lighting and shades; Control4 for everything else. Common in larger second homes.",
        href: "/platforms/lutron-radiora3",
      },
      {
        label: "Media-room only: AVA",
        fits: "If the project is just a great room with a remote that anyone can use, AVA is often enough — without a whole-home system.",
        href: "/platforms/ava",
      },
    ],
    checklist: [
      {
        title: "Remote and arrival",
        items: [
          "Arrival scene that warms the house, brings up lights at sunset, opens shades to the view.",
          "Departure scene that locks doors, drops temperature, closes shades, arms the alarm.",
          "Remote temperature visibility — and an alert if it drops below a threshold.",
          "Notifications for door/window state, water leaks, and power outages.",
        ],
      },
      {
        title: "Property manager / housekeeper layer",
        items: [
          "Limited keypad controls — lights, music, simple climate — without full system access.",
          "PIN-coded lock access with logs, scoped per person.",
          "Camera views the property manager can see when checking on the home.",
          "Clear written instructions on the fridge or in a linked PDF.",
        ],
      },
      {
        title: "Networking that survives the property",
        items: [
          "Enterprise-grade Wi-Fi (not the ISP router) for streaming, cameras, and remote access.",
          "Multiple access points — log/stone/thick-wall homes need more coverage than spec sheets suggest.",
          "Wired backbone where possible. Wireless backhaul as a fallback, not a default.",
          "Cellular or LTE failover if the home loses internet during a storm.",
        ],
      },
    ],
    walkthroughQuestions: [
      "How often is the home occupied, and who's there when you're not?",
      "Does a property manager or housekeeper need their own controls?",
      "What's the worst-case scenario you want notifications for — frozen pipes, alarm, water?",
      "Are shades and lighting part of this project, or just AV/climate/security?",
      "Is there an existing system you'd like to keep, replace, or extend?",
    ],
    relatedLinks: [
      {
        label: "Control4",
        href: "/platforms/control4",
        description: "Whole-home control — usually the lead system for second homes.",
      },
      {
        label: "Lutron RadioRA3",
        href: "/platforms/lutron-radiora3",
      },
      {
        label: "Networking service",
        href: "/services/networking",
        description: "Wi-Fi that holds up to mountain construction.",
      },
      {
        label: "Vail service-area page",
        href: "/service-areas/vail-smart-home-installation",
      },
    ],
    faqs: [
      {
        q: "Can I see the home's temperature from anywhere?",
        a: "Yes — that's standard with Control4 and most modern climate platforms. We add alerts for low-temperature thresholds so you hear about a furnace problem before pipes freeze.",
      },
      {
        q: "Do you support property managers and housekeepers?",
        a: "Yes. We build limited-control interfaces for staff: lights, music, simple scenes, and PIN-coded lock access with logs — without giving full system access.",
      },
      {
        q: "Will my home Wi-Fi be enough?",
        a: "Usually no. Vail Valley homes — especially log, stone, or thick-wall builds at altitude — need enterprise-grade access points and a real wired backbone. Consumer ISP routers fall apart fast.",
      },
      {
        q: "We're remodeling — can we phase this?",
        a: "Yes. Pre-wire what's open now, install gear later. We design a path that doesn't lock you into a platform on day one.",
      },
    ],
    schedulingService: "home-integration",
  },

  {
    slug: "smart-shades-options",
    metaTitle: "Smart Shade Options: Triathlon, Palladiom, Sivoia QS",
    metaDescription:
      "Lutron smart shade options compared: Triathlon battery shades, Palladiom architectural shades, and Sivoia QS hardwired — plus how shades fit Control4 vs RadioRA3 vs HomeWorks.",
    eyebrow: "Shade options",
    headline: "Smart shade options.",
    subheadline:
      "Battery vs hardwired, retrofit vs new construction, architectural vs residential. Here's how the main Lutron shade families fit.",
    hubLabel: "Smart shade options",
    hubDescription:
      "Triathlon vs Palladiom vs Sivoia QS — which Lutron shade family fits your project, and how shades pair with Control4, RadioRA3, and HomeWorks.",
    recommendations: [
      {
        label: "Triathlon (battery)",
        fits: "Retrofit-friendly battery shades for finished homes — no shade power runs, no chases. Pair with RadioRA3 or HomeWorks.",
      },
      {
        label: "Triathlon Select (battery)",
        fits: "Triathlon with extended fabric and design options — still battery, still retrofit-friendly.",
      },
      {
        label: "Palladiom (architectural)",
        fits: "Architectural shades with exposed hardware design, paired with HomeWorks — used where shades are part of the room design itself.",
      },
      {
        label: "Sivoia QS (hardwired)",
        fits: "Hardwired Lutron shades for new construction or major remodels — pair with HomeWorks or RadioRA3.",
      },
    ],
    comparisonColumns: ["Family", "Power", "Best for", "Pairs with"],
    comparisonRows: [
      {
        label: "Triathlon",
        cells: [
          "Battery",
          "Finished homes, retrofits, fast install.",
          "RadioRA3, HomeWorks, Control4 (via Lutron).",
        ],
      },
      {
        label: "Triathlon Select",
        cells: [
          "Battery",
          "Retrofits with extended fabric/design options.",
          "RadioRA3, HomeWorks, Control4 (via Lutron).",
        ],
      },
      {
        label: "Palladiom",
        cells: [
          "Hardwired",
          "Architectural homes where shades are part of the design.",
          "HomeWorks (typical), Control4 (via Lutron).",
        ],
      },
      {
        label: "Sivoia QS",
        cells: [
          "Hardwired",
          "New builds and major remodels with planned headers and power.",
          "HomeWorks, RadioRA3, Control4 (via Lutron).",
        ],
      },
    ],
    walkthroughQuestions: [
      "Is this a new build with shade pockets and power planned, or a finished home?",
      "Are shades part of the room design (architectural), or functional (light/heat/privacy)?",
      "Does the lighting platform already exist, or are shades and lighting being chosen together?",
      "How tall and wide are the openings — do they need a specific motor or fabric?",
      "Is there a primary suite that needs scheduled morning/evening shade scenes?",
    ],
    relatedLinks: [
      {
        label: "Shades service",
        href: "/services/shades",
      },
      {
        label: "Lutron HomeWorks",
        href: "/platforms/lutron-homeworks",
      },
      {
        label: "Lutron RadioRA3",
        href: "/platforms/lutron-radiora3",
      },
      {
        label: "Control4",
        href: "/platforms/control4",
        description: "Run shade scenes alongside lighting, audio, and climate.",
      },
    ],
    faqs: [
      {
        q: "Battery or hardwired?",
        a: "Battery (Triathlon / Triathlon Select) is friendlier for retrofits — no power runs, no headers to rebuild. Hardwired (Palladiom, Sivoia QS) is the right call when the home is open and the design supports it.",
      },
      {
        q: "How long do battery shades last?",
        a: "Years of normal use per battery cycle, depending on size, frequency of operation, and motor. We size and configure shades so battery life is predictable, not a surprise.",
      },
      {
        q: "Can shades work with Control4?",
        a: "Yes. Lutron shades integrate with Control4, so a home can run Lutron shades alongside Control4 lighting, audio, climate, and security.",
      },
      {
        q: "Do I need HomeWorks to use Palladiom shades?",
        a: "Palladiom shades are most often paired with HomeWorks, but they can integrate with other Lutron systems. We confirm the right pairing during design.",
      },
    ],
    schedulingService: "shades",
  },

  {
    slug: "goodnight-scene-checklist",
    metaTitle: "What a Goodnight Scene Should Do",
    metaDescription:
      "A practical checklist for a 'Goodnight' scene in a smart home — what to turn off, what to lock, what to leave, and the small details that make it feel right every night.",
    eyebrow: "Scene design",
    headline: "What a Goodnight scene should do.",
    subheadline:
      "Press one button. The house goes to sleep the way you want — every time, without thinking.",
    hubLabel: "What a Goodnight scene should do",
    hubDescription:
      "A practical checklist for designing a Goodnight scene that locks the house down, sets the right lights, and respects the people still awake.",
    recommendations: [
      {
        label: "Default: a single Goodnight button",
        fits: "Bedside keypad, app button, or voice command — the house responds the same every time.",
      },
      {
        label: "Two-stage Goodnight",
        fits: "Some homes want 'Heading Up' (downstairs goes dark) and a separate 'Goodnight' (bedroom finalizes). Both fine.",
      },
      {
        label: "Per-bedroom variants",
        fits: "Primary, kids, guests can each have their own version — same idea, different details.",
      },
    ],
    checklist: [
      {
        title: "Turn off",
        items: [
          "Most interior lighting — kitchen, great room, hallways behind you.",
          "Audio and video that's still on (TVs, music, outdoor speakers).",
          "Outdoor entertainment lighting (deck, patio, pool).",
          "Fans or accent features that don't need to run overnight.",
        ],
      },
      {
        title: "Leave on (gently)",
        items: [
          "Path lights at low brightness — bathroom, hallway, stairs.",
          "Exterior security lights at the level you want overnight.",
          "Night-mode for cameras and motion alerts.",
          "Climate setbacks that match how you actually sleep.",
        ],
      },
      {
        title: "Lock down",
        items: [
          "All exterior doors locked.",
          "Garage doors closed and confirmed.",
          "Alarm armed to 'Stay' (or whatever your security setup uses overnight).",
          "Shades closed in the rooms where that matters — primary, street-facing windows.",
        ],
      },
      {
        title: "Respect the people still awake",
        items: [
          "Don't kill lighting in a room someone else is in.",
          "Don't shut down the audio if the kitchen still has a podcast going.",
          "Don't lock out a family member who came home late — use occupancy or a grace period.",
        ],
      },
    ],
    walkthroughQuestions: [
      "Where's the bedside trigger — keypad, phone, voice, or all three?",
      "Are there path lights you want at a specific brightness overnight?",
      "Is the alarm part of the scene, or a separate decision?",
      "Should kids' rooms or guest rooms have their own version?",
      "What's the rule for someone arriving home late — does Goodnight unwind, or hold?",
    ],
    relatedLinks: [
      {
        label: "Control4",
        href: "/platforms/control4",
        description: "Most flexible platform for whole-home scenes.",
      },
      {
        label: "Smart Lighting",
        href: "/services/smart-lighting",
      },
      {
        label: "Security Systems",
        href: "/services/security-systems",
      },
      {
        label: "Setup Finder",
        href: "/setup-finder",
      },
    ],
    faqs: [
      {
        q: "Do I need a full smart home for a Goodnight scene?",
        a: "No, but the more of the house lives on the same platform, the better the scene gets. Lighting + locks + thermostat + alarm + shades all responding together is what makes Goodnight feel right.",
      },
      {
        q: "Can the scene know if someone's still awake?",
        a: "Yes — with occupancy sensors or per-room overrides, the scene can skip rooms that are still in use. We tune that during programming based on how the family actually moves at night.",
      },
      {
        q: "Voice or keypad?",
        a: "Both work. Most clients keep a bedside keypad as the reliable button and use voice as a backup. Phones work too — they're just slower than a physical button at 11pm.",
      },
    ],
    schedulingService: "home-integration",
  },
];
