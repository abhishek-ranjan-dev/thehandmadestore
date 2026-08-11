/**
 * Shared scaffold for storefront screens — the iOS-style large title + optional
 * subtitle and a right-aligned action slot, above the screen's content. The
 * persistent chrome (top bar / tab bar) is provided by the (shop) layout, so a
 * screen only supplies its title and body.
 */
export function ShopScreen({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-6xl px-4 pt-4 md:px-6">
      <div className="flex items-end justify-between gap-3 px-1 pb-4 pt-2">
        <div>
          <h1 className="text-[28px] font-semibold leading-none -tracking-[0.02em] md:text-[34px]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-[13px] tracking-tight text-stone-500">
              {subtitle}
            </p>
          )}
        </div>
        {action}
      </div>
      {children}
    </main>
  );
}
