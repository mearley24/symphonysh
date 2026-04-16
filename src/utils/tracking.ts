declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackPhoneClick() {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      // SETUP: Replace with your phone conversion label from Google Ads
      'send_to': 'ADS_CONVERSION_ID/PHONE_CONVERSION_LABEL',
    });
    window.gtag('event', 'phone_click', {
      'event_category': 'engagement',
      'event_label': '(970) 519-3013',
    });
  }
}

export function trackScheduleSubmit() {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      // SETUP: Replace with your schedule conversion label from Google Ads
      'send_to': 'ADS_CONVERSION_ID/SCHEDULE_CONVERSION_LABEL',
      'value': 1.0,
      'currency': 'USD',
    });
    window.gtag('event', 'schedule_submit', {
      'event_category': 'conversion',
      'event_label': 'consultation_booked',
    });
  }
}

export function trackPageView(pagePath: string, pageTitle: string) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      'page_path': pagePath,
      'page_title': pageTitle,
    });
  }
}
