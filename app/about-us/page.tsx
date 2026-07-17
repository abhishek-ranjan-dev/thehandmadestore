import type { Metadata } from "next";
import { FounderSection } from "@/app/_components/about/FounderSection";
import { HeroDivider } from "@/app/_components/about/HeroDivider";
import { ImpactPillars } from "@/app/_components/about/ImpactPillars";
import { StorySection } from "@/app/_components/about/StorySection";
import { WomenOwnedSection } from "@/app/_components/about/WomenOwnedSection";
import { ValuesGrid } from "@/app/_components/about/ValuesGrid";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Ashwini R. Kurup, founder of The Hand Made Store — a women-owned business partnering with Indian artisans on handcrafted, ethical jewelry, home decor, and lifestyle products since 2019.",
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: "About Us | The Hand Made Store",
    description:
      "A women-owned local business partnering with indigenous Indian craftsmen for handcrafted, ethical products since 2019.",
    url: "/about-us",
    siteName: "The Hand Made Store",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | The Hand Made Store",
  },
};

export default function AboutUsPage() {
  return (
    <main className="flex flex-col">
      <FounderSection />
      <HeroDivider />
      <StorySection />
      <WomenOwnedSection />
      <ImpactPillars />
      <ValuesGrid />
    </main>
  );
}
