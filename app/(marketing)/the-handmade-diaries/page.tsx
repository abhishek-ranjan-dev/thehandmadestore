import type { Metadata } from "next";
import { ComingSoon } from "../_components/diaries/ComingSoon";

export const metadata: Metadata = {
  title: "The Handmade Diaries",
  description:
    "The Handmade Diaries is coming soon — stories from the studio, the makers behind each piece, and the craft that goes into every handmade product. Sign up to be notified when it launches.",
  alternates: { canonical: "/the-handmade-diaries" },
  openGraph: {
    title: "The Handmade Diaries | The Hand Made Store",
    description:
      "Stories from the studio, coming soon. Sign up to be notified when The Handmade Diaries goes live.",
    url: "/the-handmade-diaries",
    siteName: "The Hand Made Store",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "The Handmade Diaries — coming soon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Handmade Diaries | The Hand Made Store",
    images: ["/opengraph-image"],
  },
};

export default function HandmadeDiariesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <ComingSoon />
    </main>
  );
}
