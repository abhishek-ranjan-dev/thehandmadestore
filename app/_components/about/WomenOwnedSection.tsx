import Image from "next/image";
import { VideoLoop } from "./VideoLoop";

const WORKSHOP_IMAGE =
  "https://static.wixstatic.com/media/3581e8_8ab193b20cac473ebe09f4b5cc12a82d~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85,enc_avif,quality_auto/IMG_9617-scaled.jpg";

export function WomenOwnedSection() {
  return (
    <section
      id="women-owned"
      aria-labelledby="women-owned-heading"
      className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-5 py-14 sm:gap-10 sm:px-6 sm:py-16 md:grid-cols-12 md:gap-8 md:px-10 md:py-20"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ths-sand md:col-span-6 md:aspect-auto md:min-h-[520px]">
        <Image
          src={WORKSHOP_IMAGE}
          alt="Products from The Hand Made Store workshop"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-[43%_30%]"
        />
      </div>

      <div className="flex flex-col justify-center gap-4 sm:gap-6 md:col-span-4">
        <p className="text-xs uppercase tracking-[0.35em] text-ths-earth">
          Who We Are
        </p>
        <h2
          id="women-owned-heading"
          className="font-display text-3xl leading-tight tracking-tight text-ths-ink md:text-4xl lg:text-5xl"
        >
          A women-owned local business.
        </h2>
        <p className="text-base leading-relaxed text-ths-ink/80 md:text-lg">
          Every piece in our jewelry, home decor, and lifestyle collections is
          carefully curated and crafted with sustainable and eco-friendly
          practices. Join us in celebrating the art of handmade &mdash; and
          discover the beauty in every detail.
        </p>
      </div>

      <div className="hidden md:col-span-2 md:block md:min-h-[520px]">
        <VideoLoop className="h-full" />
      </div>
    </section>
  );
}
