export function ArtisansIntro() {
  return (
    <section
      aria-labelledby="artisans-intro-heading"
      className="w-full bg-ths-cream"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 py-20 md:grid-cols-12 md:gap-16 md:px-10 md:py-28">
        <div className="md:col-span-5">
          <p className="text-xs uppercase tracking-[0.35em] text-ths-earth">
            The people behind the pieces
          </p>
          <h2
            id="artisans-intro-heading"
            className="mt-4 font-display text-3xl leading-tight tracking-tight text-ths-ink md:text-4xl lg:text-[2.75rem]"
          >
            Craft is a person, not
            <br className="hidden md:block" />
            <span className="text-ths-earth"> a product.</span>
          </h2>
        </div>

        <div className="flex flex-col justify-center md:col-span-7">
          <p className="text-base leading-relaxed text-ths-ink/80 md:text-lg">
            We work directly with small artisan clusters across India &mdash;
            most of them family-run, most of them working with skills passed
            down over generations. Every collection at THS begins with a
            conversation in their workshop, not a spec-sheet. What we carry is
            what they choose to make, priced so that their time is met with
            fair value.
          </p>
          <div aria-hidden className="mt-8 h-px w-16 bg-ths-ink/25" />
          <p className="mt-8 text-sm leading-relaxed text-ths-ink/65 md:text-base">
            A short introduction to four of the communities we&rsquo;re proud
            to work with today.
          </p>
        </div>
      </div>
    </section>
  );
}
