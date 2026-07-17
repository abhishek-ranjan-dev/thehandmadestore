import Image from "next/image";
import Link from "next/link";

const EASE_APPLE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";

type Card = {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  image: string;
  alt: string;
  objectPosition?: string;
};

const CARDS: Card[] = [
  {
    eyebrow: "The people",
    title: "Meet our\nartisans.",
    body: "Four communities across India whose craft shapes every collection we carry — from the potters of Dharavi to the Toda embroiderers of the Nilgiris.",
    href: "/artisans",
    cta: "Meet the makers",
    image:
      "https://static.wixstatic.com/media/dc7de4_89d0a41203db4fd59e85fdfa0b05206c~mv2.jpg/v1/fill/w_1400,h_1050,al_c,q_90,enc_avif,quality_auto/artisans-preview.jpg",
    alt: "A Dharavi potter shaping clay at the wheel",
    objectPosition: "50% 45%",
  },
  {
    eyebrow: "The story",
    title: "About the\nstudio.",
    body: "A women-owned studio building a direct, fair relationship between the artisans we work with and the people who take their craft home.",
    href: "/about-us",
    cta: "Read our story",
    image:
      "https://static.wixstatic.com/media/dc7de4_737d8936f83041728b2582f6a2677c38~mv2.jpg/v1/fill/w_1400,h_1050,al_c,q_90,enc_avif,quality_auto/story-preview.jpg",
    alt: "Naturally dyed khadi textiles from Gandhigram",
    objectPosition: "50% 40%",
  },
];

function ExploreCard({ card }: { card: Card }) {
  return (
    <article className="group flex flex-col">
      <Link
        href={card.href}
        className="block overflow-hidden bg-ths-earth shadow-[0_16px_40px_-20px_rgba(23,17,13,0.4)]"
      >
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={card.image}
            alt={card.alt}
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            style={{
              objectPosition: card.objectPosition ?? "50% 50%",
              transitionTimingFunction: EASE_APPLE_OUT,
            }}
          />
        </div>
      </Link>
      <div className="mt-6 flex flex-col">
        <p className="text-xs uppercase tracking-[0.35em] text-ths-earth">
          {card.eyebrow}
        </p>
        <h3 className="mt-3 whitespace-pre-line font-display text-3xl leading-tight tracking-tight text-ths-ink md:text-4xl">
          {card.title}
        </h3>
        <p className="mt-4 max-w-md text-base leading-relaxed text-ths-ink/80 md:text-[0.975rem]">
          {card.body}
        </p>
        <Link
          href={card.href}
          className="mt-6 inline-flex w-fit items-center gap-2 border-b border-ths-ink pb-1 text-xs uppercase tracking-[0.3em] text-ths-ink transition-opacity duration-300 hover:opacity-60"
        >
          {card.cta}
          <span aria-hidden>&rarr;</span>
        </Link>
      </div>
    </article>
  );
}

export function HomeExplore() {
  return (
    <section
      aria-labelledby="home-explore-heading"
      className="w-full bg-ths-cream"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-ths-earth">
            Beyond the shop
          </p>
          <h2
            id="home-explore-heading"
            className="mt-3 font-display text-4xl leading-tight tracking-tight text-ths-ink md:text-5xl"
          >
            The hands and the
            <br />
            <span className="text-ths-earth">story behind them.</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-2 md:gap-16">
          {CARDS.map((card) => (
            <ExploreCard key={card.href} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
