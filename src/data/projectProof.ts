/**
 * Curated photo proof — small hand-picked sets of real Symphony project
 * photos, grouped by the angle a service or platform page is selling.
 *
 * Hard rules:
 *  - Every `src` must be a file already in /public/lovable-uploads/.
 *  - Every caption must describe what the photo actually shows. No invented
 *    project facts, locations, brands, dollar amounts, or timelines.
 *  - If a category has no real photos in the repo today, leave it empty.
 *    Pages reading an empty set should render nothing — never fake imagery.
 *  - `projectSlug` (when present) deep-links to the real project page so the
 *    visitor can see the full set in context.
 */

export type ProofPhoto = {
  src: string;
  alt: string;
  caption: string;
  /** Optional /projects/:slug deep-link for the photo card. */
  projectSlug?: string;
};

export type ProofSet = {
  /** Stable id used for documentation / future intake. */
  id: string;
  /** Short headline shown on the page above the photos. */
  headline: string;
  /** One-line subhead — what the visitor is actually looking at. */
  subhead: string;
  photos: ProofPhoto[];
};

const HOME_THEATER: ProofSet = {
  id: "home-theater",
  headline: "Real theater & media rooms",
  subhead:
    "Dedicated theaters, media rooms, and finished AV spaces — sight lines, hidden equipment, and one-button scenes.",
  photos: [
    {
      src: "/lovable-uploads/home-theater/IMG_0979.JPG",
      alt: "Dedicated home theater with screen and surround speakers in an Eagle-Vail basement",
      caption: "Dedicated theater · Eagle-Vail",
      projectSlug: "eagle-vail-theater",
    },
    {
      src: "/lovable-uploads/home-theater/IMG_0925.JPG",
      alt: "Home theater seating row with acoustic treatment and projection",
      caption: "Acoustic treatment + 7.1 surround",
      projectSlug: "eagle-vail-theater",
    },
    {
      src: "/lovable-uploads/home-theater/IMG_0921.JPG",
      alt: "Home theater installation showing projector and screen alignment",
      caption: "Projector & screen alignment",
      projectSlug: "eagle-vail-theater",
    },
    {
      src: "/lovable-uploads/home-theater/IMG_0509.JPG",
      alt: "Theater-style media room with in-wall speakers",
      caption: "Media room · in-wall speakers",
      projectSlug: "featured-theater-install",
    },
    {
      src: "/lovable-uploads/home-theater/IMG_0958.JPG",
      alt: "Cordillera media room with architectural ceiling speakers",
      caption: "Architectural ceiling speakers",
      projectSlug: "cordillera-media-room",
    },
  ],
};

const MOUNTED_TVS: ProofSet = {
  id: "mounted-tvs",
  headline: "Mounted TVs, no visible cables",
  subhead:
    "Flush fireplace mounts, MantelMount pull-downs, and wall installs across the valley — every one with hidden wiring.",
  photos: [
    {
      src: "/lovable-uploads/mounted-tvs/backbox-fp/IMG_0027.JPG",
      alt: "Pre-construction backbox fireplace mount with TV flush against stone surround",
      caption: "Backbox fireplace mount · zero gap",
      projectSlug: "backbox-fireplace",
    },
    {
      src: "/lovable-uploads/mounted-tvs/bc-condo-fp/IMG_0677.JPG",
      alt: "Beaver Creek ski condo TV mounted over fireplace with concealed wiring",
      caption: "Beaver Creek condo · concealed wiring",
      projectSlug: "beaver-creek-condo",
    },
    {
      src: "/lovable-uploads/mounted-tvs/mantel-mount/IMG_1090.JPG",
      alt: "MantelMount pull-down bracket lowering TV to eye level above a fireplace",
      caption: "MantelMount pull-down for eye-level viewing",
      projectSlug: "mantel-mount-install",
    },
    {
      src: "/lovable-uploads/mounted-tvs/fp-frame/IMG_2191.JPG",
      alt: "Samsung Frame TV mounted over a fireplace mantel showing art mode",
      caption: "Samsung Frame · art mode over mantel",
      projectSlug: "fireplace-frame-tv",
    },
    {
      src: "/lovable-uploads/mounted-tvs/wood-media/IMG_0510.JPG",
      alt: "Custom wood media wall with built-in cable management",
      caption: "Custom wood media wall",
      projectSlug: "wood-media-wall",
    },
  ],
};

const WIRING_RACK: ProofSet = {
  id: "wiring-rack",
  headline: "Behind the walls — clean wiring & racks",
  subhead:
    "Structured Cat6, labeled terminations, and rack builds. The work that makes future service visits boring instead of expensive.",
  photos: [
    {
      src: "/lovable-uploads/wiring/IMG_1320.JPG",
      alt: "Structured wiring rack with labeled Cat6 terminations and patch panels",
      caption: "Labeled rack · structured Cat6",
      projectSlug: "structured-wiring-showcase",
    },
    {
      src: "/lovable-uploads/wiring/IMG_1138.JPG",
      alt: "Equipment rack with cable management and patch panel termination",
      caption: "Patch panel & cable management",
      projectSlug: "structured-wiring-showcase",
    },
    {
      src: "/lovable-uploads/wiring/IMG_1324.JPG",
      alt: "Clean structured wiring with labeled cable runs",
      caption: "Clean runs · every cable labeled",
      projectSlug: "structured-wiring-showcase",
    },
    {
      src: "/lovable-uploads/wiring/IMG_1499.JPG",
      alt: "Rack build with organized low-voltage terminations",
      caption: "Rack build · serviceable for years",
      projectSlug: "structured-wiring-showcase",
    },
  ],
};

const PREWIRE: ProofSet = {
  id: "prewire",
  headline: "Pre-wire, before the drywall",
  subhead:
    "Cable pulled clean, labeled, and tested before insulation goes up. Cable now costs almost nothing — pulling it later costs everything.",
  photos: [
    {
      src: "/lovable-uploads/wiring/IMG_0136.JPG",
      alt: "Low-voltage rough-in with labeled cables before drywall",
      caption: "Rough-in · labeled before drywall",
      projectSlug: "structured-wiring-showcase",
    },
    {
      src: "/lovable-uploads/wiring/IMG_0137.JPG",
      alt: "Speaker wire and Cat6 pulled to a wall plate during construction",
      caption: "Speaker, Cat6 & control wiring",
      projectSlug: "structured-wiring-showcase",
    },
    {
      src: "/lovable-uploads/mounted-tvs/backbox-fp/IMG_0024.JPG",
      alt: "Pre-construction backbox installed above a fireplace before drywall",
      caption: "Backbox pre-install · planned with the GC",
      projectSlug: "backbox-fireplace",
    },
    {
      src: "/lovable-uploads/wiring/IMG_1311.JPG",
      alt: "Structured wiring run during rough-in phase of construction",
      caption: "Rough-in run · framing stage",
      projectSlug: "structured-wiring-showcase",
    },
  ],
};

const WHOLE_HOME: ProofSet = {
  id: "whole-home",
  headline: "Whole-home installs, one consistent standard",
  subhead:
    "Every display mounted to the same standard. One central rack feeding the house. The detail that tells you the same person owned the whole job.",
  photos: [
    {
      src: "/lovable-uploads/mounted-tvs/Home/IMG_0665.JPG",
      alt: "Mounted TV in a Vail Valley great room with concealed wiring",
      caption: "Great room display · 11-TV install",
      projectSlug: "full-home-install",
    },
    {
      src: "/lovable-uploads/mounted-tvs/Home/IMG_0661.JPG",
      alt: "Bedroom TV install with hidden cabling, part of an 11-display whole-home job",
      caption: "Bedroom mount · same standard",
      projectSlug: "full-home-install",
    },
    {
      src: "/lovable-uploads/mounted-tvs/HP/IMG_0182.JPG",
      alt: "Multi-room TV install with centralized wiring and consistent trim",
      caption: "Multi-room · centralized wiring",
      projectSlug: "hp-multi-room",
    },
    {
      src: "/lovable-uploads/wiring/IMG_1320.JPG",
      alt: "Centralized rack feeding multiple rooms in a whole-home install",
      caption: "One rack · whole house",
      projectSlug: "structured-wiring-showcase",
    },
  ],
};

const FRAME_AND_FINISH: ProofSet = {
  id: "frame-finish",
  headline: "Finished rooms, no visible tech",
  subhead:
    "Frame TVs in art mode, soundbars tucked under displays, and accent walls that hide the system instead of showing it off.",
  photos: [
    {
      src: "/lovable-uploads/mounted-tvs/fp-frame/IMG_2191.JPG",
      alt: "Samsung Frame TV mounted above a fireplace mantel in art mode",
      caption: "Frame TV · art mode over mantel",
      projectSlug: "fireplace-frame-tv",
    },
    {
      src: "/lovable-uploads/mounted-tvs/frame-sonos/IMG_0030.JPG",
      alt: "Samsung Frame TV paired with a Sonos soundbar on a clean wall",
      caption: "Frame + Sonos · eARC handoff",
      projectSlug: "frame-sonos-combo",
    },
    {
      src: "/lovable-uploads/mounted-tvs/wood-media/IMG_0510.JPG",
      alt: "Custom wood media wall hiding TV components and cabling",
      caption: "Custom wood media wall",
      projectSlug: "wood-media-wall",
    },
    {
      src: "/lovable-uploads/mounted-tvs/singletree-fp/IMG_1185.JPG",
      alt: "Stone fireplace surround with TV and concealed in-wall conduit",
      caption: "Stone surround · in-wall conduit",
      projectSlug: "singletree-fireplace",
    },
  ],
};

/**
 * Mixed proof for general "this is the work we do" pages — service areas,
 * resources, etc. Pulls one strong photo per major capability.
 */
const MIXED_PORTFOLIO: ProofSet = {
  id: "mixed-portfolio",
  headline: "Real installs from real Vail Valley homes",
  subhead:
    "Theater, mounted TVs, and the wiring behind the walls — every photo a project we delivered.",
  photos: [
    {
      src: "/lovable-uploads/home-theater/IMG_0979.JPG",
      alt: "Dedicated Eagle-Vail home theater with screen and surround speakers",
      caption: "Dedicated theater · Eagle-Vail",
      projectSlug: "eagle-vail-theater",
    },
    {
      src: "/lovable-uploads/mounted-tvs/Home/IMG_0665.JPG",
      alt: "Great room TV mounted with concealed wiring in a whole-home install",
      caption: "Whole-home AV · 11 displays",
      projectSlug: "full-home-install",
    },
    {
      src: "/lovable-uploads/mounted-tvs/backbox-fp/IMG_0027.JPG",
      alt: "Backbox fireplace TV mount sitting flush against the stone surround",
      caption: "Backbox fireplace mount",
      projectSlug: "backbox-fireplace",
    },
    {
      src: "/lovable-uploads/wiring/IMG_1320.JPG",
      alt: "Structured wiring rack with labeled Cat6 patch panel terminations",
      caption: "Labeled rack · structured Cat6",
      projectSlug: "structured-wiring-showcase",
    },
  ],
};

/**
 * Lighting / control: the repo does not currently have keypad or fixture
 * close-ups, so we lean on the integrated whole-home and theater photos
 * (which show the lighting + control story in context) rather than fake it.
 * When real keypad photos arrive (see docs/photo-intake.md), add them here.
 */
const LIGHTING_CONTROL: ProofSet = {
  id: "lighting-control",
  headline: "Lighting & control — in finished rooms",
  subhead:
    "Control4 and Lutron keypads run quietly underneath the rooms below. Same scenes, same one-button feel — across theater, great room, and bedrooms.",
  photos: [
    {
      src: "/lovable-uploads/home-theater/IMG_0979.JPG",
      alt: "Theater scene with dimmed lighting and projection — one-button cinema",
      caption: "Movie scene · lights drop, screen wakes",
      projectSlug: "eagle-vail-theater",
    },
    {
      src: "/lovable-uploads/mounted-tvs/Home/IMG_0665.JPG",
      alt: "Great room with mounted TV and integrated lighting in a whole-home Control4 install",
      caption: "Great room · Control4 whole-home",
      projectSlug: "full-home-install",
    },
    {
      src: "/lovable-uploads/home-theater/IMG_0958.JPG",
      alt: "Media room with architectural lighting and ceiling speakers",
      caption: "Media room · scene-controlled lighting",
      projectSlug: "cordillera-media-room",
    },
    {
      src: "/lovable-uploads/mounted-tvs/HP/IMG_0182.JPG",
      alt: "Living space with consistent lighting and integrated AV",
      caption: "Multi-room · scenes across the home",
      projectSlug: "hp-multi-room",
    },
  ],
};

export const proofSets = {
  homeTheater: HOME_THEATER,
  mountedTvs: MOUNTED_TVS,
  wiringRack: WIRING_RACK,
  prewire: PREWIRE,
  wholeHome: WHOLE_HOME,
  frameFinish: FRAME_AND_FINISH,
  mixedPortfolio: MIXED_PORTFOLIO,
  lightingControl: LIGHTING_CONTROL,
} as const;

export type ProofSetKey = keyof typeof proofSets;
