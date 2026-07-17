import type { Metadata } from "next";
import { HomeHero } from "@/app/_components/home/HomeHero";
import { FeaturedProducts } from "@/app/_components/home/FeaturedProducts";
import { ServicesSection } from "@/app/_components/home/ServicesSection";
import { TestimonialsSection } from "@/app/_components/home/TestimonialsSection";
import { ClientsSection } from "@/app/_components/home/ClientsSection";
import { HomeExplore } from "@/app/_components/home/HomeExplore";

export const metadata: Metadata = {
  title: {
    absolute:
      "The Hand Made Store — Handcrafted, Ethical Products from Indian Artisans",
  },
  description:
    "Small-batch, handcrafted pieces from Indian artisan communities — cork, khadi, seed paper, terracotta. Shop hampers, plantable stationery, and lifestyle goods.",
  alternates: { canonical: "/" },
  openGraph: {
    title:
      "The Hand Made Store — Handcrafted, Ethical Products from Indian Artisans",
    description:
      "Small-batch, handcrafted pieces from Indian artisan communities. Shop hampers, plantable stationery, and lifestyle goods.",
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
      <FeaturedProducts />
      <ServicesSection />
      <ClientsSection />
      <TestimonialsSection />
      <HomeExplore />
    </main>
  );
}
