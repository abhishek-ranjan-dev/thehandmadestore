import type { Metadata } from "next";
import { ArtisansHero } from "../_components/artisans/ArtisansHero";
import { ArtisansIntro } from "../_components/artisans/ArtisansIntro";
import { ArtisanCommunities } from "../_components/artisans/ArtisanCommunities";
import { ArtisansCTA } from "../_components/artisans/ArtisansCTA";

export const metadata: Metadata = {
  title: "Meet Our Artisans",
  description:
    "The people behind The Hand Made Store — a look at four Indian artisan communities we work with, from the potters of Dharavi to the Toda embroiderers of the Nilgiris.",
  alternates: { canonical: "/artisans" },
  openGraph: {
    title: "Meet Our Artisans | The Hand Made Store",
    description:
      "Craft is a person, not a product. Meet four artisan communities we work with across India.",
    url: "/artisans",
    siteName: "The Hand Made Store",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Meet the Indian artisan communities behind The Hand Made Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Our Artisans | The Hand Made Store",
    images: ["/opengraph-image"],
  },
};

export default function ArtisansPage() {
  return (
    <main className="flex flex-col">
      <ArtisansHero />
      <ArtisansIntro />
      <ArtisanCommunities />
      <ArtisansCTA />
    </main>
  );
}
