"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Globe, Heart, Store, ShoppingBag, User } from "lucide-react";
import { useCart, useWishlist } from "./ShopProviders";

/* -------------------------------------------------------------------------- */
/*  Persistent storefront chrome — shared by every (shop) screen.              */
/*    < md  → fixed bottom tab bar (+ a slim top bar with brand & website exit) */
/*    ≥ md  → the tabs live in a sticky top nav; no bottom bar.                 */
/*  Active tab derives from the pathname, so navigation is real routing.       */
/* -------------------------------------------------------------------------- */

const EASE = "ease-[var(--ease-apple-out)]";

export type Tab = { href: string; label: string; Icon: typeof Store };

export const TABS: Tab[] = [
  { href: "/shop", label: "All Products", Icon: Store },
  { href: "/shop/wishlist", label: "Wishlist", Icon: Heart },
  { href: "/shop/cart", label: "Cart", Icon: ShoppingBag },
  { href: "/shop/account", label: "Account", Icon: User },
];

const WebsiteLink = (
  <Link
    href="/"
    title="Back to website mode"
    aria-label="Back to normal website mode"
    className={`grid h-10 w-10 place-items-center rounded-full text-stone-600 transition-all duration-300 hover:bg-black/[0.04] active:scale-90 ${EASE}`}
  >
    <Globe className="h-5 w-5" strokeWidth={1.75} />
  </Link>
);

export function ShopChrome() {
  const pathname = usePathname();
  const wishlist = useWishlist();
  const cart = useCart();

  const badgeFor = (href: string) =>
    href === "/shop/wishlist"
      ? wishlist.count
      : href === "/shop/cart"
        ? cart.count
        : 0;
  const isActive = (href: string) =>
    href === "/shop"
      ? pathname === "/shop"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* ---- MOBILE slim top bar (< md) — NOT sticky; it scrolls away and the
           search/sort bar pins to the top instead ---- */}
      <header className="flex h-14 items-center justify-between border-b border-black/[0.06] bg-white/70 px-4 backdrop-blur-xl backdrop-saturate-150 md:hidden">
        <Link
          href="/shop"
          aria-label="The Hand Made Store"
          className={`grid h-10 w-10 place-items-center rounded-full text-[#C86446] transition-all duration-300 hover:bg-[#C86446]/10 active:scale-90 ${EASE}`}
        >
          <Sparkles className="h-[22px] w-[22px]" strokeWidth={1.75} />
        </Link>
        <span className="font-[family-name:var(--font-display)] text-[15px] tracking-tight">
          The Hand Made Store
        </span>
        {WebsiteLink}
      </header>

      {/* ---- DESKTOP top nav (≥ md) ---- */}
      <header className="sticky top-0 z-50 hidden border-b border-black/[0.06] bg-white/70 backdrop-blur-xl backdrop-saturate-150 md:block">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-3">
          <Link href="/shop" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-[#C86446]" strokeWidth={1.75} />
            <span className="font-[family-name:var(--font-display)] text-lg tracking-tight">
              The Hand Made Store
            </span>
          </Link>

          <nav aria-label="Storefront" className="mx-auto flex items-center gap-1">
            {TABS.map(({ href, label, Icon }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-300 ${EASE} ${
                    active
                      ? "bg-[#C86446]/10 text-[#C86446]"
                      : "text-stone-500 hover:bg-black/[0.04] hover:text-stone-800"
                  }`}
                >
                  <TabIcon
                    Icon={Icon}
                    active={active}
                    filled={active && href === "/shop/wishlist"}
                    badge={badgeFor(href)}
                  />
                  {label}
                </Link>
              );
            })}
          </nav>

          {WebsiteLink}
        </div>
      </header>

      {/* ---- Fixed bottom tab bar (MOBILE ONLY, < md) ---- */}
      <nav
        aria-label="Storefront"
        className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between border-t border-black/[0.06] bg-white/80 px-6 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] backdrop-blur-xl backdrop-saturate-150 md:hidden"
      >
        {TABS.map(({ href, label, Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex flex-1 flex-col items-center gap-1 py-1 transition-colors duration-300 ${EASE} ${
                active ? "text-[#C86446]" : "text-stone-400 hover:text-stone-600"
              }`}
            >
              <span
                className={`transition-transform duration-300 ${EASE} ${active ? "-translate-y-0.5" : ""}`}
              >
                <TabIcon
                  Icon={Icon}
                  active={active}
                  filled={active && href === "/shop/wishlist"}
                  badge={badgeFor(href)}
                />
              </span>
              <span className="text-[10px] font-medium tracking-tight">
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}

function TabIcon({
  Icon,
  active,
  filled,
  badge,
}: {
  Icon: typeof Store;
  active: boolean;
  filled: boolean;
  badge: number;
}) {
  return (
    <span className="relative">
      <Icon
        className="h-[22px] w-[22px]"
        strokeWidth={active ? 2.25 : 1.75}
        fill={filled ? "currentColor" : "none"}
      />
      {badge > 0 && (
        <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-[#C86446] px-1 text-[10px] font-semibold leading-none text-white ring-2 ring-white">
          {badge}
        </span>
      )}
    </span>
  );
}
