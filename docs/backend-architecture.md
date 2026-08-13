# Shop Backend — Architecture

Concise reference for the server side of the `/shop` module: the checkout →
delivery fulfilment flow built on Next 16 route handlers, an in-memory order
store, and a Shiprocket (hyperlocal) integration.

> Design rationale and decisions live in [`fulfillment-design.md`](./fulfillment-design.md).
> Upstream API reference: [`shiprocket-api.md`](./shiprocket-api.md).

---

## 1. Layers

```
Client (app/shop/_components)          Server                         Upstream
──────────────────────────────         ─────────────────────────      ──────────
CheckoutScreen ─┐  fetch                app/api/delivery/*  (routes)   Shiprocket
OrderTracker  ─┤ ───────────────────▶   ├─ validate / reprice          apiv2.shiprocket.in
                │  (JSON over HTTP)      ├─ lib/orders.ts  (state)
                └───────────────────▶   └─ lib/shiprocket.ts (client) ─▶ REST + token
```

- **Route handlers** (`app/api/delivery/*/route.ts`) — the only HTTP surface.
  All run on the Node.js runtime (`export const runtime = "nodejs"`).
- **`lib/orders.ts`** — order state + lifecycle. Server-only.
- **`lib/shiprocket.ts`** — typed Shiprocket client + token cache. Server-only;
  credentials never reach the browser.
- **`lib/products.ts`** — catalogue; the source of truth for prices/SKUs.

Client code never talks to Shiprocket directly — every call is proxied through
our own routes so credentials stay server-side and prices are re-verified.

---

## 2. HTTP API

| Method & path | Purpose | Key request | Success response |
|---|---|---|---|
| `POST /api/delivery/serviceability` | Delivery fee + courier + ETA for a pincode | `{ deliveryPincode, pickupPincode?, weightKg? }` | `{ serviceable, deliveryFee, courierName, estimatedMinutes }` or `{ serviceable:false, reason }` |
| `POST /api/delivery/dispatch` | "Place Order" — persist + create Shiprocket order | `{ items:[{id,qty}], address, deliveryFee?, courierName?, estimatedMinutes? }` | `{ orderId, trackingUrl, status }` |
| `POST /api/delivery/webhook` | Shiprocket status callback | `{ shipment_id\|awb\|order_id, current_status }` | `{ ok, matched, status }` (always 200 for well-formed bodies) |
| `GET  /api/delivery/order/[orderId]` | Order snapshot for the tracking poller | — | `{ order }` |

### Status codes
- `400` — malformed JSON / failed validation (empty cart, bad pincode/phone/email, unknown product).
- `404` — order not found (GET only).
- `502` — Shiprocket not configured (`ShiprocketConfigError`) or unreachable (`ShiprocketApiError`).
- `500` — unexpected.
- Webhook: only a malformed body yields `400`; unmatched/unmapped events still return `200` so Shiprocket does not retry over our bookkeeping gaps.

---

## 3. Order model & lifecycle (`lib/orders.ts`)

**Store:** a module-level `Map<string, Order>` stashed on `globalThis`
(`__ordersStore`) so it survives dev HMR. No real DB — this file is the single
swap-point for Prisma/Postgres later.

**Status pipeline:**
```
PAID ─▶ CONFIRMED ─▶ RIDER_ASSIGNED ─▶ OUT_FOR_DELIVERY ─▶ DELIVERED
                                      └▶ CANCELLED
```
- `PAID` — written instantly on placement (demo has no payment gateway).
- `CONFIRMED` — set once the Shiprocket adhoc order is created.
- The last four stages (`CONFIRMED`→`DELIVERED`) drive the `PIPELINE_STEPS` UI
  and are advanced by webhooks.

**Key operations:**
`createOrder` · `getOrder` · `updateOrder` · `setOrderStatus` (idempotent — a
repeated status is a no-op, so replayed webhooks don't duplicate history) ·
`findByShipmentId` · `findByAwb` · `mapShiprocketStatus` (normalises Shiprocket's
free-form uppercase strings onto our `OrderStatus`; returns `null` for unmodeled
statuses).

Every state change appends a `StatusEvent` to `order.history` for the timeline.

---

## 4. Shiprocket client (`lib/shiprocket.ts`)

- **Base:** `https://apiv2.shiprocket.in/v1/external`.
- **Auth:** email/password login → 10-day Bearer token, cached on `globalThis`
  (`__shiprocketToken`) and refreshed a day early. The `api()` helper retries
  once on `401` by forcing a fresh login.
- **Config:** `SHIPROCKET_EMAIL` / `SHIPROCKET_PASSWORD` required;
  `SHIPROCKET_PICKUP_LOCATION` (default `"Primary"`) and
  `SHIPROCKET_PICKUP_PINCODE` (default `"110030"`) for the ship-from origin.
  Missing creds → `ShiprocketConfigError` → `502`. **No mock mode** — a real
  account is required for the happy path.
- **`checkServiceability`** — `GET /courier/serviceability/` with
  `is_hyperlocal=1`; picks the cheapest courier (by `rate`, falling back to
  `freight_charge`) and derives an ETA in minutes.
- **`createAdhocOrder`** — `POST /orders/create/adhoc` with `is_hyperlocal=1`,
  `payment_method:"Prepaid"`; returns `shipmentId`, `shiprocketOrderId`,
  `awbCode`, `trackingUrl`, `courierName`. Response parsing is defensive because
  payload shapes vary across couriers/doc versions.

---

## 5. Dispatch flow (the critical path)

`POST /api/delivery/dispatch`:

1. **Reprice from catalogue** — client line prices are ignored; each `{id, qty}`
   is re-looked-up via `getProduct(id)`. Unknown product / bad qty → `400`.
2. **Validate address** — name, 10-digit phone, email, 6-digit pincode, etc.
3. **Compute money server-side** — `subtotal` from repriced items; `deliveryFee`
   sanitised; parcel weight ≈ `0.3kg × units` (min `0.5`).
4. **Persist as `PAID`** with a generated `THS-…` order id.
5. **Create the Shiprocket adhoc order**, store `shipment_id`/`order_id`/
   `tracking_url`, advance status to `CONFIRMED`.
6. **On Shiprocket failure** the order stays `PAID` (customer isn't lost) and the
   route returns a retryable `502` with the `orderId`.

---

## 6. Status updates (webhook + polling)

- Shiprocket calls `POST /api/delivery/webhook`. The order is resolved in order
  of `shipment_id → awb → order_id`, the status is mapped via
  `mapShiprocketStatus`, and `setOrderStatus` persists it.
- The tracking page (`OrderTracker`) polls `GET /api/delivery/order/[orderId]`
  to reflect webhook-driven changes without a manual refresh.

> **Security gap (demo):** the webhook does **not** verify a signature/secret —
> no shared secret without a live account. In production, verify the `x-api-key`
> header Shiprocket sends before trusting the payload.

---

## 7. Environment variables

| Var | Required | Default | Use |
|---|---|---|---|
| `SHIPROCKET_EMAIL` | ✅ | — | Login |
| `SHIPROCKET_PASSWORD` | ✅ | — | Login |
| `SHIPROCKET_PICKUP_LOCATION` | — | `Primary` | Must match a dashboard pickup location |
| `SHIPROCKET_PICKUP_PINCODE` | — | `110030` | Ship-from origin for serviceability |

See [`.env.example`](../.env.example).

---

## 8. Known limitations (demo scope)

- **In-memory store** — orders vanish on server restart; not multi-instance safe.
- **No payment gateway** — orders are `PAID` on placement.
- **No auth** on order-read / webhook endpoints.
- **No idempotency key** on dispatch — a double-submit can create two Shiprocket
  orders (status transitions themselves are idempotent).
