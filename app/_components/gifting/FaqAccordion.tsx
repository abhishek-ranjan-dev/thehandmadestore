"use client";

import type { SVGProps } from "react";
import { useState } from "react";
import { GIFTING_FAQS } from "./faq-data";

const EASE_APPLE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";

const IconChevron = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

/**
 * Single-open FAQ accordion. Answers stay in the DOM (collapsed via a
 * grid-rows 0fr→1fr transition, not unmounted) so they remain crawlable and the
 * height animation works without measuring. Content comes from faq-data.ts,
 * shared with the FAQPage structured data in FaqSection.
 */
export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-ths-ink/10">
      {GIFTING_FAQS.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.question} className="border-b border-ths-ink/10">
            <h3>
              <button
                type="button"
                id={`faq-trigger-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left sm:py-6"
              >
                <span className="font-display text-lg leading-snug text-ths-ink transition-colors duration-300 group-hover:text-ths-earth sm:text-xl md:text-[1.375rem]">
                  {faq.question}
                </span>
                <span
                  aria-hidden
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                    isOpen
                      ? "rotate-180 border-ths-ink bg-ths-ink text-ths-cream"
                      : "border-ths-ink/25 text-ths-ink group-hover:border-ths-ink"
                  }`}
                  style={{ transitionTimingFunction: EASE_APPLE_OUT }}
                >
                  <IconChevron className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-trigger-${i}`}
              className="grid transition-[grid-template-rows] duration-500"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transitionTimingFunction: EASE_APPLE_OUT,
              }}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 pr-4 text-[15px] leading-relaxed text-ths-ink/75 sm:pr-10 sm:text-base">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
