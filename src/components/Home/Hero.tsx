"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useIsomorphicLayoutEffect } from "@/lib/gsap/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/lib/gsap/useReducedMotion";
import styles from "./Home.module.scss";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-line", {
        y: 120,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
      })
        .from(
          ".hero-subtitle",
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          ".hero-scroll",
          {
            opacity: 0,
            duration: 0.6,
          },
          "-=0.3"
        );
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={containerRef} className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          <span className={styles.heroLine}>
            <span className="hero-line">Creative</span>
          </span>
          <span className={styles.heroLine}>
            <span className="hero-line">Director &</span>
          </span>
          <span className={styles.heroLine}>
            <span className="hero-line">Designer</span>
          </span>
        </h1>
        <p className={`${styles.heroSubtitle} hero-subtitle`}>
          Crafting meaningful visual experiences through
          <br />
          brand identity, motion design & digital products
        </p>
      </div>
      <div className={`${styles.heroScroll} hero-scroll`}>
        <span>Scroll to explore</span>
        <div className={styles.heroScrollLine} />
      </div>
    </section>
  );
}
