"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useIsomorphicLayoutEffect } from "@/lib/gsap/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/lib/gsap/useReducedMotion";
import styles from "./PageTransition.module.scss";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const isFirstMount = useRef(true);

  useIsomorphicLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    if (isFirstMount.current) {
      isFirstMount.current = false;
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    if (reducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      el,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        overwrite: true,
      }
    );
  }, [pathname, reducedMotion]);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div key={pathname} className={styles.inner}>
        {children}
      </div>
    </div>
  );
}
