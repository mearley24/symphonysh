import { Link } from "react-router-dom";
import { ArrowRight, Phone, CheckCircle2, ShieldCheck, MessageSquare, Wrench } from "lucide-react";
import { testimonials } from "../data/testimonials";

/**
 * Homepage proof section.
 *
 * Behavior:
 *   - If src/data/testimonials.ts has real entries → renders them as a
 *     testimonial block.
 *   - If the array is empty (default) → renders a premium "What Working With
 *     Symphony Looks Like" proof block so the homepage still conveys
 *     credibility without fabricated quotes.
 *
 * No placeholder/stock testimonials are ever rendered.
 */
const ClientTestimonials = () => {
  const hasQuotes = testimonials.length > 0;

  if (hasQuotes) {
    return (
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/25 backdrop-blur-sm border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div data-reveal className="text-center mb-12">
            <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
              What Clients Say
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Kind words from Vail Valley homeowners
            </h2>
          </div>

          <div data-reveal-children className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="bg-black/40 border border-white/8 rounded-xl p-6 flex flex-col gap-4"
              >
                <span
                  aria-hidden="true"
                  className="text-5xl leading-none font-serif text-accent/10 select-none"
                >
                  &ldquo;
                </span>
                <blockquote className="text-white/75 text-sm italic leading-relaxed -mt-4">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-auto pt-3 border-t border-white/8">
                  <p className="text-white font-semibold text-sm">{t.author}</p>
                  <p className="text-white/40 text-xs">
                    {t.role ? `${t.role} — ` : ""}
                    {t.location}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // No real quotes yet — render a premium proof block instead of fake ones.
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Licensed, insured, and local",
      description:
        "Based in Eagle County. Proper licensing and insurance in place. We show up in a marked truck and work to the code your inspector expects.",
    },
    {
      icon: MessageSquare,
      title: "One accountable team on your job",
      description:
        "Our team keeps every project organized from first walkthrough through final training. Same accountable crew, same phone number — clear ownership all the way through.",
    },
    {
      icon: Wrench,
      title: "Built to be serviceable",
      description:
        "Labeled cables, documented rack builds, and systems designed so the next service call is quick. No mystery wiring five years from now.",
    },
    {
      icon: CheckCircle2,
      title: "Transparent pricing",
      description:
        "Itemized proposals with clear line items and no surprise add-ons. You see the scope and the cost before we pick up a tool.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/25 backdrop-blur-sm border-y border-white/5">
      <div className="max-w-5xl mx-auto">
        <div data-reveal className="text-center mb-12">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">
            What to Expect
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            What working with Symphony looks like
          </h2>
          <p className="text-white/50 text-sm sm:text-base max-w-2xl mx-auto mt-3">
            You are hiring someone to wire and program your home. It should feel professional from
            the first phone call to the final walkthrough.
          </p>
        </div>

        <div data-reveal-children className="grid sm:grid-cols-2 gap-5 mb-10">
          {pillars.map((item, i) => (
            <div
              key={i}
              className="flex gap-4 p-5 rounded-xl border border-white/8 bg-black/40 backdrop-blur-sm hover:border-accent/20 transition-colors"
            >
              <item.icon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          data-reveal
          className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
        >
          <Link
            to="/scheduling"
            className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm"
          >
            Schedule a Walkthrough <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="tel:+19705193013"
            className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm"
          >
            <Phone className="w-4 h-4" /> (970) 519-3013
          </a>
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonials;
