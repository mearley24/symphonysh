/**
 * Lightweight analytics helpers for Symphony Smart Homes.
 *
 * Design rules:
 *   1. Never fire events to placeholder IDs. If the real IDs aren't configured
 *      at build time, all tracking calls silently no-op. Previously we were
 *      loading `googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID` (a real
 *      HTTP request to a literal "GA_MEASUREMENT_ID" string) which 404'd on
 *      every pageview, polluted logs, and degraded trust signals.
 *   2. Load gtag.js lazily — only once, only when real IDs exist.
 *   3. All helpers are safe to call in SSR / test environments.
 *
 * Environment variables (set these in Cloudflare Pages project vars, not in
 * committed files — see SITE_STATUS.md):
 *
 *   VITE_GA_MEASUREMENT_ID         e.g. "G-XXXXXXXXXX"
 *   VITE_GOOGLE_ADS_CONVERSION_ID  e.g. "AW-XXXXXXXXXX"
 *   VITE_ADS_PHONE_LABEL           e.g. "abc123DEF" (the part after the slash)
 *   VITE_ADS_SCHEDULE_LABEL        e.g. "xyz456GHI"
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const ADS_ID = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID as string | undefined;
const ADS_PHONE_LABEL = import.meta.env.VITE_ADS_PHONE_LABEL as string | undefined;
const ADS_SCHEDULE_LABEL = import.meta.env.VITE_ADS_SCHEDULE_LABEL as string | undefined;

const isConfigured = (id: string | undefined): id is string =>
  typeof id === 'string' && id.length > 0 && !id.includes('XXXX') && !id.includes('MEASUREMENT');

let initialised = false;

/**
 * Lazily inject the Google tag. No-ops if GA_ID is missing or still a placeholder.
 */
export function initAnalytics(): void {
  if (initialised) return;
  if (typeof window === 'undefined') return;
  if (!isConfigured(GA_ID)) return;

  window.dataLayer = window.dataLayer || [];
  // Use Array.prototype.push so gtag is defined before the remote script loads.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    (window.dataLayer as unknown[]).push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { send_page_view: true });
  if (isConfigured(ADS_ID)) {
    window.gtag('config', ADS_ID);
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  initialised = true;
}

function sendEvent(name: string, params: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

export function trackPhoneClick(): void {
  sendEvent('phone_click', {
    event_category: 'engagement',
    event_label: '(970) 519-3013',
  });
  if (isConfigured(ADS_ID) && isConfigured(ADS_PHONE_LABEL)) {
    sendEvent('conversion', {
      send_to: `${ADS_ID}/${ADS_PHONE_LABEL}`,
    });
  }
}

export function trackScheduleSubmit(): void {
  sendEvent('schedule_submit', {
    event_category: 'conversion',
    event_label: 'consultation_booked',
  });
  if (isConfigured(ADS_ID) && isConfigured(ADS_SCHEDULE_LABEL)) {
    sendEvent('conversion', {
      send_to: `${ADS_ID}/${ADS_SCHEDULE_LABEL}`,
      value: 1.0,
      currency: 'USD',
    });
  }
}

export function trackPageView(pagePath: string, pageTitle: string): void {
  sendEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle,
  });
}
