/**
 * Shiprocket API client — token manager + typed clients for the two endpoints
 * the fulfilment flow needs (hyperlocal serviceability + adhoc order creation).
 *
 * Server-only. Credentials come from env and never reach the browser; all
 * Shiprocket calls are proxied through our own /api/delivery/* route handlers.
 *
 * No credentials configured → hard fail (ShiprocketConfigError → 502 upstream).
 * Endpoints/paths follow docs/shiprocket-api.md; hyperlocal fields use the
 * `is_hyperlocal=1` convention. Response parsing is deliberately defensive
 * because Shiprocket's payload shapes vary across couriers/doc versions.
 */

const BASE_URL = "https://apiv2.shiprocket.in/v1/external";

/** Origin the store ships from. Pickup location name must match one configured
 *  in the Shiprocket dashboard. */
export const PICKUP_LOCATION_NAME =
  process.env.SHIPROCKET_PICKUP_LOCATION ?? "Primary";
export const PICKUP_PINCODE = process.env.SHIPROCKET_PICKUP_PINCODE ?? "110030";

/* ------------------------------- Errors ---------------------------------- */

/** Thrown when required env/config is missing — maps to 502 in routes. */
export class ShiprocketConfigError extends Error {
  constructor(message = "Delivery service not configured") {
    super(message);
    this.name = "ShiprocketConfigError";
  }
}

/** Thrown on auth/HTTP/parse failure talking to Shiprocket — maps to 502. */
export class ShiprocketApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ShiprocketApiError";
    this.status = status;
  }
}

/* --------------------------- Token management ---------------------------- */

type TokenCache = { token: string; expiresAt: number };
const g = globalThis as { __shiprocketToken?: TokenCache };

// Shiprocket tokens are valid 10 days; refresh a day early to be safe.
const TOKEN_TTL_MS = 9 * 24 * 60 * 60 * 1000;

function getCreds(): { email: string; password: string } {
  const email = process.env.SHIPROCKET_EMAIL;
  const password = process.env.SHIPROCKET_PASSWORD;
  if (!email || !password) {
    throw new ShiprocketConfigError(
      "SHIPROCKET_EMAIL / SHIPROCKET_PASSWORD are not set",
    );
  }
  return { email, password };
}

async function login(): Promise<string> {
  const { email, password } = getCreds();
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });
  } catch (err) {
    throw new ShiprocketApiError(
      `Shiprocket login request failed: ${(err as Error).message}`,
    );
  }
  const data = (await res.json().catch(() => ({}))) as { token?: string; message?: string };
  if (!res.ok || !data.token) {
    throw new ShiprocketApiError(
      `Shiprocket login failed: ${data.message ?? res.statusText}`,
      res.status,
    );
  }
  g.__shiprocketToken = { token: data.token, expiresAt: Date.now() + TOKEN_TTL_MS };
  return data.token;
}

/** Return a cached Bearer token, logging in only when missing/expired. */
export async function getToken(): Promise<string> {
  const cached = g.__shiprocketToken;
  if (cached && Date.now() < cached.expiresAt) return cached.token;
  return login();
}

/** Authenticated fetch against the Shiprocket API. Retries once on 401 by
 *  forcing a fresh login (token could have been revoked early). */
async function api<T>(
  path: string,
  init: RequestInit & { query?: Record<string, string | number | undefined> } = {},
  retry = true,
): Promise<T> {
  const token = await getToken();
  const url = new URL(`${BASE_URL}${path}`);
  if (init.query) {
    for (const [k, v] of Object.entries(init.query)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
  }

  let res: Response;
  try {
    res = await fetch(url, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...(init.headers ?? {}),
      },
      cache: "no-store",
    });
  } catch (err) {
    throw new ShiprocketApiError(
      `Shiprocket request failed: ${(err as Error).message}`,
    );
  }

  if (res.status === 401 && retry) {
    g.__shiprocketToken = undefined; // force re-login
    return api<T>(path, init, false);
  }

  const data = (await res.json().catch(() => ({}))) as T & { message?: string };
  if (!res.ok) {
    throw new ShiprocketApiError(
      `Shiprocket ${path} → ${res.status}: ${data?.message ?? res.statusText}`,
      res.status,
    );
  }
  return data;
}

/* ---------------------------- Serviceability ----------------------------- */

export type ServiceabilityInput = {
  pickupPincode?: string; // defaults to store origin
  deliveryPincode: string;
  weightKg?: number; // defaults 0.5
  cod?: boolean;
};

export type ServiceabilityResult =
  | {
      serviceable: true;
      deliveryFee: number;
      courierName: string;
      estimatedMinutes: number | null;
    }
  | { serviceable: false; reason: string };

// Minimal shape of the fields we read from Shiprocket's serviceability payload.
type CourierCompany = {
  courier_company_id?: number;
  courier_name?: string;
  rate?: number;
  freight_charge?: number;
  estimated_delivery_days?: string | number;
  etd?: string;
  estimated_delivery_time?: string | number; // hyperlocal, minutes
};
type ServiceabilityResponse = {
  data?: { available_courier_companies?: CourierCompany[] };
};

function toMinutes(c: CourierCompany): number | null {
  // Hyperlocal responses expose an estimate in minutes; fall back to days*1440.
  const mins = Number(c.estimated_delivery_time);
  if (Number.isFinite(mins) && mins > 0) return Math.round(mins);
  const days = Number(c.estimated_delivery_days);
  if (Number.isFinite(days) && days > 0) return Math.round(days * 24 * 60);
  return null;
}

export async function checkServiceability(
  input: ServiceabilityInput,
): Promise<ServiceabilityResult> {
  const resp = await api<ServiceabilityResponse>("/courier/serviceability/", {
    method: "GET",
    query: {
      pickup_postcode: input.pickupPincode ?? PICKUP_PINCODE,
      delivery_postcode: input.deliveryPincode,
      weight: input.weightKg ?? 0.5,
      cod: input.cod ? 1 : 0,
      is_hyperlocal: 1,
    },
  });

  const couriers = resp.data?.available_courier_companies ?? [];
  if (couriers.length === 0) {
    return { serviceable: false, reason: "No couriers serve this pincode" };
  }

  // Cheapest wins. Prefer `rate`, fall back to `freight_charge`.
  const priced = couriers
    .map((c) => ({ c, fee: Number(c.rate ?? c.freight_charge) }))
    .filter((x) => Number.isFinite(x.fee));
  if (priced.length === 0) {
    return { serviceable: false, reason: "No priced couriers for this pincode" };
  }
  priced.sort((a, b) => a.fee - b.fee);
  const best = priced[0];

  return {
    serviceable: true,
    deliveryFee: Math.round(best.fee),
    courierName: best.c.courier_name ?? "Shiprocket",
    estimatedMinutes: toMinutes(best.c),
  };
}

/* --------------------------- Adhoc order create -------------------------- */

export type AdhocOrderInput = {
  orderId: string;
  billing: {
    name: string;
    lastName?: string;
    address: string;
    address2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    email: string;
    phone: string;
  };
  items: { name: string; sku: string; units: number; sellingPrice: number }[];
  subTotal: number;
  parcel?: { length: number; breadth: number; height: number; weight: number };
};

type AdhocOrderResponse = {
  order_id?: number | string;
  shipment_id?: number | string;
  status?: string;
  awb_code?: string | null;
  courier_name?: string | null;
  tracking_url?: string | null;
};

export type AdhocOrderResult = {
  shiprocketOrderId: number | string;
  shipmentId: number | string;
  awbCode: string | null;
  trackingUrl: string | null;
  courierName: string | null;
};

function nowStamp(): string {
  // Shiprocket expects "YYYY-MM-DD HH:mm".
  const iso = new Date().toISOString(); // 2026-08-12T10:20:30.000Z
  return `${iso.slice(0, 10)} ${iso.slice(11, 16)}`;
}

export async function createAdhocOrder(
  input: AdhocOrderInput,
): Promise<AdhocOrderResult> {
  const p = input.parcel ?? { length: 15, breadth: 15, height: 10, weight: 0.5 };
  const body = {
    order_id: input.orderId,
    order_date: nowStamp(),
    pickup_location: PICKUP_LOCATION_NAME,
    is_hyperlocal: 1,
    payment_method: "Prepaid",
    billing_customer_name: input.billing.name,
    billing_last_name: input.billing.lastName ?? "",
    billing_address: input.billing.address,
    billing_address_2: input.billing.address2 ?? "",
    billing_city: input.billing.city,
    billing_pincode: input.billing.pincode,
    billing_state: input.billing.state,
    billing_country: input.billing.country,
    billing_email: input.billing.email,
    billing_phone: input.billing.phone,
    shipping_is_billing: true,
    order_items: input.items.map((it) => ({
      name: it.name,
      sku: it.sku,
      units: it.units,
      selling_price: it.sellingPrice,
    })),
    sub_total: input.subTotal,
    length: p.length,
    breadth: p.breadth,
    height: p.height,
    weight: p.weight,
  };

  const resp = await api<AdhocOrderResponse>("/orders/create/adhoc", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (resp.shipment_id == null || resp.order_id == null) {
    throw new ShiprocketApiError(
      `Adhoc order missing ids in response: ${JSON.stringify(resp)}`,
    );
  }

  const awb = resp.awb_code ?? null;
  const trackingUrl =
    resp.tracking_url ?? (awb ? `https://shiprocket.co/tracking/${awb}` : null);

  return {
    shiprocketOrderId: resp.order_id,
    shipmentId: resp.shipment_id,
    awbCode: awb,
    trackingUrl,
    courierName: resp.courier_name ?? null,
  };
}
