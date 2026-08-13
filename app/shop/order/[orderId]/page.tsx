import type { Metadata } from "next";
import Link from "next/link";
import { PackageX } from "lucide-react";
import { getOrder } from "@/lib/orders";
import { ShopScreen } from "../../_components/ShopScreen";
import { OrderTracker } from "../../_components/OrderTracker";

export const metadata: Metadata = {
  title: "Track order",
  robots: { index: false, follow: false },
};

export default async function OrderTrackingPage({
  params,
}: PageProps<"/shop/order/[orderId]">) {
  const { orderId } = await params;
  const order = getOrder(orderId);

  if (!order) {
    return (
      <ShopScreen title="Track order" subtitle="Order not found">
        <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-black/[0.04] text-stone-400">
            <PackageX className="h-7 w-7" strokeWidth={1.75} />
          </div>
          <p className="mt-4 text-lg font-semibold -tracking-[0.01em]">
            We couldn&apos;t find that order
          </p>
          <p className="mt-1.5 max-w-xs text-sm tracking-tight text-stone-500">
            The order <span className="font-mono">{orderId}</span> doesn&apos;t exist or has
            expired from this demo session.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-[#C86446] px-5 py-2.5 text-sm font-medium text-white shadow-[0_4px_14px_-4px_rgba(200,100,70,0.55)] transition-all duration-300 ease-[var(--ease-apple-out)] active:scale-95"
          >
            Back to shop
          </Link>
        </div>
      </ShopScreen>
    );
  }

  return (
    <ShopScreen title="Track order" subtitle={`Order ${order.id}`}>
      <OrderTracker initialOrder={order} />
    </ShopScreen>
  );
}
