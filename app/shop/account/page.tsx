import type { Metadata } from "next";
import { AccountScreen } from "../_components/AccountScreen";

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return <AccountScreen />;
}
