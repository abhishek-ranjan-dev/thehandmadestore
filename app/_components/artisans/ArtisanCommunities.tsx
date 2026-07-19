import { LightboxImage } from "@/app/_components/ui/LightboxImage";

const EASE_APPLE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";

type MediaAsset = {
  src: string;
  alt: string;
  objectPosition?: string;
};

type Community = {
  eyebrow: string;
  origin: string;
  craft: string;
  title: string;
  body: string;
  lead: MediaAsset;
  gallery: MediaAsset[];
  imageOnRight: boolean;
};

const COMMUNITIES: Community[] = [
  {
    eyebrow: "Community 01",
    origin: "Dharavi, Mumbai",
    craft: "Terracotta pottery",
    title: "Potters of Dharavi",
    body: "Kumbharwada — the potters' colony inside Dharavi — has been shaped by generations of Prajapati families originally from Saurashtra. On kick-wheels, in open kilns, they still fire the terracotta diyas, planters, and earthen jars we carry. It is one of the oldest continuous craft neighbourhoods in the city.",
    lead: {
      src: "https://static.wixstatic.com/media/dc7de4_89d0a41203db4fd59e85fdfa0b05206c~mv2.jpg/v1/fill/w_1200,h_1500,al_c,q_90,enc_avif,quality_auto/dharavi-lead.jpg",
      alt: "A potter at work in Kumbharwada, Dharavi",
      objectPosition: "50% 45%",
    },
    gallery: [
      {
        src: "https://static.wixstatic.com/media/dc7de4_079ce5f621c143a3b03b49a8c484a720~mv2.jpg/v1/fill/w_900,h_900,al_c,q_85,enc_avif,quality_auto/dharavi-01.jpg",
        alt: "Terracotta forms drying in the sun",
        objectPosition: "50% 50%",
      },
      {
        src: "https://static.wixstatic.com/media/dc7de4_f38801e1b2c74472bfa5235197d0aff4~mv2.jpg/v1/fill/w_900,h_900,al_c,q_85,enc_avif,quality_auto/dharavi-02.jpg",
        alt: "Fresh pottery arranged on the workshop floor",
        objectPosition: "50% 50%",
      },
      {
        src: "https://static.wixstatic.com/media/dc7de4_148b8189784c4117b1d58e4afd6e7928~mv2.jpg/v1/fill/w_900,h_900,al_c,q_85,enc_avif,quality_auto/dharavi-03.jpg",
        alt: "Detail of a hand-thrown earthen vessel",
        objectPosition: "50% 50%",
      },
    ],
    imageOnRight: false,
  },
  {
    eyebrow: "Community 02",
    origin: "Dindigul, Tamil Nadu",
    craft: "Khadi & natural dyeing",
    title: "Gandhigram Dyeing",
    body: "Founded on Gandhian principles of self-reliance, the Gandhigram trust has kept khadi-spinning and natural-dye traditions alive in the south for decades. Indigo, madder root, pomegranate rind — the swatches on their walls colour the cotton pieces in our home-textile range. Slow-dyed, sun-dried, and finished by hand.",
    lead: {
      src: "https://static.wixstatic.com/media/dc7de4_737d8936f83041728b2582f6a2677c38~mv2.jpg/v1/fill/w_1200,h_1500,al_c,q_90,enc_avif,quality_auto/gandhigram-lead.jpg",
      alt: "Naturally dyed textiles at Gandhigram",
      objectPosition: "50% 30%",
    },
    gallery: [],
    imageOnRight: true,
  },
  {
    eyebrow: "Community 03",
    origin: "Tamil Nadu",
    craft: "Beadwork & jewellery",
    title: "The Narikuravars",
    body: "A traditionally nomadic community whose women are custodians of an extraordinary beadwork tradition — intricate necklaces, tassels, and jewellery strung with coloured glass beads and small shells. What began as a livelihood in weekly markets is now a fine craft, and each piece we carry follows the pattern language they have refined over generations.",
    lead: {
      src: "https://static.wixstatic.com/media/dc7de4_821538980fc34045bcf6e997e3bf0ceb~mv2.jpg/v1/fill/w_1200,h_1500,al_c,q_90,enc_avif,quality_auto/narikuravar-lead.jpg",
      alt: "A Narikuravar artisan with a beaded piece in progress",
      objectPosition: "50% 40%",
    },
    gallery: [
      {
        src: "https://static.wixstatic.com/media/dc7de4_dcf07174aa2a49d39057be6f9215d9a7~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,enc_avif,quality_auto/narikuravar-01.jpg",
        alt: "Finished beaded jewellery laid out on cloth",
        objectPosition: "50% 50%",
      },
    ],
    imageOnRight: false,
  },
  {
    eyebrow: "Community 04",
    origin: "The Nilgiri Hills, Tamil Nadu",
    craft: "Pukhoor embroidery",
    title: "The Toda",
    body: "The Toda are an indigenous pastoral community from the Nilgiris, known worldwide for pukhoor — a distinctive red-and-black embroidery on white cotton, worked entirely by counted-thread hand-embroidery. It is a GI-protected craft carried forward by the women of the settlement. We partner with them on shawls, throws, and smaller embroidered goods.",
    lead: {
      src: "https://static.wixstatic.com/media/dc7de4_073206677ad2444b894e7f81f900f311~mv2.png/v1/fill/w_1400,h_1050,al_c,q_90,enc_avif,quality_auto/toda-lead.jpg",
      alt: "Toda women in traditional embroidered putukuli shawls",
      objectPosition: "50% 45%",
    },
    gallery: [
      {
        src: "https://static.wixstatic.com/media/dc7de4_d82b5d5a7e6b4140bbbc68d47ec5b96e~mv2.jpg/v1/fill/w_900,h_900,al_c,q_85,enc_avif,quality_auto/toda-01.jpg",
        alt: "Pukhoor embroidery detail on white cotton",
        objectPosition: "50% 35%",
      },
      {
        src: "https://static.wixstatic.com/media/dc7de4_2578e0b31028439d82a1d29b176cc606~mv2.jpg/v1/fill/w_900,h_900,al_c,q_85,enc_avif,quality_auto/toda-02.jpg",
        alt: "A finished Toda shawl on display",
        objectPosition: "50% 20%",
      },
      {
        src: "https://static.wixstatic.com/media/dc7de4_88884802707a4cfa9cdb73307eba1c8d~mv2.jpg/v1/fill/w_900,h_900,al_c,q_85,enc_avif,quality_auto/toda-03.jpg",
        alt: "A Toda maker at her embroidery frame",
        objectPosition: "50% 40%",
      },
      {
        src: "https://static.wixstatic.com/media/dc7de4_6df1d6c0c97a4b25989b9b218db68af9~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,enc_avif,quality_auto/toda-04.jpg",
        alt: "The Nilgiri settlement where the craft is practised",
        objectPosition: "50% 50%",
      },
    ],
    imageOnRight: true,
  },
];

type CommunityRowProps = {
  community: Community;
  index: number;
};

function CommunityRow({ community, index }: CommunityRowProps) {
  const {
    eyebrow,
    origin,
    craft,
    title,
    body,
    lead,
    gallery,
    imageOnRight,
  } = community;

  return (
    <article className="space-y-12 md:space-y-16">
      <div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:hidden">
          <p className="text-xs uppercase tracking-[0.35em] text-ths-earth">
            {eyebrow}
          </p>
          <h3 className="mt-3 font-display text-3xl leading-tight tracking-tight text-ths-ink">
            {title}
          </h3>
        </div>
        <div
          className={`relative md:col-span-6 ${imageOnRight ? "md:order-2" : "md:order-1"}`}
        >
          <div
            aria-hidden
            className="absolute -bottom-4 -left-4 hidden h-full w-full border border-ths-earth/40 md:block"
          />
          <div
            aria-hidden
            className="absolute -right-6 -top-6 hidden h-20 w-20 bg-ths-sand md:block"
          />
          <LightboxImage
            src={lead.src}
            alt={lead.alt}
            sizes="(min-width: 768px) 50vw, 100vw"
            priority={index === 0}
            style={{ objectPosition: lead.objectPosition ?? "50% 50%" }}
            className="relative aspect-[4/5] w-full cursor-zoom-in overflow-hidden border-0 bg-ths-earth p-0 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]"
          />
        </div>

        <div
          className={`flex flex-col justify-center md:col-span-6 ${imageOnRight ? "md:order-1" : "md:order-2"}`}
        >
          <p className="hidden text-xs uppercase tracking-[0.35em] text-ths-earth md:block">
            {eyebrow}
          </p>
          <h3 className="mt-3 hidden font-display text-3xl leading-tight tracking-tight text-ths-ink md:block md:text-4xl lg:text-[2.75rem]">
            {title}
          </h3>

          <dl className="grid grid-cols-2 gap-4 border-y border-ths-ink/10 py-4 sm:gap-6 sm:py-5 md:mt-6">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.3em] text-ths-ink/50">
                Origin
              </dt>
              <dd className="mt-1.5 text-sm leading-snug text-ths-ink md:text-[0.95rem]">
                {origin}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.3em] text-ths-ink/50">
                Craft
              </dt>
              <dd className="mt-1.5 text-sm leading-snug text-ths-ink md:text-[0.95rem]">
                {craft}
              </dd>
            </div>
          </dl>

          <p className="mt-6 text-base leading-relaxed text-ths-ink/80 md:text-lg">
            {body}
          </p>
        </div>
      </div>

      {gallery.length > 0 ? (
        <div
          className={`grid gap-4 md:gap-5 ${
            gallery.length === 1
              ? "grid-cols-1"
              : gallery.length === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-2 md:grid-cols-4"
          }`}
        >
          {gallery.map((asset) => (
            <LightboxImage
              key={asset.src}
              src={asset.src}
              alt={asset.alt}
              sizes={
                gallery.length === 1
                  ? "100vw"
                  : gallery.length === 2
                    ? "(min-width: 640px) 45vw, 100vw"
                    : "(min-width: 768px) 22vw, 45vw"
              }
              style={{
                objectPosition: asset.objectPosition ?? "50% 50%",
                transitionTimingFunction: EASE_APPLE_OUT,
              }}
              imageClassName="object-cover transition-transform duration-700 group-hover:scale-105"
              className={`group relative w-full cursor-zoom-in overflow-hidden border-0 bg-ths-earth p-0 shadow-[0_12px_30px_-18px_rgba(23,17,13,0.4)] ${
                gallery.length === 1 ? "aspect-[16/9]" : "aspect-square"
              }`}
            />
          ))}
        </div>
      ) : null}
    </article>
  );
}

export function ArtisanCommunities() {
  return (
    <section
      id="communities"
      aria-labelledby="communities-heading"
      className="w-full bg-ths-cream"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 sm:py-16 md:px-10 md:py-24">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-ths-earth">
            Where the craft comes from
          </p>
          <h2
            id="communities-heading"
            className="mt-3 font-display text-4xl leading-tight tracking-tight text-ths-ink md:text-5xl"
          >
            Four communities.
            <br />
            <span className="text-ths-earth">One shared table.</span>
          </h2>
        </div>

        <div className="mt-12 space-y-16 sm:mt-16 sm:space-y-24 md:mt-20 md:space-y-32">
          {COMMUNITIES.map((community, index) => (
            <CommunityRow
              key={community.title}
              community={community}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
