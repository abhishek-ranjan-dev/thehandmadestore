import { NextResponse } from "next/server";
import { getOrder } from "@/lib/orders";

/**
 * GET /api/delivery/order/[orderId]
 *
 * Read-only order snapshot, used by the tracking page's client poller to
 * reflect webhook-driven status changes without a manual refresh.
 */

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  ctx: RouteContext<"/api/delivery/order/[orderId]">,
) {
  const { orderId } = await ctx.params;
  const order = getOrder(orderId);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
  return NextResponse.json({ order }, { status: 200 });
}
