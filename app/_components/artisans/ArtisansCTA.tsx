import Link from "next/link";

export function ArtisansCTA() {
  return (
    <section
      aria-labelledby="artisans-cta-heading"
      className="relative isolate w-full overflow-hidden bg-ths-ink"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-[28rem] w-[28rem] rounded-full bg-ths-earth/25 blur-[100px]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-[24rem] w-[24rem] rounded-full bg-ths-clay/15 blur-[100px]"
      />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-12 md:gap-16 md:px-10 md:py-28">
        <div className="md:col-span-7">
          <p className="text-xs uppercase tracking-[0.35em] text-ths-clay">
            The everyday, made by hand
          </p>
          <h2
            id="artisans-cta-heading"
            className="mt-4 font-display text-4xl leading-tight tracking-tight text-ths-cream md:text-5xl lg:text-6xl"
          >
            Meet the makers.
            <br />
            <span className="text-ths-clay">Shop the craft.</span>
          </h2>
        </div>

        <div className="flex flex-col justify-end md:col-span-5">
          <p className="text-base leading-relaxed text-ths-cream/80 md:text-lg">
            Every piece in the store carries a name and a place. If you
            &rsquo;d like to know more about the makers behind a specific
            product, or work with us on a commission, we&rsquo;d love to hear
            from you.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="https://thehandmadestore.co.in"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-center rounded-none border border-ths-cream bg-ths-cream px-7 py-3.5 text-xs uppercase tracking-[0.28em] text-ths-ink transition-colors duration-300 hover:bg-transparent hover:text-ths-cream"
            >
              Visit the shop
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-none border border-ths-cream/40 bg-transparent px-7 py-3.5 text-xs uppercase tracking-[0.28em] text-ths-cream transition-colors duration-300 hover:border-ths-cream hover:bg-ths-cream/10"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
