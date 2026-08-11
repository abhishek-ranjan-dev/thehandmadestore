'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Search, X, Heart, ChevronDown } from 'lucide-react';
import {
  PRODUCTS,
  SORT_OPTIONS,
  productPath,
  type Product,
  type SortKey,
} from '@/lib/products';
import { useWishlist } from './ShopProviders';
import { ShopFilters, ShopFiltersMobile } from './ShopFilters';

/* -------------------------------------------------------------------------- */
/*  Products screen — search + sort bar and product grid. Persistent chrome     */
/*  (top bar, tabs) is supplied by the shop layout. Faceted filtering lives in   */
/*  ShopFilters (desktop rail / mobile sheet) — UI only, not yet wired here.     */
/* -------------------------------------------------------------------------- */

const EASE = 'ease-[var(--ease-apple-out)]';

export function ProductsApp() {
  const wishlist = useWishlist();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('recommended');

  const products = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = PRODUCTS.filter((p) =>
      q ? p.name.toLowerCase().includes(q) : true,
    );

    // Sort a copy so the source PRODUCTS order is preserved for "recommended".
    const sorted = [...list];
    switch (sort) {
      case 'newest':
        sorted.sort((a, b) => b.dateAdded.localeCompare(a.dateAdded));
        break;
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break; // "recommended" keeps the curated source order
    }
    return sorted;
  }, [query, sort]);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-4 md:px-6 md:pt-6">
      {/* Heading kept for document structure / SEO but visually hidden. */}
      <h1 className="sr-only">All Products</h1>

      {/* Desktop: left filter rail + main column. Mobile: single column
          (the rail collapses into the Filters bottom sheet). */}
      <div className="md:grid md:grid-cols-[15rem_1fr] md:items-start md:gap-6">
        <ShopFilters />

        <div className="min-w-0">
          {/* Filter bar — sticks to the very top on mobile (the brand header
              is not sticky and scrolls away); a static card on desktop. */}
          <div className="sticky top-0 z-40 -mx-4 border-y border-black/[0.06] bg-[#FDFBF7]/80 backdrop-blur-xl backdrop-saturate-150 md:static md:mx-0 md:rounded-2xl md:border">
        {/* Bar row — consistent on all breakpoints: inline search + sort. On
            mobile a Filters button (left) opens the same panel as a bottom
            sheet; on desktop that panel is the always-visible left rail. */}
        <div className="flex items-center gap-2 px-4 py-3">
          {/* Mobile: Filters trigger — opens the filter panel as a bottom sheet */}
          <ShopFiltersMobile />

          {/* Inline search — fills the bar on all breakpoints */}
          <div className="flex h-9 flex-1 items-center gap-2 rounded-full bg-black/[0.05] px-4">
            <Search className="h-4 w-4 shrink-0 text-stone-400" strokeWidth={2} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search handcrafted products…"
              aria-label="Search products"
              className="w-full bg-transparent text-sm tracking-tight placeholder:text-stone-400 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery('')}
                className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-stone-300/70 text-white transition-colors hover:bg-stone-400"
              >
                <X className="h-3 w-3" strokeWidth={3} />
              </button>
            )}
          </div>
          {/* Sort — native select for a11y, styled as a pill. */}
          <div className="relative shrink-0">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              aria-label="Sort products"
              className={`h-9 cursor-pointer appearance-none rounded-full border border-black/[0.06] bg-white py-1.5 pl-4 pr-9 text-[13px] font-medium tracking-tight text-stone-600 transition-colors hover:text-[#C86446] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C86446]/40 ${EASE}`}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
              strokeWidth={2}
            />
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="pt-4">
        {products.length === 0 ? (
          <EmptyState />
        ) : (
          <div
            key={`${query}-${sort}`}
            className="animate-apple-fade-in grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-3"
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
    <article className="group relative overflow-hidden rounded-xl border border-black/[0.06] bg-white shadow-[0_2px_16px_-8px_rgba(0,0,0,0.12)] transition-all duration-500 ease-[var(--ease-apple-out)] active:scale-[0.98] md:hover:-translate-y-1 md:hover:shadow-[0_16px_36px_-16px_rgba(0,0,0,0.22)]">
      {/* Wishlist overlay — sibling of the link so it isn't a nested control */}
      <button
        type="button"
        onClick={onWish}
        aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        aria-pressed={wished}
        className="absolute right-2.5 top-2.5 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/80 text-[#C86446] shadow-sm ring-1 ring-black/[0.06] backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 ease-[var(--ease-apple-out)] hover:bg-white active:scale-90"
      >
        <Heart
          className={`h-[18px] w-[18px] transition-transform duration-300 ease-[var(--ease-apple-out)] ${wished ? 'scale-110' : ''}`}
          strokeWidth={2}
          fill={wished ? 'currentColor' : 'none'}
        />
      </button>

      <Link href={productPath(product.id)} className="block">
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

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-[#C86446]/10 text-[#C86446]">
        <Sparkles className="h-7 w-7" strokeWidth={1.75} />
      </div>
      <p className="mt-4 text-lg font-semibold -tracking-[0.01em]">
        No products found
      </p>
      <p className="mt-1.5 text-sm tracking-tight text-stone-500">
        Try a different search term.
      </p>
    </div>
  );
}
