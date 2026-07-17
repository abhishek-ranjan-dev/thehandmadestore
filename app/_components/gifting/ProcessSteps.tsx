import type { ComponentType, SVGProps } from "react";

const EASE_APPLE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";

type IconProps = SVGProps<SVGSVGElement>;

const IconConsultation = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M8 9h8" />
    <path d="M8 13h5" />
  </svg>
);

const IconPackage = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20 12v9H4v-9" />
    <path d="M2 7h20v5H2z" />
    <path d="M12 22V7" />
    <path d="M12 7H8a2 2 0 1 1 0-4c2.5 0 4 4 4 4z" />
    <path d="M12 7h4a2 2 0 1 0 0-4c-2.5 0-4 4-4 4z" />
  </svg>
);

const IconQuality = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M8.5 12.5l2.5 2.5 4.5-5" />
  </svg>
);

const IconSparkles = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 3l1.6 4.7L18 9l-4.4 1.5L12 15l-1.6-4.5L6 9l4.4-1.3z" />
    <path d="M19 15l.75 2.2L22 18l-2.25.8L19 21l-.75-2.2L16 18l2.25-.8z" />
    <path d="M5 15l.5 1.4L7 17l-1.5.5L5 19l-.5-1.5L3 17l1.5-.6z" />
  </svg>
);

type Step = {
  number: string;
  title: string;
  body: string;
  Icon: ComponentType<IconProps>;
  highlight: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Consultation",
    body: "Our dedicated team collaborates with each client to understand their specific gifting needs, budget, and brand identity.",
    Icon: IconConsultation,
    highlight: "Kick-off brief within 48 hours",
  },
  {
    number: "02",
    title: "Product & Packaging Selection",
    body: "We carefully curate products from our range, each meeting the highest standards of craftsmanship — paired with packaging built for an elevated, sustainable, and memorable unveiling.",
    Icon: IconPackage,
    highlight: "Custom samples on request",
  },
  {
    number: "03",
    title: "Quality Assurance",
    body: "Each item within the hamper or box undergoes a thorough quality check to ensure it meets the highest standards of craftsmanship and attention to detail.",
    Icon: IconQuality,
    highlight: "Hand-inspected, every unit",
  },
  {
    number: "04",
    title: "Thoughtful Gifting Experiences",
    body: "Our team constantly explores fresh gift ideas that capture the essence of your brand. From concept to delivery, we provide personalized guidance for a seamless, delightful experience.",
    Icon: IconSparkles,
    highlight: "Delivered pan-India",
  },
];

export function ProcessSteps() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 md:py-24"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <p className="text-xs uppercase tracking-[0.35em] text-ths-earth">
            Our Process
          </p>
          <h2
            id="process-heading"
            className="mt-3 font-display text-4xl leading-[1.05] tracking-tight text-ths-ink md:text-5xl lg:text-6xl"
          >
            Four considered
            <br className="hidden md:block" />
            <span className="text-ths-earth"> steps.</span>
          </h2>
        </div>
        <div className="flex flex-col justify-end md:col-span-5 md:pb-2">
          <p className="text-base leading-relaxed text-ths-ink/75 md:text-lg">
            A transparent, unhurried process built to keep quality &mdash; and
            your brand&rsquo;s voice &mdash; at the centre of every hamper we
            craft.
          </p>
        </div>
      </div>

      <ol className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
        {STEPS.map(({ number, title, body, Icon, highlight }) => (
          <li
            key={number}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/60 bg-gradient-to-br from-white/75 via-white/45 to-ths-sand/50 p-7 shadow-[0_10px_30px_-18px_rgba(23,17,13,0.35)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-ths-earth/50 hover:shadow-[0_28px_50px_-22px_rgba(23,17,13,0.42)]"
            style={{ transitionTimingFunction: EASE_APPLE_OUT }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br from-ths-clay/30 to-transparent blur-2xl transition-transform duration-700 group-hover:scale-125"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-gradient-to-tr from-ths-teal/20 to-transparent opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
            />

            <div className="relative flex flex-1 flex-col gap-5">
              <div className="flex items-start justify-between gap-4">
                <span
                  className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-ths-ink/15 bg-white/70 text-ths-ink transition-all duration-500 group-hover:-translate-y-0.5 group-hover:border-ths-ink group-hover:bg-ths-ink group-hover:text-ths-cream group-hover:shadow-[0_10px_25px_-14px_rgba(23,17,13,0.6)]"
                  style={{ transitionTimingFunction: EASE_APPLE_OUT }}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="font-display text-5xl leading-none text-ths-clay md:text-6xl">
                  {number}
                </span>
              </div>

              <span
                aria-hidden
                className="h-px w-10 bg-ths-ink/25 transition-all duration-500 group-hover:w-20 group-hover:bg-ths-earth"
              />

              <h3 className="font-display text-xl leading-snug text-ths-ink md:text-[1.375rem]">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-ths-ink/75 md:text-[0.95rem]">
                {body}
              </p>
            </div>

            <div className="relative mt-6 flex items-center gap-3 border-t border-ths-ink/10 pt-5">
              <span
                aria-hidden
                className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-ths-clay transition-transform duration-500 group-hover:scale-125"
              />
              <span className="text-[11px] uppercase tracking-[0.22em] text-ths-ink/70">
                {highlight}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
