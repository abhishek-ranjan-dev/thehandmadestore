const HERO_BAND =
  "https://static.wixstatic.com/media/dc7de4_3cedf41fecde42448a3923a511955c93~mv2.jpg/v1/fill/w_1920,h_1080,al_c,q_90,enc_avif,quality_auto/artisan-hero.jpg";

export function HeroDivider() {
  return (
    <section
      aria-labelledby="hero-divider-quote"
      className="relative h-[55vh] min-h-[380px] w-full overflow-hidden bg-ths-earth bg-scroll bg-cover md:h-[75vh] md:min-h-0 md:bg-fixed"
      style={{
        backgroundImage: `url(${HERO_BAND})`,
        backgroundPosition: "54% 34%",
      }}
    >
      {/* editorial gradients */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ths-ink/75 via-ths-ink/25 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ths-ink/40 via-transparent to-transparent md:from-ths-ink/50"
      />

      {/* pull-quote */}
      <div className="absolute inset-x-0 bottom-0 px-5 pb-10 sm:px-6 sm:pb-14 md:px-12 md:pb-20 lg:px-20 lg:pb-24">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
          <span className="text-[11px] uppercase tracking-[0.4em] text-ths-cream/80">
            The Hands Behind the Craft
          </span>
          <blockquote
            id="hero-divider-quote"
            className="font-display text-2xl leading-snug text-ths-cream sm:text-3xl md:max-w-3xl md:text-4xl lg:text-5xl"
          >
            &ldquo;Every stitch, every fold — carried forward by women whose
            craft has outlived generations.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}
