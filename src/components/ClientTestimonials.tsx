// TODO: Replace placeholder testimonials with real client quotes

const testimonials = [
  {
    quote: "Matt handled everything from pre-wire to final programming. One guy, one phone call, zero runaround. Our system just works.",
    author: "Homeowner",
    location: "Beaver Creek, CO",
  },
  {
    quote: "We've used other integrators in the valley. Symphony is the only one that picks up the phone and actually shows up when they say they will.",
    author: "Homeowner",
    location: "Edwards, CO",
  },
  {
    quote: "Clean wiring, clean install, and he walked us through everything before he left. Exactly what we needed.",
    author: "Builder",
    location: "Vail, CO",
  },
];

const ClientTestimonials = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-black/25 backdrop-blur-sm border-y border-white/5">
      <div className="max-w-5xl mx-auto">
        <div data-reveal className="text-center mb-12">
          <p className="text-accent font-medium text-sm tracking-wide uppercase mb-2">Testimonials</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">What Clients Say</h2>
        </div>

        <div data-reveal-children className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-black/40 border border-white/8 rounded-xl p-6 flex flex-col gap-4"
            >
              {/* Decorative quote mark */}
              <span className="text-5xl leading-none font-serif text-accent/10 select-none">&ldquo;</span>
              <p className="text-white/70 text-sm italic leading-relaxed -mt-4">{t.quote}</p>
              <div className="mt-auto pt-2 border-t border-white/8">
                <p className="text-white font-semibold text-sm">{t.author}</p>
                <p className="text-white/40 text-xs">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonials;
