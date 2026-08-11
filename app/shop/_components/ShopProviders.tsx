"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PRODUCTS } from "@/lib/products";

/* -------------------------------------------------------------------------- */
/*  Storefront client state — wishlist + cart, persisted to localStorage.      */
/*  Lives at the (shop) layout so it survives navigation between the tab        */
/*  screens (products / wishlist / cart / account) and page reloads.           */
/* -------------------------------------------------------------------------- */

const WISHLIST_KEY = "ths.wishlist";
const CART_KEY = "ths.cart";

const PRICE_BY_ID = new Map(PRODUCTS.map((p) => [p.id, p.price]));
const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function loadJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full / unavailable — non-fatal */
  }
}

/* ------------------------------ Wishlist ---------------------------------- */

type WishlistValue = {
  ids: string[];
  has: (id: string) => boolean;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  count: number;
};

const WishlistContext = createContext<WishlistValue | null>(null);

/* -------------------------------- Cart ------------------------------------ */

export type CartLine = { id: string; qty: number };

type CartValue = {
  lines: CartLine[];
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  count: number;
  subtotal: number;
  formattedSubtotal: string;
};

const CartContext = createContext<CartValue | null>(null);

/* ------------------------------ Provider ---------------------------------- */

export function ShopProviders({ children }: { children: React.ReactNode }) {
  // Hydrate from localStorage after mount so server + first client render match
  // (both start empty), then sync on every change.
  const [wishIds, setWishIds] = useState<string[]>([]);
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setWishIds(loadJSON<string[]>(WISHLIST_KEY, []));
    setLines(loadJSON<CartLine[]>(CART_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveJSON(WISHLIST_KEY, wishIds);
  }, [wishIds, hydrated]);

  useEffect(() => {
    if (hydrated) saveJSON(CART_KEY, lines);
  }, [lines, hydrated]);

  const wishlist = useMemo<WishlistValue>(() => {
    const set = new Set(wishIds);
    return {
      ids: wishIds,
      has: (id) => set.has(id),
      toggle: (id) =>
        setWishIds((prev) =>
          prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev],
        ),
      remove: (id) => setWishIds((prev) => prev.filter((x) => x !== id)),
      count: wishIds.length,
    };
  }, [wishIds]);

  const cart = useMemo<CartValue>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce(
      (sum, l) => sum + (PRICE_BY_ID.get(l.id) ?? 0) * l.qty,
      0,
    );
    return {
      lines,
      add: (id, qty = 1) =>
        setLines((prev) => {
          const found = prev.find((l) => l.id === id);
          return found
            ? prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l))
            : [...prev, { id, qty }];
        }),
      remove: (id) => setLines((prev) => prev.filter((l) => l.id !== id)),
      setQty: (id, qty) =>
        setLines((prev) =>
          qty <= 0
            ? prev.filter((l) => l.id !== id)
            : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
        ),
      count,
      subtotal,
      formattedSubtotal: inr.format(subtotal),
    };
  }, [lines]);

  return (
    <WishlistContext.Provider value={wishlist}>
      <CartContext.Provider value={cart}>{children}</CartContext.Provider>
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within ShopProviders");
  return ctx;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within ShopProviders");
  return ctx;
}
