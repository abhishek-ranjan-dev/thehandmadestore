import type { SVGProps } from "react";

type Pillar = {
  eyebrow: string;
  title: string;
  body: string;
  Icon: (props: SVGProps<SVGSVGElement>) => React.JSX.Element;
};

const IconWave = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" fill="none" strokeWidth={1.4} stroke="currentColor" {...props}>
    <path d="M4 20c4-4 8-4 12 0s8 4 12 0 8-4 12 0 4 0 4 0" />
    <path d="M4 30c4-4 8-4 12 0s8 4 12 0 8-4 12 0 4 0 4 0" />
    <circle cx="24" cy="10" r="3" />
  </svg>
);

const IconLeaf = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" fill="none" strokeWidth={1.4} stroke="currentColor" {...props}>
    <path d="M40 8C22 8 10 20 10 34c0 3 1 5 3 6C13 24 24 14 40 12v-4z" />
    <path d="M13 40C22 30 32 22 40 12" />
  </svg>
);

const IconRecycle = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" fill="none" strokeWidth={1.4} stroke="currentColor" {...props}>
    <path d="M14 20l6-10 6 10" />
    <path d="M34 28l-6 10-6-10" />
    <path d="M38 22a14 14 0 0 0-14-14M10 26a14 14 0 0 0 14 14" />
    <path d="M20 10l-6 0 0 6M28 38l6 0 0-6" />
  </svg>
);

const IconMortar = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" fill="none" strokeWidth={1.4} stroke="currentColor" {...props}>
    <path d="M10 20h28l-3 12a6 6 0 0 1-6 5h-10a6 6 0 0 1-6-5L10 20z" />
    <path d="M20 20c0-6 4-10 8-12" />
  </svg>
);

const PILLARS: Pillar[] = [
  {
    eyebrow: "Our Mission",
    title: "Plastic-Free Oceans",
    body:
      "Every product ships without single-use plastic. We choose materials the earth can take back.",
    Icon: IconWave,
  },
  {
    eyebrow: "Our Craft",
    title: "Sustainable Packaging",
    body:
      "Recycled kraft, seed paper, cotton twine — packaging designed to compost, not pile up.",
    Icon: IconLeaf,
  },
  {
    eyebrow: "Our Practice",
    title: "Zero Waste",
    body:
      "Small-batch runs, upcycled offcuts, and workshops built to keep waste out of the story.",
    Icon: IconRecycle,
  },
  {
    eyebrow: "Our Ingredients",
    title: "Natural Ingredients",
    body:
      "Plant-based, Ayurvedic, and chemical-free — kind to your skin and to the land it came from.",
    Icon: IconMortar,
  },
];

export function ImpactPillars() {
  return (
    <section
      id="impact"
      aria-labelledby="impact-heading"
      className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 md:py-20"
    >
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.35em] text-ths-earth">
          Our Footprint
        </p>
        <h2
          id="impact-heading"
          className="mt-3 font-display text-4xl leading-tight tracking-tight text-ths-ink md:text-5xl"
        >
          The Hand Made Store Impact
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ths-ink/75">
          Four pillars guide every choice — from the fibers we source to the
          box that reaches your door.
        </p>
      </div>

      <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PILLARS.map(({ eyebrow, title, body, Icon }) => (
          <li
            key={title}
            className="group relative overflow-hidden rounded-2xl border border-white/50 bg-gradient-to-br from-white/70 via-white/40 to-ths-sand/50 p-7 shadow-[0_10px_30px_-18px_rgba(23,17,13,0.35)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-ths-earth/40 hover:shadow-[0_22px_45px_-20px_rgba(23,17,13,0.4)]"
            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ths-teal/0 via-ths-clay/0 to-ths-earth/0 opacity-0 transition-opacity duration-500 group-hover:from-ths-teal/10 group-hover:via-ths-clay/10 group-hover:to-ths-earth/20 group-hover:opacity-100"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br from-ths-clay/30 to-transparent blur-2xl transition-transform duration-700 group-hover:scale-125"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-gradient-to-tr from-ths-teal/20 to-transparent blur-2xl transition-transform duration-700 group-hover:scale-125"
            />

            <div className="relative flex flex-col gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/60 bg-white/70 text-ths-ink shadow-sm backdrop-blur transition-transform duration-500 group-hover:scale-110 group-hover:text-ths-teal-dark">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <p className="text-[10px] uppercase tracking-[0.3em] text-ths-earth">
                {eyebrow}
              </p>
              <h3 className="font-display text-xl leading-snug text-ths-ink">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-ths-ink/75">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
