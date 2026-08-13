const HERO_IMAGE =
  "https://static.wixstatic.com/media/dc7de4_3a6d86e29fbe4d6186617f6a626a5d54~mv2.jpg/v1/crop/x_0,y_3,w_2992,h_1307/fill/w_1920,h_838,al_c,q_90,enc_avif,quality_auto/artisans-hero.jpg";

export function ArtisansHero() {
  return (
    <section
      aria-labelledby="artisans-hero-heading"
      className="relative isolate w-full overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat md:bg-fixed"
        style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ths-ink/90 via-ths-ink/55 to-ths-ink/25"
      />

      <div className="mx-auto flex min-h-svh w-full max-w-7xl flex-col justify-end px-5 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:px-10 md:pb-24 md:pt-40">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.4em] text-ths-clay">
            Our People
          </p>
          <h1
            id="artisans-hero-heading"
            className="mt-5 font-display text-5xl leading-[1.02] tracking-tight text-ths-cream md:text-6xl lg:text-7xl"
          >
            Meet our&nbsp;artisans.
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ths-cream/85 sm:mt-7 sm:text-base md:text-lg">
            Behind every piece we sell is a person, a place, and a practice
            older than us. These are the makers we work with &mdash; from the
            Nilgiri Hills to the potters&rsquo; colony in Dharavi &mdash; and
            the traditions their hands keep alive.
          </p>
        </div>
      </div>
    </section>
  );
}
