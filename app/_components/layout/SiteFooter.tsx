import type { SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";

const BRAND_MARK =
  "https://static.wixstatic.com/media/3581e8_bd79e60756984a8db3e9cb306751552c~mv2.png/v1/fill/w_80,h_72,al_c,q_85,enc_avif,quality_auto/mark.png";

const SITE_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
  { label: "Meet Our Artisans", href: "/artisans" },
  { label: "Gifting", href: "/gifting" },
  { label: "The Hand Made Diaries", href: "/the-handmade-diaries" },
  { label: "Contact", href: "/contact" },
];

const IconMail = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
  </svg>
);

const IconInstagram = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const IconLinkedIn = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M8 10v7" />
    <path d="M8 7v.01" />
    <path d="M12 17v-4a3 3 0 0 1 6 0v4" />
    <path d="M12 13v4" />
  </svg>
);

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/thehandmadestore.co.in/",
    Icon: IconInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/the-hand-made-store/",
    Icon: IconLinkedIn,
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-ths-line bg-ths-cream">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-12 md:px-10 md:py-20">
        <div className="md:col-span-6">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="relative block h-8 w-8">
              <Image
                src={BRAND_MARK}
                alt=""
                fill
                sizes="32px"
                className="object-contain"
              />
            </span>
            <span className="font-display text-base tracking-[0.2em] text-ths-ink">
              THE HAND MADE STORE
            </span>
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ths-ink/75">
            A women-owned local business partnering with indigenous Indian
            craftsmen for handcrafted, ethical jewelry, home decor, and
            lifestyle products.
          </p>
          <a
            href="mailto:ths.thehandmadestore@gmail.com"
            aria-label="Email The Hand Made Store"
            className="group mt-6 inline-flex items-center gap-3 text-sm text-ths-ink"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ths-ink/20 bg-white/60 text-ths-ink transition-all duration-300 group-hover:border-ths-ink/60 group-hover:bg-ths-ink group-hover:text-ths-cream">
              <IconMail className="h-4 w-4" aria-hidden />
            </span>
            <span className="border-b border-ths-ink/40 pb-0.5 transition-colors group-hover:border-ths-ink">
              ths.thehandmadestore@gmail.com
            </span>
          </a>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-[11px] uppercase tracking-[0.3em] text-ths-earth">
            Explore
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-ths-ink/85">
            {SITE_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="transition-colors hover:text-ths-ink hover:underline underline-offset-4"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-[11px] uppercase tracking-[0.3em] text-ths-earth">
            Follow
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-ths-ink/85">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="group inline-flex items-center gap-3 transition-colors hover:text-ths-ink"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ths-ink/20 bg-white/60 text-ths-ink transition-all duration-300 group-hover:border-ths-ink/60 group-hover:bg-ths-ink group-hover:text-ths-cream">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="transition-colors group-hover:underline underline-offset-4">
                    {label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-ths-line">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-2 px-6 py-6 text-xs text-ths-ink/60 md:flex-row md:items-center md:px-10">
          <p>&copy; {year} The Hand Made Store. All rights reserved.</p>
          <p className="tracking-wide">Made in India &middot; Handcrafted with care.</p>
        </div>
      </div>
    </footer>
  );
}
