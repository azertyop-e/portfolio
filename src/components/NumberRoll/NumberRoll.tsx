"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import styles from "./NumberRoll.module.scss";

type NumberRollProps = {
  value: number;
  pad?: number;
  className?: string;
};

export function NumberRoll({ value, pad = 2, className = "" }: NumberRollProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(value);
  const [nextValue, setNextValue] = useState(value);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (value === displayValue) return;

    setNextValue(value);

    const container = containerRef.current;
    if (!container) return;

    const inner = container.querySelector(`.${styles.inner}`) as HTMLElement;
    if (!inner) return;

    // Determine direction based on value change
    const direction = value > displayValue ? -1 : 1;

    gsap.fromTo(
      inner,
      { y: 0 },
      {
        y: `${direction * 100}%`,
        duration: 0.4,
        ease: "power3.inOut",
        onComplete: () => {
          setDisplayValue(value);
          gsap.set(inner, { y: 0 });
        },
      }
    );
  }, [value, displayValue]);

  const formattedDisplay = String(displayValue).padStart(pad, "0");
  const formattedNext = String(nextValue).padStart(pad, "0");
  const direction = nextValue > displayValue ? -1 : 1;

  return (
    <span ref={containerRef} className={`${styles.numberRoll} ${className}`}>
      <span className={styles.inner}>
        <span className={styles.current}>{formattedDisplay}</span>
        <span
          className={styles.next}
          style={{ top: `${-direction * 100}%` }}
        >
          {formattedNext}
        </span>
      </span>
    </span>
  );
}
