import { LightboxImage } from "@/components/ui/LightboxImage";

const EASE_APPLE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";

type MediaAsset = {
  src: string;
  alt: string;
  objectPosition?: string;
};

type Project = {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  lead: MediaAsset;
  gallery: MediaAsset[];
  imageOnRight: boolean;
};

const PROJECTS: Project[] = [
  {
    eyebrow: "Project 01",
    title: "Festive Hampers",
    body: "Seasonal collections built around traditional craft — small-batch, hand-tied, and finished in packaging designed to be opened slowly. Every hamper carries the story of the artisan behind it.",
    bullets: [
      "Curated by occasion — Diwali, New Year, milestones",
      "Custom brand card, ribbon, and monogramming",
      "Made-to-order, delivered pan-India",
    ],
    lead: {
      src: "https://static.wixstatic.com/media/dc7de4_c3ba33a36fc84c8fafe630595b7c6b2a~mv2.jpg/v1/fill/w_1200,h_1500,al_c,q_90,enc_avif,quality_auto/festive-lead.jpg",
      alt: "Festive hamper spread by The Hand Made Store",
      objectPosition: "50% 50%",
    },
    gallery: [
      {
        src: "https://static.wixstatic.com/media/3581e8_e1385da1ebed4156a8d631628f59dbc5~mv2.jpg/v1/fill/w_900,h_900,al_c,q_85,enc_avif,quality_auto/festive-01.jpg",
        alt: "Handcrafted festive gift arrangement",
        objectPosition: "50% 50%",
      },
      {
        src: "https://static.wixstatic.com/media/3581e8_6ae7923d5a6c4c46a10d622749bb1cd3~mv2.jpg/v1/fill/w_900,h_900,al_c,q_85,enc_avif,quality_auto/festive-02.jpg",
        alt: "Wrapped festive hampers ready to ship",
        objectPosition: "50% 56%",
      },
      {
        src: "https://static.wixstatic.com/media/3581e8_56c63ae758764b4aa26a19fa93a608f4~mv2.jpg/v1/fill/w_900,h_900,al_c,q_85,enc_avif,quality_auto/festive-03.jpg",
        alt: "Traditional Indian festive gift set",
        objectPosition: "50% 50%",
      },
      {
        src: "https://static.wixstatic.com/media/3581e8_f36ca454cce14998bf83497d6334b67a~mv2.jpg/v1/fill/w_900,h_900,al_c,q_85,enc_avif,quality_auto/festive-04.jpg",
        alt: "Artisan-made festive product detail",
        objectPosition: "50% 45%",
      },
    ],
    imageOnRight: true,
  },
  {
    eyebrow: "Project 02",
    title: "Corporate Gifts",
    body: "A curated selection of premium handcrafted products, perfect for corporates. Show your team members how much you value their contributions with a thoughtfully curated hamper — every detail considered.",
    bullets: [
      "Onboarding, appreciation, and client-thank-you sets",
      "Sustainable packaging with subtle co-branding",
      "Volumes from 25 to 5,000 units",
    ],
    lead: {
      src: "https://static.wixstatic.com/media/dc7de4_0f34b4d770904b6c84308efeba27e12b~mv2.jpg/v1/fill/w_1200,h_1500,al_c,q_90,enc_avif,quality_auto/corporate-lead.jpg",
      alt: "A curated corporate gift set by The Hand Made Store",
      objectPosition: "50% 50%",
    },
    gallery: [
      {
        src: "https://static.wixstatic.com/media/dc7de4_b6191159cc9e46b2bd5269b34905a770~mv2.jpg/v1/fill/w_900,h_900,al_c,q_85,enc_avif,quality_auto/corporate-01.jpg",
        alt: "Corporate hamper opened to reveal contents",
        objectPosition: "50% 50%",
      },
      {
        src: "https://static.wixstatic.com/media/dc7de4_7feaf6c607e045d8ae409f8407b01190~mv2.jpeg/v1/fill/w_900,h_900,al_c,q_85,enc_avif,quality_auto/corporate-02.jpeg",
        alt: "Curated corporate gift with branded card",
        objectPosition: "50% 50%",
      },
      {
        src: "https://static.wixstatic.com/media/dc7de4_64865198c02d4ea296d3d1947d6e5573~mv2.png/v1/fill/w_900,h_900,al_c,q_85,enc_avif,quality_auto/corporate-03.png",
        alt: "Custom branded corporate gifting box",
        objectPosition: "50% 50%",
      },
      {
        src: "https://static.wixstatic.com/media/dc7de4_8ab7f92c11d348be80a57ad6a5603da9~mv2.jpg/v1/fill/w_900,h_900,al_c,q_85,enc_avif,quality_auto/corporate-04.jpg",
        alt: "Assortment of corporate gift items on display",
        objectPosition: "50% 50%",
      },
    ],
    imageOnRight: false,
  },
];

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const {
    eyebrow,
    title,
    body,
    bullets,
    lead,
    gallery,
    imageOnRight,
  } = project;

  return (
    <article className="space-y-14 md:space-y-20">
      <div className="grid grid-cols-1 gap-8 sm:gap-12 md:grid-cols-12 md:gap-16">
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
          <p className="text-xs uppercase tracking-[0.35em] text-ths-earth">
            {eyebrow}
          </p>
          <h3 className="mt-3 font-display text-3xl leading-tight tracking-tight text-ths-ink md:text-4xl lg:text-5xl">
            {title}
          </h3>
          <div aria-hidden className="mt-6 h-px w-16 bg-ths-ink/30 sm:mt-8" />
          <p className="mt-6 text-[15px] leading-relaxed text-ths-ink/80 sm:mt-8 sm:text-base md:text-lg">
            {body}
          </p>

          <ul className="mt-6 space-y-2.5 sm:mt-8 sm:space-y-3">
            {bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-3 text-sm leading-relaxed text-ths-ink/80 md:text-base"
              >
                <span
                  aria-hidden
                  className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-ths-clay"
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {gallery.map((asset) => (
          <LightboxImage
            key={asset.src}
            src={asset.src}
            alt={asset.alt}
            sizes="(min-width: 768px) 22vw, 45vw"
            style={{
              objectPosition: asset.objectPosition ?? "50% 50%",
              transitionTimingFunction: EASE_APPLE_OUT,
            }}
            imageClassName="object-cover transition-transform duration-700 group-hover:scale-105"
            className="group relative aspect-square w-full cursor-zoom-in overflow-hidden border-0 bg-ths-earth p-0 shadow-[0_12px_30px_-18px_rgba(23,17,13,0.4)]"
          />
        ))}
      </div>
    </article>
  );
}

export function ProjectsShowcase() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="w-full bg-ths-cream"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 sm:py-16 md:px-10 md:py-24">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-ths-earth">
            Our Projects
          </p>
          <h2
            id="projects-heading"
            className="mt-3 font-display text-4xl leading-tight tracking-tight text-ths-ink md:text-5xl"
          >
            Handcrafted, on-brand.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ths-ink/75 md:text-lg">
            Explore our diverse range of projects showcasing expertly crafted
            corporate gifts that perfectly align with our clients&rsquo; brand
            identities. Each project reflects our commitment to quality,
            creativity, and personalized service.
          </p>
        </div>

        <div className="mt-12 space-y-16 sm:mt-16 sm:space-y-24 md:mt-20 md:space-y-32">
          {PROJECTS.map((project, index) => (
            <ProjectRow
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
