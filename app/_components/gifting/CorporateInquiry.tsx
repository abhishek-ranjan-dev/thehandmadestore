"use client";

import type { SVGProps } from "react";
import { useState } from "react";

const EASE_APPLE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";
const EMAIL = "ths.thehandmadestore@gmail.com";

const QUANTITIES = ["25 – 100", "100 – 500", "500 – 1,000", "1,000 – 5,000", "5,000+"];

const IconArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

type FieldWrapperProps = {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
};

function FieldWrapper({ id, label, required, children }: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-[10px] uppercase tracking-[0.3em] text-ths-earth"
      >
        {label}
        {required ? " *" : ""}
      </label>
      {children}
    </div>
  );
}

const inputBase =
  "block w-full border-0 border-b border-ths-ink/25 bg-transparent px-0 py-3 text-base text-ths-ink placeholder-ths-ink/40 transition-colors duration-300 focus:border-ths-ink focus:outline-none focus:ring-0";

export function CorporateInquiry() {
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState(QUANTITIES[0]);
  const [scope, setScope] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Corporate gifting enquiry — ${company}`);
    const body = encodeURIComponent(
      [
        `Company: ${company}`,
        `Contact: ${contactName}`,
        `Email: ${email}`,
        `Estimated quantity: ${quantity}`,
        "",
        "Project scope:",
        scope,
      ].join("\n")
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section
      id="inquiry"
      aria-labelledby="inquiry-heading"
      className="w-full bg-ths-cream"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 sm:py-16 md:px-10 md:py-24">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <p className="text-xs uppercase tracking-[0.35em] text-ths-earth">
              Start a Project
            </p>
            <h2
              id="inquiry-heading"
              className="mt-3 font-display text-3xl leading-tight tracking-tight text-ths-ink md:text-4xl lg:text-5xl"
            >
              Tell us about your gifting.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ths-ink/80 sm:text-base md:text-lg">
              Share a few details and our team will get back within one
              business day with concepts, samples, and pricing tailored to
              your brand.
            </p>

            <a
              href={`mailto:${EMAIL}`}
              className="mt-8 inline-block border-b border-ths-ink/40 pb-0.5 text-sm text-ths-ink transition-colors hover:border-ths-ink"
            >
              Or email us directly &rarr;
            </a>
          </div>

          <div className="md:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-white/85 via-white/60 to-ths-cream/60 p-6 sm:p-8 shadow-[0_25px_60px_-25px_rgba(23,17,13,0.35)] backdrop-blur-xl md:p-12">
              <span
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br from-ths-clay/30 to-transparent blur-3xl"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-tr from-ths-teal/20 to-transparent blur-3xl"
              />

              {submitted ? (
                <div className="relative flex min-h-[420px] flex-col items-start justify-center">
                  <p className="text-xs uppercase tracking-[0.35em] text-ths-earth">
                    Thank you
                  </p>
                  <h3 className="mt-3 font-display text-3xl leading-tight text-ths-ink md:text-4xl">
                    Your brief is on its way.
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-ths-ink/75">
                    We&rsquo;ve opened your mail client with the details
                    ready. Once we receive it we&rsquo;ll reply within one
                    business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setCompany("");
                      setContactName("");
                      setEmail("");
                      setQuantity(QUANTITIES[0]);
                      setScope("");
                      setSubmitted(false);
                    }}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-ths-ink underline underline-offset-4 transition-colors hover:text-ths-earth"
                  >
                    Start another brief
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative space-y-6 sm:space-y-8">
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <FieldWrapper id="company" label="Entity name" required>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        required
                        autoComplete="organization"
                        placeholder="Your company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className={inputBase}
                      />
                    </FieldWrapper>
                    <FieldWrapper id="contactName" label="Contact name" required>
                      <input
                        id="contactName"
                        name="contactName"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Your full name"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className={inputBase}
                      />
                    </FieldWrapper>
                  </div>

                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <FieldWrapper id="email" label="Work email" required>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputBase}
                      />
                    </FieldWrapper>
                    <FieldWrapper id="quantity" label="Estimated quantity" required>
                      <select
                        id="quantity"
                        name="quantity"
                        required
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className={`${inputBase} appearance-none bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22%2317110d%22%20stroke-width=%221.75%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22><path%20d=%22M6%209l6%206%206-6%22/></svg>')] bg-[length:16px_16px] bg-[right_0_center] bg-no-repeat pr-8`}
                      >
                        {QUANTITIES.map((q) => (
                          <option key={q} value={q}>
                            {q}
                          </option>
                        ))}
                      </select>
                    </FieldWrapper>
                  </div>

                  <FieldWrapper id="scope" label="Project scope" required>
                    <textarea
                      id="scope"
                      name="scope"
                      required
                      rows={5}
                      placeholder="Occasion, timeline, budget range, any brand notes we should know…"
                      value={scope}
                      onChange={(e) => setScope(e.target.value)}
                      className={`${inputBase} resize-none`}
                    />
                  </FieldWrapper>

                  <div className="flex flex-col-reverse items-start justify-between gap-6 pt-2 sm:flex-row sm:items-center">
                    <p className="text-xs text-ths-ink/60">
                      We only use your details to respond to this enquiry.
                    </p>
                    <button
                      type="submit"
                      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-ths-ink/25 bg-ths-ink px-7 py-3 text-sm font-semibold uppercase tracking-widest text-ths-cream shadow-[0_10px_30px_-12px_rgba(23,17,13,0.55)] transition-all duration-500 hover:border-ths-ink hover:shadow-[0_16px_36px_-14px_rgba(23,17,13,0.65)] active:scale-[0.97]"
                      style={{ transitionTimingFunction: EASE_APPLE_OUT }}
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                        style={{ transitionTimingFunction: EASE_APPLE_OUT }}
                      />
                      <span className="relative">Request a proposal</span>
                      <IconArrow
                        className="relative h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                        style={{ transitionTimingFunction: EASE_APPLE_OUT }}
                        aria-hidden
                      />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
