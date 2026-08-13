# Shiprocket API Reference

> Source: <https://apidocs.shiprocket.in/> (rendered client-side, so this is a compiled reference from the
> official docs, the Shiprocket support helpsheet, and the public Postman workspace).
> Compiled 2026-08-12. Verify exact payloads against the live docs before going to production.

The public docs site is a single-page app, so it can't be scraped directly. This file captures the
base URL, authentication flow, and every documented endpoint with its method + path, plus ready-to-use
JavaScript / Next.js integration code at the bottom.

---

## 1. Base URL

```
https://apiv2.shiprocket.in/v1/external
```

Every endpoint below is relative to that base. (The docs/marketing site lives at `apidocs.shiprocket.in`,
but all live API calls go to `apiv2.shiprocket.in`.)

---

## 2. Authentication

Shiprocket uses **Bearer token** auth. You first exchange your API-user email/password for a token, then
send that token on every subsequent request.

- **Token validity:** 240 hours (10 days). Cache it and refresh when expired — do **not** call login on
  every request (you will get rate-limited / blocked).
- **API user:** Create a dedicated API user in the Shiprocket dashboard under
  *Settings → API → Configure* (not your main login).

### Login — get token

```
POST /auth/login
```

Request body:

```json
{
  "email": "api-user@example.com",
  "password": "your-api-user-password"
}
```

Response (abridged):

```json
{
  "id": 123456,
  "first_name": "…",
  "email": "api-user@example.com",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9…"
}
```

### Using the token

Send it on every other call:

```
Authorization: Bearer <token>
Content-Type: application/json
```

---

## 3. Endpoint Reference

All paths are relative to `https://apiv2.shiprocket.in/v1/external`.

### Auth
| Method | Path | Purpose |
|--------|------|---------|
| POST | `/auth/login` | Exchange email/password for a Bearer token (valid 10 days) |

### Orders
| Method | Path | Purpose |
|--------|------|---------|
| POST | `/orders/create/adhoc` | Create a custom (adhoc) order — returns `order_id` + `shipment_id` |
| POST | `/orders/create` | Create a channel-specific order |
| GET  | `/orders` | List all orders (supports `per_page`, `page`, filters) |
| GET  | `/orders/show/{id}` | Get a single order by id |
| POST | `/orders/cancel` | Cancel one or more orders (`{ "ids": [order_id, …] }`) |
| POST | `/orders/address/update/pickup` | Update pickup location for an order |
| POST | `/orders/update/adhoc` | Update an existing adhoc order |
| POST | `/orders/print/invoice` | Generate invoice PDF (`{ "ids": [order_id, …] }`) → returns PDF URL |

### Courier / Serviceability / AWB / Pickup
| Method | Path | Purpose |
|--------|------|---------|
| GET  | `/courier/serviceability/` | Check serviceable couriers + rates (query params below) |
| POST | `/courier/assign/awb` | Assign an AWB to a shipment (`shipment_id`, optional `courier_id`) |
| POST | `/courier/generate/pickup` | Request pickup for a shipment (`{ "shipment_id": […] }`) |
| POST | `/courier/generate/label` | Generate shipping label PDF (`{ "shipment_id": […] }`) → PDF URL |
| GET  | `/courier/track/awb/{awb_code}` | Track a shipment by AWB |
| GET  | `/courier/track/shipment/{shipment_id}` | Track by shipment id |
| POST | `/courier/international/serviceability` | Check international serviceability |

`/courier/serviceability/` query params:

```
pickup_postcode     (int)   origin pincode
delivery_postcode   (int)   destination pincode
weight              (float) in kg
cod                 (0|1)   1 = cash on delivery
declared_value      (float) optional, for insured value
```

### Tracking
| Method | Path | Purpose |
|--------|------|---------|
| GET  | `/courier/track/awb/{awb_code}` | Track by AWB |
| GET  | `/courier/track/shipment/{shipment_id}` | Track by shipment id |
| GET  | `/orders/track/{order_id}` | Track by order id (optional `channel_id`) |
| POST | `/courier/track/awbs` | Track multiple AWBs at once (`{ "awbs": [ … ] }`) |

### Manifests & Documents
| Method | Path | Purpose |
|--------|------|---------|
| POST | `/manifests/generate` | Generate manifest from shipment ids |
| POST | `/manifests/print` | Print manifest PDF from order ids → PDF URL |
| POST | `/courier/generate/label` | Generate labels from shipment ids → PDF URL |
| POST | `/orders/print/invoice` | Generate invoice PDF from order ids → PDF URL |

### Pickup Addresses
| Method | Path | Purpose |
|--------|------|---------|
| POST | `/settings/company/addpickup` | Add a new pickup location |
| GET  | `/settings/company/pickup` | List all pickup locations |

### Channels
| Method | Path | Purpose |
|--------|------|---------|
| GET  | `/channels` | List integrated sales channels |

### Products
| Method | Path | Purpose |
|--------|------|---------|
| GET  | `/products` | List all products |
| GET  | `/products/show/{id}` | Get a single product |
| POST | `/products` | Add a product |

### NDR (Non-Delivery Report)
| Method | Path | Purpose |
|--------|------|---------|
| GET  | `/ndr/all` | Get all shipments currently in NDR status |
| GET  | `/ndr/{awb}` | Get a specific NDR shipment by AWB |
| POST | `/ndr/{awb}/action` | Reattempt delivery or request RTO |

### Warehouse / Inventory
| Method | Path | Purpose |
|--------|------|---------|
| GET  | `/inventory/serviceability` | Check SRF (warehouse) serviceability by postcode/SKU/qty |

---

## 4. Key Payloads

### Create adhoc order — `POST /orders/create/adhoc`

```json
{
  "order_id": "STORE-1001",
  "order_date": "2026-08-12 12:00",
  "pickup_location": "Primary",
  "channel_id": "",
  "comment": "Handle with care",
  "billing_customer_name": "Jane",
  "billing_last_name": "Doe",
  "billing_address": "12 MG Road",
  "billing_address_2": "",
  "billing_city": "Bengaluru",
  "billing_pincode": "560001",
  "billing_state": "Karnataka",
  "billing_country": "India",
  "billing_email": "jane@example.com",
  "billing_phone": "9999999999",
  "shipping_is_billing": true,
  "order_items": [
    {
      "name": "Handmade Ceramic Mug",
      "sku": "MUG-001",
      "units": 1,
      "selling_price": "499",
      "discount": "",
      "tax": "",
      "hsn": 691200
    }
  ],
  "payment_method": "Prepaid",
  "shipping_charges": 0,
  "giftwrap_charges": 0,
  "transaction_charges": 0,
  "total_discount": 0,
  "sub_total": 499,
  "length": 10,
  "breadth": 10,
  "height": 10,
  "weight": 0.5
}
```

Response includes `order_id` and `shipment_id`, which you then feed into AWB assignment / pickup.

### Typical fulfilment flow

1. `POST /orders/create/adhoc` → get `shipment_id`
2. `GET /courier/serviceability/` → pick a `courier_company_id`
3. `POST /courier/assign/awb` → `{ "shipment_id": 123, "courier_id": 456 }`
4. `POST /courier/generate/pickup` → `{ "shipment_id": [123] }`
5. `POST /courier/generate/label` → PDF URL
6. `GET /courier/track/awb/{awb_code}` → live status

---

## 5. JavaScript integration

Framework-agnostic client using the built-in `fetch` (Node 18+ / Next.js edge or node runtime).

```js
// lib/shiprocket.js
const BASE_URL = "https://apiv2.shiprocket.in/v1/external";

// Simple in-memory token cache. Swap for Redis/DB in production (serverless resets memory).
let cachedToken = null;
let tokenExpiresAt = 0;

async function login() {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD,
    }),
  });
  if (!res.ok) throw new Error(`Shiprocket login failed: ${res.status}`);
  const data = await res.json();
  cachedToken = data.token;
  // Token is valid 10 days; refresh a little early (9 days).
  tokenExpiresAt = Date.now() + 9 * 24 * 60 * 60 * 1000;
  return cachedToken;
}

async function getToken() {
  if (cachedToken && Date.now() < tokenExpiresAt) return cachedToken;
  return login();
}

/** Core request helper. */
export async function shiprocket(path, { method = "GET", body, query } = {}) {
  const token = await getToken();
  const url = new URL(`${BASE_URL}${path}`);
  if (query) Object.entries(query).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Shiprocket ${method} ${path} → ${res.status}: ${JSON.stringify(data)}`);
  }
  return data;
}

// Convenience wrappers ------------------------------------------------------
export const createOrder = (order) =>
  shiprocket("/orders/create/adhoc", { method: "POST", body: order });

export const checkServiceability = ({ pickup, delivery, weight, cod = 0 }) =>
  shiprocket("/courier/serviceability/", {
    query: { pickup_postcode: pickup, delivery_postcode: delivery, weight, cod },
  });

export const assignAWB = (shipment_id, courier_id) =>
  shiprocket("/courier/assign/awb", { method: "POST", body: { shipment_id, courier_id } });

export const requestPickup = (shipment_id) =>
  shiprocket("/courier/generate/pickup", { method: "POST", body: { shipment_id: [shipment_id] } });

export const generateLabel = (shipment_ids) =>
  shiprocket("/courier/generate/label", { method: "POST", body: { shipment_id: shipment_ids } });

export const trackByAWB = (awb) => shiprocket(`/courier/track/awb/${awb}`);
```

### Next.js Route Handler (App Router)

```js
// app/api/shiprocket/create-order/route.js
import { NextResponse } from "next/server";
import { createOrder } from "@/lib/shiprocket";

export async function POST(request) {
  try {
    const order = await request.json();
    const result = await createOrder(order);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 502 });
  }
}
```

```js
// app/api/shiprocket/serviceability/route.js
import { NextResponse } from "next/server";
import { checkServiceability } from "@/lib/shiprocket";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  try {
    const data = await checkServiceability({
      pickup: searchParams.get("pickup"),
      delivery: searchParams.get("delivery"),
      weight: searchParams.get("weight"),
      cod: searchParams.get("cod") ?? 0,
    });
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 502 });
  }
}
```

### Environment variables

```bash
# .env.local  (never commit this)
SHIPROCKET_EMAIL=api-user@example.com
SHIPROCKET_PASSWORD=your-api-user-password
```

---

## 6. Notes & gotchas

- **Never call `/auth/login` per request.** Cache the token; it lasts 10 days. On serverless (Vercel),
  in-memory cache resets between cold starts — persist the token in Redis/DB/Edge Config to avoid
  re-logging-in on every cold start.
- **Keep credentials server-side only.** All Shiprocket calls must go through your Next.js route handlers
  (or a backend), never from the browser — the token must not be exposed to clients.
- **Pickup location name must exactly match** a location configured in your Shiprocket dashboard.
- **Rate limits** apply; batch operations (labels, manifests, tracking) accept arrays of ids.
- **Weights in kg, dimensions in cm.** COD flag is `1`, prepaid is `0`.
- Some paths vary slightly across Shiprocket doc versions — confirm against the live docs / Postman
  workspace if a call 404s.

---

## 7. Official sources

- API docs (SPA): <https://apidocs.shiprocket.in/>
- Support helpsheet: <https://support.shiprocket.in/support/solutions/articles/43000337456-shiprocket-api-document-helpsheet>
- Public Postman workspace: <https://www.postman.com/shiprocketdev/shiprocket-dev-s-public-workspace/collection/qu05zax/shiprocket-api>
