import { PRODUCTS } from "@/lib/products";

/**
 * Admin dashboard — placeholder landing for the CMS. Real tools (product
 * editor, orders, inventory, content) slot in as sibling routes under
 * app/admin/ once the CMS instructions arrive. Reads the shared product model
 * from @/lib/products, the same source the storefront renders — this is the
 * seam that will later be backed by a database.
 */
export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-3xl">Admin</h1>
      <p className="mt-2 text-ths-moss">
        CMS scaffold. Store management tools will live here.
      </p>

      <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-ths-line bg-white/60 p-5">
          <dt className="text-sm text-ths-moss">Products</dt>
          <dd className="mt-1 font-display text-2xl">{PRODUCTS.length}</dd>
        </div>
      </dl>
    </div>
  );
}
