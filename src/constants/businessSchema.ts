/**
 * Canonical NAP + LocalBusiness fields for JSON-LD across the site.
 *
 * sameAs: Add only verified profile URLs (Google Business Profile, Facebook,
 * Instagram, LinkedIn company page). Wrong links hurt trust with search engines.
 */

export const BUSINESS_NAME = 'Symphony Smart Homes';

/** Primary site URL (www optional; keep consistent with canonical in SEO.tsx) */
export const BUSINESS_URL = 'https://symphonysh.com';

export const BUSINESS_EMAIL = 'info@symphonysh.com';

/** E.164 for schema.org telephone */
export const BUSINESS_PHONE_E164 = '+19705193013';

export const BUSINESS_ADDRESS = {
  '@type': 'PostalAddress' as const,
  streetAddress: '45 Aspen Glen Ct',
  addressLocality: 'Edwards',
  addressRegion: 'CO',
  postalCode: '81632',
  addressCountry: 'US',
};

export const BUSINESS_GEO = {
  '@type': 'GeoCoordinates' as const,
  latitude: 39.6403,
  longitude: -106.3742,
};

export const BUSINESS_OPENING_HOURS = {
  '@type': 'OpeningHoursSpecification' as const,
  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  opens: '08:00',
  closes: '17:00',
};

/**
 * Official profiles for the same organization (Google Business, Facebook, Instagram, LinkedIn).
 * We could not verify public social/GBP URLs from the web — add yours here when you have them
 * (copy “Share” links from each profile). Wrong links hurt SEO trust.
 */
export const BUSINESS_SAME_AS: string[] = [];

/** Google Maps search for the business address (helps discovery; not a substitute for GBP sameAs). */
export const BUSINESS_HAS_MAP_URL =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('45 Aspen Glen Ct, Edwards, CO 81632, USA');

export const BUSINESS_AREA_SERVED_PLACES = [
  { '@type': 'Place' as const, name: 'Vail Valley, Colorado' },
  { '@type': 'Place' as const, name: 'Eagle County, Colorado' },
  { '@type': 'Place' as const, name: 'Vail, Colorado' },
  { '@type': 'Place' as const, name: 'Beaver Creek, Colorado' },
  { '@type': 'Place' as const, name: 'Edwards, Colorado' },
  { '@type': 'Place' as const, name: 'Avon, Colorado' },
];

/** For Service.provider and similar — full enough for rich results consistency */
export const schemaProviderLocalBusiness = {
  '@type': 'LocalBusiness',
  name: BUSINESS_NAME,
  telephone: BUSINESS_PHONE_E164,
  email: BUSINESS_EMAIL,
  url: BUSINESS_URL,
  areaServed: 'Vail Valley, Eagle County, Colorado',
};

/** Slim LocalBusiness JSON-LD for About and similar pages */
export function aboutPageLocalBusinessSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BUSINESS_NAME,
    description:
      'Professional smart home integration serving Vail Valley and Eagle County, Colorado.',
    telephone: BUSINESS_PHONE_E164,
    email: BUSINESS_EMAIL,
    url: BUSINESS_URL,
    areaServed: 'Vail Valley, Eagle County, Colorado',
  };
}

export function localBusinessHomePageSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BUSINESS_URL}/#business`,
    name: BUSINESS_NAME,
    description:
      'Professional smart home integration, pre-wire, installation, and maintenance serving Vail Valley and Eagle County, Colorado. Certified Control4 dealer.',
    url: BUSINESS_URL,
    telephone: BUSINESS_PHONE_E164,
    email: BUSINESS_EMAIL,
    areaServed: BUSINESS_AREA_SERVED_PLACES,
    address: BUSINESS_ADDRESS,
    geo: BUSINESS_GEO,
    openingHoursSpecification: BUSINESS_OPENING_HOURS,
    serviceType: [
      'Smart Home Integration',
      'Home Automation',
      'Control4 Installation',
      'Pre-Wiring & Structured Cabling',
      'AV Installation',
      'Home Theater Installation',
      'Smart Lighting',
      'Motorized Shades',
      'Home Networking',
      'Security Camera Installation',
      'Matterport 3D Scanning',
    ],
    priceRange: '$$$$',
    image: `${BUSINESS_URL}/og-image.png`,
    sameAs: BUSINESS_SAME_AS.length > 0 ? BUSINESS_SAME_AS : undefined,
    hasMap: BUSINESS_HAS_MAP_URL,
  };
}
