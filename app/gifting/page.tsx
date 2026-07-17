import type { Metadata } from "next";
import { GiftingHero } from "@/app/_components/gifting/GiftingHero";
import { ProcessSteps } from "@/app/_components/gifting/ProcessSteps";
import { ProjectsShowcase } from "@/app/_components/gifting/ProjectsShowcase";
import { CorporateInquiry } from "@/app/_components/gifting/CorporateInquiry";

export const metadata: Metadata = {
  title: "Corporate Gifting",
  description:
    "Bespoke corporate gifting hampers by The Hand Made Store — thoughtfully curated, handcrafted in India, and built to reflect your brand.",
  alternates: { canonical: "/gifting" },
  openGraph: {
    title: "Corporate Gifting | The Hand Made Store",
    description:
      "Bespoke, handcrafted hampers for corporate clients — consultation, curation, quality assurance, and delivery.",
    url: "/gifting",
    siteName: "The Hand Made Store",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Corporate gifting by The Hand Made Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corporate Gifting | The Hand Made Store",
    images: ["/opengraph-image"],
  },
};

export default function GiftingPage() {
  return (
    <main className="flex flex-col">
      <GiftingHero />
      <ProcessSteps />
      <ProjectsShowcase />
      <CorporateInquiry />
    </main>
  );
}
