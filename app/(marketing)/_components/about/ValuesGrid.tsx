import type { SVGProps } from "react";

const stroke = {
  fill: "none" as const,
  strokeWidth: 1.4,
  stroke: "currentColor" as const,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const IconMadeInIndia = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" {...stroke} {...props}>
    <circle cx="24" cy="24" r="18" />
    <circle cx="24" cy="24" r="4" />
    <path d="M24 6v6M24 36v6M6 24h6M36 24h6M12 12l4 4M32 32l4 4M12 36l4-4M32 16l4-4" />
  </svg>
);

const IconMinimalWaste = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" {...stroke} {...props}>
    <path d="M12 16h24l-2 22a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4L12 16z" />
    <path d="M18 16V10a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v6" />
    <path d="M20 22v14M28 22v14" />
  </svg>
);

const IconCrueltyFree = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" {...stroke} {...props}>
    <path d="M14 22c-4-4-6-10-4-14 4-2 10 0 14 4" />
    <path d="M34 22c4-4 6-10 4-14-4-2-10 0-14 4" />
    <path d="M24 20c-6 0-12 4-12 12s6 8 12 8 12 0 12-8-6-12-12-12z" />
    <circle cx="20" cy="30" r="1.2" fill="currentColor" />
    <circle cx="28" cy="30" r="1.2" fill="currentColor" />
  </svg>
);

const IconFairlyMade = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" {...stroke} {...props}>
    <path d="M24 6v34" />
    <path d="M10 14h28" />
    <path d="M14 14l-4 10a5 5 0 0 0 10 0l-4-10M34 14l-4 10a5 5 0 0 0 10 0l-4-10" />
    <path d="M16 40h16" />
  </svg>
);

const IconChemicalFree = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" {...stroke} {...props}>
    <path d="M20 6h8v10l8 18a6 6 0 0 1-6 8H18a6 6 0 0 1-6-8l8-18V6z" />
    <path d="M20 6h8" />
    <path d="M10 40l28-32" />
  </svg>
);

const IconAyurvedic = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" {...stroke} {...props}>
    <path d="M24 42c-8 0-14-6-14-14 0-8 6-14 14-14 8 0 14 6 14 14 0 8-6 14-14 14z" />
    <path d="M24 14c0 8-6 14-14 14M24 14c0-8 6-14 14-14" />
    <path d="M24 22v14" />
  </svg>
);

const VALUES = [
  { label: "Made in India", Icon: IconMadeInIndia },
  { label: "Minimal Waste", Icon: IconMinimalWaste },
  { label: "Cruelty-free", Icon: IconCrueltyFree },
  { label: "Fairly Made", Icon: IconFairlyMade },
  { label: "Chemical-free", Icon: IconChemicalFree },
  { label: "Ayurvedic", Icon: IconAyurvedic },
];

export function ValuesGrid() {
  return (
    <section
      id="values"
      aria-labelledby="values-heading"
      className="w-full"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20">
        <div
          className="group relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-white/70 via-ths-sand/60 to-ths-clay/25 px-5 py-12 sm:px-6 sm:py-14 shadow-[0_20px_50px_-25px_rgba(23,17,13,0.4)] backdrop-blur-xl md:px-14 md:py-20"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-br from-ths-clay/40 to-transparent blur-3xl"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-gradient-to-tr from-ths-teal/25 to-transparent blur-3xl"
          />

          <div className="relative mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-ths-earth">
              What We Stand For
            </p>
            <h2
              id="values-heading"
              className="mt-3 font-display text-4xl leading-tight tracking-tight text-ths-ink md:text-5xl"
            >
              Our Values
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ths-ink/75 sm:text-base">
              As an eco-conscious brand, a small set of fundamentals shapes every
              product &mdash; from source to shelf.
            </p>
          </div>

          <ul className="relative mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-10 sm:mt-14 sm:grid-cols-3 sm:gap-y-12 lg:grid-cols-6">
            {VALUES.map(({ label, Icon }) => (
              <li
                key={label}
                className="group/item flex flex-col items-center gap-4 text-center"
              >
                <span
                  className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border border-white/70 bg-white/60 text-ths-ink shadow-sm backdrop-blur transition-all duration-500 group-hover/item:-translate-y-1 group-hover/item:border-ths-earth/50 group-hover/item:bg-ths-ink group-hover/item:text-ths-cream group-hover/item:shadow-[0_12px_25px_-12px_rgba(23,17,13,0.5)]"
                  style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                >
                  <Icon className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden />
                </span>
                <span className="font-display text-sm leading-snug text-ths-ink sm:text-base">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
