import { NextResponse } from "next/server";
import {
  findByAwb,
  findByShipmentId,
  getOrder,
  mapShiprocketStatus,
  setOrderStatus,
} from "@/lib/orders";

/**
 * POST /api/delivery/webhook
 *
 * Receiver for Shiprocket shipment status updates. Matches the incoming event
 * to a stored order (by shipment_id, AWB, or our order_id), maps Shiprocket's
 * status string onto our internal pipeline status, and persists it.
 *
 * Always responds 200 for well-formed bodies (even when unmatched/unmapped) so
 * Shiprocket doesn't retry on our own bookkeeping gaps. Only a malformed body
 * yields 400.
 *
 * NOTE (demo): signature/secret verification is intentionally omitted — no
 * shared webhook secret is available without a live Shiprocket account. In
 * production, verify the `x-api-key` header Shiprocket sends before trusting.
 */

export const runtime = "nodejs";

type WebhookBody = {
  awb?: string | number;
  shipment_id?: string | number;
  order_id?: string | number;
  current_status?: string;
  shipment_status?: string;
  status?: string;
};

export async function POST(request: Request) {
  let body: WebhookBody;
  try {
    body = (await request.json()) as WebhookBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const rawStatus = String(
    body.current_status ?? body.shipment_status ?? body.status ?? "",
  ).trim();
  if (!rawStatus) {
    return NextResponse.json(
      { ok: true, matched: false, reason: "no status in payload" },
      { status: 200 },
    );
  }

  // Resolve the order: shipment_id → AWB → our order_id.
  let order =
    body.shipment_id != null ? findByShipmentId(body.shipment_id) : undefined;
  if (!order && body.awb != null) order = findByAwb(String(body.awb));
  if (!order && body.order_id != null) order = getOrder(String(body.order_id));

  if (!order) {
    return NextResponse.json(
      { ok: true, matched: false, reason: "no matching order" },
      { status: 200 },
    );
  }

  const mapped = mapShiprocketStatus(rawStatus);
  if (!mapped) {
    return NextResponse.json(
      { ok: true, matched: true, status: order.status, ignored: rawStatus },
      { status: 200 },
    );
  }

  const updated = setOrderStatus(order.id, mapped, `Courier update: ${rawStatus}`);
  return NextResponse.json(
    { ok: true, matched: true, status: updated?.status ?? mapped },
    { status: 200 },
  );
}
