/**
 * Corporate-gifting FAQ — content derived directly from the /gifting page
 * (process steps, projects, and the enquiry form). Kept as plain data (no
 * "use client") so it can back BOTH the interactive accordion (FaqAccordion)
 * and the FAQPage structured data (FaqSection) from a single source of truth.
 */
export type Faq = {
  question: string;
  /** Answer as plain text — also used verbatim in the FAQPage JSON-LD. */
  answer: string;
};

export const GIFTING_FAQS: Faq[] = [
  {
    question: "What is the minimum order quantity for corporate gifting?",
    answer:
      "We take on gifting projects from 25 hampers up to 5,000+ units. Whether it's a small leadership set or a company-wide rollout, every order is made to the same standard.",
  },
  {
    question: "How does your corporate gifting process work?",
    answer:
      "Four considered steps: a consultation to understand your brief, brand, and budget; product and packaging curation with samples on request; a hands-on quality check of every unit; and thoughtful, on-time delivery. You'll receive a kick-off brief within 48 hours of getting in touch.",
  },
  {
    question: "Can the hampers be customised and branded?",
    answer:
      "Yes. We add custom brand cards, ribbons, and monogramming, with subtle co-branding and sustainable packaging designed for a memorable unboxing — all curated around your brand's identity.",
  },
  {
    question: "Which occasions do you create hampers for?",
    answer:
      "Festive moments like Diwali, Holi, Rakhi, and New Year, plus weddings, milestones, employee onboarding, appreciation, and client thank-you gifting.",
  },
  {
    question: "Do you deliver across India?",
    answer:
      "Yes — every hamper is made to order and delivered pan-India.",
  },
  {
    question: "What kind of products go into the hampers?",
    answer:
      "Handcrafted pieces made by indigenous Indian artisan communities — in materials like cork, khadi, seed paper, and terracotta — each meeting our standards for craftsmanship and sustainability.",
  },
  {
    question: "How soon will I hear back after an enquiry?",
    answer:
      "Our team replies within one business day with initial concepts, samples, and pricing tailored to your brand.",
  },
  {
    question: "How do I start a project?",
    answer:
      "Share your brief through the enquiry form below, or email us at ths.thehandmadestore@gmail.com. We'll come back with concepts, samples, and pricing.",
  },
];
