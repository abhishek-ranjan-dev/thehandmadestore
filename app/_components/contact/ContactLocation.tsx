import type { SVGProps } from "react";
import Image from "next/image";

const WORKSHOP_IMAGE =
  "https://static.wixstatic.com/media/dc7de4_eb1b992c05734baa883c67bf5d7d60b5~mv2.png/v1/fill/w_1600,h_1000,al_c,q_90,enc_avif,quality_auto/IMG-20231015-WA0005_edited.png";

const IconPin = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const IconClock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const HOURS = [
  { day: "Monday – Saturday", value: "10:00 – 20:00" },
  { day: "Sunday", value: "Closed" },
];

export function ContactLocation() {
  return (
    <section
      aria-labelledby="visit-heading"
      className="relative w-full overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src={WORKSHOP_IMAGE}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ths-ink/70 via-ths-ink/55 to-ths-ink/75" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 py-20 md:grid-cols-12 md:gap-16 md:px-10 md:py-28">
        <div className="md:col-span-5">
          <p className="text-xs uppercase tracking-[0.35em] text-ths-clay">
            Come by &amp; say hi
          </p>
          <h2
            id="visit-heading"
            className="mt-3 font-display text-3xl leading-tight tracking-tight text-ths-cream md:text-4xl lg:text-5xl"
          >
            Visit the studio.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ths-cream/85 md:text-lg">
            Stop by to see the craft up close &mdash; our workshop is where
            every piece begins.
          </p>
        </div>

        <div className="md:col-span-7">
          <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-white/85 via-white/65 to-white/50 p-8 shadow-[0_25px_60px_-25px_rgba(23,17,13,0.35)] backdrop-blur-xl md:p-12">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-24 -left-24 h-56 w-56 rounded-full bg-gradient-to-br from-ths-clay/25 to-transparent blur-3xl"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tr from-ths-teal/20 to-transparent blur-3xl"
            />

            <div className="relative">
              <p className="text-[10px] uppercase tracking-[0.4em] text-ths-earth">
                The Hand Made Store
              </p>
              <h3 className="mt-3 font-display text-2xl leading-tight text-ths-ink md:text-3xl">
                Mumbai, India
              </h3>

              <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-white/70 bg-white/70 text-ths-ink backdrop-blur">
                    <IconPin className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-ths-earth">
                      Find us
                    </p>
                    <p className="mt-2 text-base leading-relaxed text-ths-ink/85">
                      Mumbai, Maharashtra
                      <br />
                      By appointment for visits.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-white/70 bg-white/70 text-ths-ink backdrop-blur">
                    <IconClock className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-ths-earth">
                      Working hours
                    </p>
                    <dl className="mt-2 space-y-1 text-base text-ths-ink/85">
                      {HOURS.map(({ day, value }) => (
                        <div
                          key={day}
                          className="flex items-baseline justify-between gap-4"
                        >
                          <dt>{day}</dt>
                          <dd className="font-display text-ths-ink">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
