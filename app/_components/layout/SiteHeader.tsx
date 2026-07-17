"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const BRAND_MARK =
  "https://static.wixstatic.com/media/3581e8_bd79e60756984a8db3e9cb306751552c~mv2.png/v1/fill/w_120,h_108,al_c,q_85,enc_avif,quality_auto/mark.png";

const SHOP_URL = "/products";

const EASE_APPLE = "cubic-bezier(0.32, 0.72, 0, 1)";
const EASE_APPLE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";

type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

const NAV: NavItem[] = [
  { label: "About Us", href: "/about-us" },
  { label: "Meet Our Artisans", href: "/artisans" },
  { label: "Services", href: "/gifting" },
  { label: "Blog", href: "/the-handmade-diaries" },
  { label: "Contact", href: "/contact" },
];

const IconMenu = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} stroke="currentColor" {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
  </svg>
);

const IconClose = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.75} stroke="currentColor" {...props}>
    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
  </svg>
);

function DesktopNav({
  items,
  pathname,
}: {
  items: NavItem[];
  pathname: string;
}) {
  return (
    <nav
      aria-label="Primary"
      className="hidden items-center gap-1 lg:flex"
    >
      {items.map(({ label, href, external }) => {
        const active = !external && pathname === href;
        return (
          <Link
            key={label}
            href={href}
            {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
            className="group relative rounded-full px-4 py-2 text-sm font-medium text-white/85 transition-colors duration-300 hover:text-white"
            style={{ transitionTimingFunction: EASE_APPLE_OUT }}
          >
            <span
              className={`pointer-events-none absolute inset-0 rounded-full border border-white/25 bg-white/10 shadow-sm backdrop-blur-md transition-all duration-500 ${
                active
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
              }`}
              style={{ transitionTimingFunction: EASE_APPLE_OUT }}
              aria-hidden
            />
            <span className="relative">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function MobileDrawerNav({
  items,
  pathname,
  onNavigate,
  open,
}: {
  items: NavItem[];
  pathname: string;
  onNavigate: () => void;
  open: boolean;
}) {
  return (
    <nav aria-label="Mobile" className="flex flex-1 flex-col px-6 py-4">
      {items.map(({ label, href, external }, i) => {
        const active = !external && pathname === href;
        return (
          <Link
            key={label}
            href={href}
            {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
            onClick={onNavigate}
            className={`block py-4 font-display text-2xl text-ths-ink ${
              open ? "animate-apple-fade-up" : "opacity-0"
            } ${active ? "underline underline-offset-4" : ""}`}
            style={{ animationDelay: open ? `${80 + i * 55}ms` : "0ms" }}
          >
            {label}
          </Link>
        );
      })}
      <Link
        href={SHOP_URL}
        onClick={onNavigate}
        className={`mt-6 inline-flex w-full items-center justify-center rounded-full border border-white/40 bg-ths-ink/95 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-ths-cream shadow-lg backdrop-blur transition-transform duration-300 active:scale-[0.97] ${
          open ? "animate-apple-fade-up" : "opacity-0"
        }`}
        style={{
          animationDelay: open ? `${80 + items.length * 55}ms` : "0ms",
          transitionTimingFunction: EASE_APPLE_OUT,
        }}
      >
        Shop Now
      </Link>
    </nav>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 border-b text-white transition-[background-color,backdrop-filter,border-color,box-shadow,padding] duration-500 ${
        scrolled
          ? "bg-ths-teal/80 backdrop-blur-2xl backdrop-saturate-150 border-white/15 shadow-[0_6px_30px_-12px_rgba(0,0,0,0.35)]"
          : "bg-ths-teal/70 backdrop-blur-xl backdrop-saturate-150 border-white/10 shadow-none"
      }`}
      style={{ transitionTimingFunction: EASE_APPLE }}
    >
      <div
        className={`mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 transition-[height] duration-500 md:px-10 ${
          scrolled ? "h-16 md:h-20" : "h-20 md:h-24"
        }`}
        style={{ transitionTimingFunction: EASE_APPLE }}
      >
        <Link
          href="/"
          className="group flex items-center gap-3 transition-transform duration-500"
          style={{ transitionTimingFunction: EASE_APPLE_OUT }}
        >
          <span
            className={`relative flex items-center justify-center overflow-hidden rounded-full border border-white/40 bg-white/95 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.35)] backdrop-blur transition-all duration-500 group-hover:scale-105 ${
              scrolled ? "h-10 w-10" : "h-11 w-11 md:h-12 md:w-12"
            }`}
            style={{ transitionTimingFunction: EASE_APPLE_OUT }}
          >
            <Image
              src={BRAND_MARK}
              alt=""
              width={40}
              height={36}
              className="h-8 w-auto object-contain"
            />
          </span>
          <span className="flex flex-col leading-tight">
            <span
              className={`font-display tracking-wide text-white transition-[font-size] duration-500 ${
                scrolled ? "text-base md:text-lg" : "text-lg md:text-xl"
              }`}
              style={{ transitionTimingFunction: EASE_APPLE }}
            >
              The Hand Made Store
            </span>
            <span
              className={`overflow-hidden text-[10px] uppercase tracking-[0.3em] text-white/70 transition-[max-height,opacity] duration-500 ${
                scrolled ? "max-h-0 opacity-0" : "max-h-4 opacity-100"
              }`}
              style={{ transitionTimingFunction: EASE_APPLE }}
            >
              Handcrafted &middot; Ethical
            </span>
          </span>
        </Link>

        <DesktopNav items={NAV} pathname={pathname} />

        <div className="flex items-center gap-3">
          <Link
            href={SHOP_URL}
            className="group relative hidden overflow-hidden rounded-full border border-white/50 bg-white/90 px-5 py-2.5 text-sm font-semibold text-ths-ink shadow-[0_6px_20px_-8px_rgba(0,0,0,0.35)] backdrop-blur-lg transition-all duration-500 hover:bg-white hover:shadow-[0_10px_28px_-8px_rgba(0,0,0,0.45)] active:scale-[0.97] md:inline-flex md:px-6 md:py-3"
            style={{ transitionTimingFunction: EASE_APPLE_OUT }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 transition-transform duration-700 group-hover:translate-x-full group-hover:opacity-100"
              style={{ transitionTimingFunction: EASE_APPLE_OUT }}
            />
            <span className="relative">Shop Now</span>
          </Link>
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-transparent text-white transition-all duration-300 hover:border-white/30 hover:bg-white/10 active:scale-95 lg:hidden"
            style={{ transitionTimingFunction: EASE_APPLE_OUT }}
          >
            <IconMenu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ths-ink/30 backdrop-blur-sm transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionTimingFunction: EASE_APPLE }}
          tabIndex={open ? 0 : -1}
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col border-l border-white/40 bg-ths-cream/85 shadow-2xl backdrop-blur-2xl backdrop-saturate-150 transition-transform duration-700 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ transitionTimingFunction: EASE_APPLE }}
        >
          <div className="flex items-center justify-between border-b border-ths-line/60 px-6 py-4">
            <span className="font-display text-sm tracking-[0.2em] text-ths-ink">
              MENU
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-transparent text-ths-ink transition-all duration-300 hover:border-ths-ink/20 hover:bg-ths-ink/5 active:scale-95"
              style={{ transitionTimingFunction: EASE_APPLE_OUT }}
            >
              <IconClose className="h-6 w-6" />
            </button>
          </div>
          <MobileDrawerNav
            items={NAV}
            pathname={pathname}
            onNavigate={() => setOpen(false)}
            open={open}
          />
        </aside>
      </div>
    </header>
  );
}
