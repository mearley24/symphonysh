export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO date string
  category: string;
  readTime: string;
  content: string; // Markdown or HTML content
}

export const blogPosts: BlogPost[] = [
  {
    slug: "smart-home-pre-wire-guide-vail-valley",
    title: "Smart Home Pre-Wire: What Every Vail Valley Builder Needs to Know",
    excerpt: "Pre-wiring during construction saves thousands and prevents headaches later. Here's what to plan for before drywall goes up.",
    date: "2026-04-16",
    category: "Pre-Wire",
    readTime: "5 min read",
    content: `
Pre-wiring is the single most cost-effective decision you can make during a new build or major renovation. Running cables before drywall costs a fraction of what it takes to retrofit later — and the results are cleaner, more reliable, and easier to maintain.

## What Gets Pre-Wired?

Every room that might eventually need technology should get at minimum:

- **Cat6 Ethernet** — for TVs, access points, security cameras, and smart home controllers
- **Speaker wire** — for in-ceiling or in-wall speakers (even if you're not installing them yet)
- **Coax** — still useful for certain antenna and satellite setups
- **HDMI conduit** — future-proof runs from equipment closets to display locations
- **Low-voltage power** — for motorized shades, keypads, and sensors

## The Most Common Mistake

Builders often ask electricians to handle low-voltage wiring. The problem: electricians think in terms of power, not data. You end up with speaker wire run in the same bundle as Romex, Cat5 instead of Cat6, and no home run topology.

A dedicated AV integrator plans the wiring around how the system will actually be used — not just where the outlets go.

## What It Costs

Pre-wire for a 3,000 sq ft home in the Vail Valley typically runs $3,000–$8,000 depending on complexity. That same work as a retrofit? Easily double, sometimes triple — plus drywall patches, paint touch-ups, and compromises on cable routing.

## When to Call

The ideal time is right after framing, before insulation. If you're a builder or GC in Eagle County planning a new project, reach out early. We'll walk the framing with you and plan every run.
    `,
  },
];
