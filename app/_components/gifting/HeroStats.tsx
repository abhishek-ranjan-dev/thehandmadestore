"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";

const EASE_APPLE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";
const REVEAL_DELAY_MS = 300;

function useCountUp(from: number, to: number, duration: number, start: boolean) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - t0;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [from, to, duration, start]);

  return value;
}

type StatCellProps = {
  label: string;
  delay: number;
  visible: boolean;
  children: ReactNode;
};

function StatCell({ label, delay, visible, children }: StatCellProps) {
  const style: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(14px)",
    transition: `opacity 800ms ${EASE_APPLE_OUT} ${delay}ms, transform 800ms ${EASE_APPLE_OUT} ${delay}ms`,
  };

  return (
    <div style={style}>
      <dt className="text-[10px] uppercase tracking-[0.3em] text-ths-cream/60">
        {label}
      </dt>
      <dd className="mt-2 font-display text-2xl text-ths-clay md:text-3xl">
        {children}
      </dd>
    </div>
  );
}

export function HeroStats() {
  const [started, setStarted] = useState(false);
  const since = useCountUp(2000, 2019, 1600, started);
  const order = useCountUp(0, 25, 1400, started);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), REVEAL_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-ths-cream/25 pt-8">
      <StatCell label="Since" delay={0} visible={started}>
        <span aria-label="2019">{since}</span>
      </StatCell>
      <StatCell label="Handcrafted" delay={140} visible={started}>
        India
      </StatCell>
      <StatCell label="Order" delay={280} visible={started}>
        <span aria-label="25 plus">
          {order}
          <span aria-hidden>+</span>
        </span>
      </StatCell>
    </dl>
  );
}
