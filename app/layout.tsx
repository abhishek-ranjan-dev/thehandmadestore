import type { Metadata } from "next";
import { Marcellus, Inter } from "next/font/google";
import "./globals.css";
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
  "A women-owned local business partnering with indigenous Indian artisans for handcrafted, ethical jewelry, home decor, and lifestyle products.";

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
  category: "shopping",
};

/**
 * Root layout — application shell only.
 *
 * Deliberately free of any header/footer/chrome so the three parts of the app
 * can each own their own layout AND their own scoped design tokens:
 *   - app/(marketing) — brand / "start-up" site  → SiteHeader/Footer · marketing.css (.marketing-app)
 *   - app/shop        — e-commerce storefront     → shop chrome + providers · shop.css (.shop-app)
 *   - app/admin       — CMS / admin tools         → admin shell + auth gate · admin.css (.admin-app)
 * Only truly global concerns (fonts, global CSS + shared ths-* @theme tokens,
 * site-wide structured data) belong here; each module diverges via its own CSS.
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
        {children}
      </body>
    </html>
  );
}
