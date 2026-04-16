export interface CityPage {
  slug: string;
  city: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  subheadline: string;
  intro: string;
  localDetails: string;  // Paragraph about the specific area
  commonProjects: string[];  // Types of projects common in this area
  neighborhoods?: string[];
  driveTime?: string;  // From base of operations
}

export const cityPages: CityPage[] = [
  {
    slug: "vail",
    city: "Vail",
    metaTitle: "Smart Home Installation in Vail, CO",
    metaDescription: "Professional smart home integration in Vail, Colorado. Pre-wire, Control4, home theater, TV mounting, and whole-home audio. Local Vail Valley integrator.",
    headline: "Smart Home Integration in Vail",
    subheadline: "Local integrator serving Vail Village, Lionshead, West Vail, and East Vail",
    intro: "Vail homes range from slope-side condos to 10,000+ square foot mountain estates — and each has different technology needs. Whether you're wiring a new build from the ground up or retrofitting a rental property for smart access and climate control, we've done it here.",
    localDetails: "Vail's mix of primary residences and vacation homes creates unique smart home challenges. Remote access is critical — owners need to monitor security, adjust thermostats, and check on the property from anywhere. Altitude and mountain construction mean thicker walls, longer cable runs, and Wi-Fi dead zones that consumer mesh systems can't handle. We design systems that work reliably at 8,150 feet, in homes built into mountainsides, with stone and log construction that kills wireless signals.",
    commonProjects: ["Vacation home remote access systems", "Ski-in/ski-out condo retrofits", "New construction pre-wire", "Whole-home audio for entertaining", "Security cameras and smart locks for rental properties"],
    neighborhoods: ["Vail Village", "Lionshead", "West Vail", "East Vail", "Sandstone", "Potato Patch", "Golf Course"],
    driveTime: "Based in the valley — typically on-site within 30 minutes"
  },
  {
    slug: "beaver-creek",
    city: "Beaver Creek",
    metaTitle: "Smart Home Installation in Beaver Creek, CO",
    metaDescription: "Smart home integration for Beaver Creek residences and condos. Control4, home theater, pre-wire, and luxury AV systems. Local Eagle County integrator.",
    headline: "Smart Home Integration in Beaver Creek",
    subheadline: "Serving Bachelor Gulch, Arrowhead, and the Beaver Creek Village area",
    intro: "Beaver Creek properties are built to a high standard — and the technology should match. From custom homes in Bachelor Gulch to condos at the base, we install systems that deliver the experience high-end homeowners expect without the complexity.",
    localDetails: "Beaver Creek's gated community and resort-grade properties often require coordination with HOAs, property managers, and design teams. Many homes here have dedicated media rooms, multi-zone audio across indoor and outdoor spaces, and motorized shades managing mountain sun and privacy. Retrofit work in older Beaver Creek condos is common — we've run cable through crawl spaces and above drop ceilings in buildings where pre-wire wasn't part of the original plan.",
    commonProjects: ["Luxury whole-home automation", "Home theater and media rooms", "Multi-zone audio (indoor + outdoor)", "Motorized shade systems", "Retrofit wiring in older condos"],
    neighborhoods: ["Bachelor Gulch", "Arrowhead", "Beaver Creek Village", "Elkhorn", "Meadows"],
    driveTime: "15-minute drive from our base"
  },
  {
    slug: "edwards",
    city: "Edwards",
    metaTitle: "Smart Home Installation in Edwards, CO",
    metaDescription: "Smart home pre-wire, installation, and maintenance in Edwards, Colorado. TV mounting, networking, home automation. Serving Homestead and Riverwalk.",
    headline: "Smart Home Integration in Edwards",
    subheadline: "Serving Homestead, Riverwalk, Lake Creek, and surrounding Edwards neighborhoods",
    intro: "Edwards is where a lot of new construction in the valley happens — and that means pre-wire is the most common call we get here. New builds, major renovations, and the steady growth of the Riverwalk and Homestead areas keep us busy.",
    localDetails: "Edwards sits at the center of Eagle County's growth corridor. With new developments and a growing year-round population, there's a strong demand for networking infrastructure that can handle modern work-from-home setups, plus entertainment systems for families. We work closely with local builders and GCs here — many of the homes in Homestead and Lake Creek were pre-wired by us during construction.",
    commonProjects: ["New construction pre-wire", "Structured networking for home offices", "Family room TV and audio installations", "Builder partnerships", "Whole-home Wi-Fi systems"],
    neighborhoods: ["Homestead", "Riverwalk", "Lake Creek", "Berry Creek", "Edwards Village"],
    driveTime: "5-minute drive from our base"
  },
  {
    slug: "avon",
    city: "Avon",
    metaTitle: "Smart Home Installation in Avon, CO",
    metaDescription: "Professional smart home installation in Avon, Colorado. TV mounting, home automation, networking, and pre-wire services. Local Vail Valley integrator.",
    headline: "Smart Home Integration in Avon",
    subheadline: "Serving Avon, Wildridge, Mountain Star, and the I-70 corridor",
    intro: "Avon's growth as a year-round community means more homeowners want real smart home infrastructure — not just a few smart plugs and an Alexa. From the townhomes in Wildridge to custom builds in Mountain Star, we handle the wiring and programming.",
    localDetails: "Avon has a unique mix of affordable housing, mid-range townhomes, and high-end properties in neighborhoods like Mountain Star. We see a lot of TV mounting jobs and networking upgrades here — families want reliable Wi-Fi for streaming and remote work, plus clean entertainment setups in living rooms that are the center of the home. New developments often come to us for pre-wire during the framing stage.",
    commonProjects: ["TV mounting and soundbar installation", "Wi-Fi networking upgrades", "New construction pre-wire", "Smart thermostat and climate control", "Security camera systems"],
    neighborhoods: ["Wildridge", "Mountain Star", "Eaglebend", "Nottingham Park"],
    driveTime: "10-minute drive from our base"
  },
  {
    slug: "eagle",
    city: "Eagle",
    metaTitle: "Smart Home Installation in Eagle, CO",
    metaDescription: "Smart home installation and pre-wire services in Eagle, Colorado. TV mounting, networking, audio systems. Serving Eagle Ranch and Brush Creek.",
    headline: "Smart Home Integration in Eagle",
    subheadline: "Serving Eagle Ranch, Brush Creek, Haymeadow, and the Town of Eagle",
    intro: "Eagle is the fastest-growing part of the valley — and new neighborhoods mean new homes that need technology infrastructure from day one. We work with builders in Eagle Ranch, Haymeadow, and Brush Creek to get pre-wire right during construction.",
    localDetails: "Eagle's rapid growth and more affordable price point compared to Vail or Beaver Creek makes it a hotspot for families building their first custom home. Many homeowners here are tech-forward but budget-conscious — they want smart home capability without overbuilding. We help plan systems that can start simple (networking + a few zones of audio) and grow over time as needs and budgets expand. Eagle Ranch properties often share similar floor plans, which means we can dial in repeatable, efficient installations.",
    commonProjects: ["Budget-conscious smart home packages", "Pre-wire for new construction", "Scalable audio systems", "Networking for remote work", "TV and entertainment setups"],
    neighborhoods: ["Eagle Ranch", "Brush Creek", "Haymeadow", "Terrace", "Capitol"],
    driveTime: "20-minute drive from our base"
  },
];
