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
  testimonial?: {
    quote: string;
    author: string;
    title: string;
  } | null;
}

export const projects: Project[] = [
  {
    slug: "eagle-vail-theater",
    name: "Eagle-Vail Theater",
    location: "Eagle-Vail, CO",
    categories: ["theater"],
    scope: "Dedicated home theater build in existing basement space.",
    description:
      "A dedicated theater room carved from an existing basement — acoustic treatment, projection, surround sound, and Control4 integration for a one-button cinema experience.",
    heroPhoto: "/lovable-uploads/home theater/IMG_0979.JPG",
    photos: [
      "/lovable-uploads/home theater/IMG_0920.JPG",
      "/lovable-uploads/home theater/IMG_0921.JPG",
      "/lovable-uploads/home theater/IMG_0925.JPG",
      "/lovable-uploads/home theater/IMG_0926.JPG",
      "/lovable-uploads/home theater/IMG_0979.JPG",
      "/lovable-uploads/home theater/IMG_0981.JPG",
      "/lovable-uploads/home theater/IMG_0982.JPG",
    ],
    systemsInstalled: [],
    testimonial: null,
  },
  {
    slug: "beaver-creek-condo",
    name: "Beaver Creek Condo",
    location: "Beaver Creek, CO",
    categories: ["tv-mounting"],
    scope: "Fireplace TV mount with concealed wiring in ski condo.",
    description:
      "A clean fireplace TV installation in a Beaver Creek ski condo — all wiring concealed behind the wall, no visible cables, no exposed conduit.",
    heroPhoto: "/lovable-uploads/mounted tvs/BC Condo FP/IMG_0677.JPG",
    photos: [
      "/lovable-uploads/mounted tvs/BC Condo FP/70551934893__F08E6641-B90D-4FE9-96CB-B6043C9EFBB7.jpg",
      "/lovable-uploads/mounted tvs/BC Condo FP/70682259838__CA09AB38-91D5-434E-9D12-D8D3BEC77650.JPG",
      "/lovable-uploads/mounted tvs/BC Condo FP/70682261617__B029C99B-C48B-4344-B91B-06B9B4921F7C.JPG",
      "/lovable-uploads/mounted tvs/BC Condo FP/IMG_0610.JPG",
      "/lovable-uploads/mounted tvs/BC Condo FP/IMG_0677.JPG",
      "/lovable-uploads/mounted tvs/BC Condo FP/IMG_0678.JPG",
      "/lovable-uploads/mounted tvs/BC Condo FP/IMG_0679.JPG",
    ],
    systemsInstalled: [],
    testimonial: null,
  },
  {
    slug: "cordillera-media-room",
    name: "Cordillera Media Room",
    location: "Cordillera, CO",
    categories: ["theater"],
    scope: "Media room integration in mountain residence.",
    description:
      "A media room built for everyday use — clean sight lines, architectural speakers, and automation that disappears into the room.",
    heroPhoto: "/lovable-uploads/home theater/IMG_0958.JPG",
    photos: ["/lovable-uploads/home theater/IMG_0958.JPG"],
    systemsInstalled: [],
    testimonial: null,
  },
  {
    slug: "west-vail-install",
    name: "West Vail Residence",
    location: "West Vail, CO",
    categories: ["tv-mounting"],
    scope: "TV mounting and structured wiring.",
    description:
      "Multiple TV installations with clean cable management and structured wiring behind the walls.",
    heroPhoto: "/lovable-uploads/mounted tvs/West Vail BB/IMG_0134.JPG",
    photos: [
      "/lovable-uploads/mounted tvs/West Vail BB/IMG_0134.JPG",
      "/lovable-uploads/mounted tvs/West Vail BB/IMG_0135.JPG",
    ],
    systemsInstalled: [],
    testimonial: null,
  },
];

export const projectCategories = [
  { slug: "all", label: "All Projects" },
  { slug: "theater", label: "Home Theater" },
  { slug: "tv-mounting", label: "TV Mounting" },
  { slug: "wiring", label: "Wiring" },
  { slug: "whole-home", label: "Whole-Home" },
  { slug: "outdoor", label: "Outdoor" },
];
