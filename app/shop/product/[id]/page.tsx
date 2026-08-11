import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Hammer } from "lucide-react";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Product",
  // Placeholder page with no content yet — keep it out of the index.
  robots: { index: false, follow: false },
};

// Pre-render a route for every known product id so the PLP/wishlist/cart links
// resolve to static pages. The detail content itself is intentionally deferred.
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

/**
 * Product detail page (PDP) — placeholder.
 *
 * Deliberately empty beyond a "coming soon" state: the in-app product page is
 * scaffolded (route exists, links point here instead of the external Wix site)
 * but its content is not built yet.
 */
export default function ProductDetailPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-4 py-20 text-center md:px-6">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-[#C86446]/10 text-[#C86446]">
        <Hammer className="h-7 w-7" strokeWidth={1.75} />
      </div>
      <p className="mt-5 text-lg font-semibold -tracking-[0.01em]">Coming soon</p>
      <p className="mt-1.5 max-w-xs text-sm tracking-tight text-stone-500">
        This product page is being handcrafted. Check back shortly.
      </p>
      <Link
        href="/shop"
        className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-[#C86446] px-5 py-2.5 text-sm font-medium text-white shadow-[0_4px_14px_-4px_rgba(200,100,70,0.55)] transition-all duration-300 ease-[var(--ease-apple-out)] active:scale-95"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2} />
        Back to shop
      </Link>
    </div>
  );
}
