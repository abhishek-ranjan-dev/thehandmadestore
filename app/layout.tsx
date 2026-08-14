import type { Metadata } from "next";
import { Marcellus, Inter } from "next/font/google";
import "./globals.css";
import "./marketing.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StructuredData } from "@/components/seo/StructuredData";

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

const SITE_URL = "https://www.thehandmadestore.co.in";
const SITE_DESCRIPTION =
  "A women-owned studio partnering with indigenous Indian artisan communities to create handcrafted, ethical goods and bespoke corporate gifting — festive hampers and custom-branded gift boxes in cork, khadi, seed paper, and terracotta.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "The Hand Made Store — Handcrafted, Ethical Products from Indian Artisans",
    template: "%s | The Hand Made Store",
  },
  description: SITE_DESCRIPTION,
  applicationName: "The Hand Made Store",
  authors: [{ name: "The Hand Made Store" }],
  creator: "The Hand Made Store",
  publisher: "The Hand Made Store",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "The Hand Made Store",
    title:
      "The Hand Made Store — Handcrafted, Ethical Products from Indian Artisans",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "The Hand Made Store — Handcrafted, Ethical Products from Indian Artisans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Hand Made Store",
    description: SITE_DESCRIPTION,
    creator: "@thehandmadestore",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "gifting",
};

/**
 * Root layout — the single public brand site. Owns the app shell (html/body,
 * fonts, global + brand CSS, site-wide structured data) AND the shared chrome
 * (SiteHeader / SiteFooter). The `.marketing-app` wrapper scopes the brand's
 * `--mkt-*` design tokens (see marketing.css); shared `ths-*` @theme tokens
 * live in globals.css.
 */
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
        <StructuredData />
        <div className="marketing-app flex flex-1 flex-col">
          <SiteHeader />
          <div className="flex flex-1 flex-col">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
