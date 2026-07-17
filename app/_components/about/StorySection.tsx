import Image from "next/image";

const STORY_IMAGE =
  "https://static.wixstatic.com/media/dc7de4_5ce649c78c594f08b128954a7f8405f0~mv2.jpeg/v1/fill/w_900,h_1110,al_c,q_85,enc_avif,quality_auto/story.jpeg";

const META = [
  { label: "Founded", value: "2019" },
  { label: "Origin", value: "India" },
  { label: "Craft", value: "Handmade" },
];

export function StorySection() {
  return (
    <section
      id="story"
      aria-labelledby="story-heading"
      className="relative w-full overflow-hidden bg-ths-cream"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-14 px-6 py-16 md:grid-cols-12 md:gap-16 md:px-10 md:py-20">
        {/* Framed image with offset accent */}
        <div className="relative md:col-span-6">
          <div
            aria-hidden
            className="absolute -bottom-4 -left-4 hidden h-full w-full border border-ths-earth/40 md:block"
          />
          <div
            aria-hidden
            className="absolute -right-6 -top-6 hidden h-24 w-24 bg-ths-sand md:block"
          />
          <figure className="relative aspect-[4/5] w-full overflow-hidden bg-ths-earth shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]">
            <Image
              src={STORY_IMAGE}
              alt="An Indian artisan crafting a handmade product"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-[50%_51%]"
            />
            <figcaption className="absolute left-0 top-6 flex items-center gap-3 bg-ths-cream/95 py-2 pl-4 pr-6 text-[10px] uppercase tracking-[0.35em] text-ths-ink backdrop-blur">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-ths-earth" />
              Since 2019
            </figcaption>
          </figure>
        </div>

        {/* Editorial copy */}
        <div className="relative flex flex-col justify-center md:col-span-6">
          <div className="flex items-baseline gap-6">
            <span
              aria-hidden
              className="font-display text-[6rem] leading-none tracking-tight text-ths-earth/25 md:text-[9rem]"
            >
              2019
            </span>
            <div className="flex flex-col">
              <p className="text-[11px] uppercase tracking-[0.4em] text-ths-earth">
                Our Story
              </p>
              <h2
                id="story-heading"
                className="mt-2 font-display text-4xl leading-tight tracking-tight text-ths-ink md:text-5xl"
              >
                Where it began.
              </h2>
            </div>
          </div>

          <div
            aria-hidden
            className="mt-10 h-px w-16 bg-ths-ink/30"
          />

          <p className="mt-10 font-display text-2xl leading-snug text-ths-ink md:text-3xl">
            Handcrafted, ethical products &mdash; from Indian hands to yours.
          </p>

          <div className="mt-6 space-y-5 text-base leading-relaxed text-ths-ink/80 md:text-lg">
            <p>
              In 2019 we set out to change how everyday things are made. We
              partnered with indigenous communities of Indian heritage
              craftsmen to promote fair trade and sustainability through
              traditional, handcrafted products for the modern, ethically
              conscious buyer.
            </p>
            <p>
              Every piece carries the weight of the hand that made it &mdash;
              slow, deliberate, and rooted in a craft that has lived for
              generations.
            </p>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-ths-ink/15 pt-8">
            {META.map(({ label, value }) => (
              <div key={label}>
                <dt className="text-[10px] uppercase tracking-[0.3em] text-ths-earth">
                  {label}
                </dt>
                <dd className="mt-2 font-display text-lg text-ths-ink md:text-xl">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
