"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/lib/gsap/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/lib/gsap/useReducedMotion";
import styles from "./HorizontalRail.module.scss";

gsap.registerPlugin(ScrollTrigger);

type HorizontalRailProps = {
  children: React.ReactNode;
};

export function HorizontalRail({ children }: HorizontalRailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion) return;

    const container = containerRef.current;
    const track = trackRef.current;

    if (!container || !track) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () =>
        -(track.scrollWidth - container.clientWidth);

      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Fallback for reduced motion - horizontal scroll
  if (reducedMotion) {
    return (
      <div className={styles.containerFallback}>
        <div className={styles.trackFallback}>{children}</div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={styles.container}>
      <div ref={trackRef} className={styles.track}>
        {children}
      </div>
    </div>
  );
}
