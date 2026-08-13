import { NextResponse } from "next/server";
import {
  checkServiceability,
  ShiprocketConfigError,
  ShiprocketApiError,
} from "@/lib/shiprocket";

/**
 * POST /api/delivery/serviceability
 *
 * Body: { pickupPincode?, deliveryPincode, weightKg? }
 * Queries Shiprocket's hyperlocal serviceability API and returns the delivery
 * fee + courier + ETA for the checkout UI. `pickupPincode` defaults to the
 * store origin server-side.
 */

export const runtime = "nodejs";

type Body = {
  pickupPincode?: unknown;
  deliveryPincode?: unknown;
  weightKg?: unknown;
};

const PINCODE_RE = /^\d{6}$/;

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const deliveryPincode = String(body.deliveryPincode ?? "").trim();
  if (!PINCODE_RE.test(deliveryPincode)) {
    return NextResponse.json(
      { error: "A valid 6-digit delivery pincode is required" },
      { status: 400 },
    );
  }

  const pickupPincode =
    typeof body.pickupPincode === "string" && PINCODE_RE.test(body.pickupPincode)
      ? body.pickupPincode
      : undefined;

  const weightRaw = Number(body.weightKg);
  const weightKg = Number.isFinite(weightRaw) && weightRaw > 0 ? weightRaw : 0.5;

  try {
    const result = await checkServiceability({
      pickupPincode,
      deliveryPincode,
      weightKg,
    });
    // `serviceable: false` is a normal 200 — the UI shows an inline message.
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof ShiprocketConfigError) {
      return NextResponse.json(
        { error: "Delivery service is not configured" },
        { status: 502 },
      );
    }
    if (err instanceof ShiprocketApiError) {
      return NextResponse.json(
        { error: "Couldn't reach the delivery service. Please try again." },
        { status: 502 },
      );
    }
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
