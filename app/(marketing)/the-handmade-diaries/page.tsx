import type { Metadata } from "next";
import { DiariesList } from "../_components/diaries/DiariesList";

export const metadata: Metadata = {
  title: "The Hand Made Diaries",
  description:
    "Stories from The Hand Made Store studio — the artisans behind each piece, the craft in every hamper, and notes on sustainable, thoughtful gifting.",
  alternates: { canonical: "/the-handmade-diaries" },
  openGraph: {
    title: "The Hand Made Diaries | The Hand Made Store",
    description:
      "Stories from the studio — the makers behind each piece and our notes on sustainable, thoughtful gifting.",
    url: "/the-handmade-diaries",
    siteName: "The Hand Made Store",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "The Hand Made Diaries — stories from the studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Hand Made Diaries | The Hand Made Store",
    images: ["/opengraph-image"],
  },
};

export default function HandmadeDiariesPage() {
  return (
    <main className="flex flex-1 flex-col">
      <DiariesList />
    </main>
  );
}
