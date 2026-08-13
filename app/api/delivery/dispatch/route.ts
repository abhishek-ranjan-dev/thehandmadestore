import { NextResponse } from "next/server";
import { getProduct } from "@/lib/products";
import {
  createOrder,
  updateOrder,
  setOrderStatus,
  type DeliveryAddress,
  type OrderItem,
} from "@/lib/orders";
import {
  createAdhocOrder,
  ShiprocketConfigError,
  ShiprocketApiError,
} from "@/lib/shiprocket";

/**
 * POST /api/delivery/dispatch
 *
 * "Place Order". Saves the order as PAID, then creates a Shiprocket adhoc
 * (hyperlocal) order and stores the returned shipment_id / order_id /
 * tracking_url. Prices are recomputed server-side from the catalogue — the
 * client's line prices are never trusted.
 */

export const runtime = "nodejs";

type IncomingItem = { id?: unknown; qty?: unknown };
type Body = {
  items?: unknown;
  address?: Partial<Record<keyof DeliveryAddress, unknown>>;
  deliveryFee?: unknown;
  courierName?: unknown;
  estimatedMinutes?: unknown;
};

const PINCODE_RE = /^\d{6}$/;
const PHONE_RE = /^\d{10}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateAddress(
  raw: Body["address"],
): { ok: true; address: DeliveryAddress } | { ok: false; error: string } {
  const a = raw ?? {};
  const s = (v: unknown) => String(v ?? "").trim();
  const address: DeliveryAddress = {
    name: s(a.name),
    phone: s(a.phone),
    email: s(a.email),
    address: s(a.address),
    address2: s(a.address2) || undefined,
    city: s(a.city),
    state: s(a.state),
    pincode: s(a.pincode),
    country: s(a.country) || "India",
  };
  if (!address.name) return { ok: false, error: "Name is required" };
  if (!PHONE_RE.test(address.phone))
    return { ok: false, error: "A valid 10-digit phone is required" };
  if (!EMAIL_RE.test(address.email))
    return { ok: false, error: "A valid email is required" };
  if (!address.address) return { ok: false, error: "Address is required" };
  if (!address.city) return { ok: false, error: "City is required" };
  if (!address.state) return { ok: false, error: "State is required" };
  if (!PINCODE_RE.test(address.pincode))
    return { ok: false, error: "A valid 6-digit pincode is required" };
  return { ok: true, address };
}

function genOrderId(): string {
  const rand = Math.random().toString(36).slice(2, 6);
  return `THS-${Date.now().toString(36)}${rand}`.toUpperCase();
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // ---- Validate + reprice items from the catalogue --------------------------
  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }
  const items: OrderItem[] = [];
  for (const raw of body.items as IncomingItem[]) {
    const id = String(raw?.id ?? "");
    const qty = Math.floor(Number(raw?.qty));
    const product = getProduct(id);
    if (!product) {
      return NextResponse.json(
        { error: `Unknown product: ${id}` },
        { status: 400 },
      );
    }
    if (!Number.isFinite(qty) || qty <= 0) {
      return NextResponse.json(
        { error: `Invalid quantity for ${product.name}` },
        { status: 400 },
      );
    }
    items.push({
      id: product.id,
      name: product.name,
      sku: `THS-${product.id}`.toUpperCase(),
      qty,
      price: product.price,
    });
  }

  // ---- Validate address -----------------------------------------------------
  const addr = validateAddress(body.address);
  if (!addr.ok) return NextResponse.json({ error: addr.error }, { status: 400 });

  // ---- Money ----------------------------------------------------------------
  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const deliveryFeeRaw = Number(body.deliveryFee);
  const deliveryFee =
    Number.isFinite(deliveryFeeRaw) && deliveryFeeRaw >= 0 ? Math.round(deliveryFeeRaw) : 0;
  const courierName =
    typeof body.courierName === "string" ? body.courierName : null;
  const estimatedMinutes = Number.isFinite(Number(body.estimatedMinutes))
    ? Number(body.estimatedMinutes)
    : null;

  const totalUnits = items.reduce((n, it) => n + it.qty, 0);
  const parcelWeight = Math.max(0.5, Number((totalUnits * 0.3).toFixed(2)));

  // ---- 1. Persist as PAID ---------------------------------------------------
  const orderId = genOrderId();
  createOrder({
    id: orderId,
    items,
    address: addr.address,
    subtotal,
    deliveryFee,
    courierName,
    estimatedMinutes,
  });

  // ---- 2. Create Shiprocket adhoc (hyperlocal) order ------------------------
  const [firstName, ...rest] = addr.address.name.split(" ");
  try {
    const sr = await createAdhocOrder({
      orderId,
      billing: {
        name: firstName,
        lastName: rest.join(" "),
        address: addr.address.address,
        address2: addr.address.address2,
        city: addr.address.city,
        state: addr.address.state,
        pincode: addr.address.pincode,
        country: addr.address.country,
        email: addr.address.email,
        phone: addr.address.phone,
      },
      items: items.map((it) => ({
        name: it.name,
        sku: it.sku,
        units: it.qty,
        sellingPrice: it.price,
      })),
      subTotal: subtotal,
      parcel: { length: 15, breadth: 15, height: 10, weight: parcelWeight },
    });

    updateOrder(orderId, {
      shiprocketOrderId: sr.shiprocketOrderId,
      shipmentId: sr.shipmentId,
      awbCode: sr.awbCode,
      trackingUrl: sr.trackingUrl,
      courierName: sr.courierName ?? courierName,
    });
    const confirmed = setOrderStatus(
      orderId,
      "CONFIRMED",
      "Order created with Shiprocket",
    );

    return NextResponse.json({
      orderId,
      trackingUrl: sr.trackingUrl,
      status: confirmed?.status ?? "CONFIRMED",
    });
  } catch (err) {
    // Order stays PAID so the customer isn't lost; surface a retryable error.
    const configErr = err instanceof ShiprocketConfigError;
    const apiErr = err instanceof ShiprocketApiError;
    updateOrder(orderId, {}); // touch updatedAt
    if (configErr) {
      return NextResponse.json(
        { error: "Delivery service is not configured", orderId },
        { status: 502 },
      );
    }
    if (apiErr) {
      return NextResponse.json(
        {
          error: "Order saved, but dispatch to the courier failed. Please retry.",
          orderId,
        },
        { status: 502 },
      );
    }
    return NextResponse.json({ error: "Unexpected error", orderId }, { status: 500 });
  }
}
