# symphonysh — Site Status

Business-focused snapshot of the public site. Updated each pass with what
moved the needle on trust / conversion, and what is still blocked on real
input from Matt.

---

## ✅ Business-Impact Pass — April 18, 2026

This pass treated the site as revenue infrastructure, not a design project.
Every change here is aimed at conversion, trust, or launch-readiness.

### Build
- `npm run build` — clean, **0 TypeScript errors**, 2,687 modules transformed
- `dist/lovable-uploads/` unchanged (all 128 real project photos still shipped)
- `dist/_redirects` present (`/* /index.html 200` — SPA routing intact)

### What got stronger

**1. Killed a live analytics bug that was hurting trust on every pageview.**
- `index.html` was loading `googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID`
  — a literal placeholder string that 404'd on every single page load,
  showed up in browser consoles, and sent noise to Google. Removed.
- `src/utils/tracking.ts` rewritten: lazy-loads `gtag.js` only when real
  `VITE_GA_MEASUREMENT_ID` is set as a Cloudflare Pages env var. Same for
  Google Ads conversion labels. No requests fire for missing IDs.
- `src/main.tsx` now calls `initAnalytics()` at boot; fallback UI polished,
  production error overlays silenced without swallowing dev warnings.
- `GOOGLE_SETUP.md` rewritten from scratch — now documents the env-var
  workflow so wiring this up is a 5-minute job when Matt has the GA4/Ads
  IDs in hand.

**2. Removed fake testimonials. Replaced with a premium fallback.**
- `src/components/ClientTestimonials.tsx` no longer contains the three
  invented "Homeowner, Beaver Creek" / "Builder, Vail" quotes — those
  violated the CLAUDE.md "no fabricated testimonials" rule and would have
  been a liability the first time a real client asked about them.
- New data file `src/data/testimonials.ts` with a typed `Testimonial[]`
  that is **empty by design** until Matt collects real quotes with
  consent.
- When the array is empty, the component renders a premium
  "What Working With Symphony Looks Like" proof block — four pillars
  (licensed & local · one person on your job · built to be serviceable ·
  transparent pricing) — so the homepage still carries weight without
  lying.
- As soon as real quotes are added to the array, the testimonial grid
  renders instead. No code changes required.

**3. Previous Work now leads with saleable projects.**
- `src/data/projects.ts` reordered. The first 3 entries (used by the
  homepage `<Testimonials>` Featured block) are now:
  1. **Eagle-Vail Home Theater** — dedicated basement cinema, 7 strong photos
  2. **Full-Home AV Install** — 11 displays, 11 photos, the most impressive
     "you're hiring a serious integrator" proof in the portfolio
  3. **Backbox Fireplace Mount** — the "this is how it's supposed to be done"
     detail-shot story
- Weak single-photo projects (Cordillera, West Vail) deprioritised to the
  bottom — they no longer appear in homepage Featured slots.
- Featured Projects headline rewritten from "Featured Projects" →
  **"Real installs from real Vail Valley homes"** with a subhead calling
  out "no stock imagery, no rendered mockups" — directly counters the
  AI/stock-photo skepticism buyers bring into the evaluation.

**4. Booking flow: confirmation page now sets expectations.**
- `src/pages/scheduling/components/ConfirmationPage.tsx` rewritten.
- Before: "Appointment Confirmed" + a bare details box. A buyer couldn't
  tell whether anyone would actually call them back.
- After: success mark → "Thanks — we'll be in touch" → the details the
  user submitted → a **3-step "What happens next" block** (review →
  conversation → walkthrough) → **response-time expectation** ("Mon–Fri
  8–6, Sat 9–4; after-hours → next business day") → tel + mailto
  fallback → a quiet "browse recent projects while you wait" link to
  `/projects`.
- This is the last impression before the human handoff — now it reassures
  instead of leaving a vacuum.

**5. Contact page: "What happens next" added.**
- Replaced the weak "Prefer to schedule a time?" CTA section with a
  3-card reassurance block: **quick reply → walkthrough → clear
  proposal**. Same psychology as the confirmation page — reduces the
  "is this a real business?" hesitation before someone even fills the
  form.
- Form error copy tightened. Silent Zapier/contact-email failures now
  point users at the phone line instead of printing to console.

**6. Cleaned production console noise in the booking flow.**
- `ZapierNotifier.tsx` — removed verbose payload/`console.log` logging.
- `AppointmentDetails.tsx` — removed `console.error` in date formatter.
- `Contact.tsx` — removed `console.error` on submit failure.
- Pre-existing `DateTimeSelector` / `useAppointmentData` logs left in
  place (touching them is out of scope for a conversion pass — low impact,
  high risk of breaking the stable booking path).

**7. Documentation upgraded to match a production business.**
- `README.md` rewritten: was the default Lovable template. Now
  describes the site's business role, the content-integrity rules (no
  fake testimonials / no stock images / no guessed sameAs), analytics
  wire-up, and deploy checklist. Anyone opening the GitHub repo now sees
  a serious operation, not a scaffolded demo.
- `GOOGLE_SETUP.md` rewritten around the env-var workflow.
- `index.html` `<head>` cleaned: honest comment about analytics being
  opt-in via env vars, added geo.position / ICBM / theme-color, larger
  image preview hint for SERP thumbnails, OG image alt, `og:locale`.

**8. Homepage hero subtext made more honest.**
- Was: *"One team from pre-wire to programming — reliable technology for
  homeowners and builders across Eagle County."*
- Now: *"A one-person integrator with a trusted Eagle County crew.
  Pre-wire through programming — designed, installed, and supported by
  the same person you call."*
- Matches reality (Matt + crew), matches the rest of the site, and
  turns the one-person reality from a weakness into a competitive
  advantage (direct accountability).

### Files changed this pass

| File | Change |
|---|---|
| `index.html` | Remove broken GA placeholder script; add geo/OG/theme polish; honest analytics comment |
| `README.md` | Replace Lovable template with real business-focused README |
| `GOOGLE_SETUP.md` | Rewrite around Cloudflare env vars + lazy gtag load |
| `src/main.tsx` | Call `initAnalytics()`; cleaner error fallback; production-only overlay suppression |
| `src/utils/tracking.ts` | Lazy gtag loader; no-op when IDs unset; env-var-driven conversions |
| `src/components/ClientTestimonials.tsx` | Drop fake quotes; premium proof fallback; render real quotes when present |
| `src/components/Testimonials.tsx` | Headline + subhead now explicitly credibility-building |
| `src/data/testimonials.ts` | New — typed empty array, documented contract |
| `src/data/projects.ts` | Reordered, strongest-first; tightened scopes on lead projects |
| `src/pages/Index.tsx` | Hero subtext rewritten for honesty + conversion |
| `src/pages/Contact.tsx` | "What happens next" reassurance section; clean error UX |
| `src/pages/scheduling/components/ConfirmationPage.tsx` | Full rewrite — expectation-setting, response-time promise, fallbacks |
| `src/pages/scheduling/components/confirmation/ZapierNotifier.tsx` | Silent, no console noise |
| `src/pages/scheduling/components/confirmation/AppointmentDetails.tsx` | Removed console.error |

---

## 🚧 Still blocked on real business input from Matt

These are the only items between the current site and a fully launch-ready
marketing asset. None require code changes — just content / credentials.

### 1. Real client testimonials (highest conversion impact)
- File: `src/data/testimonials.ts`
- Schema is in place. Add real quotes + first names + locations once you
  have written consent.
- 3 real quotes from recent projects (Eagle-Vail Theater, full-home
  install, BC condo) would be the single highest-return content update.

### 2. Google Analytics 4 + Google Ads IDs
- File: `GOOGLE_SETUP.md` has the step-by-step.
- Set these in Cloudflare Pages → Settings → Environment variables:
  - `VITE_GA_MEASUREMENT_ID`
  - `VITE_GOOGLE_ADS_CONVERSION_ID`
  - `VITE_ADS_PHONE_LABEL`
  - `VITE_ADS_SCHEDULE_LABEL`
- Without these, the site loads fine, there's just no conversion data.

### 3. Google Search Console verification
- Claim `https://symphonysh.com` at <https://search.google.com/search-console>.
- Uncomment the `google-site-verification` meta tag in `index.html` with
  the real code Google gives you.
- Submit `https://symphonysh.com/sitemap.xml`.

### 4. Verified `sameAs` profile URLs
- File: `src/constants/businessSchema.ts` → `BUSINESS_SAME_AS`.
- Currently empty by design. Add ONLY confirmed-live profile URLs:
  - Google Business Profile (claim at business.google.com — highest
    local-SEO ROI).
  - Facebook page (if active).
  - Instagram — the header/footer currently link to
    `instagram.com/symphonysmarthomes` and `g.page/symphonysmarthomes`.
    **Confirm these are live accounts you own** — if not, we should
    remove them from the header/footer too. That's a 2-minute fix once
    confirmed either way.

### 5. Business address confirmation
- `BUSINESS_ADDRESS` in `businessSchema.ts` is set to
  `45 Aspen Glen Ct, Edwards CO 81632`. If that's a personal address you
  don't want publicly listed on Google Business Profile, say the word and
  we'll remove the `address` + `geo` fields from the homepage schema and
  use a service-area-only LocalBusiness instead.

---

## 🟢 Already strong — no action needed

- **15 real projects** with real photos wired to real subcategory galleries.
- **9 service pages** with interactive demos, consistent hero + FAQ pattern.
- **Booking + contact flows** are end-to-end functional (Supabase edge
  function for contact, Zapier webhook for scheduling, sessionStorage
  fallback).
- **Schema**: LocalBusiness + FAQ + breadcrumb schema on the pages that
  matter; canonical URLs set; `_redirects` handles SPA routing.
- **Mobile**: sticky click-to-call bar, mobile-optimised hero, 44px+
  tap targets throughout.
- **Legacy redirects** preserved for `/pre-wiring`, `/installation`,
  `/maintenance`, `/3d-tours`, `/portfolio`, `/networking`.

---

## 📏 Known low-priority items (deliberately not addressed this pass)

- Large JS bundle (~1 MB / 289 kB gzipped). Fine for launch; revisit
  with a code-splitting pass later if Lighthouse scores slip.
- `npm audit` flags `esbuild` + `lodash` (both dev-only / transitive
  false-positives via `recharts`). Not runtime-exposed.
- `gptengineer.js` Lovable editor hook still in `index.html` — previous
  status noted not to remove without confirming Lovable is fully
  retired. Keep for now.
- Several `console.log` / `console.error` calls in non-critical
  components (DateTimeSelector, PhotoGallery, photo-gallery pages).
  Cleaning them all would be a broad refactor beyond the scope of a
  business-impact pass; all the user-facing production-critical ones
  (booking flow, analytics, contact form) have been cleaned.

---

## File Reference (quick map)

| Item | Location |
|------|----------|
| Homepage | `src/pages/Index.tsx` |
| Services hub | `src/pages/Services.tsx` |
| Service pages | `src/pages/services/*.tsx` |
| Projects list | `src/pages/Projects.tsx` |
| Project detail | `src/pages/ProjectDetail.tsx` |
| Project data | `src/data/projects.ts` |
| Testimonials | `src/components/ClientTestimonials.tsx` + `src/data/testimonials.ts` |
| Booking flow | `src/pages/scheduling/` |
| Confirmation | `src/pages/scheduling/components/ConfirmationPage.tsx` |
| Contact | `src/pages/Contact.tsx` |
| Business schema / sameAs | `src/constants/businessSchema.ts` |
| Analytics | `src/utils/tracking.ts` + `src/main.tsx` |
| SEO base | `index.html` + `src/components/SEO.tsx` |
| Shared nav / footer | `src/components/Header.tsx` + `Footer.tsx` |
| SPA routing | `public/_redirects` |

*Last updated: April 18, 2026 — business-impact pass.*
