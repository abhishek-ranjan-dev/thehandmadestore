export function ContactHero() {
  return (
    <section
      aria-labelledby="contact-hero-heading"
      className="mx-auto w-full max-w-7xl px-5 pt-24 pb-8 sm:px-6 sm:pt-28 md:px-10 md:pt-32 lg:pt-36"
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
        <p className="mt-5 text-[15px] leading-relaxed text-ths-ink/75 sm:mt-6 sm:text-base md:text-lg">
          We love our customers. Reach out anytime &mdash; we&rsquo;re available
          via email, live chat, or the form below.
        </p>
      </div>
    </section>
  );
}
