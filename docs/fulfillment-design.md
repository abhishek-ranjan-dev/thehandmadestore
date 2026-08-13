# Design Doc — Checkout → Delivery Fulfilment Flow

Status: **Draft for review** · Target: demo storefront (`/shop`) · Author: implementation plan

---

## 1. Context & constraints

What the repo actually looks like today (inspected before writing this):

| Area | Current state | Implication |
|------|---------------|-------------|
| Docs | `shiprocket_docs.md` **was not attached**; only `docs/shiprocket-api.md` exists | Build against that reference + the hyperlocal conventions named in the brief (`is_hyperlocal=1`). Flagged as an assumption. |
| Checkout | **No checkout page.** Cart's "Checkout" button is a `title="coming soon"` stub in `CartScreen.tsx` | Must build the checkout screen too, not just wire into it. |
| Database | **None.** Cart/wishlist live in `localStorage` via `ShopProviders.tsx` | Orders need a server-side store → in-memory Map (demo). |
| Credentials | **No `.env`, no Shiprocket account** | API layer needs a **mock mode** so the demo runs end-to-end without secrets. |
| Framework | Next 16.2, React 19, TS strict, Tailwind v4. App Router, route groups `(marketing)` / `shop` / `admin` | Route handlers use `RouteContext<'/path'>`; `params` is a `Promise`. |
| Money | INR, `Intl.NumberFormat("en-IN")` already used | Reuse the same formatter. |

### Decisions made (confirmed with user)

1. **Hard fail, no mock mode.** When `SHIPROCKET_EMAIL` / `SHIPROCKET_PASSWORD` are absent (or auth fails), the API routes return `502 { error }` and the UI shows a clear message. The demo requires real Shiprocket credentials to complete a happy path. *(User chose hard-fail over a simulated fallback.)*
2. **In-memory order store** (`lib/orders.ts`), stashed on `globalThis` to survive dev HMR. Single swap-point for a real DB later.
3. **Instant "PAID".** No gateway. `Place Order` writes the order as `PAID` then immediately dispatches to Shiprocket.
4. **Build the checkout screen** at `/shop/checkout` and repoint the Cart button to it.
5. **Tracking page under the shop segment** at `/shop/order/[orderId]` so it keeps the app-mode chrome. *(User choice.)*
6. **Webhook-only status updates.** Real `POST /webhook` receiver; no built-in simulator. Status is advanced by Shiprocket (or a manual curl/Postman call in testing). *(User choice.)*

---

## 2. End-to-end flow

```
Cart (/shop/cart)
  │  "Checkout" → /shop/checkout
  ▼
Checkout screen  (client)
  │  1. user fills delivery address
  │  2. on valid pincode →  POST /api/delivery/serviceability
  │        ← { deliveryFee, courierName, estimatedMinutes }
  │  3. summary shows: subtotal + deliveryFee = total
  │  4. "Place Order (Pay ₹X)"  →  POST /api/delivery/dispatch
  ▼
/api/delivery/dispatch  (server)
  a. createOrder(...)  → status PAID           (lib/orders)
  b. Shiprocket login (cached token)           (lib/shiprocket)
  c. POST /v1/external/orders/create/adhoc  { is_hyperlocal:1, payment_method:"Prepaid", ... }
  d. store shipment_id, order_id, tracking_url; status → CONFIRMED
  ← { orderId, trackingUrl }
  ▼
client clears cart, router.push(`/shop/order/{orderId}`)
  ▼
/shop/order/[orderId]  (server component initial render + client polling island)
  • order summary + pipeline: Confirmed → Rider Assigned → Out for Delivery → Delivered
  • button → Shiprocket live GPS tracking URL
  ▲
  │  status advances via …
/api/delivery/webhook  (server, called by Shiprocket)
  POST { awb / shipment_id, current_status } → mapShiprocketStatus → setOrderStatus
```

---

## 3. Files & responsibilities

| # | File | Kind | Responsibility |
|---|------|------|----------------|
| 1 | `lib/orders.ts` | server lib | Order types, in-memory store (CRUD), Shiprocket→internal status map |
| 2 | `lib/shiprocket.ts` | server lib | Token manager (login + cache), typed serviceability & adhoc-order clients, mock mode |
| 3 | `app/api/delivery/serviceability/route.ts` | route (POST) | pincode/weight → `{ deliveryFee, courierName, estimatedMinutes }` |
| 4 | `app/api/delivery/dispatch/route.ts` | route (POST) | create order → PAID, create Shiprocket adhoc order, persist ids |
| 5 | `app/api/delivery/webhook/route.ts` | route (POST) | receive status updates, map + persist |
| 6 | `app/api/delivery/order/[orderId]/route.ts` | route (GET) | read order JSON (supports tracking-page polling) — *supporting route* |
| 7 | `app/shop/order/[orderId]/page.tsx` | server page + client island | tracking UI (summary, pipeline, GPS link) |
| 8 | `app/shop/checkout/page.tsx` + `_components/CheckoutScreen.tsx` | client UI | address form, live delivery fee, Place Order |
| 9 | `app/shop/_components/CartScreen.tsx` | edit | repoint "Checkout" button → `/shop/checkout` |
| 10 | `.env.example` + `.gitignore` + `README` | config | document `SHIPROCKET_*` vars |

`lib/products.ts` gives us `sku`/name/price to build Shiprocket `order_items`; the cart only stores `{id, qty}`.

---

## 4. Data model (`lib/orders.ts`)

```ts
type OrderStatus =
  | "PAID" | "CONFIRMED" | "RIDER_ASSIGNED" | "OUT_FOR_DELIVERY"
  | "DELIVERED" | "CANCELLED";

type Order = {
  id: string;                 // internal id, also Shiprocket order_id
  status: OrderStatus;
  paymentStatus: "PAID";
  items: { id; name; sku; qty; price }[];
  address: { name; phone; email; address; city; state; pincode; country };
  subtotal; deliveryFee; total: number;
  courierName: string | null;
  estimatedMinutes: number | null;
  shiprocketOrderId; shipmentId; awbCode; trackingUrl: string | null;
  createdAt; updatedAt: string;
  history: { status; at; note? }[];   // drives the timeline
};
```

Pipeline shown in UI (4 stages): `CONFIRMED → RIDER_ASSIGNED → OUT_FOR_DELIVERY → DELIVERED`.
`PAID` collapses into "Confirmed"; `CANCELLED` is a terminal off-pipeline state.

### Status mapping (webhook → internal)

| Shiprocket status (incoming) | Internal |
|------------------------------|----------|
| `AWAITING PICKUP`, `PICKUP SCHEDULED`, `RIDER ASSIGNED` | `RIDER_ASSIGNED` |
| `OUT FOR DELIVERY`, `IN TRANSIT` | `OUT_FOR_DELIVERY` |
| `DELIVERED` | `DELIVERED` |
| `CANCELLED`, `RTO INITIATED` | `CANCELLED` |
| unknown | ignored (200, logged) |

---

## 5. Shiprocket integration (`lib/shiprocket.ts`)

Base URL `https://apiv2.shiprocket.in/v1/external`.

**Token manager**
- `POST /auth/login { email, password }` → `{ token }`.
- Cache token + expiry in a module-level (globalThis) singleton. Token valid 10 days; refresh at 9. Never log in per-request.
- `getToken()` returns cached token or logs in.

**Serviceability** — `GET /courier/serviceability/`
```
query: pickup_postcode, delivery_postcode, weight, cod=0, is_hyperlocal=1
```
Response parsing (defensive): pick cheapest of `data.available_courier_companies[]`, read `rate`/`freight_charge`, `courier_name`, and an ETA field (`estimated_delivery_time` mins for hyperlocal, else derive from `etd`/`estimated_delivery_days`). Returns our normalized `{ deliveryFee, courierName, estimatedMinutes }`.

**Adhoc order** — `POST /orders/create/adhoc`
```jsonc
{
  "order_id": "<internal id>",
  "order_date": "YYYY-MM-DD HH:mm",
  "pickup_location": "Primary",
  "is_hyperlocal": 1,
  "payment_method": "Prepaid",
  "billing_customer_name": "...", "billing_last_name": "...",
  "billing_address": "...", "billing_city": "...", "billing_pincode": "...",
  "billing_state": "...", "billing_country": "India",
  "billing_email": "...", "billing_phone": "...",
  "shipping_is_billing": true,
  "order_items": [{ "name","sku","units","selling_price" }],
  "sub_total": <subtotal>,
  "length","breadth","height","weight": <parcel dims/kg>
}
```
Response → `{ order_id, shipment_id, status }`. `tracking_url`: use returned value if present, else construct a Shiprocket tracking URL fallback.

**No creds → hard fail.** If `SHIPROCKET_EMAIL`/`SHIPROCKET_PASSWORD` are missing, `getToken()` throws a typed `ShiprocketConfigError`; routes translate it to `502 { error: "Delivery service not configured" }`. Auth/HTTP failures throw `ShiprocketApiError` → `502`.

### Store origin config
`PICKUP_LOCATION_NAME = "Primary"`, `PICKUP_PINCODE = process.env.SHIPROCKET_PICKUP_PINCODE ?? "110030"`. Serviceability defaults `pickupPincode` to this when the client omits it.

---

## 6. API contracts (our internal routes)

**POST `/api/delivery/serviceability`**
```ts
// req
{ pickupPincode?: string; deliveryPincode: string; weightKg?: number /*=0.5*/ }
// 200
{ serviceable: true; deliveryFee: number; courierName: string; estimatedMinutes: number }
// 200 (not serviceable) — not an HTTP error, UI shows a message
{ serviceable: false; reason: string }
// 400 bad input · 502 upstream/auth failure  → { error }
```

**POST `/api/delivery/dispatch`**
```ts
// req
{
  items: { id: string; qty: number }[];   // re-priced server-side from lib/products (never trust client prices)
  address: DeliveryAddress;
  deliveryFee: number; courierName?: string; estimatedMinutes?: number;
}
// 200
{ orderId: string; trackingUrl: string; status: OrderStatus }
// 400 validation · 502 upstream  → { error }
```

**POST `/api/delivery/webhook`**
```ts
// req (Shiprocket-shaped, defensively parsed)
{ awb?: string; shipment_id?: string|number; order_id?: string; current_status: string; ... }
// 200 { ok: true, matched: boolean, status?: OrderStatus }
// always 200 unless body is unparseable (400) — webhooks must not be retried on our logic errors
```
*Note:* signature verification is out of scope for the demo (no shared secret without an account); noted as a TODO.

**GET `/api/delivery/order/[orderId]`** → `{ order }` or 404. Used by the tracking page's poller.

---

## 7. UI

### Checkout (`/shop/checkout`, client)
- Reads `useCart()`. If empty → redirect/empty state.
- Address form: name, phone, email, address, city, state, pincode (validated: 6-digit IN pincode, 10-digit phone, email).
- On valid pincode (debounced), calls serviceability; shows a "Delivery" line (spinner → `₹fee · courierName · ~N min`, or "Not serviceable").
- Summary: Subtotal / Delivery / **Total**. Place Order button disabled until address valid + fee resolved.
- `Place Order (Pay ₹X)` → POST dispatch → on success clear cart, `router.push('/order/{id}')`.
- Errors surfaced inline: auth failure, unserviceable, network → non-blocking messages; button re-enables.

### Tracking (`/shop/order/[orderId]`)
- Server component loads the order (404 if missing). Renders summary + pipeline from `history`.
- Client island polls `GET /api/delivery/order/[orderId]` every ~5s to reflect webhook-driven changes without a manual refresh.
- Pipeline: 4 nodes with done/active/pending states, timestamps from `history`.
- Primary button: **Track live location** → opens `trackingUrl` (Shiprocket GPS) in a new tab. Disabled with a hint if not yet available.
- `CANCELLED` renders a distinct terminal banner.

Styling matches the existing shop system (linen bg, `#C86446` accent, rounded-2xl cards, `ease-apple-out`, lucide icons, `Intl` INR formatter).

---

## 8. Error handling (per requirement)

| Failure | Where caught | UX |
|---------|--------------|-----|
| Missing `SHIPROCKET_*` env | `lib/shiprocket` (`ShiprocketConfigError`) | 502 `{ error: "Delivery service not configured" }`; checkout shows "Delivery isn't available right now" |
| Auth/login failure (real mode) | dispatch/serviceability routes | 502 `{ error }`; checkout shows "Couldn't reach delivery service, try again" |
| Unserviceable pincode | serviceability route | `{ serviceable:false }`; checkout blocks placement with a clear message |
| Invalid address / bad body | routes (zod-free manual validation) | 400 `{ error }`; inline field errors |
| Order not found | tracking page / order route | 404 UI: "We couldn't find that order" |
| Upstream adhoc failure | dispatch | order kept as `PAID` with `note`, 502 returned so UI can inform + retry |

No external validation lib added (keep deps minimal — manual guards).

---

## 9. Env & config

```bash
# .env.local  (gitignored)
SHIPROCKET_EMAIL=...
SHIPROCKET_PASSWORD=...
SHIPROCKET_PICKUP_PINCODE=110030   # optional, defaults in code
```
Add tracked `.env.example` (via `!.env.example` in `.gitignore`) + a README section. All Shiprocket calls are server-side only — credentials/token never reach the browser.

---

## 10. Out of scope (demo)

- Real payment gateway.
- Webhook signature verification (no account secret available).
- AWB assignment / pickup generation / label PDF (hyperlocal adhoc returns the shipment directly; the pipeline is driven by webhook statuses). Can be added as a follow-up using the endpoints already in `docs/shiprocket-api.md`.
- Persisting orders across server restarts (in-memory only).

---

## 11. Resolved decisions

1. **Hyperlocal payload** — inferred from the standard API + the `is_hyperlocal=1` flag (real `shiprocket_docs.md` not provided). Defensive parsing; drop the real doc in later to pin exact field names.
2. **No creds → hard fail** (502), not mock. *(User choice.)*
3. **Tracking page at `/shop/order/[orderId]`** under the shop chrome. *(User choice.)*
4. **Webhook-only** — no simulator; status advanced by Shiprocket / manual test calls. *(User choice.)*
