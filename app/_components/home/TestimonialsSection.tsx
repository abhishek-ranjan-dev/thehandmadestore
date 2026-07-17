const EASE_APPLE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";

type Testimonial = {
  quote: string;
  author: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Ashwini's passion towards a sustainable lifestyle is amazing. The products are of very good quality and we don't feel guilty because every product is good for the environment. The Hand Made Store is a perfect place to shop for gifts — birthdays, anniversaries, or corporate gifting — and it suits every budget. Highly recommended.",
    author: "Jaya Chhetri",
  },
  {
    quote:
      "Awesome products — natural and pure, chemical free. My skin loved it, and the results are visible and appreciated. Thank you, Ashu.",
    author: "Bhavika Sooraj",
  },
  {
    quote:
      "I was made to understand the small contribution from my end to keep the resources available for the coming generation by being sustainable, and making do with the resources already available with me. Enjoying authentic, purest form of products — chemical free, adding to a healthier way of living. Thank you for being a change in my thought process. Appreciated.",
    author: "Bindu Kurup",
  },
];

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M10 1.6l2.6 5.35 5.9.86-4.27 4.16 1.01 5.87L10 14.99l-5.24 2.85 1.01-5.87L1.5 7.81l5.9-.86z" />
    </svg>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ths-earth/10 bg-white p-5 shadow-[0_1px_2px_rgba(23,17,13,0.03)] transition-shadow duration-500 hover:shadow-[0_10px_28px_-16px_rgba(23,17,13,0.18)] md:p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-ths-earth/[0.07] via-ths-earth/[0.12] to-ths-earth/[0.18] transition-transform duration-700 group-hover:translate-x-0"
        style={{ transitionTimingFunction: EASE_APPLE_OUT }}
      />
      <div className="relative z-10 flex h-full flex-col">
        <div
          className="flex gap-0.5 text-ths-earth"
          aria-label="5 out of 5 stars"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <StarIcon key={i} className="h-3.5 w-3.5" />
          ))}
        </div>

        <blockquote className="mt-4 flex-1">
          <p className="text-[14px] leading-[1.65] text-ths-ink/85">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
        </blockquote>

        <footer className="mt-5 border-t border-ths-earth/10 pt-4">
          <cite className="not-italic">
            <p className="font-display text-base text-ths-ink md:text-lg">
              {testimonial.author}
            </p>
          </cite>
        </footer>
      </div>
    </article>
  );
}

export function TestimonialsSection() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="w-full bg-ths-cream"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-24">
        <div className="rounded-3xl bg-gradient-to-br from-ths-sand/50 via-ths-cream to-ths-clay/15 px-5 py-12 sm:px-6 sm:py-14 md:px-14 md:py-20 lg:px-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] uppercase tracking-[0.35em] text-ths-earth sm:text-xs">
              Testimonials
            </p>
            <h2
              id="testimonials-heading"
              className="mt-3 font-display text-[1.75rem] leading-tight tracking-tight text-ths-ink sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl"
            >
              Kind words from
              <br />
              <span className="text-ths-earth">
                the people we make for.
              </span>
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 md:mt-16 md:grid-cols-3 md:gap-5">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.author} testimonial={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
