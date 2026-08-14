import { FaqAccordion } from "./FaqAccordion";
import { GIFTING_FAQS } from "./faq-data";

const EMAIL = "ths.thehandmadestore@gmail.com";

// FAQPage structured data — same source as the visible accordion, so the two
// can never drift. Rendered server-side for crawlers.
const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: GIFTING_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="w-full bg-ths-cream"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }}
      />
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 sm:py-16 md:px-10 md:py-24">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.35em] text-ths-earth">
              FAQ
            </p>
            <h2
              id="faq-heading"
              className="mt-3 font-display text-3xl leading-tight tracking-tight text-ths-ink md:text-4xl lg:text-5xl"
            >
              Questions,
              <br className="hidden md:block" />
              <span className="text-ths-earth"> answered.</span>
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ths-ink/70 sm:text-base">
              Everything worth knowing before you start a gifting project. Still
              curious?{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="border-b border-ths-ink/40 pb-0.5 text-ths-ink transition-colors hover:border-ths-ink"
              >
                Email us
              </a>
              .
            </p>
          </div>
          <div className="md:col-span-8">
            <FaqAccordion />
          </div>
        </div>
      </div>
    </section>
  );
}
