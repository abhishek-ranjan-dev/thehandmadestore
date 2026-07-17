import { ImageResponse } from "next/og";

export const alt =
  "The Hand Made Store — Handcrafted, Ethical Products from Indian Artisans";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          background:
            "linear-gradient(135deg, #f2ead9 0%, #c6a071 55%, #957855 100%)",
          fontFamily: "serif",
          color: "#17110d",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              background:
                "linear-gradient(135deg, #2f7d78 0%, #266864 100%)",
              color: "#fdf9ef",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 500,
            }}
          >
            H
          </div>
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontFamily: "sans-serif",
              color: "#17110d",
            }}
          >
            The Hand Made Store
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 900,
              color: "#17110d",
            }}
          >
            Every piece has a maker.
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.4,
              fontFamily: "sans-serif",
              color: "#17110dcc",
              maxWidth: 820,
            }}
          >
            Small-batch, handcrafted pieces from Indian artisan communities —
            cork, khadi, seed paper, terracotta, pukhoor embroidery.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontFamily: "sans-serif",
            color: "#17110dcc",
          }}
        >
          <div>Handmade in India</div>
          <div>thehandmadestore.co.in</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
