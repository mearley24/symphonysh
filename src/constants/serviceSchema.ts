import {
  BUSINESS_NAME,
  BUSINESS_PHONE_E164,
  BUSINESS_URL,
} from './businessSchema';

/**
 * Generates a Service JSON-LD schema object for a service page.
 * Pass the result into the `schema` prop of the SEO component.
 */
export function servicePageSchema(service: {
  name: string;
  description: string;
  url: string;
  areaServed?: string[];
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "url": `${BUSINESS_URL}${service.url}`,
    "provider": {
      "@type": "LocalBusiness",
      "name": BUSINESS_NAME,
      "telephone": BUSINESS_PHONE_E164,
      "url": BUSINESS_URL,
      "areaServed": (service.areaServed || ["Vail", "Beaver Creek", "Edwards", "Avon", "Eagle"]).map(city => ({
        "@type": "City",
        "name": `${city}, Colorado`
      }))
    },
    "areaServed": {
      "@type": "State",
      "name": "Colorado"
    }
  };
}
