import type { Metadata } from "next";
import { CartScreen } from "../_components/CartScreen";

export const metadata: Metadata = {
  title: "Cart",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return <CartScreen />;
}
