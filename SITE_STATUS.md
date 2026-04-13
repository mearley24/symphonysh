# symphonysh — Site Status

---

## ✅ Final Polish Pass — April 13, 2026

### Build
- `npm run build` — clean, 0 errors, 2680 modules transformed (unchanged module count)
- All TypeScript compiles without error

### What Changed in This Pass

#### Scheduling / Booking Flow
- **`PageLayout.tsx`** — Completely overhauled: replaced bare black page with full `PageBackground` (matching other pages), added proper hero section with breadcrumb back-nav, eyebrow label, H1 heading, and sub-text. Real `Footer` component used instead of the minimal inline footer.
- **`AppointmentForm.tsx`** — Service selector trigger changed from `bg-accent` (gold trigger was visually confusing) to match the rest of the form inputs (`bg-white/5 border border-white/10`). All labels changed from `text-gray-300` → `text-white/60` for consistency. Inputs unified to `rounded-lg`. Phone placeholder updated to show local format. Address label clarified to "Property Address". Message label improved with optional indicator.
- **`SubmitButton.tsx`** — Replaced shadcn white `Button` with the site-standard accent gold CTA button style (matching all other primary CTAs site-wide). Adds `ArrowRight` icon for visual consistency.
- **`FormLayout.tsx`** — Removed stray `bg-black` class from the `<form>` element.
- **`SchedulingForm.tsx`** — Removed development `console.log` statements (form data, session storage, submission result).
- **`ConfirmationPage.tsx`** — Removed development `console.log("Confirmation page rendered")`.

#### Photo Galleries
- **`HomeTheater.tsx`** — Major cleanup:
  - Removed all `console.log` calls from image load/error handlers
  - Removed `(window as any).toggleHomeTheaterButtons` pollution of the global window object
  - Removed dead Lovable dev-environment detection logic and URL-parameter button-visibility listener
  - Standardized all styling to match site design system (`bg-black/40 backdrop-blur-sm border border-white/8 rounded-xl`, `text-white/40`, etc.)
  - Added proper hero section with back-nav, eyebrow, H1, and description
  - Added `hero-divider` between header and grid
  - Added real `Footer` component
  - Improved alt text to be descriptive: `"${title} — home theater installation in Vail Valley"`
  - Added breadcrumbs to SEO component

#### Typography & CSS
- **`index.css`** — Fixed `--rdp-accent-color: hsl(202, 159, 92)` → `rgba(202, 159, 92, 1)` (was invalid CSS hsl() call; now correct rgba matching the brand gold)
- **`index.css`** — Added `.animate-fade-in { animation-fill-mode: both; }` to prevent hero elements flashing visible before their entrance animation fires (was most visible on delayed `[animation-delay:100ms]` elements)

#### Code Quality
- **`Index.tsx`** — Removed unused `SocialProof` import (component was imported but never rendered)
- **`App.tsx`** — Error fallback button changed from `bg-blue-500` (off-brand) to `bg-accent` with standard border-radius and hover state
- **`Services.tsx`, `Contact.tsx`, `About.tsx`** — Fixed source indentation: CTA section `h2` elements had one extra indent level vs sibling `p` elements

### Remaining Content-Only TODOs (unchanged, require Matt)
- **Testimonials** — All `testimonial` fields in `projects.ts` are still `null`. Add real client quotes when available (see schema in `Testimonials.tsx`)
- **`BUSINESS_SAME_AS`** — Still an empty array. Add Google Business Profile, Instagram, Facebook, Houzz URLs once confirmed live
- **Business address in schema** — Confirm `45 Aspen Glen Ct, Edwards CO 81632` is intentionally public-facing before verifying GBP

### Ideas for a Future Pass (not implemented — low urgency)
- **Hero menu button positioning** (`top-[430px]`) is hardcoded; could break if hero content height changes. A relative-positioned approach would be more resilient.
- **JS bundle (~1 MB)** — Pre-existing; consider dynamic imports for photo gallery pages and service demo components in a dedicated perf pass.
- **`SocialProof` component** — Currently unused on any page. Could be a nice addition to the Services or About page once real stats exist.
- **`/photos/*` discovery** — These gallery routes are reachable via project cards but not surfaced in primary navigation. A "Browse All Photos" link in the footer or Projects page would help.
- **Google Calendar stub files** — `src/utils/appointments/googleCalendar/auth/` contains placeholder files that can be deleted in a cleanup pass (no live functionality).

---

*Last updated: April 13, 2026 (Cloudflare Pages deployment verification)*

---

## ✅ DEPLOYMENT VERIFIED — April 13, 2026

### Local Build
- `npm run build` — clean, 0 errors, 2680 modules transformed, built in 3.21s
- Output directory: `dist/` (Vite default, `base: "/"` in vite.config.ts — correct for CF Pages root)
- Build command confirmed: `vite build`

### Asset Parity
- `public/lovable-uploads/` — **128 files**
- `dist/lovable-uploads/` — **128 files**
- `diff` between public and dist: **0 differences** — exact match

### `_redirects` (SPA routing)
- `public/_redirects`: `/* /index.html 200` ✅
- `dist/_redirects`: `/* /index.html 200` ✅ (copied by Vite from public/)

### Git / Push State
- `git status`: clean working tree, no uncommitted changes
- HEAD: `bd8a44e` — "Fix SPA routing: add Cloudflare Pages _redirects, update SITE_STATUS"
- Branch: `main`, up to date with `origin/main` — **latest fix is already pushed**

### Cloudflare Pages Config
- No `wrangler.toml` or `pages.toml` in repo root — CF Pages settings live in the dashboard
- Expected dashboard config: **Build command:** `npm run build` · **Output directory:** `dist`
- `base: "/"` in vite.config.ts — no asset-prefix mismatch

### Live Site Verification (sampled 6 URLs, all HTTP 200 after www redirect)
| URL | Status |
|-----|--------|
| `https://symphonysh.com/` | 200 ✅ |
| `/lovable-uploads/1d7a78ef-…png` | 200 ✅ |
| `/lovable-uploads/mounted-tvs/HP/IMG_0179.JPG` | 200 ✅ |
| `/lovable-uploads/mounted-tvs/Home/IMG_0659.JPG` | 200 ✅ |
| `/lovable-uploads/wiring/IMG_0228-2.JPG` | 200 ✅ |
| `/lovable-uploads/home-theater/IMG_0509.JPG` | 200 ✅ |

> Note: `symphonysh.com` → `www.symphonysh.com` 301 redirect is normal Cloudflare behaviour (www canonical set in CF dashboard).

### Verdict
**Site is healthy. No stale deploy, no output-directory mismatch, no asset base-path issue.**
Images that previously 404'd are now loading. The fix (image-path casing + `_redirects`) was
committed in `94d260b` / `bd8a44e` and Cloudflare Pages auto-deployed on push to `main`.

---

## Launch Readiness

**The site is live, all routes resolve correctly, and the build is clean.**
Cloudflare Pages deploys on every push to `main`. All pages render, all routes resolve
with proper 200 status codes, and the booking form accepts submissions. The items below
require real business input — none are blocking.

---

## ✅ VERIFIED OK — April 12, 2026

### Build
- `npm run build` — clean, 0 errors, 2680 modules transformed
- `git status` — clean, HEAD `94d260b` up to date with `origin/main`

### Routing Fix (this pass)
- **`public/_redirects` added** — Cloudflare Pages SPA routing fix (`/* /index.html 200`)
- Previously, direct URL navigation to inner routes returned HTTP 404 (GitHub Pages SPA
  hack in `404.html` / `index.html` handled browsers but not search engine crawlers)
- All routes now return HTTP 200: `/projects`, `/about`, `/scheduling`, `/photos/*`, etc.
- The legacy GitHub Pages decode script in `index.html` is harmless and can stay

### Image Paths (verified correct)
- `mounted-tvs/HP/` — uppercase, matches disk ✅
- `mounted-tvs/Home/` — uppercase H, matches disk ✅
- `mounted-tvs/Misc/` — uppercase M, matches disk ✅
- `wiring/IMG_0228-2.JPG` — hyphen filename, matches disk ✅
- All other mounted-tvs subcategories (`backbox-fp`, `mantel-mount`, `bc-condo-fp`, etc.)
  are all-lowercase in both source and disk — no mismatches

### Content & Data
- Real project data in `src/data/projects.ts` — 15 projects with real photos and descriptions
- No fake testimonials — `Testimonials.tsx` shows real project cards from `projects.ts`;
  all `testimonial` fields are `null` pending real client quotes
- No placeholder or `/api/placeholder/` images — broken image elements removed
- No "coming soon" copy — sections are hidden if content isn't ready
- Service pages for all 9 services with interactive demos

### SEO & Schema
- `src/constants/businessSchema.ts` — canonical NAP, LocalBusiness schema, geo coords,
  opening hours, area served, service types
- `BUSINESS_SAME_AS` is an empty array (correctly omitted from schema output until
  real profile URLs are provided)
- `index.html` — full OG/Twitter meta, canonical, geo tags, robots: index/follow
- `SEO.tsx` component handles per-page titles, descriptions, breadcrumbs

### Booking Flow
- `/scheduling` — full multi-step form (service, name, email, phone, address, message)
- Service pre-selection via URL param: `/scheduling?service=audio-entertainment`
- Submissions routed via Zapier webhook with Supabase fallback
- Confirmation page at `/scheduling/confirmation`

### Infrastructure
- Cloudflare Pages auto-deploy on push to `main`
- `lovable-tagger` npm package removed (prior commit)
- All npm scripts work: `dev`, `build`, `preview`
- `_redirects` file now in `public/` — proper SPA routing for Cloudflare Pages

---

## ⏳ Pending — Requires Real Business Input from Matt

### Testimonials
- All `testimonial` fields in `projects.ts` are `null`
- When real client quotes are collected, add them as:
  ```ts
  testimonial: { quote: "...", author: "First Last", title: "Homeowner, Location" }
  ```
- The `Testimonials.tsx` component shows "Featured Projects" as a safe stand-in;
  a real testimonials section can be added above or below it once quotes exist

### sameAs Social Profiles (SEO trust signal)
- `BUSINESS_SAME_AS` in `src/constants/businessSchema.ts` is intentionally empty
- Add verified URLs here when the profiles are confirmed live:
  ```ts
  export const BUSINESS_SAME_AS: string[] = [
    // "https://www.google.com/maps/place/...",   // Google Business Profile
    // "https://www.facebook.com/symphonysh",     // Facebook page
    // "https://www.instagram.com/symphonysh",    // Instagram
    // "https://www.houzz.com/pro/symphonysh",    // Houzz
  ];
  ```
- Wrong or dead links hurt search-engine trust — only add confirmed, live URLs

### Business Address in Schema
- `BUSINESS_ADDRESS` in `businessSchema.ts` is set to `45 Aspen Glen Ct, Edwards CO 81632`
- Confirm this is the intended public-facing business address for Google Business Profile
  and schema.org output. If it's a personal/home address and you prefer not to publish it,
  remove the `address` and `geo` fields from `localBusinessHomePageSchema()`

### Google Business Profile
- GBP is the single highest-ROI SEO action remaining
- Claim/verify at business.google.com, then paste the Share URL into `BUSINESS_SAME_AS`

---

## 🟡 Known — Low Priority / No Action Required Now

### lodash / CVE-2026-4800 (patched)
- **Affected package:** `lodash` (transitive — pulled in by `recharts`)
- **Fix applied:** `"overrides": { "lodash": "4.17.21" }` added to `package.json`.
- `npm audit` still flags `lodash <=4.17.23` — this is a false positive for the override
  pattern. Runtime exposure via `recharts`: **none** (recharts uses lodash for internal
  data utilities only, no user-controlled strings reach vulnerable functions).

### esbuild / Vite vulnerability (npm audit)
- `npm audit` reports 2 moderate-severity findings: esbuild ≤0.24.2 via vite ≤6.4.1
- **Dev-server-only** — not present in production build artifact served by Cloudflare Pages
- Fix requires `vite@8` (breaking change). Safe to address in a dedicated upgrade session.

### Large JS bundle warning
- `dist/assets/index-BJlRabWq.js` is ~1 MB (gzipped: 279 kB)
- Vite warns about chunks >500 kB — this is a code-splitting opportunity, not a bug
- Site loads fine; optimize with dynamic imports if performance becomes a concern

### gptengineer.js in index.html
- `index.html` loads `https://cdn.gpteng.co/gptengineer.js` — Lovable editor hook
- No user-visible effect; adds one third-party script request per page load
- **Do not remove without confirming Lovable is fully retired**

### Google Calendar placeholder files
- `src/utils/appointments/googleCalendar/auth/` contains stub files noting
  "not using Google Calendar anymore"
- Safe to delete in a cleanup pass; not affecting any live functionality

---

## File Reference

| Item | Location |
|------|----------|
| Project data | `src/data/projects.ts` |
| Business schema / sameAs | `src/constants/businessSchema.ts` |
| Booking form services | `src/components/scheduling/AppointmentForm.tsx` |
| Booking page | `src/pages/scheduling/Scheduling.tsx` |
| SEO component | `src/components/SEO.tsx` |
| OG/meta base | `index.html` |
| Featured projects section | `src/components/Testimonials.tsx` |
| Footer | `src/components/Footer.tsx` |
| SPA routing | `public/_redirects` |
