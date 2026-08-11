import Image from "next/image";

const FOUNDER_PORTRAIT =
  "https://static.wixstatic.com/media/3581e8_1a7d8f0fa950423984bff96df7a49166~mv2.jpg/v1/crop/x_0,y_256,w_1599,h_1682/fill/w_800,h_840,al_c,q_85,enc_avif,quality_auto/IMG_9673-scaled_edited.jpg";

const FOUNDER_PORTFOLIO = "https://ashiwinirkurup.vercel.app/";
const EASE_APPLE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";

export function FounderSection() {
  return (
    <section
      id="founder"
      aria-labelledby="founder-heading"
      className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-5 pt-24 pb-14 sm:gap-14 sm:px-6 sm:pt-28 sm:pb-16 md:grid-cols-2 md:gap-20 md:px-10 md:pt-32 lg:pt-36"
    >
      <div className="order-2 flex flex-col justify-center md:order-1">
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-ths-earth">
          Our Founder
        </p>
        <h1
          id="founder-heading"
          className="font-display text-4xl leading-tight tracking-tight text-ths-ink md:text-5xl lg:text-6xl"
        >
          Ashwini R. Kurup
        </h1>
        <p className="mt-3 text-sm uppercase tracking-[0.2em] text-ths-moss">
          NIFT Textile Designer &middot; Sustainable Lifestyle Advocate
        </p>
        <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ths-ink/85 sm:mt-8 sm:space-y-5 sm:text-base md:text-lg">
          <p>
            A Textile Designer from NIFT on a journey to promote and adapt a
            sustainable lifestyle and conscious living. At the age of 21 she
            realised that a conscious step had to be taken to support our
            artisans and heritage crafts before they languish — while also
            caring about the environment and making sustainable lifestyle
            affordable.
          </p>
          <p>
            With the growing awareness of sustainable lifestyle and eco-friendly
            alternatives, The Hand Made Store is Ashwini&rsquo;s conscious step
            to help crafts and artisans sustain — using eco-friendly materials
            and practices, ethical manufacturing, and products that are good for
            the environment as well as your body.
          </p>
        </div>

        <div className="mt-8 sm:mt-10">
          <a
            href={FOUNDER_PORTFOLIO}
            target="_blank"
            rel="noreferrer noopener"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-ths-ink/25 bg-white/60 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-ths-ink shadow-[0_6px_20px_-8px_rgba(0,0,0,0.25)] backdrop-blur-lg transition-all duration-500 hover:border-ths-ink/60 hover:bg-white hover:shadow-[0_10px_28px_-8px_rgba(0,0,0,0.35)] active:scale-[0.97]"
            style={{ transitionTimingFunction: EASE_APPLE_OUT }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-ths-ink/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              style={{ transitionTimingFunction: EASE_APPLE_OUT }}
            />
            <span className="relative">Visit Ashwini&rsquo;s Portfolio</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
              style={{ transitionTimingFunction: EASE_APPLE_OUT }}
              aria-hidden
            >
              <path d="M7 17L17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </a>
        </div>
      </div>

      <div className="order-1 md:order-2">
        <figure className="relative aspect-[4/5] w-full overflow-hidden bg-ths-sand">
          <Image
            src={FOUNDER_PORTRAIT}
            alt="Portrait of founder Ashwini R. Kurup"
            fill
            priority
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        </figure>
      </div>
    </section>
  );
}
