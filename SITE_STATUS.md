# symphonysh — Site Status

*Last updated: April 12, 2026 (final sweep)*

---

## Launch Readiness

**The site is functionally live and safe to use.**
Cloudflare Pages deploys on every push to `main`. All pages render, all routes resolve,
and the booking form accepts submissions. The items below are polish or require real
business input — none are blocking.

---

## ✅ Complete

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

### Polish (previous sweep)
- Removed 8 debug `console.log` statements from `Scheduling.tsx`
- Removed dead `testNavigation` function and its exposed "Test Navigation" button
  (was visible to real visitors in the booking flow)
- Removed `hide-gallery-buttons` / `show-gallery-buttons` debug entries from the
  service dropdown in `AppointmentForm.tsx` (were listed as bookable services)
- Removed stale `console.log` from `scheduling/index.tsx`
- Removed unused `useEffect` + `useState` imports from `AppointmentForm.tsx`

### Final sweep — image path cleanup (April 12, 2026)
- **Case-sensitivity fix** — `src/utils/photos/mountedTVs.ts`, `src/data/projects.ts`,
  `src/pages/photos/mounted-tvs/{Home,HP,Misc}.tsx`: folder names changed from
  lowercase (`home/`, `hp/`, `misc/`) to match actual disk casing (`Home/`, `HP/`, `Misc/`).
  Would have caused 404s on the case-sensitive Linux filesystem used by Cloudflare Pages.
- **Filename space fix** — `src/utils/photos/wiring.ts`: `IMG_0228 2.JPG` corrected to
  `IMG_0228-2.JPG` to match the actual filename on disk.
- **Removed `console.log`** from `src/App.tsx` ("App rendering, routes being set up").
- Build verified clean after all changes (`npm run build` — 0 errors, 2680 modules).

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

### lodash / CVE-2026-4800 (patched — April 12, 2026)
- **Affected package:** `lodash` (transitive — pulled in by `recharts`)
- **Root cause:** `recharts` resolved lodash to `4.18.1`, a supply-chain-compromised
  package not published by the lodash maintainers. npm shows `4.18.0` as a "bad
  release" too; the only legitimate release is `4.17.21`.
- **Advisories covered:**
  - CVE-2026-4800 / GHSA-r5fr-rjxr-66jc — Code Injection via `_.template` imports key names
  - GHSA-xxjr-mmjv-4gpg — Prototype Pollution in `_.unset` / `_.omit`
  - GHSA-f23m-r3pf-42rh — Prototype Pollution via array path bypass in `_.unset` / `_.omit`
- **Fix applied:** `"overrides": { "lodash": "4.17.21" }` added to `package.json`.
  Forces all transitive consumers to the only safe, non-deprecated, non-compromised
  lodash release. Lockfile regenerated; build verified passing.
- **Residual risk:** `npm audit` still flags `lodash <=4.17.23` because no patched
  version above that range is safe (4.18.0 deprecated, 4.18.1 compromised). The
  advisory CVEs require passing **user-controlled** input to `_.template` or
  `_.unset`/`_.omit`. `recharts` uses lodash only for internal data utilities
  (merge, cloneDeep, etc.) — no user-controlled strings reach those functions.
  Runtime exposure: **none**. Redeploy: **recommended** (evicts the compromised
  4.18.1 from the Cloudflare Pages build cache).

### esbuild / Vite vulnerability (npm audit)
- `npm audit` reports 2 moderate-severity findings: esbuild ≤0.24.2 via vite ≤6.4.1
- **This is a dev-server-only vulnerability** — esbuild does not appear in the
  production build artifact served by Cloudflare Pages. Visitors are not exposed.
- Fix requires `vite@8` (breaking change). Safe to address in a dedicated upgrade
  session; not urgent for production.
- Advisory: https://github.com/advisories/GHSA-67mh-4wv8-2f99

### gptengineer.js in index.html
- `index.html` loads `https://cdn.gpteng.co/gptengineer.js` in the body
- This is a Lovable/GPT Engineer editor hook. The file comment says "DO NOT REMOVE"
- It has no user-visible effect but does add a third-party script request on every
  page load. If Lovable is no longer used as an editor, this can be removed.
- **Do not remove without confirming Lovable is fully retired** — removing it could
  break the visual editor workflow

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
