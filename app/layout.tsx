import type { Metadata } from "next";
import { Marcellus, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/app/_components/layout/SiteHeader";
import { SiteFooter } from "@/app/_components/layout/SiteFooter";

const display = Marcellus({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.thehandmadestore.co.in"),
  title: {
    default: "The Hand Made Store",
    template: "%s | The Hand Made Store",
  },
  description:
    "Handcrafted, ethical products from indigenous Indian artisans. A women-owned local business in jewelry, home decor, and lifestyle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-ths-cream text-ths-ink font-body"
        suppressHydrationWarning
      >
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
