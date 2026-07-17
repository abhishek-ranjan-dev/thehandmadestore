import type { Metadata } from "next";
import { ProductsBrowser } from "@/app/_components/products/ProductsBrowser";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop small-batch, handmade products from The Hand Made Store — festive hampers, eco-friendly stationery, corporate gifts, and more.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Shop | The Hand Made Store",
    description:
      "Handmade, small-batch products across festive hampers, eco-friendly stationery, and corporate gifts.",
    url: "/products",
    siteName: "The Hand Made Store",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Shop handmade products from The Hand Made Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop | The Hand Made Store",
    images: ["/opengraph-image"],
  },
};

export default function ProductsPage() {
  return (
    <main className="flex flex-col">
      <ProductsBrowser />
    </main>
  );
}
