"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/lib/products";

/* -------------------------------------------------------------------------- */
/*  Filter panel — shared between the desktop sidebar rail (ShopFilters) and    */
/*  the mobile bottom sheet (ShopFiltersMobile).                                */
/*                                                                             */
/*  UI ONLY for now: the controls render but are NOT wired to the product      */
/*  filtering yet (the chip bar still drives results). This is the scaffold    */
/*  for a full faceted filter — categories, materials, price — hooked up later.*/
/* -------------------------------------------------------------------------- */

const CATEGORY_OPTIONS = CATEGORIES.filter((c) => c.slug !== "all-products");

const MATERIAL_OPTIONS = [
  ...new Set(PRODUCTS.map((p) => p.material).filter((m): m is string => Boolean(m))),
];

/** Desktop: sticky left rail. */
export function ShopFilters() {
  return (
    <aside className="hidden md:block">
      <div className="sticky top-20 rounded-xl border border-black/[0.06] bg-white/70 p-5 shadow-[0_2px_16px_-8px_rgba(0,0,0,0.10)] backdrop-blur-xl backdrop-saturate-150">
        <PanelHeader />
        <FilterSections />
        <ApplyFooter />
      </div>
    </aside>
  );
}

/** Mobile: a "Filters" trigger button + a bottom-sheet holding the same panel. */
export function ShopFiltersMobile() {
  const [open, setOpen] = useState(false);

  // Lock body scroll + close on Escape while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Filters"
        aria-haspopup="dialog"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-black/[0.06] bg-white text-stone-600 transition-all duration-300 hover:text-[#C86446] active:scale-90 md:hidden"
      >
        <SlidersHorizontal className="h-[18px] w-[18px]" strokeWidth={2} />
      </button>

      {/* Portal to <body> so the fixed overlay escapes the filter bar's
          backdrop-filter containing block (which would otherwise clip it). */}
      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[60] md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
          >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          />

          {/* Left sidecard drawer */}
          <div className="shop-drawer-in absolute inset-y-0 left-0 flex w-[85%] max-w-xs flex-col overflow-y-auto border-r border-black/[0.06] bg-[#FDFBF7] p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-[8px_0_40px_-12px_rgba(0,0,0,0.35)]">
            <PanelHeader onClose={() => setOpen(false)} />
            <FilterSections />
            <ApplyFooter onApply={() => setOpen(false)} />
          </div>
          </div>,
          document.body,
        )}
    </>
  );
}

/* --------------------------------- parts --------------------------------- */

function PanelHeader({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="flex items-center gap-2 text-sm font-semibold tracking-tight">
        <SlidersHorizontal className="h-4 w-4 text-[#C86446]" strokeWidth={2} />
        Filters
      </h2>
      {onClose ? (
        <button
          type="button"
          aria-label="Close filters"
          onClick={onClose}
          className="grid h-8 w-8 place-items-center rounded-full text-stone-500 transition-colors hover:bg-black/[0.04] hover:text-[#C86446]"
        >
          <X className="h-4 w-4" strokeWidth={2} />
        </button>
      ) : (
        <button
          type="button"
          className="text-xs font-medium tracking-tight text-stone-400 transition-colors hover:text-[#C86446]"
        >
          Clear all
        </button>
      )}
    </div>
  );
}

function FilterSections() {
  return (
    <>
      <FilterGroup title="Category">
        {CATEGORY_OPTIONS.map((c) => (
          <CheckRow key={c.slug} label={c.label} />
        ))}
      </FilterGroup>

      <FilterGroup title="Material">
        {MATERIAL_OPTIONS.map((m) => (
          <CheckRow key={m} label={m} />
        ))}
      </FilterGroup>

      <FilterGroup title="Price">
        <input
          type="range"
          min={0}
          max={1000}
          defaultValue={1000}
          aria-label="Maximum price"
          className="w-full accent-[#C86446]"
        />
        <div className="mt-2 flex items-center justify-between text-xs tabular-nums tracking-tight text-stone-500">
          <span>₹0</span>
          <span>₹1000+</span>
        </div>
      </FilterGroup>
    </>
  );
}

function ApplyFooter({ onApply }: { onApply?: () => void }) {
  return (
    <>
      <button
        type="button"
        onClick={onApply}
        className="mt-5 w-full rounded-full bg-[#C86446] px-5 py-2.5 text-sm font-medium text-white shadow-[0_4px_14px_-4px_rgba(200,100,70,0.55)] transition-all duration-300 ease-[var(--ease-apple-out)] active:scale-[0.98]"
      >
        Apply filters
      </button>
      <p className="mt-3 text-center text-[11px] tracking-tight text-stone-400">
        Filtering coming soon
      </p>
    </>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5 border-t border-black/[0.06] pt-4">
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-stone-400">
        {title}
      </h3>
      <div className="mt-3 flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function CheckRow({ label }: { label: string }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-[13px] tracking-tight text-stone-600 transition-colors hover:text-[#222222]">
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-stone-300 accent-[#C86446]"
      />
      {label}
    </label>
  );
}
