"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Search, X, Heart } from "lucide-react";
import { PRODUCTS, type Product } from "@/lib/products";
import { useWishlist } from "./ShopProviders";

/* -------------------------------------------------------------------------- */
/*  Products screen — filter bar + grid. Persistent chrome (top bar, tabs) is   */
/*  supplied by the (shop) layout; this screen owns its search + category       */
/*  filters, large title, and product grid.                                    */
/* -------------------------------------------------------------------------- */

const EASE = "ease-[var(--ease-apple-out)]";

/** Quick-filter chips — predicate-driven so the bar can mix category filters
 *  ("Best Sellers") with material filters ("Terracotta"). */
type Chip = { id: string; label: string; title: string; match: (p: Product) => boolean };

const CHIPS: Chip[] = [
  { id: "all", label: "All", title: "All Products", match: () => true },
  {
    id: "best-sellers",
    label: "Best Sellers",
    title: "Best Sellers",
    match: (p) => p.categories.includes("best-sellers"),
  },
  {
    id: "festive-hampers",
    label: "Festive Hampers",
    title: "Festive Hampers",
    match: (p) => p.categories.includes("festive-hampers"),
  },
  {
    id: "eco-stationery",
    label: "Eco Stationery",
    title: "Eco Stationery",
    match: (p) => p.categories.includes("eco-friendly-stationery"),
  },
  {
    id: "corporate-gifts",
    label: "Corporate Gifts",
    title: "Corporate Gifts",
    match: (p) => p.categories.includes("corporate-gifts"),
  },
  {
    id: "terracotta",
    label: "Terracotta",
    title: "Terracotta",
    match: (p) => p.material?.toLowerCase() === "terracotta",
  },
];

export function ProductsApp() {
  const wishlist = useWishlist();
  const [activeChip, setActiveChip] = useState("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const chip = CHIPS.find((c) => c.id === activeChip) ?? CHIPS[0];

  const products = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(chip.match).filter((p) =>
      q ? p.name.toLowerCase().includes(q) : true,
    );
  }, [chip, query]);

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6">
      {/* iOS-style large title — scrolls away as the filter bar pins below */}
      <div className="px-1 pb-4 pt-4">
        <h1 className="text-[28px] font-semibold leading-none -tracking-[0.02em] md:text-[34px]">
          {chip.title}
        </h1>
        <p className="mt-2 text-[13px] tracking-tight text-stone-500">
          {products.length} handcrafted {products.length === 1 ? "piece" : "pieces"}
        </p>
      </div>

      {/* Filter bar — pins under the sticky top bar on mobile (h-14 = top-14) */}
      <div className="sticky top-14 z-40 -mx-4 border-y border-black/[0.06] bg-[#FDFBF7]/80 backdrop-blur-xl backdrop-saturate-150 md:static md:mx-0 md:rounded-2xl md:border">
        {/* Collapsible search — iOS rounded field */}
        <div
          className={`overflow-hidden transition-all duration-[400ms] ${EASE} ${
            searchOpen ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pt-3 md:px-4">
            <div className="flex items-center gap-2 rounded-2xl bg-black/[0.05] px-3.5 py-2.5">
              <Search className="h-4 w-4 shrink-0 text-stone-400" strokeWidth={2} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search handcrafted products…"
                autoFocus={searchOpen}
                className="w-full bg-transparent text-[15px] tracking-tight placeholder:text-stone-400 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                  className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-stone-300/70 text-white transition-colors hover:bg-stone-400"
                >
                  <X className="h-3 w-3" strokeWidth={3} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Search toggle + category chips */}
        <div className="flex items-center gap-2 px-4 py-3">
          <button
            type="button"
            aria-label={searchOpen ? "Close search" : "Search"}
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((v) => !v)}
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-black/[0.06] bg-white text-stone-600 transition-all duration-300 hover:text-[#C86446] active:scale-90 ${EASE}`}
          >
            {searchOpen ? (
              <X className="h-[18px] w-[18px]" strokeWidth={2} />
            ) : (
              <Search className="h-[18px] w-[18px]" strokeWidth={2} />
            )}
          </button>
          <nav
            aria-label="Quick filters"
            className="flex gap-2 overflow-x-auto md:flex-wrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {CHIPS.map((c) => {
              const active = c.id === activeChip;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveChip(c.id)}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-[13px] font-medium tracking-tight transition-all duration-300 active:scale-95 ${EASE} ${
                    active
                      ? "bg-[#C86446] text-white shadow-[0_4px_14px_-4px_rgba(200,100,70,0.55)]"
                      : "bg-black/[0.05] text-stone-600 hover:bg-black/[0.08]"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Product grid */}
      <div className="pt-4">
        {products.length === 0 ? (
          <EmptyState label={chip.label} />
        ) : (
          <div
            key={activeChip}
            className="animate-apple-fade-in grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4"
          >
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                wished={wishlist.has(p.id)}
                onWish={() => wishlist.toggle(p.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export function ProductCard({
  product,
  wished,
  onWish,
}: {
  product: Product;
  wished: boolean;
  onWish: () => void;
}) {
  return (
    <article className="group relative overflow-hidden rounded-[20px] border border-black/[0.06] bg-white shadow-[0_2px_16px_-8px_rgba(0,0,0,0.12)] transition-all duration-500 ease-[var(--ease-apple-out)] active:scale-[0.98] md:hover:-translate-y-1 md:hover:shadow-[0_16px_36px_-16px_rgba(0,0,0,0.22)]">
      {/* Wishlist overlay — sibling of the link so it isn't a nested control */}
      <button
        type="button"
        onClick={onWish}
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={wished}
        className="absolute right-2.5 top-2.5 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/70 text-[#C86446] shadow-sm backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 ease-[var(--ease-apple-out)] hover:bg-white active:scale-90"
      >
        <Heart
          className={`h-[18px] w-[18px] transition-transform duration-300 ease-[var(--ease-apple-out)] ${wished ? "scale-110" : ""}`}
          strokeWidth={2}
          fill={wished ? "currentColor" : "none"}
        />
      </button>

      <Link href={product.href} className="block">
        <div className="relative aspect-square overflow-hidden bg-stone-100">
          {product.ribbon && (
            <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#C86446] shadow-sm backdrop-blur-xl backdrop-saturate-150">
              {product.ribbon}
            </span>
          )}
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 260px"
            style={{ objectPosition: product.image.objectPosition }}
            className="object-cover transition-transform duration-[600ms] ease-[var(--ease-apple-out)] group-hover:scale-105"
          />
        </div>

        <div className="p-3.5">
          {product.material && (
            <span className="inline-block rounded-full bg-[#C86446]/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.06em] text-[#C86446]">
              {product.material}
            </span>
          )}
          <h3 className="mt-2 line-clamp-2 text-[13px] font-medium leading-snug tracking-tight md:text-sm">
            {product.name}
          </h3>
          <p className="mt-1 font-[family-name:var(--font-display)] text-[15px] tracking-tight md:text-base">
            {product.formattedPrice}
          </p>
        </div>
      </Link>
    </article>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-[#C86446]/10 text-[#C86446]">
        <Sparkles className="h-7 w-7" strokeWidth={1.75} />
      </div>
      <p className="mt-4 text-lg font-semibold -tracking-[0.01em]">
        Nothing in “{label}” yet
      </p>
      <p className="mt-1.5 text-sm tracking-tight text-stone-500">
        New handcrafted pieces are on their way — check back soon.
      </p>
    </div>
  );
}
