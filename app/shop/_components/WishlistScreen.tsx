"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, X, ShoppingBag, ArrowRight } from "lucide-react";
import { getProduct } from "@/lib/products";
import { ShopScreen } from "./ShopScreen";
import { useCart, useWishlist } from "./ShopProviders";

const EASE = "ease-[var(--ease-apple-out)]";

export function WishlistScreen() {
  const wishlist = useWishlist();
  const cart = useCart();

  const items = wishlist.ids
    .map((id) => getProduct(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <ShopScreen
      title="Wishlist"
      subtitle={
        items.length
          ? `${items.length} saved ${items.length === 1 ? "piece" : "pieces"}`
          : "Tap the heart on any product to save it here"
      }
      action={
        items.length > 0 ? (
          <button
            type="button"
            onClick={() => items.forEach((p) => wishlist.remove(p.id))}
            className="shrink-0 rounded-full px-3 py-1.5 text-[13px] font-medium tracking-tight text-stone-500 transition-colors hover:text-[#C86446]"
          >
            Clear all
          </button>
        ) : null
      }
    >
      {items.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <div className="animate-apple-fade-in grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {items.map((p) => {
            const inCart = cart.lines.find((l) => l.id === p.id);
            return (
              <article
                key={p.id}
                className="group relative overflow-hidden rounded-[20px] border border-black/[0.06] bg-white shadow-[0_2px_16px_-8px_rgba(0,0,0,0.12)] transition-all duration-500 ease-[var(--ease-apple-out)] md:hover:-translate-y-1 md:hover:shadow-[0_16px_36px_-16px_rgba(0,0,0,0.22)]"
              >
                <button
                  type="button"
                  onClick={() => wishlist.remove(p.id)}
                  aria-label="Remove from wishlist"
                  className="absolute right-2.5 top-2.5 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/70 text-stone-500 shadow-sm backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 ease-[var(--ease-apple-out)] hover:bg-white hover:text-[#C86446] active:scale-90"
                >
                  <X className="h-4 w-4" strokeWidth={2.25} />
                </button>

                <Link href={p.href} className="block">
                  <div className="relative aspect-square overflow-hidden bg-stone-100">
                    <Image
                      src={p.image.src}
                      alt={p.image.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 260px"
                      style={{ objectPosition: p.image.objectPosition }}
                      className="object-cover transition-transform duration-[600ms] ease-[var(--ease-apple-out)] group-hover:scale-105"
                    />
                  </div>
                </Link>

                <div className="p-3.5">
                  {p.material && (
                    <span className="inline-block rounded-full bg-[#C86446]/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.06em] text-[#C86446]">
                      {p.material}
                    </span>
                  )}
                  <h3 className="mt-2 line-clamp-2 text-[13px] font-medium leading-snug tracking-tight md:text-sm">
                    {p.name}
                  </h3>
                  <p className="mt-1 font-[family-name:var(--font-display)] text-[15px] tracking-tight md:text-base">
                    {p.formattedPrice}
                  </p>

                  <button
                    type="button"
                    onClick={() => cart.add(p.id)}
                    className={`mt-3 flex w-full items-center justify-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-medium tracking-tight transition-all duration-300 active:scale-95 ${EASE} ${
                      inCart
                        ? "bg-[#C86446]/10 text-[#C86446]"
                        : "bg-[#222222] text-white hover:bg-black"
                    }`}
                  >
                    <ShoppingBag className="h-4 w-4" strokeWidth={2} />
                    {inCart ? `In Bag · ${inCart.qty}` : "Add to Bag"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </ShopScreen>
  );
}

function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-[#C86446]/10 text-[#C86446]">
        <Heart className="h-7 w-7" strokeWidth={1.75} />
      </div>
      <p className="mt-4 text-lg font-semibold -tracking-[0.01em]">
        No saved pieces yet
      </p>
      <p className="mt-1.5 max-w-xs text-sm tracking-tight text-stone-500">
        Tap the heart on products you love to keep them here.
      </p>
      <Link
        href="/shop"
        className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-[#C86446] px-5 py-2.5 text-sm font-medium text-white shadow-[0_4px_14px_-4px_rgba(200,100,70,0.55)] transition-all duration-300 ease-[var(--ease-apple-out)] active:scale-95"
      >
        Browse products
        <ArrowRight className="h-4 w-4" strokeWidth={2} />
      </Link>
    </div>
  );
}
