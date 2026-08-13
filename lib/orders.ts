/**
 * In-memory order store for the demo fulfilment flow.
 *
 * There is no real database in this project, so orders live in a module-level
 * Map. We stash it on `globalThis` so it survives Next's dev-mode hot reloads
 * (each HMR pass re-evaluates the module otherwise, wiping the store). In a
 * real deployment this file is the single place to swap in Prisma/Postgres/etc.
 *
 * Server-only: imported by route handlers and server components, never by
 * client code.
 */

/* ------------------------------- Types ----------------------------------- */

/** Internal order lifecycle — drives the tracking pipeline UI. */
export type OrderStatus =
  | "PAID" // payment captured (demo: instant); courier not yet acknowledged
  | "CONFIRMED" // order created with Shiprocket
  | "RIDER_ASSIGNED" // courier assigned / awaiting pickup
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

/** The four ordered stages shown as the delivery pipeline in the UI. */
export const PIPELINE_STEPS = [
  { key: "CONFIRMED", label: "Order Confirmed" },
  { key: "RIDER_ASSIGNED", label: "Rider Assigned" },
  { key: "OUT_FOR_DELIVERY", label: "Out for Delivery" },
  { key: "DELIVERED", label: "Delivered" },
] as const;

export type PipelineKey = (typeof PIPELINE_STEPS)[number]["key"];

export type OrderItem = {
  id: string;
  name: string;
  sku: string;
  qty: number;
  price: number; // unit price, INR
};

export type DeliveryAddress = {
  name: string;
  phone: string;
  email: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
};

export type StatusEvent = { status: OrderStatus; at: string; note?: string };

export type Order = {
  id: string; // internal order id (also sent to Shiprocket as order_id)
  status: OrderStatus;
  paymentStatus: "PAID"; // demo: always paid on placement
  items: OrderItem[];
  address: DeliveryAddress;
  subtotal: number;
  deliveryFee: number;
  total: number;
  courierName: string | null;
  estimatedMinutes: number | null;
  // Shiprocket linkage
  shiprocketOrderId: number | string | null;
  shipmentId: number | string | null;
  awbCode: string | null;
  trackingUrl: string | null;
  createdAt: string;
  updatedAt: string;
  history: StatusEvent[];
};

/* ----------------------------- Global store ------------------------------ */

type Store = Map<string, Order>;
const g = globalThis as { __ordersStore?: Store };
const store: Store = g.__ordersStore ?? new Map<string, Order>();
g.__ordersStore = store;

/* ------------------------------ Operations ------------------------------- */

export type CreateOrderInput = {
  id: string;
  items: OrderItem[];
  address: DeliveryAddress;
  subtotal: number;
  deliveryFee: number;
  courierName: string | null;
  estimatedMinutes: number | null;
};

export function createOrder(input: CreateOrderInput): Order {
  const now = new Date().toISOString();
  const order: Order = {
    id: input.id,
    status: "PAID",
    paymentStatus: "PAID",
    items: input.items,
    address: input.address,
    subtotal: input.subtotal,
    deliveryFee: input.deliveryFee,
    total: input.subtotal + input.deliveryFee,
    courierName: input.courierName,
    estimatedMinutes: input.estimatedMinutes,
    shiprocketOrderId: null,
    shipmentId: null,
    awbCode: null,
    trackingUrl: null,
    createdAt: now,
    updatedAt: now,
    history: [{ status: "PAID", at: now, note: "Payment confirmed" }],
  };
  store.set(order.id, order);
  return order;
}

export function getOrder(id: string): Order | undefined {
  return store.get(id);
}

export function updateOrder(id: string, patch: Partial<Order>): Order | undefined {
  const order = store.get(id);
  if (!order) return undefined;
  const next: Order = { ...order, ...patch, updatedAt: new Date().toISOString() };
  store.set(id, next);
  return next;
}

/** Advance an order's status and append to its history timeline (idempotent). */
export function setOrderStatus(
  id: string,
  status: OrderStatus,
  note?: string,
): Order | undefined {
  const order = store.get(id);
  if (!order) return undefined;
  if (order.status === status) return order; // webhooks can repeat — no dup events
  const at = new Date().toISOString();
  const next: Order = {
    ...order,
    status,
    updatedAt: at,
    history: [...order.history, { status, at, note }],
  };
  store.set(id, next);
  return next;
}

/** Find an order by the Shiprocket shipment id (used by the webhook). */
export function findByShipmentId(shipmentId: string | number): Order | undefined {
  const target = String(shipmentId);
  for (const order of store.values()) {
    if (order.shipmentId != null && String(order.shipmentId) === target) return order;
  }
  return undefined;
}

/** Find an order by AWB code (webhooks often key on AWB, not shipment id). */
export function findByAwb(awb: string): Order | undefined {
  for (const order of store.values()) {
    if (order.awbCode && order.awbCode === awb) return order;
  }
  return undefined;
}

/* ---------------------- Shiprocket status mapping ------------------------ */

/**
 * Map an incoming Shiprocket webhook status string onto our internal status.
 * Shiprocket sends free-form uppercase strings; we normalise and match the
 * ones called out in the spec plus the common variants from their docs.
 * Returns null for statuses we don't model (caller ignores them).
 */
export function mapShiprocketStatus(raw: string): OrderStatus | null {
  const s = raw.trim().toUpperCase();
  switch (s) {
    case "AWAITING PICKUP":
    case "PICKUP SCHEDULED":
    case "PICKUP GENERATED":
    case "RIDER ASSIGNED":
    case "OUT FOR PICKUP":
      return "RIDER_ASSIGNED";
    case "OUT FOR DELIVERY":
    case "IN TRANSIT":
      return "OUT_FOR_DELIVERY";
    case "DELIVERED":
      return "DELIVERED";
    case "CANCELLED":
    case "CANCELED":
    case "RTO INITIATED":
    case "RTO DELIVERED":
      return "CANCELLED";
    case "CONFIRMED":
    case "NEW":
    case "ORDER CONFIRMED":
      return "CONFIRMED";
    default:
      return null;
  }
}
