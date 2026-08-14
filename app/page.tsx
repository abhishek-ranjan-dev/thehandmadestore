import type { Metadata } from "next";
import { HomeHero } from "./_components/home/HomeHero";
import { ServicesSection } from "./_components/home/ServicesSection";
import { TestimonialsSection } from "./_components/home/TestimonialsSection";
import { ClientsSection } from "./_components/home/ClientsSection";
import { HomeExplore } from "./_components/home/HomeExplore";

export const metadata: Metadata = {
  title: {
    absolute:
      "The Hand Made Store — Handcrafted, Ethical Products from Indian Artisans",
  },
  description:
    "The Hand Made Store is a women-owned studio working with indigenous Indian artisan communities to craft ethical, handmade goods and bespoke corporate gifting — festive hampers and custom-branded gift boxes in cork, khadi, seed paper, and terracotta.",
  alternates: { canonical: "/" },
  openGraph: {
    title:
      "The Hand Made Store — Handcrafted, Ethical Products from Indian Artisans",
    description:
      "Women-owned and artisan-made. Ethical, handcrafted goods and bespoke corporate gifting hampers, made in India.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "The Hand Made Store — Handcrafted, Ethical Products from Indian Artisans",
  },
};

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <HomeHero />
      <ServicesSection />
      <ClientsSection />
      <TestimonialsSection />
      <HomeExplore />
    </main>
  );
}
