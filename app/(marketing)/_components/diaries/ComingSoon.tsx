"use client";

import type { SVGProps } from "react";
import { useState } from "react";
import Link from "next/link";

const EASE_APPLE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";
const EMAIL = "ths.thehandmadestore@gmail.com";

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

const IconBook = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5V5.5z" />
    <path d="M20 18v3H6.5A2.5 2.5 0 0 1 4 18.5" />
    <path d="M8 7.5h8M8 11h6" />
  </svg>
);

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

export function ComingSoon() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent("Notify me — The Handmade Diaries");
    const body = encodeURIComponent(
      `Please let me know when The Handmade Diaries goes live.\n\nEmail: ${email}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section
      aria-labelledby="diaries-heading"
      className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-5 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20 md:px-10 md:pt-36 md:pb-28"
    >
      <div className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/60 bg-gradient-to-br from-white/75 via-white/50 to-ths-sand/40 px-6 py-12 text-center shadow-[0_30px_70px_-35px_rgba(23,17,13,0.45)] backdrop-blur-xl sm:px-10 sm:py-16 md:px-16 md:py-20">
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

        <div className="relative flex flex-col items-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/70 bg-white/70 text-ths-ink">
            <IconBook className="h-6 w-6" aria-hidden />
          </span>

          <p className="mt-7 text-xs uppercase tracking-[0.35em] text-ths-earth">
            The Handmade Diaries
          </p>
          <h1
            id="diaries-heading"
            className="mt-4 font-display text-4xl leading-tight tracking-tight text-ths-ink md:text-5xl lg:text-6xl"
          >
            Coming soon.
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ths-ink/75 sm:text-base md:text-lg">
            Stories from the studio &mdash; the makers behind each piece, the
            craft, and the little details that don&rsquo;t fit on a product page.
            We&rsquo;re writing the first entries now.
          </p>

          {submitted ? (
            <div className="mt-9 flex flex-col items-center">
              <p className="font-display text-2xl leading-tight text-ths-ink md:text-3xl">
                You&rsquo;re on the list.
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ths-ink/70">
                We&rsquo;ve opened your email client to confirm. We&rsquo;ll let
                you know the moment the first diary goes live.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-9 flex w-full max-w-md flex-col items-stretch gap-3 sm:flex-row"
            >
              <label htmlFor="notify-email" className="sr-only">
                Email address
              </label>
              <input
                id="notify-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border border-ths-ink/20 bg-white/60 px-5 py-3 text-sm text-ths-ink placeholder-ths-ink/45 transition-colors duration-300 focus:border-ths-ink focus:outline-none focus:ring-0"
              />
              <button
                type="submit"
                className="group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full border border-ths-ink/25 bg-ths-ink px-6 py-3 text-sm font-semibold uppercase tracking-widest text-ths-cream shadow-[0_10px_30px_-12px_rgba(23,17,13,0.55)] transition-all duration-500 hover:border-ths-ink hover:shadow-[0_16px_36px_-14px_rgba(23,17,13,0.65)] active:scale-[0.97]"
                style={{ transitionTimingFunction: EASE_APPLE_OUT }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full"
                  style={{ transitionTimingFunction: EASE_APPLE_OUT }}
                />
                <span className="relative">Notify me</span>
              </button>
            </form>
          )}

          <Link
            href="/shop"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-ths-ink underline decoration-ths-ink/30 underline-offset-4 transition-colors hover:text-ths-earth"
          >
            Meanwhile, explore the shop
            <IconArrow
              className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
              style={{ transitionTimingFunction: EASE_APPLE_OUT }}
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
