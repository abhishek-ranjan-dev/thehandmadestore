import type { SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";

const BRAND_MARK =
  "https://static.wixstatic.com/media/3581e8_bd79e60756984a8db3e9cb306751552c~mv2.png/v1/fill/w_80,h_72,al_c,q_85,enc_avif,quality_auto/mark.png";

const SITE_LINKS = [
  { label: "About Us", href: "/about-us" },
  { label: "Meet Our Artisans", href: "/artisans" },
  { label: "Services", href: "/gifting" },
  { label: "Blog", href: "/the-handmade-diaries" },
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
    <footer className="relative mt-auto overflow-hidden rounded-t-3xl bg-ths-moss text-white sm:rounded-t-[2.5rem] md:rounded-t-[3rem]">

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-5 py-14 sm:px-6 md:grid-cols-12 md:gap-12 md:px-10 md:py-20">
        <div className="col-span-2 md:col-span-6">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="relative block h-9 w-9 rounded-full bg-ths-cream/70 p-1.5 shadow-[0_2px_8px_-2px_rgba(23,17,13,0.15)]">
              <Image
                src={BRAND_MARK}
                alt=""
                fill
                sizes="36px"
                className="object-contain p-1"
              />
            </span>
            <span className="font-display text-sm tracking-[0.2em] text-white sm:text-base">
              THE HAND MADE STORE
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/80 md:mt-6">
            A women-owned local business partnering with indigenous Indian
            craftsmen for handcrafted, ethical jewelry, home decor, and
            lifestyle products.
          </p>
          <a
            href="mailto:ths.thehandmadestore@gmail.com"
            aria-label="Email The Hand Made Store"
            className="group mt-5 inline-flex max-w-full items-center gap-3 text-sm text-white md:mt-6"
          >
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-ths-cream/30 bg-white/10 text-white transition-all duration-300 group-hover:border-ths-cream/60 group-hover:bg-ths-cream group-hover:text-ths-moss">
              <IconMail className="h-4 w-4" aria-hidden />
            </span>
            <span className="break-all border-b border-ths-cream/40 pb-0.5 text-left transition-colors group-hover:border-ths-cream">
              ths.thehandmadestore@gmail.com
            </span>
          </a>
        </div>

        <div className="col-span-1 md:col-span-3">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/80">
            Quick Links
          </h3>
          <ul className="mt-3 text-sm text-white/85 md:mt-5">
            {SITE_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="block py-2 transition-colors hover:text-white hover:underline underline-offset-4"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-1 md:col-span-3">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/80">
            Follow
          </h3>
          <ul className="mt-3 text-sm text-white/85 md:mt-5">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="group inline-flex items-center gap-3 py-2 transition-colors hover:text-white"
                >
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-ths-cream/30 bg-white/10 text-white transition-all duration-300 group-hover:border-ths-cream/60 group-hover:bg-ths-cream group-hover:text-ths-moss">
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

      <div className="relative border-t border-ths-cream/15">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-2 px-5 py-5 text-xs text-white/70 sm:px-6 md:flex-row md:items-center md:px-10 md:py-6">
          <p>&copy; {year} The Hand Made Store. All rights reserved.</p>
          <p className="tracking-wide">Made in India &middot; Handcrafted with care.</p>
        </div>
      </div>
    </footer>
  );
}
