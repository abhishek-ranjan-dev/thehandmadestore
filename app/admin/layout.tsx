import "./admin.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  // The CMS must never be indexed.
  robots: { index: false, follow: false },
};

/**
 * Admin / CMS layout — the third part of the app, where staff manage the store
 * (products, inventory, orders, content). Deliberately has its own shell with
 * NO public SiteHeader/SiteFooter.
 *
 * TODO(auth): gate this segment behind authentication. In Next 16 the idiomatic
 * place is `middleware.ts` at the repo root, matching `/admin/:path*` and
 * redirecting unauthenticated requests to a sign-in route. Wire this up when
 * the CMS auth model is defined.
 */
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="admin-app flex min-h-screen flex-col bg-[var(--admin-bg)] text-[var(--admin-ink)]">
      <header className="border-b border-[var(--admin-line)] bg-white/60 px-6 py-4">
        <span className="font-display text-lg">The Hand Made Store</span>
        <span className="ml-2 text-sm text-[var(--admin-muted)]">· Admin</span>
      </header>
      <main className="flex-1 px-6 py-8">{children}</main>
    </div>
  );
}
