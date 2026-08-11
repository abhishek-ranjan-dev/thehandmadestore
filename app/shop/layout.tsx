import "./shop.css";
import { ShopProviders } from "./_components/ShopProviders";
import { ShopChrome } from "./_components/ShopChrome";

/**
 * Shop layout — the e-commerce storefront runs in an "app mode": a persistent
 * top bar + bottom tab bar (ShopChrome) wrap every screen (products, wishlist,
 * cart, account) so navigation between the tabs is real routing and the chrome
 * never re-mounts. The "back to website mode" control links to the (marketing)
 * site.
 *
 * ShopProviders holds the wishlist + cart state (persisted to localStorage) so
 * it's shared across all of these screens.
 */
export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ShopProviders>
      <div className="shop-app min-h-screen w-full bg-[var(--shop-linen)] text-[var(--shop-charcoal)] [-webkit-tap-highlight-color:transparent]">
        <ShopChrome />
        <div className="pb-28 md:pb-16">{children}</div>
      </div>
    </ShopProviders>
  );
}
