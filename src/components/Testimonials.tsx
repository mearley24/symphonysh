import { Quote } from "lucide-react";

// TODO: Replace placeholder testimonials with real client testimonials once collected
const testimonials: {
  quote: string;
  name: string;
  location: string;
  projectType: string;
}[] = [
  {
    // TODO: Replace with real testimonial
    quote:
      "Matt's crew did our rough-in before drywall and came back for the rack and TVs. No radio silence after the invoice — that's been rare for us up here.",
    name: "Sarah K.",
    location: "Edwards, CO",
    projectType: "New Build Pre-Wire & Trim-Out",
  },
  {
    // TODO: Replace with real testimonial
    quote:
      "We'd already been burned by an out-of-state installer. Matt actually picks up the phone and fixes what he puts in.",
    name: "James T.",
    location: "Vail, CO",
    projectType: "Service & Upgrades",
  },
  {
    // TODO: Replace with real testimonial
    quote:
      "The theater room gets comments every time we have people over. Wiring behind the rack is as tidy as the front of the house.",
    name: "Maria L.",
    location: "Beaver Creek, CO",
    projectType: "Home Theater",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/15 backdrop-blur-sm border-y border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">What Clients Say</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Trusted in the Valley</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <article
              key={i}
              className="relative flex flex-col rounded-xl border border-white/10 bg-black/45 backdrop-blur-sm p-6 pt-8 shadow-lg shadow-black/20 hover:border-white/15 transition-colors duration-200"
            >
              <Quote
                className="absolute top-4 right-4 h-8 w-8 text-accent/80"
                aria-hidden
                strokeWidth={1.25}
              />
              <blockquote className="text-white/85 text-sm leading-relaxed mb-6 flex-1 pr-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <footer className="border-t border-white/10 pt-4 mt-auto">
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-white/45 text-xs mt-1">
                  {t.location}
                  <span className="text-white/25"> · </span>
                  {t.projectType}
                </p>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
