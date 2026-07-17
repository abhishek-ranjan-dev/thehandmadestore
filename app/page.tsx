import { HomeHero } from "@/app/_components/home/HomeHero";
import { FeaturedProducts } from "@/app/_components/home/FeaturedProducts";
import { ServicesSection } from "@/app/_components/home/ServicesSection";
import { TestimonialsSection } from "@/app/_components/home/TestimonialsSection";
import { ClientsSection } from "@/app/_components/home/ClientsSection";
import { HomeExplore } from "@/app/_components/home/HomeExplore";

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
