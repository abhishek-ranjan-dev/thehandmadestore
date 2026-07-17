import Image from "next/image";
import Link from "next/link";

const EASE_APPLE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";

type Service = {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
};

const SERVICES: Service[] = [
  {
    title: "Corporate Gifting",
    description:
      "Thoughtful hampers built around your brand — sustainable, story-led, and delivered at scale.",
    image: {
      src: "https://static.wixstatic.com/media/dc7de4_8c7add10f3fb4d21b2d5d34c6803e7eb~mv2.png/v1/fill/w_720,h_960,al_c,q_90,enc_avif,quality_auto/service-corporate.png",
      alt: "Corporate gifting hamper",
    },
  },
  {
    title: "Festive Hampers",
    description:
      "Curated seasonal boxes for Diwali, Holi, Rakhi and beyond — every piece made by an artisan.",
    image: {
      src: "https://static.wixstatic.com/media/dc7de4_cacb29c40ad7462faf247d6ab4462573~mv2.png/v1/fill/w_720,h_960,al_c,q_90,enc_avif,quality_auto/service-festive.png",
      alt: "Festive hamper for the season",
    },
  },
  {
    title: "Custom Curations",
    description:
      "Wedding trousseaus, return gifts, or private orders — hand-picked with you, made with our makers.",
    image: {
      src: "https://static.wixstatic.com/media/dc7de4_4170fa86630942e0b820adf7fbb0cd43~mv2.png/v1/fill/w_720,h_960,al_c,q_90,enc_avif,quality_auto/service-custom.png",
      alt: "Custom curated gift box",
    },
  },
];

function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ths-sand/60 sm:aspect-[3/4]">
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]"
          style={{ transitionTimingFunction: EASE_APPLE_OUT }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ths-ink/70 via-ths-ink/20 to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-7">
          <h3 className="font-display text-xl leading-tight text-ths-cream sm:text-2xl md:text-3xl">
            {service.title}
          </h3>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ths-ink/75 sm:mt-5 md:text-base">
        {service.description}
      </p>
    </article>
  );
}

export function ServicesSection() {
  return (
    <section
      aria-labelledby="services-heading"
      className="w-full bg-ths-cream"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-24">
        <div className="rounded-3xl bg-gradient-to-br from-ths-clay/20 via-ths-sand/40 to-ths-cream px-5 py-12 sm:px-6 sm:py-16 md:px-14 md:py-20 lg:px-20 lg:py-24">
          <div className="flex flex-col gap-5 sm:gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
            <div className="max-w-2xl">
              <p className="text-[11px] uppercase tracking-[0.35em] text-ths-earth sm:text-xs">
                Our services
              </p>
              <h2
                id="services-heading"
                className="mt-3 font-display text-[1.75rem] leading-tight tracking-tight text-ths-ink sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl"
              >
                Beyond the shelf,
                <br />
                <span className="text-ths-earth">gifting with intent.</span>
              </h2>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-ths-ink/70 sm:text-base md:text-lg">
              Working with a team, a wedding, or a season? We put together
              hampers with the same care that goes into every piece we stock.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-14 sm:grid-cols-2 md:mt-16 md:gap-10 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>

          <div className="mt-10 flex justify-center sm:mt-14 md:mt-16">
            <Link
              href="/services"
              className="inline-flex w-full items-center justify-center gap-3 border border-ths-ink px-8 py-4 text-xs uppercase tracking-[0.3em] text-ths-ink transition-colors duration-300 hover:bg-ths-ink hover:text-ths-cream sm:w-auto sm:py-3.5"
            >
              <span>Explore services</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
