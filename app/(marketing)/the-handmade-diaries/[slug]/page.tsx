import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  DIARY_POSTS,
  getDiaryPost,
} from "../../_components/diaries/diaries-data";

const SITE_URL = "https://www.thehandmadestore.co.in";

export function generateStaticParams() {
  return DIARY_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getDiaryPost(slug);
  if (!post) return {};

  const url = `/the-handmade-diaries/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: `${post.title} | The Hand Made Store`,
      description: post.excerpt,
      url,
      siteName: "The Hand Made Store",
      type: "article",
      images: [{ url: post.image, width: 1600, height: 1067, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | The Hand Made Store`,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function DiaryArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getDiaryPost(slug);
  if (!post) notFound();

  const more = DIARY_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    url: `${SITE_URL}/the-handmade-diaries/${post.slug}`,
    mainEntityOfPage: `${SITE_URL}/the-handmade-diaries/${post.slug}`,
    publisher: { "@id": `${SITE_URL}/#organization` },
    isPartOf: { "@id": `${SITE_URL}/the-handmade-diaries#blog` },
  };

  return (
    <main className="flex flex-1 flex-col bg-ths-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      <article className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-6 sm:py-20 md:py-24">
        {/* Header */}
        <h1 className="font-display text-3xl leading-tight tracking-tight text-ths-ink sm:text-4xl md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ths-ink/70 md:text-xl">
          {post.excerpt}
        </p>

        {/* Lead image */}
        <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden bg-ths-sand/60 sm:mt-10">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            priority
            className="object-cover"
          />
        </div>

        {/* Body */}
        <div className="mt-10 sm:mt-12">
          {post.body.map((block, i) =>
            block.type === "heading" ? (
              <h2
                key={i}
                className="mt-10 font-display text-2xl leading-snug text-ths-ink sm:text-[1.75rem]"
              >
                {block.text}
              </h2>
            ) : (
              <p
                key={i}
                className="mt-5 text-[16px] leading-[1.75] text-ths-ink/85 sm:text-[17px]"
              >
                {block.text}
              </p>
            ),
          )}
        </div>

        {/* Article CTA */}
        <div className="mt-14 border-t border-ths-ink/10 pt-10">
          <p className="font-display text-2xl leading-snug text-ths-ink">
            Planning a gifting project?
          </p>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ths-ink/75">
            We craft bespoke corporate hampers and festive gift boxes with the
            artisan communities we work with — from concept to pan-India delivery.
          </p>
          <Link
            href="/gifting"
            className="mt-6 inline-flex items-center justify-center border border-ths-ink bg-ths-ink px-8 py-4 text-xs uppercase tracking-[0.3em] text-ths-cream transition-colors duration-300 hover:bg-transparent hover:text-ths-ink"
          >
            Explore gifting
          </Link>
        </div>
      </article>

      {/* More from the Diaries */}
      <section
        aria-labelledby="more-diaries"
        className="border-t border-ths-ink/10"
      >
        <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20">
          <h2
            id="more-diaries"
            className="font-display text-2xl text-ths-ink sm:text-3xl"
          >
            More from the Diaries
          </h2>
          <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-3">
            {more.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/the-handmade-diaries/${item.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[3/2] w-full overflow-hidden bg-ths-sand/60">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(min-width: 640px) 30vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-lg leading-snug text-ths-ink transition-colors duration-300 group-hover:text-ths-earth">
                    {item.title}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-2 border-b border-ths-ink/30 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-ths-ink transition-colors duration-300 group-hover:border-ths-earth group-hover:text-ths-earth">
                    Read article
                    <span
                      aria-hidden
                      className="inline-block transition-transform duration-500 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
