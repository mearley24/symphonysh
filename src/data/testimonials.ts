/**
 * Real client testimonials for Symphony Smart Homes.
 *
 * BUSINESS RULE — DO NOT FABRICATE
 * --------------------------------
 * Only add entries here when they come from a real client with their consent.
 * Every entry must include a real first name (last initial is fine), a real
 * location (city + CO), and a quote the client actually said.
 *
 * Leave this array empty rather than filling with placeholders. The
 * homepage `ClientTestimonials` component auto-hides when the array is empty,
 * so the site stays premium-looking while Matt collects real proof.
 *
 * When adding a quote:
 *   1. Get written consent (text, email, or signed form).
 *   2. Fill in all fields.
 *   3. `npm run build` to verify.
 *
 * Optional `projectSlug` links the quote to the matching entry in projects.ts
 * so clicking it can deep-link to the project gallery (not required).
 */

export interface Testimonial {
  /** Real client first name (last initial OK, e.g. "Sarah K."). No stock names. */
  author: string;
  /** City + state (e.g. "Beaver Creek, CO"). */
  location: string;
  /** Role, if relevant: "Homeowner", "Builder", "Interior Designer". */
  role?: string;
  /** Their actual words. Trim lightly for grammar only — don't rewrite. */
  quote: string;
  /** Optional — matches a slug in src/data/projects.ts */
  projectSlug?: string;
}

/**
 * Publicly displayed testimonials. Empty by design until real quotes arrive.
 * See note above before adding entries.
 */
export const testimonials: Testimonial[] = [];
