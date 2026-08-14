import Image from "next/image";
import Link from "next/link";
import { DIARY_POSTS } from "./diaries-data";

const diaryHref = (slug: string) => `/the-handmade-diaries/${slug}`;

const EASE_APPLE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";
const SITE_URL = "https://www.thehandmadestore.co.in";

// Blog structured data — helps the listing surface as an article collection.
const BLOG_LD = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${SITE_URL}/the-handmade-diaries#blog`,
  name: "The Hand Made Diaries",
  url: `${SITE_URL}/the-handmade-diaries`,
  publisher: { "@id": `${SITE_URL}/#organization` },
  blogPost: DIARY_POSTS.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    url: `${SITE_URL}/the-handmade-diaries/${post.slug}`,
  })),
};

const IconArrow = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

export function DiariesList() {
  const [lead, ...rest] = DIARY_POSTS;

  return (
    <section
      aria-labelledby="diaries-heading"
      className="w-full bg-ths-cream"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BLOG_LD) }}
      />
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 sm:py-20 md:px-10 md:py-28">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.35em] text-ths-earth sm:text-xs">
            The Journal
          </p>
          <h1
            id="diaries-heading"
            className="mt-3 font-display text-4xl leading-tight tracking-tight text-ths-ink sm:mt-4 sm:text-5xl md:text-6xl"
          >
            The Hand Made Diaries
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ths-ink/80 sm:text-base md:text-lg">
            Stories from the studio — the makers behind each piece, the craft
            that goes into our hampers, and our notes on gifting with intent.
          </p>
        </div>

        {/* Featured (first) post */}
        <Link
          href={diaryHref(lead.slug)}
          className="group mt-10 grid grid-cols-1 gap-6 sm:mt-14 md:grid-cols-12 md:gap-10"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-ths-sand/60 md:col-span-7 md:aspect-[3/2]">
            <Image
              src={lead.image}
              alt={lead.imageAlt}
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              style={{ transitionTimingFunction: EASE_APPLE_OUT }}
            />
          </div>
          <div className="flex flex-col justify-center md:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.3em] text-ths-earth">
              Latest
            </p>
            <h2 className="mt-3 font-display text-2xl leading-snug text-ths-ink transition-colors duration-300 group-hover:text-ths-earth sm:text-3xl md:text-[2rem]">
              {lead.title}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ths-ink/75 sm:text-base">
              {lead.excerpt}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-ths-ink">
              Read article
              <IconArrow
                className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                style={{ transitionTimingFunction: EASE_APPLE_OUT }}
                aria-hidden
              />
            </span>
          </div>
        </Link>

        {/* The rest */}
        <ul className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 border-t border-ths-ink/10 pt-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-4">
          {rest.map((post, index) => (
            <li key={post.slug}>
              <Link href={diaryHref(post.slug)} className="group block">
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-ths-sand/60">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                    priority={index < 2}
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    style={{ transitionTimingFunction: EASE_APPLE_OUT }}
                  />
                </div>
                <h2 className="mt-4 font-display text-lg leading-snug text-ths-ink transition-colors duration-300 group-hover:text-ths-earth md:text-xl">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ths-ink/70">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 border-b border-ths-ink/30 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-ths-ink transition-colors duration-300 group-hover:border-ths-earth group-hover:text-ths-earth">
                  Read article
                  <IconArrow
                    className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                    style={{ transitionTimingFunction: EASE_APPLE_OUT }}
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
