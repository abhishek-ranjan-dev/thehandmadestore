import type { Metadata } from "next";
import { WishlistScreen } from "../_components/WishlistScreen";

export const metadata: Metadata = {
  title: "Wishlist",
  robots: { index: false, follow: false },
};

export default function WishlistPage() {
  return <WishlistScreen />;
}
