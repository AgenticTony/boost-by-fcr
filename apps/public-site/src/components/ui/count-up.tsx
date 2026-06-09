import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue } from "framer-motion";

type Props = {
  /** Number to count up to */
  target: number;
  /** Animation duration in seconds (default 2) */
  duration?: number;
  /** Optional suffix like "+" or "%" */
  suffix?: string;
  /** Additional className */
  className?: string;
};

/** Formats number with Swedish locale (space as thousands separator) */
function formatSwedish(n: number): string {
  return n.toLocaleString("sv-SE");
}

/**
 * CountUp — animates a number from 0 to `target` when scrolled into view.
 * Uses Framer Motion for smooth animation with reduced-motion support.
 */
export function CountUp({ target, duration = 2, suffix, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState(formatSwedish(0));

  useEffect(() => {
    // Subscribe to motion value changes to update the displayed string
    const unsubscribe = motionVal.on("change", (v: number) => {
      setDisplay(formatSwedish(Math.round(v)));
    });

    return unsubscribe;
  }, [motionVal]);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(motionVal, target, {
      duration,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [isInView, target, duration, motionVal]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
