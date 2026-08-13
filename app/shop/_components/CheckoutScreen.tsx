"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Lock, ShoppingBag, Truck } from "lucide-react";
import { getProduct, productPath } from "@/lib/products";
import { ShopScreen } from "./ShopScreen";
import { useCart } from "./ShopProviders";

const EASE = "ease-[var(--ease-apple-out)]";
const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const PINCODE_RE = /^\d{6}$/;
const PHONE_RE = /^\d{10}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Form = {
  name: string;
  phone: string;
  email: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
};

const EMPTY: Form = {
  name: "",
  phone: "",
  email: "",
  address: "",
  address2: "",
  city: "",
  state: "",
  pincode: "",
};

type Svc =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "ok"; deliveryFee: number; courierName: string; estimatedMinutes: number | null }
  | { kind: "no"; reason: string }
  | { kind: "error"; message: string };

export function CheckoutScreen() {
  const cart = useCart();
  const router = useRouter();

  const [form, setForm] = useState<Form>(EMPTY);
  const [svc, setSvc] = useState<Svc>({ kind: "idle" });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const rows = cart.lines
    .map((line) => ({ line, product: getProduct(line.id) }))
    .filter((r): r is { line: typeof r.line; product: NonNullable<typeof r.product> } =>
      Boolean(r.product),
    );

  const totalUnits = rows.reduce((n, r) => n + r.line.qty, 0);
  const weightKg = Math.max(0.5, Number((totalUnits * 0.3).toFixed(2)));

  // --- Live serviceability: debounced fetch whenever the pincode is valid ----
  // All state updates happen inside the deferred timeout / async callback (never
  // synchronously in the effect body) so we don't trigger cascading renders.
  useEffect(() => {
    const pincode = form.pincode.trim();
    const valid = PINCODE_RE.test(pincode);
    const ac = new AbortController();
    const t = setTimeout(
      async () => {
        if (!valid) {
          setSvc({ kind: "idle" });
          return;
        }
        setSvc({ kind: "loading" });
        try {
          const res = await fetch("/api/delivery/serviceability", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ deliveryPincode: pincode, weightKg }),
            signal: ac.signal,
          });
          const data = await res.json();
          if (!res.ok) {
            setSvc({
              kind: "error",
              message: data?.error ?? "Couldn't check delivery availability",
            });
            return;
          }
          if (data.serviceable) {
            setSvc({
              kind: "ok",
              deliveryFee: data.deliveryFee,
              courierName: data.courierName,
              estimatedMinutes: data.estimatedMinutes ?? null,
            });
          } else {
            setSvc({ kind: "no", reason: data.reason ?? "Not serviceable" });
          }
        } catch (err) {
          if ((err as Error).name === "AbortError") return;
          setSvc({ kind: "error", message: "Network error. Please try again." });
        }
      },
      valid ? 500 : 0,
    );
    return () => {
      ac.abort();
      clearTimeout(t);
    };
  }, [form.pincode, weightKg]);

  const addressValid =
    form.name.trim() !== "" &&
    PHONE_RE.test(form.phone.trim()) &&
    EMAIL_RE.test(form.email.trim()) &&
    form.address.trim() !== "" &&
    form.city.trim() !== "" &&
    form.state.trim() !== "" &&
    PINCODE_RE.test(form.pincode.trim());

  const deliveryFee = svc.kind === "ok" ? svc.deliveryFee : 0;
  const total = cart.subtotal + deliveryFee;
  const canPlace = addressValid && svc.kind === "ok" && !submitting;

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function placeOrder() {
    if (!canPlace || svc.kind !== "ok") return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/delivery/dispatch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.lines.map((l) => ({ id: l.id, qty: l.qty })),
          address: { ...form, country: "India" },
          deliveryFee: svc.deliveryFee,
          courierName: svc.courierName,
          estimatedMinutes: svc.estimatedMinutes,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data?.error ?? "Couldn't place the order. Please try again.");
        setSubmitting(false);
        return;
      }
      cart.clear();
      router.push(`/shop/order/${data.orderId}`);
    } catch {
      setSubmitError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  if (rows.length === 0) {
    return (
      <ShopScreen title="Checkout" subtitle="Your bag is empty">
        <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-[#C86446]/10 text-[#C86446]">
            <ShoppingBag className="h-7 w-7" strokeWidth={1.75} />
          </div>
          <p className="mt-4 text-lg font-semibold -tracking-[0.01em]">Nothing to check out</p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-[#C86446] px-5 py-2.5 text-sm font-medium text-white shadow-[0_4px_14px_-4px_rgba(200,100,70,0.55)] transition-all duration-300 ease-[var(--ease-apple-out)] active:scale-95"
          >
            Start shopping
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </ShopScreen>
    );
  }

  return (
    <ShopScreen title="Checkout" subtitle={`${cart.count} ${cart.count === 1 ? "item" : "items"}`}>
      <div className="grid gap-6 md:grid-cols-[1fr_20rem] md:items-start">
        {/* Delivery address form */}
        <div className="animate-apple-fade-in flex flex-col gap-4">
          <section className="rounded-2xl border border-black/[0.06] bg-white p-4 shadow-[0_2px_16px_-8px_rgba(0,0,0,0.10)]">
            <h2 className="text-sm font-semibold -tracking-[0.01em]">Delivery address</h2>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Full name" className="sm:col-span-2">
                <input {...inputProps} value={form.name} onChange={set("name")} placeholder="Jane Doe" autoComplete="name" />
              </Field>
              <Field label="Phone" hint={form.phone && !PHONE_RE.test(form.phone) ? "10 digits" : undefined}>
                <input {...inputProps} value={form.phone} onChange={set("phone")} placeholder="9876543210" inputMode="numeric" autoComplete="tel" />
              </Field>
              <Field label="Email" hint={form.email && !EMAIL_RE.test(form.email) ? "Invalid email" : undefined}>
                <input {...inputProps} value={form.email} onChange={set("email")} placeholder="jane@example.com" type="email" autoComplete="email" />
              </Field>
              <Field label="Address" className="sm:col-span-2">
                <input {...inputProps} value={form.address} onChange={set("address")} placeholder="Flat / House no, Street" autoComplete="address-line1" />
              </Field>
              <Field label="Apartment, landmark (optional)" className="sm:col-span-2">
                <input {...inputProps} value={form.address2} onChange={set("address2")} placeholder="Near…" autoComplete="address-line2" />
              </Field>
              <Field label="City">
                <input {...inputProps} value={form.city} onChange={set("city")} placeholder="Bengaluru" autoComplete="address-level2" />
              </Field>
              <Field label="State">
                <input {...inputProps} value={form.state} onChange={set("state")} placeholder="Karnataka" autoComplete="address-level1" />
              </Field>
              <Field label="Pincode" hint={form.pincode && !PINCODE_RE.test(form.pincode) ? "6 digits" : undefined}>
                <input {...inputProps} value={form.pincode} onChange={set("pincode")} placeholder="560001" inputMode="numeric" autoComplete="postal-code" maxLength={6} />
              </Field>
            </div>

            {/* Live delivery estimate */}
            <DeliveryEstimate svc={svc} />
          </section>

          {/* Line items */}
          <ul className="flex flex-col gap-3">
            {rows.map(({ line, product }) => (
              <li key={line.id} className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white p-3 shadow-[0_2px_16px_-8px_rgba(0,0,0,0.10)]">
                <Link href={productPath(product.id)} className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-stone-100">
                  <Image src={product.image.src} alt={product.image.alt} fill sizes="64px" style={{ objectPosition: product.image.objectPosition }} className="object-cover" />
                </Link>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-[13px] font-medium tracking-tight">{product.name}</h3>
                  <p className="text-xs text-stone-500">Qty {line.qty}</p>
                </div>
                <span className="font-[family-name:var(--font-display)] text-[15px] tracking-tight tabular-nums">
                  {inr.format(product.price * line.qty)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Order summary */}
        <div className="rounded-2xl border border-black/[0.06] bg-white p-4 shadow-[0_2px_16px_-8px_rgba(0,0,0,0.10)] md:sticky md:top-24">
          <div className="flex items-center justify-between text-sm">
            <span className="text-stone-500">Subtotal</span>
            <span className="font-medium tabular-nums">{cart.formattedSubtotal}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-stone-500">Delivery</span>
            <span className="tabular-nums">
              {svc.kind === "ok" ? (
                deliveryFee === 0 ? "Free" : inr.format(deliveryFee)
              ) : svc.kind === "loading" ? (
                <Loader2 className="inline h-3.5 w-3.5 animate-spin text-stone-400" />
              ) : (
                <span className="text-stone-400">Enter pincode</span>
              )}
            </span>
          </div>
          <div className="my-3 border-t border-black/[0.06]" />
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total</span>
            <span className="font-[family-name:var(--font-display)] text-xl tracking-tight tabular-nums">
              {inr.format(total)}
            </span>
          </div>

          <button
            type="button"
            onClick={placeOrder}
            disabled={!canPlace}
            className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#C86446] px-5 py-3 text-sm font-medium text-white shadow-[0_4px_14px_-4px_rgba(200,100,70,0.55)] transition-all duration-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${EASE}`}
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                Placing order…
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" strokeWidth={2} />
                Place Order · {inr.format(total)}
              </>
            )}
          </button>

          {submitError && (
            <p className="mt-2 text-center text-[12px] tracking-tight text-red-600">{submitError}</p>
          )}
          <p className="mt-2 text-center text-[11px] tracking-tight text-stone-400">
            Demo checkout — no payment is taken. Order is marked paid instantly.
          </p>
        </div>
      </div>
    </ShopScreen>
  );
}

/* ------------------------------- helpers --------------------------------- */

const inputProps = {
  className:
    "w-full rounded-xl border border-black/[0.10] bg-white px-3 py-2 text-sm outline-none transition-colors placeholder:text-stone-400 focus:border-[#C86446] focus:ring-2 focus:ring-[#C86446]/15",
};

function Field({
  label,
  hint,
  className = "",
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      <span className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.05em] text-stone-500">
        {label}
        {hint && <span className="text-[10px] normal-case tracking-normal text-red-500">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

function DeliveryEstimate({ svc }: { svc: Svc }) {
  if (svc.kind === "idle") return null;
  const base =
    "mt-3 flex items-center gap-2 rounded-xl px-3 py-2.5 text-[13px] tracking-tight";
  if (svc.kind === "loading") {
    return (
      <div className={`${base} bg-stone-50 text-stone-500`}>
        <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
        Checking delivery availability…
      </div>
    );
  }
  if (svc.kind === "ok") {
    return (
      <div className={`${base} bg-[#C86446]/[0.07] text-[#8a4230]`}>
        <Truck className="h-4 w-4 shrink-0" strokeWidth={2} />
        <span>
          Delivered by <strong className="font-semibold">{svc.courierName}</strong>
          {svc.estimatedMinutes ? ` · ~${svc.estimatedMinutes} min` : ""} ·{" "}
          {svc.deliveryFee === 0 ? "Free delivery" : `${inr.format(svc.deliveryFee)} delivery`}
        </span>
      </div>
    );
  }
  if (svc.kind === "no") {
    return (
      <div className={`${base} bg-amber-50 text-amber-700`}>
        <Truck className="h-4 w-4 shrink-0" strokeWidth={2} />
        Sorry, we don&apos;t deliver to this pincode yet.
      </div>
    );
  }
  return (
    <div className={`${base} bg-red-50 text-red-600`}>
      <Truck className="h-4 w-4 shrink-0" strokeWidth={2} />
      {svc.message}
    </div>
  );
}
