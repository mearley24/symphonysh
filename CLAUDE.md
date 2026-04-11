# CLAUDE.md — Symphony Smart Homes Website

This is the **public-facing website** for Symphony Smart Homes (`symphonysh.com`). It is a separate repo from the AI-Server backend (`mearley24/AI-Server`). For backend/infrastructure context, see the CLAUDE.md in that repo.

Read this file completely before making any changes.

---

## What This Site Is

A marketing website for **Symphony Smart Homes**, a residential AV/smart-home integration company in Eagle County, Colorado (Vail Valley). Owner and sole operator: Matt Earley.

- **URL:** symphonysh.com
- **Slogan:** "We Build Smart Homes That Just Work"
- **Phone:** 970-519-3013
- **Service Area:** Vail, Beaver Creek, Edwards, Avon, Eagle, Minturn
- **Deploys via:** Cloudflare Pages on push to main

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite (with SWC) |
| Styling | Tailwind CSS |
| Components | shadcn/ui (Radix primitives) |
| Fonts | Inter (body), Barlow Condensed (display) |
| Hosting | Cloudflare Pages (auto-deploy on push to main) |
| Editor | Lovable (visual editor, uses `lovable-tagger` in dev mode) |

---

## Design System

### Colors
| Token | Value | Usage |
|---|---|---|
| `primary` | `#000000` | Page background, dark surfaces |
| `secondary` | `#141414` | Slightly lighter dark surfaces |
| `accent` | `#ca9f5c` | Gold — CTAs, eyebrows, active states, hover borders |
| `foreground` | `#FFFFFF` | Primary text |
| `muted` | `#1a1a1a` | Subdued backgrounds |
| `border` | `hsl(var(--border))` | Card borders, dividers |

### Typography
- **Body:** Inter, system-ui, sans-serif
- **Display/Headings:** Barlow Condensed, sans-serif

### Component Patterns
- **Cards:** `border border-white/8 rounded-xl bg-black/40 backdrop-blur-sm`
- **Section headers:** Gold uppercase eyebrow (`text-accent text-sm tracking-wide uppercase`) + white bold heading below
- **CTA buttons:** Gold background, `px-7 py-4 rounded-lg font-medium text-base`
- **Outline buttons:** White border, same dimensions as CTA
- **Section padding rhythm:** Hero sections `pt-36/pb-20`, content sections `py-16` mobile / `py-24` desktop

### Path Alias
`@/` maps to `./src/` — all imports use `@/components/...`, `@/pages/...`, `@/data/...`

---

## Repo Structure

```
symphonysh/
├── src/
│   ├── App.tsx                    # All routes defined here
│   ├── data/
│   │   └── projects.ts           # Real project data (4 projects)
│   ├── pages/
│   │   ├── Index.tsx              # Homepage
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Services.tsx           # Services hub
│   │   ├── Projects.tsx           # Project grid with filters
│   │   ├── ProjectDetail.tsx      # Individual project pages
│   │   ├── Ava.tsx                # AVA smart home assistant
│   │   ├── Matterport.tsx         # 3D tour embeds
│   │   ├── Walkthrough.tsx        # Initial walkthrough booking
│   │   ├── Privacy.tsx / Terms.tsx
│   │   ├── photos/                # Photo gallery pages
│   │   │   ├── HomeTheater.tsx
│   │   │   ├── MountedTVs.tsx
│   │   │   ├── Wiring.tsx
│   │   │   └── mounted-tvs/      # Individual gallery subcategories
│   │   ├── services/              # Individual service pages (9 total)
│   │   │   ├── HomeIntegration.tsx
│   │   │   ├── AudioEntertainment.tsx
│   │   │   ├── SmartLighting.tsx
│   │   │   ├── Shades.tsx
│   │   │   ├── Networking.tsx
│   │   │   ├── ClimateControl.tsx
│   │   │   ├── SecuritySystems.tsx
│   │   │   ├── Maintenance.tsx
│   │   │   └── PreWire.tsx
│   │   └── scheduling/            # Appointment booking flow
│   ├── components/
│   │   ├── Header.tsx             # Nav with scroll-aware bg, services dropdown
│   │   ├── Footer.tsx             # 3-column footer (logo, links, service areas)
│   │   ├── MobileClickToCall.tsx  # Sticky mobile CTA
│   │   ├── SocialProof.tsx        # Featured projects section
│   │   ├── Testimonials.tsx
│   │   ├── ServiceDemoSection.tsx # Wraps interactive demos per service
│   │   ├── PhotoGallery.tsx
│   │   ├── SEO.tsx
│   │   ├── PageBackground.tsx
│   │   ├── service-demos/         # Interactive demo components (8 demos)
│   │   ├── smart-lighting/        # Lighting-specific components
│   │   ├── scheduling/            # Booking form components
│   │   ├── photos/                # Photo gallery components
│   │   ├── ui/                    # shadcn/ui primitives (do not edit directly)
│   │   └── Layout/                # Control4 and iPad layout wrappers
│   ├── hooks/                     # Custom React hooks
│   ├── lib/                       # Utility functions
│   └── integrations/              # Supabase client config
├── public/
│   └── lovable-uploads/           # All images (photos, logos, etc.)
├── .cursor/prompts/               # Task prompts (O, P, website-upgrade)
├── tailwind.config.ts
├── vite.config.ts
├── package.json
└── CLAUDE.md                      # THIS FILE
```

---

## HARD RULES

### Content Integrity
- **No fake testimonials.** Only real quotes from real clients with real names. If you don't have a testimonial, don't invent one — use the "Featured Projects" pattern instead.
- **No cookie-cutter filler text.** No "our team of experts," no "decades of combined experience," no corporate-speak. This is a one-man operation. Be honest and direct.
- **Only real projects in `src/data/projects.ts`.** Current projects: Eagle-Vail Theater, Beaver Creek Condo, Cordillera Media Room, West Vail Residence. Do not add fictional projects.
- **No "coming soon" sections.** If a feature isn't ready, hide the section entirely. Don't show empty states or placeholder content.

### Code Standards
- **TypeScript** for all `.tsx` and `.ts` files. No `any` types unless absolutely necessary.
- **Do not add npm packages** unless explicitly asked. CSS transitions, IntersectionObserver, and React hooks handle animations.
- **shadcn/ui components** in `src/components/ui/` should not be edited directly. Customize via Tailwind classes on the consuming component.
- **Images go in `public/lovable-uploads/`** — reference as `/lovable-uploads/path/to/image.jpg`.
- **No placeholder images.** If an image doesn't exist, remove the element. `/api/placeholder/` URLs are broken (lesson from Smart Lighting page).

### Routing
- All routes defined in `src/App.tsx`.
- Service pages: `/services/home-integration`, `/services/audio-entertainment`, etc.
- Project pages: `/projects/:slug` (slugs from `projects.ts`).
- Photo galleries: `/photos/home-theater`, `/photos/mounted-tvs`, `/photos/wiring` with subcategories.
- Legacy redirects exist — don't remove them (`/pre-wiring` -> `/services/prewire`, `/portfolio` -> `/projects`, etc.).

### Deployment
- Push to `main` auto-deploys to Cloudflare Pages.
- **Test the build locally before pushing:** `npm run build` — if it fails, Cloudflare will fail too.
- Never push code that logs `console.error` in production.

---

## Real Project Data

Projects live in `src/data/projects.ts`. Each has:
- `slug` — URL-safe identifier
- `name`, `location`, `categories`, `scope`, `description`
- `photos` — array of paths to `/lovable-uploads/`
- `heroPhoto` — primary display image
- `systemsInstalled` — array (currently empty for all, populate when known)
- `testimonial` — real client quote or `null`

**Current projects:**
1. Eagle-Vail Theater — basement theater build, theater category
2. Beaver Creek Condo — fireplace TV mount, tv-mounting category
3. Cordillera Media Room — Sonos + Apple TV media room, theater category
4. West Vail Residence — structured wiring + backbox install, wiring category

---

## Service Pages and Demos

Each service page at `/services/*` has a `<ServiceDemoSection>` with an interactive component:

| Page | Demo Component | Status |
|---|---|---|
| Home Integration | `Control4Demo` / `HomeAutomationDemo` | Active |
| Audio & Entertainment | `AudioEntertainmentDemo` | Active |
| Smart Lighting | `InteractiveLightingFloorPlan`, `BirdsEyeFloorPlan`, `LightingFixtureLibrary`, `TroyVoiceAssistant` | Fixture library had broken placeholder images; TroyVoiceAssistant had "coming soon" text |
| Shades | `ShadesDemo` | Active |
| Networking | `NetworkingDemo` | Active |
| Climate Control | `ClimateControlDemo` | Active |
| Security | `SecuritySystemDemo` | Active |
| Maintenance | `MaintenanceDemo` | Active |
| Pre-Wire | No demo | — |

---

## Key Components

### Header (`src/components/Header.tsx`)
- Transparent at top, transitions to `bg-black/80 backdrop-blur-lg` after 60px scroll
- Services dropdown with all 8 service links
- Nav links: Services, Our Work, About, Contact
- Gold "Schedule" CTA button
- Mobile hamburger menu

### Footer (`src/components/Footer.tsx`)
- 3 columns: Logo + tagline + phone | Quick Links | Service Areas
- Bottom bar: copyright + Privacy/Terms links
- `bg-black/40 backdrop-blur-sm, border-t border-white/10`
- Appears identically on every page

### MobileClickToCall (`src/components/MobileClickToCall.tsx`)
- Sticky bottom bar on mobile with Schedule + Call buttons
- Should appear on all pages

---

## Prompt History

Task prompts that shaped this site:

| Prompt | What It Did |
|---|---|
| `cline-prompt-O-website-experience.md` | Killed fake testimonials, built Featured Projects from real data, restructured Projects page with filters, created ProjectDetail pages |
| `cline-prompt-P-site-audit-polish.md` | Footer consolidation, dead link fixes, placeholder cleanup, homepage walkthrough redirect, duplicate route consolidation |
| Lovable L1-L10 (pending) | Visual polish: spacing, heroes, hover effects, mobile, animations, footer/nav, About page, Contact page, final sweep |

---

## Common Mistakes to Avoid

| Mistake | Why It Happens | Prevention |
|---|---|---|
| Adding fake project or testimonial | Trying to fill empty sections | Only use real data from `projects.ts`; hide empty sections |
| Broken placeholder images | Using `/api/placeholder/` URLs | Remove image elements if no real image exists |
| "Coming soon" text | Feature not ready | Hide the section entirely |
| Corporate-speak on About page | Default AI writing style | Matt is one person, not a corporation. Write accordingly |
| npm package added for animation | Habit from other projects | CSS transitions + IntersectionObserver + React hooks only |
| Build fails on Cloudflare | TypeScript errors ignored locally | Run `npm run build` before pushing |
| Editing shadcn/ui primitives | Trying to customize components | Customize via Tailwind classes on the parent, not in ui/ |
| Duplicate footer on homepage | Homepage had inline footer + shared Footer | One Footer component, shared across all pages |

---

## Quick Commands

```zsh
# Install dependencies
npm install

# Local dev server
npm run dev

# Build for production (test before pushing)
npm run build

# Preview production build
npm run preview
```

---

## Git

- Push directly to main (auto-deploys to Cloudflare Pages).
- Commit messages: imperative mood, 72 chars max.
- Git config: email `earleystream@gmail.com`, name `Matt Earley`.
- No PRs needed. Matt is the sole developer.
