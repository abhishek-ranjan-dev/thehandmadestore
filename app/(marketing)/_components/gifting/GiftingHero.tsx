import { HeroStats } from "./HeroStats";

const HERO_IMAGE =
  "https://static.wixstatic.com/media/dc7de4_1c848c0315fd4aaea885023ef7c830be~mv2.jpg/v1/fill/w_1920,h_1280,al_c,q_90,enc_avif,quality_auto/gifting-hero.jpg";

export function GiftingHero() {
  return (
    <section
      aria-labelledby="gifting-hero-heading"
      className="relative isolate w-full overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat md:bg-fixed"
        style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ths-ink/90 via-ths-ink/60 to-ths-ink/20"
      />

      <div className="mx-auto flex min-h-svh w-full max-w-7xl flex-col justify-center px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-32">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-ths-clay">
            Bespoke Corporate Gifting
          </p>
          <h1
            id="gifting-hero-heading"
            className="mt-4 font-display text-4xl leading-tight tracking-tight text-ths-cream md:text-5xl lg:text-6xl"
          >
            Hampers that carry your brand&rsquo;s hand.
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ths-cream/85 sm:mt-6 sm:text-base md:text-lg">
            At THS, we specialize in crafting bespoke gifting hampers that are
            thoughtfully curated to meet the unique needs and values of each
            corporate client. Our process is designed to ensure that every
            hamper reflects the brand&rsquo;s identity and leaves a lasting
            impression.
          </p>

          <HeroStats />
        </div>
      </div>
    </section>
  );
}
