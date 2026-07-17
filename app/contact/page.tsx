import type { Metadata } from "next";
import { ContactHero } from "@/app/_components/contact/ContactHero";
import { ContactFormSection } from "@/app/_components/contact/ContactFormSection";
import { ContactLocation } from "@/app/_components/contact/ContactLocation";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with The Hand Made Store. Email us at ths.thehandmadestore@gmail.com or send us a message about our handcrafted, ethical products.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | The Hand Made Store",
    description:
      "Questions, feedback, or custom orders? Reach us via email or the form.",
    url: "/contact",
    siteName: "The Hand Made Store",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Contact The Hand Made Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | The Hand Made Store",
    images: ["/opengraph-image"],
  },
};

export default function ContactPage() {
  return (
    <main className="flex flex-col">
      <ContactHero />
      <ContactFormSection />
      <ContactLocation />
    </main>
  );
}
