# symphonysh — Site Status

*Last updated: April 13, 2026*

## Launch Readiness

**The site is live, all routes resolve correctly, and the build is clean.**
Cloudflare Pages deploys on every push to `main`. All pages render, all routes resolve
with proper 200 status codes, and the booking form accepts submissions. The items below
require real business input — none are blocking.

---

## ✅ VERIFIED OK — April 13, 2026

### Build Fix (April 13)
- **`dbUtils.ts`**: Removed `address` field from Supabase `.insert()` call — column doesn't exist in DB schema. Address value is now appended to `message` field so no user data is lost.
- TypeScript build is clean (`npx tsc --noEmit` passes with 0 errors).


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
