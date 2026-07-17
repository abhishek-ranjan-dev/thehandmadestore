export function ContactHero() {
  return (
    <section
      aria-labelledby="contact-hero-heading"
      className="mx-auto w-full max-w-7xl px-6 pt-12 pb-8 md:px-10 md:pt-20 lg:pt-24"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-ths-earth">
          Get in Touch
        </p>
        <h1
          id="contact-hero-heading"
          className="mt-4 font-display text-4xl leading-tight tracking-tight text-ths-ink md:text-5xl lg:text-6xl"
        >
          We&rsquo;d love to hear from you.
        </h1>
        <p className="mt-6 text-base leading-relaxed text-ths-ink/75 md:text-lg">
          We love our customers. Reach out anytime &mdash; we&rsquo;re available
          via email, live chat, or the form below.
        </p>
      </div>
    </section>
  );
}
