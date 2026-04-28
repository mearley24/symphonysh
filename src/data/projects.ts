/**
 * Real project portfolio for Symphony Smart Homes.
 *
 * Ordering rule: strongest / most visually saleable projects first. The
 * homepage "Featured Projects" component reads the first three entries and
 * the /projects page respects this order for the default filter. Put the
 * work you want Vail Valley homeowners and builders to see first at the top.
 *
 * Do not add speculative or stock projects — every entry must reference real
 * photos under public/lovable-uploads/. If a project has only one or two
 * weak photos, deprioritise it (don't fabricate).
 */

export interface Project {
  slug: string;
  name: string;
  location: string;
  categories: string[];
  scope: string;
  description: string;
  photos: string[];
  heroPhoto: string;
  systemsInstalled?: string[];
  /**
   * Service / platform pages this project demonstrates. Used by
   * ProjectDetail to render an internal cross-link block. Only include
   * services the project actually proves — do not pad. Each entry is a
   * route path that already exists in the app (no invented routes).
   */
  relatedServices?: { to: string; label: string; reason: string }[];
  /** Real client quote or null. Never invent. */
  testimonial?: {
    quote: string;
    author: string;
    title: string;
  } | null;
}

export const projects: Project[] = [
  // ---- Lead projects (strongest on the homepage) --------------------------
  {
    slug: "eagle-vail-theater",
    name: "Eagle-Vail Home Theater",
    location: "Eagle-Vail, CO",
    categories: ["theater", "media-room", "whole-home", "control4", "lighting"],
    scope:
      "Dedicated home theater build — acoustic treatment, projection, surround sound, Control4.",
    description:
      "A dedicated theater room carved from an existing basement. Acoustic panels, a short-throw projector, 7.1 surround sound, and full Control4 integration for a one-button cinema experience. Lighting scenes dim automatically when you press Play.",
    heroPhoto: "/lovable-uploads/home-theater/IMG_0979.JPG",
    photos: [
      "/lovable-uploads/home-theater/IMG_0920.JPG",
      "/lovable-uploads/home-theater/IMG_0921.JPG",
      "/lovable-uploads/home-theater/IMG_0925.JPG",
      "/lovable-uploads/home-theater/IMG_0926.JPG",
      "/lovable-uploads/home-theater/IMG_0979.JPG",
      "/lovable-uploads/home-theater/IMG_0981.JPG",
      "/lovable-uploads/home-theater/IMG_0982.JPG",
    ],
    systemsInstalled: [
      "Surround Sound (7.1)",
      "Short-Throw Projection",
      "Acoustic Treatment",
      "Control4 Automation",
      "Lighting Scenes",
    ],
    relatedServices: [
      { to: "/services/ava", label: "AVA — Media Room First", reason: "Single-room theater & media experience" },
      { to: "/services/home-integration", label: "Home Integration", reason: "Whole-home AV under one system" },
      { to: "/services/control4", label: "Control4", reason: "One-button cinema scenes & automation" },
      { to: "/services/smart-lighting", label: "Smart Lighting", reason: "Scene-based dim on Play" },
    ],
    testimonial: null,
  },
  {
    slug: "full-home-install",
    name: "Full-Home AV Install",
    location: "Vail Valley, CO",
    categories: ["whole-home", "tv-mounting"],
    scope:
      "Eleven displays, centralized rack, consistent mounting standard throughout the home.",
    description:
      "A comprehensive residential AV installation with TVs in every major room. From the great room to the guest bedrooms, each display was mounted to the same standard — concealed wiring, proper blocking behind drywall, and clean low-voltage plates. One rack feeds the entire house.",
    heroPhoto: "/lovable-uploads/mounted-tvs/Home/IMG_0665.JPG",
    photos: [
      "/lovable-uploads/mounted-tvs/Home/71355776563__D3C0B111-3E4E-4B32-A4BB-7B60F151C39A.JPG",
      "/lovable-uploads/mounted-tvs/Home/IMG_0659.JPG",
      "/lovable-uploads/mounted-tvs/Home/IMG_0660.JPG",
      "/lovable-uploads/mounted-tvs/Home/IMG_0661.JPG",
      "/lovable-uploads/mounted-tvs/Home/IMG_0662.JPG",
      "/lovable-uploads/mounted-tvs/Home/IMG_0663.JPG",
      "/lovable-uploads/mounted-tvs/Home/IMG_0664.JPG",
      "/lovable-uploads/mounted-tvs/Home/IMG_0665.JPG",
      "/lovable-uploads/mounted-tvs/Home/IMG_0666.JPG",
      "/lovable-uploads/mounted-tvs/Home/IMG_0668.JPG",
      "/lovable-uploads/mounted-tvs/Home/IMG_0669.JPG",
    ],
    systemsInstalled: [
      "Multi-Room TV (11 displays)",
      "Concealed Wiring",
      "Drywall Blocking",
      "Low-Voltage Plates",
    ],
    relatedServices: [
      { to: "/services/home-integration", label: "Home Integration", reason: "Whole-home AV from one rack" },
      { to: "/services/prewire", label: "Pre-Wire", reason: "Concealed wiring & blocking standard" },
      { to: "/services/networking", label: "Networking & Rack", reason: "Centralized rack feeding the home" },
    ],
    testimonial: null,
  },
  {
    slug: "backbox-fireplace",
    name: "Backbox Fireplace Mount",
    location: "Eagle County, CO",
    categories: ["tv-mounting", "prewire"],
    scope:
      "Pre-construction backbox install for a flush fireplace TV mount — zero visible cable, zero gap.",
    description:
      "A pre-construction backbox installation above a fireplace — the TV sits perfectly flush against stone with zero gap. All power, HDMI, and network cabling routed through the backbox before drywall went up. This is how it's supposed to be done.",
    heroPhoto: "/lovable-uploads/mounted-tvs/backbox-fp/IMG_0027.JPG",
    photos: [
      "/lovable-uploads/mounted-tvs/backbox-fp/IMG_0024.JPG",
      "/lovable-uploads/mounted-tvs/backbox-fp/IMG_0025.JPG",
      "/lovable-uploads/mounted-tvs/backbox-fp/IMG_0026.JPG",
      "/lovable-uploads/mounted-tvs/backbox-fp/IMG_0027.JPG",
      "/lovable-uploads/mounted-tvs/backbox-fp/IMG_0028.JPG",
      "/lovable-uploads/mounted-tvs/backbox-fp/IMG_0029.JPG",
    ],
    systemsInstalled: ["Backbox Pre-Install", "Flush TV Mount", "In-Wall Wiring"],
    relatedServices: [
      { to: "/services/prewire", label: "Pre-Wire", reason: "Backbox set before drywall" },
      { to: "/services/home-integration", label: "Home Integration", reason: "Flush TV mount integrated with the room" },
    ],
    testimonial: null,
  },

  // ---- Strong secondary proof --------------------------------------------
  {
    slug: "structured-wiring-showcase",
    name: "Structured Wiring — Behind the Scenes",
    location: "Vail Valley, CO",
    categories: ["wiring", "networking", "rack", "prewire"],
    scope:
      "Rack builds, labeled cable runs, and structured cabling across multiple Vail Valley jobs.",
    description:
      "A showcase of structured wiring and rack builds across multiple projects. Clean cable runs, labeled terminations, proper rack organization, and cable management that makes future service visits simple. This is the work that happens behind the walls — and the reason your system stays serviceable for years.",
    heroPhoto: "/lovable-uploads/wiring/IMG_1138.JPG",
    photos: [
      "/lovable-uploads/wiring/IMG_1138.JPG",
      "/lovable-uploads/wiring/IMG_1320.JPG",
      "/lovable-uploads/wiring/IMG_1324.JPG",
      "/lovable-uploads/wiring/IMG_1323.JPG",
      "/lovable-uploads/wiring/IMG_1322.JPG",
      "/lovable-uploads/wiring/IMG_0136.JPG",
      "/lovable-uploads/wiring/IMG_0137.JPG",
      "/lovable-uploads/wiring/IMG_0578.JPG",
      "/lovable-uploads/wiring/IMG_1499.JPG",
      "/lovable-uploads/wiring/IMG_1311.JPG",
      "/lovable-uploads/wiring/IMG_1313.JPG",
      "/lovable-uploads/wiring/71934397485__8C49F301-AD94-46A1-86EB-A779999B757F.JPG",
      "/lovable-uploads/wiring/IMG_0611.JPG",
      "/lovable-uploads/wiring/IMG_1552.JPG",
      "/lovable-uploads/wiring/IMG_1733.JPG",
      "/lovable-uploads/wiring/IMG_1161.JPG",
    ],
    systemsInstalled: [
      "Cat6 Structured Cabling",
      "Rack Builds",
      "Cable Labeling",
      "Patch Panel Termination",
    ],
    relatedServices: [
      { to: "/services/prewire", label: "Pre-Wire", reason: "Structured cabling before drywall" },
      { to: "/services/networking", label: "Networking & Rack", reason: "Rack builds, patch panels, labeled runs" },
      { to: "/services/home-integration", label: "Home Integration", reason: "Foundation for whole-home control" },
    ],
    testimonial: null,
  },
  {
    slug: "fireplace-frame-tv",
    name: "Samsung Frame Over Fireplace",
    location: "Vail Valley, CO",
    categories: ["frame-tv", "tv-mounting"],
    scope: "Samsung Frame TV mounted over a fireplace mantel — art mode, zero visible tech.",
    description:
      "A Samsung Frame TV mounted above a fireplace mantel. When the TV is off, it displays curated artwork that blends into the room. One-Connect box hidden in a nearby closet with a single thin cable running to the display.",
    heroPhoto: "/lovable-uploads/mounted-tvs/fp-frame/IMG_2191.JPG",
    photos: [
      "/lovable-uploads/mounted-tvs/fp-frame/IMG_2189.JPG",
      "/lovable-uploads/mounted-tvs/fp-frame/IMG_2190.JPG",
      "/lovable-uploads/mounted-tvs/fp-frame/IMG_2191.JPG",
    ],
    systemsInstalled: [
      "Samsung Frame TV",
      "Art Mode",
      "One-Connect Box",
      "Concealed Wiring",
    ],
    relatedServices: [
      { to: "/services/audio-entertainment", label: "TV & Entertainment", reason: "Frame TV mount with concealed One-Connect" },
      { to: "/services/prewire", label: "Pre-Wire", reason: "Concealed cable run for a clean install" },
    ],
    testimonial: null,
  },
  {
    slug: "beaver-creek-condo",
    name: "Beaver Creek Ski Condo",
    location: "Beaver Creek, CO",
    categories: ["tv-mounting"],
    scope: "Fireplace TV mount with fully concealed wiring in a ski condo.",
    description:
      "A clean fireplace TV installation in a Beaver Creek ski condo. All wiring concealed behind the wall — no visible cables, no exposed conduit, no wall plates. Before-and-after photos tell the story.",
    heroPhoto: "/lovable-uploads/mounted-tvs/bc-condo-fp/IMG_0677.JPG",
    photos: [
      "/lovable-uploads/mounted-tvs/bc-condo-fp/70551934893__F08E6641-B90D-4FE9-96CB-B6043C9EFBB7.jpg",
      "/lovable-uploads/mounted-tvs/bc-condo-fp/70682259838__CA09AB38-91D5-434E-9D12-D8D3BEC77650.JPG",
      "/lovable-uploads/mounted-tvs/bc-condo-fp/70682261617__B029C99B-C48B-4344-B91B-06B9B4921F7C.JPG",
      "/lovable-uploads/mounted-tvs/bc-condo-fp/IMG_0610.JPG",
      "/lovable-uploads/mounted-tvs/bc-condo-fp/IMG_0677.JPG",
      "/lovable-uploads/mounted-tvs/bc-condo-fp/IMG_0678.JPG",
      "/lovable-uploads/mounted-tvs/bc-condo-fp/IMG_0679.JPG",
    ],
    systemsInstalled: ["TV Mounting", "Concealed Wiring", "Cable Management"],
    relatedServices: [
      { to: "/services/audio-entertainment", label: "TV & Entertainment", reason: "Fireplace TV mount, clean finish" },
      { to: "/service-areas", label: "Beaver Creek Service Area", reason: "Local condo work in Beaver Creek" },
    ],
    testimonial: null,
  },
  {
    slug: "mantel-mount-install",
    name: "MantelMount Pull-Down",
    location: "Avon, CO",
    categories: ["mantel-mount", "tv-mounting"],
    scope: "MantelMount pull-down bracket for a high fireplace TV — eye-level viewing on demand.",
    description:
      "A MantelMount pull-down bracket that lets the homeowner lower the TV from above the fireplace to eye level for comfortable viewing. When pushed back up, the TV sits flush above the mantel. Heat shield installed to protect the display.",
    heroPhoto: "/lovable-uploads/mounted-tvs/mantel-mount/IMG_1090.JPG",
    photos: [
      "/lovable-uploads/mounted-tvs/mantel-mount/70311390744__4AD111C8-188E-494E-84A7-03CB45F8EB0E.JPG",
      "/lovable-uploads/mounted-tvs/mantel-mount/IMG_1090.JPG",
      "/lovable-uploads/mounted-tvs/mantel-mount/IMG_1091.JPG",
      "/lovable-uploads/mounted-tvs/mantel-mount/IMG_1092.JPG",
      "/lovable-uploads/mounted-tvs/mantel-mount/IMG_1093.JPG",
      "/lovable-uploads/mounted-tvs/mantel-mount/IMG_1519.JPG",
    ],
    systemsInstalled: ["MantelMount MM540", "Heat Shield", "Concealed Wiring"],
    relatedServices: [
      { to: "/services/audio-entertainment", label: "TV & Entertainment", reason: "Pull-down mount for above-fireplace TVs" },
    ],
    testimonial: null,
  },
  {
    slug: "hp-multi-room",
    name: "Highland Park Multi-Room",
    location: "Eagle County, CO",
    categories: ["tv-mounting", "whole-home"],
    scope: "Multi-room TV installation with centralized wiring and consistent trim.",
    description:
      "A multi-room installation covering living spaces and bedrooms. Every TV fed from a centralized wiring closet with clean cable management. Consistent mounting height and trim throughout.",
    heroPhoto: "/lovable-uploads/mounted-tvs/HP/IMG_0182.JPG",
    photos: [
      "/lovable-uploads/mounted-tvs/HP/IMG_0179.JPG",
      "/lovable-uploads/mounted-tvs/HP/IMG_0180.JPG",
      "/lovable-uploads/mounted-tvs/HP/IMG_0181.JPG",
      "/lovable-uploads/mounted-tvs/HP/IMG_0182.JPG",
      "/lovable-uploads/mounted-tvs/HP/IMG_0959.JPG",
      "/lovable-uploads/mounted-tvs/HP/IMG_0993.JPG",
    ],
    systemsInstalled: ["Multi-Room TV", "Centralized Wiring", "Cable Management"],
    relatedServices: [
      { to: "/services/home-integration", label: "Home Integration", reason: "Multi-room TVs from a centralized rack" },
      { to: "/services/networking", label: "Networking & Rack", reason: "Wiring closet feeding every room" },
    ],
    testimonial: null,
  },

  // ---- Supporting work ----------------------------------------------------
  {
    slug: "frame-sonos-combo",
    name: "Frame TV + Sonos",
    location: "Edwards, CO",
    categories: ["frame-tv", "tv-mounting"],
    scope: "Samsung Frame TV paired with a Sonos soundbar — clean wall mount.",
    description:
      "Samsung Frame TV paired with a Sonos soundbar for a clean, minimal wall-mounted entertainment setup. Both devices mounted flush with concealed wiring. ARC handles audio handoff automatically.",
    heroPhoto: "/lovable-uploads/mounted-tvs/frame-sonos/IMG_0030.JPG",
    photos: [
      "/lovable-uploads/mounted-tvs/frame-sonos/IMG_0022.JPG",
      "/lovable-uploads/mounted-tvs/frame-sonos/IMG_0023.JPG",
      "/lovable-uploads/mounted-tvs/frame-sonos/IMG_0030.JPG",
    ],
    systemsInstalled: ["Samsung Frame TV", "Sonos Soundbar", "eARC Audio", "Concealed Wiring"],
    relatedServices: [
      { to: "/services/audio-entertainment", label: "TV & Entertainment", reason: "Frame TV + Sonos as a clean wall pair" },
    ],
    testimonial: null,
  },
  {
    slug: "wood-media-wall",
    name: "Custom Wood Media Wall",
    location: "Eagle County, CO",
    categories: ["tv-mounting"],
    scope: "Custom wood media wall with built-in cable management.",
    description:
      "A TV installation on a custom wood accent wall with built-in cable management channels. The media wall was designed to hide all components while keeping a warm, modern aesthetic.",
    heroPhoto: "/lovable-uploads/mounted-tvs/wood-media/IMG_0510.JPG",
    photos: [
      "/lovable-uploads/mounted-tvs/wood-media/IMG_0340.JPG",
      "/lovable-uploads/mounted-tvs/wood-media/IMG_0510.JPG",
      "/lovable-uploads/mounted-tvs/wood-media/IMG_0511.JPG",
    ],
    systemsInstalled: ["TV Mounting", "Wood Accent Wall", "Built-In Cable Management"],
    relatedServices: [
      { to: "/services/audio-entertainment", label: "TV & Entertainment", reason: "TV integrated into a custom media wall" },
    ],
    testimonial: null,
  },
  {
    slug: "singletree-fireplace",
    name: "Singletree Fireplace Mount",
    location: "Singletree, CO",
    categories: ["tv-mounting"],
    scope: "Fireplace TV mount in Singletree — stone surround, concealed wiring.",
    description:
      "TV mounted above a stone fireplace surround in a Singletree home. In-wall conduit was run behind stone to keep everything clean. Before-and-after shots show the process from rough-in to finished product.",
    heroPhoto: "/lovable-uploads/mounted-tvs/singletree-fp/IMG_1185.JPG",
    photos: [
      "/lovable-uploads/mounted-tvs/singletree-fp/71933685675__F16DF3ED-FB5F-4C31-9CC8-BD0646AB5261.JPG",
      "/lovable-uploads/mounted-tvs/singletree-fp/71934395331__485C1403-1DFC-4709-B065-646D9517109C.JPG",
      "/lovable-uploads/mounted-tvs/singletree-fp/71934400537__62DC73D0-4A52-4166-8D67-EA8E25C0E2EB.JPG",
      "/lovable-uploads/mounted-tvs/singletree-fp/IMG_1185.JPG",
    ],
    systemsInstalled: ["TV Mounting", "Stone Conduit Run", "Concealed Wiring"],
    relatedServices: [
      { to: "/services/audio-entertainment", label: "TV & Entertainment", reason: "Stone-front fireplace mount with concealed run" },
      { to: "/services/prewire", label: "Pre-Wire", reason: "In-wall conduit before stone went up" },
    ],
    testimonial: null,
  },
  {
    slug: "west-vail-residence",
    name: "West Vail Residence",
    location: "West Vail, CO",
    categories: ["tv-mounting", "prewire", "wiring"],
    scope: "Multiple TV installations with structured wiring and backbox pre-install.",
    description:
      "Multiple TV installations across a West Vail home with clean cable management and structured wiring behind every wall. Backbox pre-install for future-proof mounting.",
    heroPhoto: "/lovable-uploads/mounted-tvs/west-vail-bb/IMG_1718.JPG",
    photos: [
      "/lovable-uploads/mounted-tvs/west-vail-bb/IMG_1717.JPG",
      "/lovable-uploads/mounted-tvs/west-vail-bb/IMG_1718.JPG",
    ],
    systemsInstalled: ["TV Mounting", "Backbox Install", "Structured Wiring"],
    relatedServices: [
      { to: "/services/prewire", label: "Pre-Wire", reason: "Backbox + structured wiring before drywall" },
      { to: "/services/audio-entertainment", label: "TV & Entertainment", reason: "Multiple displays across the home" },
    ],
    testimonial: null,
  },
  {
    slug: "cordillera-media-room",
    name: "Cordillera Media Room",
    location: "Cordillera, CO",
    categories: ["theater", "media-room", "control4"],
    scope: "Media room with architectural speakers and automation.",
    description:
      "A media room built for everyday use in a mountain residence. Clean sight lines, in-ceiling architectural speakers, and Control4 automation that disappears into the room. One keypad press switches between movie mode, music mode, and game mode.",
    heroPhoto: "/lovable-uploads/home-theater/IMG_0958.JPG",
    photos: ["/lovable-uploads/home-theater/IMG_0958.JPG"],
    systemsInstalled: ["Architectural Speakers", "Control4 Automation", "Scene Control"],
    relatedServices: [
      { to: "/services/ava", label: "AVA — Media Room First", reason: "Single media room with everyday usability" },
      { to: "/services/control4", label: "Control4", reason: "Scene-based mode switching (movie, music, game)" },
      { to: "/services/audio-entertainment", label: "Architectural Audio", reason: "In-ceiling speakers blended into the room" },
    ],
    testimonial: null,
  },
  {
    slug: "featured-theater-install",
    name: "Theater-Style Install",
    location: "Vail Valley, CO",
    categories: ["theater", "media-room"],
    scope: "Clean theater-style installation with in-wall speakers.",
    description:
      "A theater-grade AV installation with in-wall speakers and a projector setup designed for a dedicated viewing room. Equipment hidden from sight, control via a single remote.",
    heroPhoto: "/lovable-uploads/home-theater/IMG_0509.JPG",
    photos: [
      "/lovable-uploads/home-theater/IMG_0509.JPG",
      "/lovable-uploads/home-theater/IMG_0512.JPG",
    ],
    systemsInstalled: ["In-Wall Speakers", "Projection", "Hidden Equipment"],
    relatedServices: [
      { to: "/services/ava", label: "AVA — Media Room First", reason: "Dedicated viewing room, hidden equipment" },
      { to: "/services/audio-entertainment", label: "Architectural Audio", reason: "In-wall speakers tuned to the room" },
    ],
    testimonial: null,
  },
  {
    slug: "misc-installations",
    name: "Installation Gallery",
    location: "Eagle County, CO",
    categories: ["tv-mounting", "whole-home"],
    scope: "A collection of TV mounting and AV installations across the Vail Valley.",
    description:
      "A collection of installations across Eagle County — living rooms, bedrooms, outdoor patios, and commercial spaces. Every job gets the same attention to detail: concealed wiring, proper mounting hardware, and clean finishing.",
    heroPhoto: "/lovable-uploads/mounted-tvs/Misc/IMG_0224.JPG",
    photos: [
      "/lovable-uploads/mounted-tvs/Misc/IMG_0224.JPG",
      "/lovable-uploads/mounted-tvs/Misc/IMG_0225.JPG",
      "/lovable-uploads/mounted-tvs/Misc/IMG_0226.JPG",
      "/lovable-uploads/mounted-tvs/Misc/IMG_0227.JPG",
      "/lovable-uploads/mounted-tvs/Misc/IMG_0228.JPG",
      "/lovable-uploads/mounted-tvs/Misc/IMG_0229.JPG",
      "/lovable-uploads/mounted-tvs/Misc/IMG_0247.JPG",
      "/lovable-uploads/mounted-tvs/Misc/IMG_0248.JPG",
      "/lovable-uploads/mounted-tvs/Misc/IMG_0287.JPG",
      "/lovable-uploads/mounted-tvs/Misc/IMG_0337.JPG",
      "/lovable-uploads/mounted-tvs/Misc/IMG_0875.JPG",
      "/lovable-uploads/mounted-tvs/Misc/IMG_0876.JPG",
      "/lovable-uploads/mounted-tvs/Misc/IMG_0877.JPG",
      "/lovable-uploads/mounted-tvs/Misc/IMG_0977.JPG",
      "/lovable-uploads/mounted-tvs/Misc/IMG_0978.JPG",
      "/lovable-uploads/mounted-tvs/Misc/IMG_1083.JPG",
      "/lovable-uploads/mounted-tvs/Misc/IMG_1346.JPG",
      "/lovable-uploads/mounted-tvs/Misc/IMG_1347.JPG",
      "/lovable-uploads/mounted-tvs/Misc/IMG_1348.JPG",
      "/lovable-uploads/mounted-tvs/Misc/IMG_1549.JPG",
      "/lovable-uploads/mounted-tvs/Misc/IMG_1550.JPG",
      "/lovable-uploads/mounted-tvs/Misc/IMG_1713.JPG",
      "/lovable-uploads/mounted-tvs/Misc/IMG_1714.JPG",
    ],
    systemsInstalled: ["TV Mounting", "Concealed Wiring", "Various Installations"],
    relatedServices: [
      { to: "/services/audio-entertainment", label: "TV & Entertainment", reason: "Range of TV mounting work across the valley" },
      { to: "/services/home-integration", label: "Home Integration", reason: "Whole-home AV when projects scale up" },
    ],
    testimonial: null,
  },
];

/**
 * Project filter pills shown on /projects. Order matters — the highest-intent
 * categories for Vail Valley homeowners come first. Adding a new slug here
 * requires at least one project in `projects` to carry that slug, otherwise
 * the filter will look broken (empty state). Verify before adding.
 */
export const projectCategories = [
  { slug: "all", label: "All Projects" },
  { slug: "control4", label: "Control4" },
  { slug: "lighting", label: "Smart Lighting" },
  { slug: "theater", label: "Home Theater" },
  { slug: "media-room", label: "Media Rooms" },
  { slug: "tv-mounting", label: "TV Mounting" },
  { slug: "frame-tv", label: "Frame TV" },
  { slug: "mantel-mount", label: "MantelMount" },
  { slug: "prewire", label: "Pre-Wire" },
  { slug: "wiring", label: "Structured Wiring" },
  { slug: "rack", label: "Rack & Networking" },
  { slug: "networking", label: "Networking" },
  { slug: "whole-home", label: "Whole-Home" },
];

/**
 * Location filter values shown alongside the category pills. Only includes
 * locations with at least one project today; rebuilt when project locations
 * change. Locations that map to a city page also expose a deep-link.
 */
export const projectLocationFilters: { slug: string; label: string; cityPath?: string }[] = [
  { slug: "all", label: "All Locations" },
  { slug: "vail", label: "Vail", cityPath: "/vail" },
  { slug: "beaver-creek", label: "Beaver Creek", cityPath: "/beaver-creek" },
  { slug: "edwards", label: "Edwards", cityPath: "/edwards" },
  { slug: "avon", label: "Avon", cityPath: "/avon" },
  { slug: "eagle", label: "Eagle / Eagle-Vail", cityPath: "/eagle" },
  { slug: "cordillera", label: "Cordillera" },
  { slug: "singletree", label: "Singletree" },
  { slug: "vail-valley", label: "Vail Valley" },
];

/**
 * Reduce a project's `location` string to one of the slugs in
 * projectLocationFilters. Pure-string heuristic — match the start of the
 * location text against known city/town names. Fallback returns "vail-valley"
 * for the generic Vail Valley / Eagle County entries so they still show up
 * under the broad regional filter.
 */
export function locationSlug(location: string): string {
  const l = location.toLowerCase();
  if (l.startsWith("vail,") || l.startsWith("west vail") || l.startsWith("east vail")) return "vail";
  if (l.startsWith("beaver creek")) return "beaver-creek";
  if (l.startsWith("edwards")) return "edwards";
  if (l.startsWith("avon")) return "avon";
  if (l.startsWith("eagle-vail") || l.startsWith("eagle,") || l.startsWith("eagle county")) return "eagle";
  if (l.startsWith("cordillera")) return "cordillera";
  if (l.startsWith("singletree")) return "singletree";
  return "vail-valley";
}
