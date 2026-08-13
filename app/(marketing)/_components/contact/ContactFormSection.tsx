"use client";

import type { SVGProps } from "react";
import { useState } from "react";

const EASE_APPLE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";
const EMAIL = "ths.thehandmadestore@gmail.com";

const IconMail = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
  </svg>
);

const IconChat = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 12a8 8 0 0 1-11.6 7.14L4 20l1-4.5A8 8 0 1 1 21 12z" />
    <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
  </svg>
);

const IconClock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

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

/** Small decorative corner mark, echoing the "+" registration marks of a
 * printed card — a subtle nod to the handmade / print craft. */
const CornerMark = ({ className }: { className?: string }) => (
  <span
    aria-hidden
    className={`pointer-events-none absolute h-3.5 w-3.5 text-ths-earth/45 ${className ?? ""}`}
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M12 4v16M4 12h16" strokeLinecap="round" />
    </svg>
  </span>
);

type ContactMethod = {
  icon: (props: SVGProps<SVGSVGElement>) => React.JSX.Element;
  label: string;
  value: string;
  href?: string;
};

const METHODS: ContactMethod[] = [
  {
    icon: IconMail,
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    icon: IconClock,
    label: "Response time",
    value: "Within one business day, Mon–Sat.",
  },
  {
    icon: IconChat,
    label: "Live chat",
    value: "On our shop — look for the chat bubble.",
  },
];

function MethodTile({ icon: Icon, label, value, href }: ContactMethod) {
  const inner = (
    <>
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/70 bg-white/70 text-ths-ink transition-colors duration-300 group-hover:bg-ths-ink group-hover:text-ths-cream">
        <Icon className="h-[18px] w-[18px]" aria-hidden />
      </span>
      <span className="flex flex-col">
        <span className="text-[10px] uppercase tracking-[0.3em] text-ths-earth">
          {label}
        </span>
        <span
          className={`mt-1 text-sm text-ths-ink/85 md:text-[15px] ${
            href ? "break-all underline decoration-ths-ink/25 underline-offset-4" : ""
          }`}
        >
          {value}
        </span>
      </span>
    </>
  );

  const shared =
    "group flex items-start gap-3.5 rounded-2xl border border-white/50 bg-white/40 p-3.5 transition-all duration-500 hover:border-ths-earth/35 hover:bg-white/60";

  return href ? (
    <a
      href={href}
      className={shared}
      style={{ transitionTimingFunction: EASE_APPLE_OUT }}
    >
      {inner}
    </a>
  ) : (
    <div className={shared}>{inner}</div>
  );
}

type FieldProps = {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  as?: "input" | "textarea";
  autoComplete?: string;
  value: string;
  onChange: (v: string) => void;
};

function Field({
  id,
  label,
  type = "text",
  required,
  as = "input",
  autoComplete,
  value,
  onChange,
}: FieldProps) {
  const shared =
    "peer block w-full border-0 border-b border-ths-ink/25 bg-transparent px-0 pt-6 pb-2 text-base text-ths-ink placeholder-transparent transition-colors duration-300 focus:border-ths-ink focus:outline-none focus:ring-0";
  return (
    <div className="relative">
      {as === "textarea" ? (
        <textarea
          id={id}
          name={id}
          required={required}
          rows={4}
          placeholder={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${shared} resize-none`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          autoComplete={autoComplete}
          placeholder={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={shared}
        />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-2 text-[10px] uppercase tracking-[0.3em] text-ths-earth transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-placeholder-shown:text-ths-ink/50 peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.3em] peer-focus:text-ths-earth"
        style={{ transitionTimingFunction: EASE_APPLE_OUT }}
      >
        {label}
        {required ? " *" : ""}
      </label>
    </div>
  );
}

export function ContactFormSection() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Website enquiry from ${firstName} ${lastName}`
    );
    const body = encodeURIComponent(
      `Name: ${firstName} ${lastName}\nEmail: ${email}\n\n${query}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section
      id="contact-form"
      aria-labelledby="contact-form-heading"
      className="mx-auto w-full max-w-7xl px-5 pt-28 pb-14 sm:px-6 sm:pt-32 sm:pb-16 md:px-10 md:pt-36 md:pb-20"
    >
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/60 bg-gradient-to-br from-white/75 via-white/50 to-ths-sand/40 shadow-[0_30px_70px_-35px_rgba(23,17,13,0.45)] backdrop-blur-xl">
        {/* ambient glows */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-28 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-ths-clay/30 to-transparent blur-3xl"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-ths-teal/20 to-transparent blur-3xl"
        />

        {/* corner registration marks */}
        <CornerMark className="left-4 top-4" />
        <CornerMark className="right-4 top-4" />
        <CornerMark className="bottom-4 left-4" />
        <CornerMark className="bottom-4 right-4" />

        <div className="relative grid grid-cols-1 md:grid-cols-5">
          {/* Left — intro + contact methods */}
          <div className="flex flex-col justify-between gap-8 border-b border-ths-line p-6 sm:p-8 md:col-span-2 md:border-b-0 md:border-r md:p-10 lg:p-12">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-ths-earth">
                Customer Service
              </p>
              <h2
                id="contact-form-heading"
                className="mt-3 font-display text-3xl leading-tight tracking-tight text-ths-ink md:text-4xl"
              >
                Questions? Feedback? Custom orders?
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ths-ink/75 md:text-base">
                For anything about our products or a bespoke piece, drop us a
                line and we&rsquo;ll get back to you as soon as we can.
              </p>
            </div>

            <ul className="space-y-3">
              {METHODS.map((m) => (
                <li key={m.label}>
                  <MethodTile {...m} />
                </li>
              ))}
            </ul>
          </div>

          {/* Right — form */}
          <div className="p-6 sm:p-8 md:col-span-3 md:p-10 lg:p-12">
            {submitted ? (
              <div className="flex min-h-[360px] flex-col items-start justify-center">
                <p className="text-xs uppercase tracking-[0.35em] text-ths-earth">
                  Thank you
                </p>
                <h3 className="mt-3 font-display text-3xl leading-tight text-ths-ink md:text-4xl">
                  Your message is on its way.
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-ths-ink/75">
                  We&rsquo;ve opened your email client with everything ready to
                  send. Once we receive it, we&rsquo;ll reply within one
                  business day.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setQuery("");
                    setSubmitted(false);
                  }}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-ths-ink underline underline-offset-4 transition-colors hover:text-ths-earth"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <Field
                    id="firstName"
                    label="First name"
                    required
                    autoComplete="given-name"
                    value={firstName}
                    onChange={setFirstName}
                  />
                  <Field
                    id="lastName"
                    label="Last name"
                    required
                    autoComplete="family-name"
                    value={lastName}
                    onChange={setLastName}
                  />
                </div>
                <Field
                  id="email"
                  label="Email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={setEmail}
                />
                <Field
                  id="query"
                  label="Tell us about your query"
                  required
                  as="textarea"
                  value={query}
                  onChange={setQuery}
                />

                <div className="flex flex-col-reverse items-start justify-between gap-6 pt-2 sm:flex-row sm:items-center">
                  <p className="text-xs text-ths-ink/60">
                    By submitting, you agree to be contacted about your enquiry.
                  </p>
                  <button
                    type="submit"
                    className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-ths-ink/25 bg-ths-ink px-7 py-3 text-sm font-semibold uppercase tracking-widest text-ths-cream shadow-[0_10px_30px_-12px_rgba(23,17,13,0.55)] transition-all duration-500 hover:border-ths-ink hover:shadow-[0_16px_36px_-14px_rgba(23,17,13,0.65)] active:scale-[0.97]"
                    style={{ transitionTimingFunction: EASE_APPLE_OUT }}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full"
                      style={{ transitionTimingFunction: EASE_APPLE_OUT }}
                    />
                    <span className="relative">Send message</span>
                    <IconArrow
                      className="relative h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-1"
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
    </section>
  );
}
