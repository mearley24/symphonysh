# Google Analytics, Ads & Search Console — Symphony Smart Homes

Analytics and conversion tracking are wired up but **not active** until real IDs
are set as Cloudflare Pages environment variables. Until then, `initAnalytics()`
in `src/utils/tracking.ts` no-ops cleanly — nothing is sent anywhere, and no
placeholder `GA_MEASUREMENT_ID` requests are made.

**Nothing in this file should be committed with real secrets. Variables live in
the Cloudflare Pages dashboard only.**

---

## Environment variables

Set these in **Cloudflare Pages → symphonysh → Settings → Environment variables**
(Production environment). Rebuild or redeploy after saving.

| Variable | Example | Required for |
|---|---|---|
| `VITE_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | All analytics |
| `VITE_GOOGLE_ADS_CONVERSION_ID` | `AW-XXXXXXXXXX` | Ads conversion attribution |
| `VITE_ADS_PHONE_LABEL` | `abc123DEF` (string after the slash) | Phone-click conversion |
| `VITE_ADS_SCHEDULE_LABEL` | `xyz456GHI` | Schedule-submit conversion |

Once at least `VITE_GA_MEASUREMENT_ID` is set, `gtag.js` is loaded lazily on
first paint. All tracking helpers in `src/utils/tracking.ts` send events only
when their required IDs are present. No requests fire for missing IDs.

---

## Step 1 · Google Analytics 4

1. Go to <https://analytics.google.com>.
2. Create a new GA4 property for **symphonysh.com**.
3. Create a **Web data stream** pointing at `https://symphonysh.com`.
4. Copy the Measurement ID (format `G-XXXXXXXXXX`).
5. In Cloudflare Pages env vars set `VITE_GA_MEASUREMENT_ID = G-XXXXXXXXXX`.
6. Redeploy. Verify in GA4 **Realtime** report within 24 h.

## Step 2 · Google Ads conversions

1. Google Ads → **Goals → Conversions → New conversion action** → Website.
2. Create two conversions (keep defaults otherwise):
   - `Schedule Consultation` — category **Submit lead form**, value `1 USD`.
   - `Phone Call Click` — category **Phone call leads**.
3. Under each conversion, open **Tag setup → Use Google Tag Manager** *or*
   **Install the tag yourself** → grab the **Conversion ID** (`AW-XXXXXXXXXX`)
   and the per-conversion **label** (the string after the `/`).
4. In Cloudflare Pages env vars:
   - `VITE_GOOGLE_ADS_CONVERSION_ID = AW-XXXXXXXXXX`
   - `VITE_ADS_PHONE_LABEL = <phone label>`
   - `VITE_ADS_SCHEDULE_LABEL = <schedule label>`
5. Redeploy. In Google Ads use the **Tag Assistant** extension on the live site
   to confirm both conversions fire on a test click / submit.

## Step 3 · Google Search Console

1. Go to <https://search.google.com/search-console>.
2. Add property: `https://symphonysh.com`.
3. Choose **HTML tag** verification.
4. Copy the `content="..."` value from the meta tag Google provides.
5. Open `index.html`, uncomment the `google-site-verification` meta tag, and
   paste in the real code. Commit + push.
6. Once deployed, click **Verify** in Search Console.
7. Submit the sitemap: `https://symphonysh.com/sitemap.xml`.

## Step 4 · Link accounts

1. **GA4 → Admin → Google Ads Links** → link the Ads account.
2. **Google Ads → Tools → Linked accounts → Google Analytics (GA4)** → link GA4.
3. **Search Console → Settings → Associations** → link the GA4 property.

---

## Business Profile sameAs (once live)

When the Google Business Profile, Facebook page, or Instagram account is live
and verified, paste the canonical share URLs into
`src/constants/businessSchema.ts` under `BUSINESS_SAME_AS`. Never use guessed
URLs — wrong `sameAs` entries hurt search trust more than leaving the array
empty.

---

## Verifying locally (optional)

Create a `.env.local` (ignored by git) with the same `VITE_*` vars and run
`npm run dev` — GA4 realtime should pick up the dev session from your IP.
