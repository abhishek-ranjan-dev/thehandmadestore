"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CATEGORIES,
  PRODUCTS,
  SORT_OPTIONS,
  type CategorySlug,
  type Product,
  type SortKey,
} from "@/app/_components/products/data";

const EASE_APPLE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";

function sortProducts(list: Product[], sort: SortKey): Product[] {
  switch (sort) {
    case "newest":
      return [...list].sort((a, b) => b.dateAdded.localeCompare(a.dateAdded));
    case "price-asc":
      return [...list].sort((a, b) => a.price - b.price);
    case "price-desc":
      return [...list].sort((a, b) => b.price - a.price);
    case "name-asc":
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return [...list].sort((a, b) => b.name.localeCompare(a.name));
    default:
      return list;
  }
}

function FunnelIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M3 4h14l-5.5 7v4.5l-3 1.5v-6z" />
    </svg>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <li>
      <Link
        href={product.href}
        target="_blank"
        rel="noreferrer noopener"
        className="group block"
      >
        <div className="relative w-full overflow-hidden bg-ths-sand/60">
          <div className="relative aspect-square w-full">
            <Image
              src={product.image.src}
              alt={product.image.alt}
              fill
              sizes="(min-width: 1024px) 22vw, (min-width: 640px) 40vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              style={{
                objectPosition: product.image.objectPosition ?? "50% 50%",
                transitionTimingFunction: EASE_APPLE_OUT,
              }}
              priority={index < 4}
            />
          </div>
          {product.ribbon ? (
            <span className="absolute left-4 top-4 inline-flex items-center bg-ths-cream/95 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-ths-ink">
              {product.ribbon}
            </span>
          ) : null}
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <h3 className="font-display text-lg leading-snug text-ths-ink md:text-xl">
            {product.name}
          </h3>
          <span className="whitespace-nowrap pt-1 text-sm text-ths-ink/70 md:text-base">
            {product.formattedPrice}
          </span>
        </div>
      </Link>
    </li>
  );
}

export function ProductsBrowser() {
  const [category, setCategory] = useState<CategorySlug>("all-products");
  const [sort, setSort] = useState<SortKey>("recommended");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [filtersVisible, setFiltersVisible] = useState(true);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      "all-products": PRODUCTS.length,
    };
    for (const p of PRODUCTS) {
      for (const c of p.categories) {
        counts[c] = (counts[c] ?? 0) + 1;
      }
    }
    return counts;
  }, []);

  const filtered = useMemo(() => {
    const min = minPrice === "" ? -Infinity : Number(minPrice);
    const max = maxPrice === "" ? Infinity : Number(maxPrice);
    const inCategory =
      category === "all-products"
        ? PRODUCTS
        : PRODUCTS.filter((p) =>
            (p.categories as string[]).includes(category)
          );
    const inPrice = inCategory.filter(
      (p) => p.price >= min && p.price <= max
    );
    return sortProducts(inPrice, sort);
  }, [category, sort, minPrice, maxPrice]);

  const priceStats = useMemo(() => {
    const prices = PRODUCTS.map((p) => p.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, []);

  const activeFilterCount =
    (category !== "all-products" ? 1 : 0) +
    (minPrice !== "" ? 1 : 0) +
    (maxPrice !== "" ? 1 : 0);
  const isFiltered = activeFilterCount > 0 || sort !== "recommended";

  const resetFilters = () => {
    setCategory("all-products");
    setSort("recommended");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <section className="w-full bg-ths-cream">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <nav
          aria-label="Breadcrumb"
          className="text-[11px] uppercase tracking-[0.3em] text-ths-earth"
        >
          <ol className="flex items-center gap-3">
            <li>
              <Link href="/" className="hover:opacity-70">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-ths-ink/40">
              /
            </li>
            <li className="text-ths-ink/60">Shop</li>
          </ol>
        </nav>

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
          <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-ths-ink md:text-5xl lg:text-6xl">
            Shop the store
          </h1>
          <p
            className="text-sm text-ths-ink/60"
            aria-live="polite"
            aria-atomic="true"
          >
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
            {isFiltered ? " — filtered" : ""}
          </p>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4 border-b border-ths-earth/15 pb-3">
          <button
            type="button"
            onClick={() => setFiltersVisible((v) => !v)}
            aria-pressed={filtersVisible}
            aria-controls="products-filters"
            className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-ths-ink/70 transition-colors duration-200 hover:text-ths-ink"
          >
            <FunnelIcon className="h-4 w-4" />
            <span>{filtersVisible ? "Hide filters" : "Show filters"}</span>
            {activeFilterCount > 0 ? (
              <span
                aria-label={`${activeFilterCount} active`}
                className="ml-1 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-ths-earth px-1 text-[9px] font-medium text-ths-cream"
              >
                {activeFilterCount}
              </span>
            ) : null}
          </button>

          <label className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-ths-ink/70">
            <span className="hidden sm:inline">Sort by</span>
            <span className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="cursor-pointer appearance-none border-0 border-b border-ths-ink/30 bg-transparent py-1 pl-1 pr-6 text-[11px] uppercase tracking-[0.25em] text-ths-ink focus:border-ths-ink focus:outline-none"
                aria-label="Sort products by"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <span
                aria-hidden
                className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-ths-ink/60"
              >
                ▾
              </span>
            </span>
          </label>
        </div>

        <div className="mt-8 flex flex-col gap-10 md:flex-row md:gap-12">
          {filtersVisible ? (
            <aside
              id="products-filters"
              className="md:w-52 md:flex-shrink-0 md:pr-2"
              aria-label="Product filters"
            >
              <div>
                <h2 className="text-[10px] uppercase tracking-[0.28em] text-ths-earth/80">
                  Browse by
                </h2>
                <ul className="mt-3 space-y-0.5 border-t border-ths-earth/15 pt-2">
                  {CATEGORIES.map((cat) => {
                    const active = category === cat.slug;
                    const count = categoryCounts[cat.slug] ?? 0;
                    return (
                      <li key={cat.slug}>
                        <button
                          type="button"
                          aria-pressed={active}
                          onClick={() => setCategory(cat.slug)}
                          className={`flex w-full items-center justify-between py-1 text-left text-[13px] transition-colors duration-200 ${
                            active
                              ? "font-medium text-ths-ink"
                              : "text-ths-ink/55 hover:text-ths-ink"
                          }`}
                        >
                          <span>{cat.label}</span>
                          <span className="tabular-nums text-[10px] text-ths-ink/35">
                            {count}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-8">
                <div className="flex items-baseline justify-between">
                  <h2 className="text-[10px] uppercase tracking-[0.28em] text-ths-earth/80">
                    Price
                  </h2>
                  <span className="text-[10px] text-ths-ink/40">
                    ₹{priceStats.min}–₹{priceStats.max}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 border-t border-ths-earth/15 pt-3">
                  <label className="block">
                    <span className="sr-only">Minimum price</span>
                    <div className="flex items-center border border-ths-ink/15 bg-ths-cream focus-within:border-ths-ink/60">
                      <span className="pl-2 text-[11px] text-ths-ink/50">
                        ₹
                      </span>
                      <input
                        type="number"
                        inputMode="numeric"
                        min={0}
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="Min"
                        className="w-full bg-transparent px-1.5 py-1 text-[13px] text-ths-ink placeholder:text-ths-ink/30 focus:outline-none"
                      />
                    </div>
                  </label>
                  <label className="block">
                    <span className="sr-only">Maximum price</span>
                    <div className="flex items-center border border-ths-ink/15 bg-ths-cream focus-within:border-ths-ink/60">
                      <span className="pl-2 text-[11px] text-ths-ink/50">
                        ₹
                      </span>
                      <input
                        type="number"
                        inputMode="numeric"
                        min={0}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="Max"
                        className="w-full bg-transparent px-1.5 py-1 text-[13px] text-ths-ink placeholder:text-ths-ink/30 focus:outline-none"
                      />
                    </div>
                  </label>
                </div>
              </div>

              {isFiltered ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-8 text-[10px] uppercase tracking-[0.28em] text-ths-earth underline underline-offset-4 hover:text-ths-ink"
                >
                  Reset filters
                </button>
              ) : null}
            </aside>
          ) : null}

          <main className="flex-1">
            {filtered.length === 0 ? (
              <div className="border border-dashed border-ths-earth/30 bg-ths-cream/40 px-6 py-16 text-center">
                <p className="font-display text-2xl text-ths-ink md:text-3xl">
                  Nothing matches yet.
                </p>
                <p className="mt-3 text-sm text-ths-ink/70">
                  Try widening the price range or picking another category.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-6 inline-flex items-center gap-2 border border-ths-ink px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-ths-ink transition-colors duration-300 hover:bg-ths-ink hover:text-ths-cream"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <ul
                className={`grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 md:gap-x-8 ${
                  filtersVisible
                    ? "lg:grid-cols-3"
                    : "lg:grid-cols-3 xl:grid-cols-4"
                }`}
              >
                {filtered.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </ul>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}
