"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: number;
  /** Set to false for years and other numbers that should not count up. */
  animate?: boolean;
  /** Animation length in ms. */
  duration?: number;
  locale?: string;
  className?: string;
}

/**
 * A number that counts up once when it scrolls into view.
 * The server renders the final value, so it is correct without JavaScript and for search engines.
 * Respects prefers-reduced-motion: the number simply appears.
 */
export function CountUp({ value, animate = true, duration = 1400, locale, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node || !animate || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen when the page loads: leave the final value alone instead of flashing to zero.
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    setDisplay(0);
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(value * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [animate, duration, value]);

  const format = (n: number) => (animate ? n.toLocaleString(locale) : String(n));

  return (
    <span className={className}>
      {/* Screen readers get the final value once, not every intermediate frame. */}
      <span className="sr-only">{format(value)}</span>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {format(display)}
      </span>
    </span>
  );
}
