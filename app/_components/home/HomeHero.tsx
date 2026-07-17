import Link from "next/link";

const HERO_IMAGE =
  "https://static.wixstatic.com/media/dc7de4_0e1986de468f4b4588fc559759ea5a99~mv2.jpeg/v1/fill/w_1920,h_1200,al_c,q_90,enc_avif,quality_auto/home-hero.jpg";

export function HomeHero() {
  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative isolate w-full overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat md:bg-fixed"
        style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ths-ink/90 via-ths-ink/60 to-ths-ink/15"
      />

      <div className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-7xl flex-col justify-end px-5 pb-14 pt-24 sm:min-h-[78vh] sm:px-6 sm:pb-20 sm:pt-32 md:min-h-[88vh] md:px-10 md:pb-28 md:pt-40">
        <div className="max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.4em] text-ths-clay sm:text-xs">
            Handmade in India
          </p>
          <h1
            id="home-hero-heading"
            className="mt-4 font-display text-[2.75rem] leading-[1.02] tracking-tight text-ths-cream sm:mt-5 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Every piece has
            <br />
            a maker.
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ths-cream/85 sm:mt-7 sm:text-base md:text-lg">
            The Hand Made Store carries small-batch pieces made with artisan
            communities across India &mdash; cork, khadi, seed paper,
            terracotta, pukhoor embroidery. Materials that mean something, in
            the hands of makers who know them best.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
            <Link
              href="/products"
              className="inline-flex w-full items-center justify-center border border-ths-cream bg-ths-cream px-8 py-4 text-xs uppercase tracking-[0.28em] text-ths-ink transition-colors duration-300 hover:bg-transparent hover:text-ths-cream sm:w-auto sm:py-3.5"
            >
              Shop the store
            </Link>
            <Link
              href="/artisans"
              className="inline-flex w-full items-center justify-center border border-ths-cream/50 bg-transparent px-8 py-4 text-xs uppercase tracking-[0.28em] text-ths-cream transition-colors duration-300 hover:border-ths-cream hover:bg-ths-cream/10 sm:w-auto sm:py-3.5"
            >
              Meet the makers
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
