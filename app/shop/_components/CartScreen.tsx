"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Lock } from "lucide-react";
import { getProduct } from "@/lib/products";
import { ShopScreen } from "./ShopScreen";
import { useCart } from "./ShopProviders";

const EASE = "ease-[var(--ease-apple-out)]";
const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function CartScreen() {
  const cart = useCart();

  const rows = cart.lines
    .map((line) => ({ line, product: getProduct(line.id) }))
    .filter((r): r is { line: typeof r.line; product: NonNullable<typeof r.product> } =>
      Boolean(r.product),
    );

  if (rows.length === 0) {
    return (
      <ShopScreen title="Cart" subtitle="Your bag is empty">
        <EmptyCart />
      </ShopScreen>
    );
  }

  return (
    <ShopScreen
      title="Cart"
      subtitle={`${cart.count} ${cart.count === 1 ? "item" : "items"}`}
    >
      <div className="grid gap-6 md:grid-cols-[1fr_20rem] md:items-start">
        {/* Line items */}
        <ul className="animate-apple-fade-in flex flex-col gap-3">
          {rows.map(({ line, product }) => (
            <li
              key={line.id}
              className="flex gap-3 rounded-2xl border border-black/[0.06] bg-white p-3 shadow-[0_2px_16px_-8px_rgba(0,0,0,0.10)]"
            >
              <Link
                href={product.href}
                className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-stone-100"
              >
                <Image
                  src={product.image.src}
                  alt={product.image.alt}
                  fill
                  sizes="80px"
                  style={{ objectPosition: product.image.objectPosition }}
                  className="object-cover"
                />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    {product.material && (
                      <span className="text-[10px] font-medium uppercase tracking-[0.06em] text-[#C86446]">
                        {product.material}
                      </span>
                    )}
                    <h3 className="truncate text-[13px] font-medium tracking-tight md:text-sm">
                      {product.name}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => cart.remove(line.id)}
                    aria-label={`Remove ${product.name}`}
                    className="shrink-0 rounded-full p-1.5 text-stone-400 transition-colors hover:bg-black/[0.04] hover:text-[#C86446]"
                  >
                    <Trash2 className="h-4 w-4" strokeWidth={2} />
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between pt-2">
                  {/* Quantity stepper */}
                  <div className="flex items-center gap-1 rounded-full border border-black/[0.08] p-0.5">
                    <button
                      type="button"
                      onClick={() => cart.setQty(line.id, line.qty - 1)}
                      aria-label="Decrease quantity"
                      className={`grid h-7 w-7 place-items-center rounded-full text-stone-600 transition-all duration-200 hover:bg-black/[0.05] active:scale-90 ${EASE}`}
                    >
                      <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </button>
                    <span className="w-6 text-center text-sm font-medium tabular-nums">
                      {line.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => cart.setQty(line.id, line.qty + 1)}
                      aria-label="Increase quantity"
                      className={`grid h-7 w-7 place-items-center rounded-full text-stone-600 transition-all duration-200 hover:bg-black/[0.05] active:scale-90 ${EASE}`}
                    >
                      <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </button>
                  </div>

                  <span className="font-[family-name:var(--font-display)] text-[15px] tracking-tight">
                    {inr.format(product.price * line.qty)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Summary */}
        <div className="rounded-2xl border border-black/[0.06] bg-white p-4 shadow-[0_2px_16px_-8px_rgba(0,0,0,0.10)] md:sticky md:top-24">
          <div className="flex items-center justify-between text-sm">
            <span className="text-stone-500">Subtotal</span>
            <span className="font-medium tabular-nums">{cart.formattedSubtotal}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-stone-500">Shipping</span>
            <span className="text-stone-500">Calculated at checkout</span>
          </div>
          <div className="my-3 border-t border-black/[0.06]" />
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total</span>
            <span className="font-[family-name:var(--font-display)] text-xl tracking-tight">
              {cart.formattedSubtotal}
            </span>
          </div>

          <button
            type="button"
            title="Secure checkout — coming soon"
            className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#C86446] px-5 py-3 text-sm font-medium text-white shadow-[0_4px_14px_-4px_rgba(200,100,70,0.55)] transition-all duration-300 active:scale-[0.98] ${EASE}`}
          >
            <Lock className="h-4 w-4" strokeWidth={2} />
            Checkout
          </button>
          <p className="mt-2 text-center text-[11px] tracking-tight text-stone-400">
            Secure checkout — coming soon
          </p>
        </div>
      </div>
    </ShopScreen>
  );
}

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-[#C86446]/10 text-[#C86446]">
        <ShoppingBag className="h-7 w-7" strokeWidth={1.75} />
      </div>
      <p className="mt-4 text-lg font-semibold -tracking-[0.01em]">Your bag is empty</p>
      <p className="mt-1.5 max-w-xs text-sm tracking-tight text-stone-500">
        Add handcrafted pieces from your wishlist or the shop.
      </p>
      <Link
        href="/shop"
        className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-[#C86446] px-5 py-2.5 text-sm font-medium text-white shadow-[0_4px_14px_-4px_rgba(200,100,70,0.55)] transition-all duration-300 ease-[var(--ease-apple-out)] active:scale-95"
      >
        Start shopping
        <ArrowRight className="h-4 w-4" strokeWidth={2} />
      </Link>
    </div>
  );
}
