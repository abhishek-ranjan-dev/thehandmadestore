import type { Metadata } from "next";
import { ArtisansHero } from "@/app/_components/artisans/ArtisansHero";
import { ArtisansIntro } from "@/app/_components/artisans/ArtisansIntro";
import { ArtisanCommunities } from "@/app/_components/artisans/ArtisanCommunities";
import { ArtisansCTA } from "@/app/_components/artisans/ArtisansCTA";

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Our Artisans | The Hand Made Store",
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
