"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ExternalLink,
  MapPin,
  PackageCheck,
  XCircle,
} from "lucide-react";
import { PIPELINE_STEPS, type Order, type OrderStatus } from "@/lib/orders";

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});
const timeFmt = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

// Numeric rank so we can tell which pipeline steps are complete.
const RANK: Record<OrderStatus, number> = {
  PAID: 0,
  CONFIRMED: 1,
  RIDER_ASSIGNED: 2,
  OUT_FOR_DELIVERY: 3,
  DELIVERED: 4,
  CANCELLED: -1,
};

export function OrderTracker({ initialOrder }: { initialOrder: Order }) {
  const [order, setOrder] = useState<Order>(initialOrder);

  // Poll for webhook-driven status changes until the order reaches a terminal
  // state. Keeps the pipeline live without a manual refresh.
  useEffect(() => {
    if (order.status === "DELIVERED" || order.status === "CANCELLED") return;
    const id = setInterval(async () => {
      try {
        const res = await fetch(`/api/delivery/order/${order.id}`, {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data?.order) setOrder(data.order as Order);
      } catch {
        /* transient — try again next tick */
      }
    }, 5000);
    return () => clearInterval(id);
  }, [order.id, order.status]);

  const cancelled = order.status === "CANCELLED";
  const rank = RANK[order.status];
  const timeFor = (status: string) =>
    order.history.find((h) => h.status === status)?.at ?? null;

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_20rem] md:items-start">
      {/* Left: status pipeline */}
      <div className="animate-apple-fade-in flex flex-col gap-4">
        {cancelled ? (
          <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
            <XCircle className="h-6 w-6 shrink-0" strokeWidth={2} />
            <div>
              <p className="text-sm font-semibold">Order cancelled</p>
              <p className="text-[13px] tracking-tight">
                This order was cancelled. If this is unexpected, contact support.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white p-4 shadow-[0_2px_16px_-8px_rgba(0,0,0,0.10)]">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-[#C86446]/10 text-[#C86446]">
              <PackageCheck className="h-5 w-5" strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold -tracking-[0.01em]">
                {order.status === "DELIVERED"
                  ? "Delivered"
                  : order.courierName
                    ? `On its way with ${order.courierName}`
                    : "Order confirmed"}
              </p>
              <p className="text-[13px] tracking-tight text-stone-500">
                {order.estimatedMinutes && order.status !== "DELIVERED"
                  ? `Estimated arrival in ~${order.estimatedMinutes} min`
                  : "We'll update this as your parcel moves."}
              </p>
            </div>
          </div>
        )}

        {/* Pipeline */}
        <div className="rounded-2xl border border-black/[0.06] bg-white p-4 shadow-[0_2px_16px_-8px_rgba(0,0,0,0.10)]">
          <ol className="flex flex-col">
            {PIPELINE_STEPS.map((step, i) => {
              const stepRank = i + 1;
              const done = !cancelled && rank >= stepRank;
              const current = !cancelled && rank === stepRank;
              const at = timeFor(step.key);
              const last = i === PIPELINE_STEPS.length - 1;
              return (
                <li key={step.key} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-colors ${
                        done
                          ? "border-[#C86446] bg-[#C86446] text-white"
                          : current
                            ? "border-[#C86446] bg-white text-[#C86446]"
                            : "border-black/[0.12] bg-white text-stone-300"
                      }`}
                    >
                      {done ? (
                        <Check className="h-4 w-4" strokeWidth={2.5} />
                      ) : (
                        <span className={`h-2 w-2 rounded-full ${current ? "bg-[#C86446]" : "bg-stone-300"}`} />
                      )}
                    </span>
                    {!last && (
                      <span
                        className={`my-1 w-0.5 flex-1 rounded-full ${
                          rank > stepRank ? "bg-[#C86446]" : "bg-black/[0.08]"
                        }`}
                        style={{ minHeight: 28 }}
                      />
                    )}
                  </div>
                  <div className={last ? "pb-0" : "pb-5"}>
                    <p
                      className={`text-sm font-medium -tracking-[0.01em] ${
                        done || current ? "text-[#1c1c1c]" : "text-stone-400"
                      }`}
                    >
                      {step.label}
                    </p>
                    {at && (
                      <p className="mt-0.5 text-[12px] tracking-tight text-stone-500">
                        {timeFmt.format(new Date(at))}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Live GPS tracking */}
        {order.trackingUrl ? (
          <a
            href={order.trackingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-[#1c1c1c] px-5 py-3 text-sm font-medium text-white transition-all duration-300 ease-[var(--ease-apple-out)] active:scale-[0.98]"
          >
            <MapPin className="h-4 w-4" strokeWidth={2} />
            Track live location
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} />
          </a>
        ) : (
          <div className="flex items-center justify-center gap-2 rounded-full border border-black/[0.08] px-5 py-3 text-sm text-stone-400">
            <MapPin className="h-4 w-4" strokeWidth={2} />
            Live tracking link will appear once the courier is assigned
          </div>
        )}
      </div>

      {/* Right: order summary */}
      <div className="rounded-2xl border border-black/[0.06] bg-white p-4 shadow-[0_2px_16px_-8px_rgba(0,0,0,0.10)] md:sticky md:top-24">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold -tracking-[0.01em]">Order summary</span>
          <span className="rounded-full bg-black/[0.04] px-2 py-0.5 font-mono text-[11px] text-stone-500">
            {order.id}
          </span>
        </div>

        <ul className="mt-3 flex flex-col gap-2">
          {order.items.map((it) => (
            <li key={it.id} className="flex items-start justify-between gap-2 text-sm">
              <span className="min-w-0">
                <span className="block truncate tracking-tight">{it.name}</span>
                <span className="text-xs text-stone-500">Qty {it.qty}</span>
              </span>
              <span className="shrink-0 tabular-nums">{inr.format(it.price * it.qty)}</span>
            </li>
          ))}
        </ul>

        <div className="my-3 border-t border-black/[0.06]" />
        <Row label="Subtotal" value={inr.format(order.subtotal)} muted />
        <Row
          label="Delivery"
          value={order.deliveryFee === 0 ? "Free" : inr.format(order.deliveryFee)}
          muted
        />
        <div className="my-3 border-t border-black/[0.06]" />
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Total paid</span>
          <span className="font-[family-name:var(--font-display)] text-xl tracking-tight tabular-nums">
            {inr.format(order.total)}
          </span>
        </div>

        <div className="mt-3 rounded-xl bg-stone-50 p-3 text-[12px] leading-relaxed tracking-tight text-stone-500">
          <p className="font-medium text-stone-600">Delivering to</p>
          <p>{order.address.name}</p>
          <p>
            {order.address.address}
            {order.address.address2 ? `, ${order.address.address2}` : ""}
          </p>
          <p>
            {order.address.city}, {order.address.state} {order.address.pincode}
          </p>
          <p>{order.address.phone}</p>
        </div>

        <Link
          href="/shop"
          className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-full border border-black/[0.10] px-5 py-2.5 text-sm font-medium transition-colors hover:bg-black/[0.03]"
        >
          Continue shopping
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </Link>
      </div>
    </div>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className={muted ? "text-stone-500" : ""}>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}
