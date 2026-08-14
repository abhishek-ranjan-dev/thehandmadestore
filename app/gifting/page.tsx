import type { Metadata } from "next";
import { GiftingHero } from "../_components/gifting/GiftingHero";
import { ProcessSteps } from "../_components/gifting/ProcessSteps";
import { ProjectsShowcase } from "../_components/gifting/ProjectsShowcase";
import { FaqSection } from "../_components/gifting/FaqSection";
import { CorporateInquiry } from "../_components/gifting/CorporateInquiry";

export const metadata: Metadata = {
  title: "Corporate Gifting",
  description:
    "Bespoke corporate gifting and festive hampers by The Hand Made Store — handcrafted in India by artisan communities, custom-branded, from 25 to 5,000+ units, and delivered pan-India.",
  keywords: [
    "corporate gifting India",
    "handmade corporate gifts",
    "festive hampers",
    "Diwali corporate gifting",
    "custom branded hampers",
    "sustainable corporate gifts",
    "bulk gifting India",
    "artisan gift hampers",
  ],
  alternates: { canonical: "/gifting" },
  openGraph: {
    title: "Corporate Gifting | The Hand Made Store",
    description:
      "Bespoke, handcrafted hampers for corporate clients — consultation, curation, quality assurance, and pan-India delivery, from 25 to 5,000+ units.",
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
      <FaqSection />
      <CorporateInquiry />
    </main>
  );
}
