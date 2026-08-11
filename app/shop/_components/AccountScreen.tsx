"use client";

import Link from "next/link";
import {
  User,
  Package,
  Heart,
  ShoppingBag,
  MapPin,
  CreditCard,
  HelpCircle,
  Info,
  ChevronRight,
  LogIn,
} from "lucide-react";
import { ShopScreen } from "./ShopScreen";
import { useCart, useWishlist } from "./ShopProviders";

const EASE = "ease-[var(--ease-apple-out)]";

type Row = {
  label: string;
  Icon: typeof User;
  href?: string;
  hint?: string;
};

export function AccountScreen() {
  const wishlist = useWishlist();
  const cart = useCart();

  // Grouped, iOS-style settings lists. Rows without an href are placeholders
  // until their features land.
  const groups: { title: string; rows: Row[] }[] = [
    {
      title: "Shopping",
      rows: [
        { label: "Orders", Icon: Package, hint: "None yet" },
        {
          label: "Wishlist",
          Icon: Heart,
          href: "/shop/wishlist",
          hint: wishlist.count ? String(wishlist.count) : undefined,
        },
        {
          label: "Cart",
          Icon: ShoppingBag,
          href: "/shop/cart",
          hint: cart.count ? String(cart.count) : undefined,
        },
      ],
    },
    {
      title: "Details",
      rows: [
        { label: "Addresses", Icon: MapPin },
        { label: "Payment methods", Icon: CreditCard },
      ],
    },
    {
      title: "More",
      rows: [
        { label: "Help & support", Icon: HelpCircle, href: "/contact" },
        { label: "About The Hand Made Store", Icon: Info, href: "/about-us" },
      ],
    },
  ];

  return (
    <ShopScreen title="Account">
      {/* Guest / sign-in card */}
      <div className="flex items-center gap-4 rounded-2xl border border-black/[0.06] bg-white p-4 shadow-[0_2px_16px_-8px_rgba(0,0,0,0.10)]">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#C86446]/10 text-[#C86446]">
          <User className="h-7 w-7" strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-[family-name:var(--font-display)] text-lg tracking-tight">
            Welcome
          </p>
          <p className="truncate text-[13px] tracking-tight text-stone-500">
            Sign in to sync your orders &amp; wishlist
          </p>
        </div>
        <button
          type="button"
          title="Accounts — coming soon"
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#222222] px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-black active:scale-95 ${EASE}`}
        >
          <LogIn className="h-4 w-4" strokeWidth={2} />
          Sign in
        </button>
      </div>

      {/* Grouped lists */}
      <div className="mt-6 space-y-6">
        {groups.map((group) => (
          <section key={group.title}>
            <h2 className="px-1 pb-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-stone-400">
              {group.title}
            </h2>
            <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_2px_16px_-8px_rgba(0,0,0,0.10)]">
              {group.rows.map((row, i) => (
                <RowItem key={row.label} row={row} first={i === 0} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-8 text-center text-[11px] tracking-tight text-stone-400">
        The Hand Made Store · Handcrafted in India
      </p>
    </ShopScreen>
  );
}

function RowItem({ row, first }: { row: Row; first: boolean }) {
  const { label, Icon, href, hint } = row;
  const inner = (
    <div
      className={`flex items-center gap-3 px-4 py-3.5 transition-colors ${
        href ? "hover:bg-black/[0.02]" : ""
      } ${first ? "" : "border-t border-black/[0.06]"}`}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-black/[0.04] text-stone-600">
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
      </span>
      <span className="flex-1 text-[15px] tracking-tight">{label}</span>
      {hint && (
        <span className="text-[13px] tracking-tight text-stone-400">{hint}</span>
      )}
      <ChevronRight className="h-4 w-4 shrink-0 text-stone-300" strokeWidth={2} />
    </div>
  );

  return href ? (
    <Link href={href} className="block">
      {inner}
    </Link>
  ) : (
    <button type="button" className="block w-full text-left" title="Coming soon">
      {inner}
    </button>
  );
}
