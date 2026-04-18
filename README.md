# Symphony Smart Homes — Website

Public marketing website for **Symphony Smart Homes**, a residential smart
home integrator serving the Vail Valley and Eagle County, Colorado.

- **Live site:** <https://symphonysh.com>
- **Phone:** (970) 519-3013
- **Service area:** Vail · Beaver Creek · Edwards · Avon · Eagle · Minturn
- **Owner / sole developer:** Matt Earley

This repo is **revenue infrastructure** — treat pushes to `main` the way you'd
treat deploys to a production storefront. Cloudflare Pages auto-deploys on
every push.

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite (SWC) |
| Styling | Tailwind CSS + shadcn/ui primitives |
| Fonts | Inter (body), Barlow Condensed (display) |
| Hosting | Cloudflare Pages (auto-deploy on push to `main`) |
| Backend helpers | Supabase Edge Function for contact email, Zapier webhook for scheduling |

See `CLAUDE.md` for the full design system and coding standards.

---

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # Production build → ./dist
npm run preview    # Serve the production build locally
```

**Before pushing:** run `npm run build`. If it fails locally, Cloudflare
Pages will fail too.

---

## Content integrity rules (hard)

- **No fabricated testimonials.** Real client quotes only, added to
  `src/data/testimonials.ts`. The homepage `ClientTestimonials` component
  auto-falls-back to a premium "What Working With Symphony Looks Like" proof
  block when the array is empty — so the homepage stays strong without
  inventing quotes.
- **No stock / rendered / AI project images.** Every photo in
  `src/data/projects.ts` points to a real install under
  `public/lovable-uploads/`.
- **No "coming soon" sections.** Hide unfinished content; don't publish
  placeholders.
- **No guessed `sameAs` URLs** in `src/constants/businessSchema.ts`. Wrong
  profile links hurt search trust — empty is better than wrong.

---

## Analytics & conversion tracking

`gtag.js` (GA4 + Google Ads) is loaded **lazily at runtime** via
`src/utils/tracking.ts` and only when real IDs are present as Vite env vars in
the Cloudflare Pages project. If those vars are unset, nothing is requested
— no pageview 404s to `googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID`.

See `GOOGLE_SETUP.md` for the full wire-up (GA4, Ads conversions, Search
Console verification, `sameAs`).

---

## Important files

| Path | Purpose |
|---|---|
| `src/pages/Index.tsx` | Homepage |
| `src/pages/Services.tsx` + `src/pages/services/*` | Services hub + 9 service pages |
| `src/pages/Projects.tsx` + `src/pages/ProjectDetail.tsx` | Previous-work portfolio |
| `src/pages/scheduling/` | Consultation booking flow |
| `src/pages/Contact.tsx` | Contact page (form + "what happens next") |
| `src/data/projects.ts` | Ordered portfolio — first 3 entries feature on homepage |
| `src/data/testimonials.ts` | Real client quotes (empty until collected) |
| `src/constants/businessSchema.ts` | LocalBusiness NAP + `sameAs` for JSON-LD |
| `src/components/Header.tsx` / `Footer.tsx` | Shared nav + footer |
| `src/components/SEO.tsx` | Per-page title / description / breadcrumbs |
| `public/_redirects` | Cloudflare Pages SPA routing (`/* /index.html 200`) |
| `public/sitemap.xml` | Indexed pages |
| `SITE_STATUS.md` | Current launch-readiness snapshot + owner-input TODOs |

---

## Deploy / release

- Push to `main`. Cloudflare Pages builds `vite build` and serves `dist/`.
- Status after a pass is tracked in `SITE_STATUS.md`.
- For non-trivial changes, run a quick visual pass against:
  - Homepage
  - `/projects`
  - `/services`
  - `/scheduling` → submit a test → `/scheduling/confirmation`
  - Mobile viewport (375px) for hero, nav, sticky call bar.

---

## Commit conventions

- Imperative mood, ≤72-char subject.
- Git config on this machine: `Matt Earley <earleystream@gmail.com>`.
- Push direct to `main` — no PRs, no branch protection; Matt is the sole
  developer. If someone else ever contributes, revisit this.
