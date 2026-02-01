"use client";

import {
  useRef,
  useState,
  useCallback,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import gsap from "gsap";
import { useIsomorphicLayoutEffect } from "@/lib/gsap/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/lib/gsap/useReducedMotion";
import { HUDBackground } from "@/components/HUDBackground/HUDBackground";
import styles from "./PageTransitionOverlay.module.scss";

export interface PageTransitionOverlayHandle {
  start: () => void;
}

interface PageTransitionOverlayProps {
  onRayCenter?: () => void;
  onComplete?: () => void;
}

export const PageTransitionOverlay = forwardRef<
  PageTransitionOverlayHandle,
  PageTransitionOverlayProps
>(function PageTransitionOverlay({ onRayCenter, onComplete }, ref) {
  const reducedMotion = useReducedMotion();
  const overlayRef = useRef<HTMLDivElement>(null);
  const rectangleRef = useRef<HTMLDivElement>(null);
  const rayRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const completedRef = useRef(false);

  const start = useCallback(() => {
    if (isActive || isComplete) return;
    setIsActive(true);
  }, [isActive, isComplete]);

  useImperativeHandle(ref, () => ({ start }), [start]);

  useEffect(() => {
    if (isActive && !isComplete) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isActive, isComplete]);

  useIsomorphicLayoutEffect(() => {
    if (!isActive || !reducedMotion) return;

    const overlay = overlayRef.current;
    const rect = rectangleRef.current;
    if (!overlay || !rect) return;

    gsap.set(overlay, { autoAlpha: 1 });
    gsap.set(rect, { scale: 1 });
    gsap.to(overlay, {
      autoAlpha: 0,
      duration: 0.25,
      ease: "power2.out",
      onComplete: () => {
        window.scrollTo(0, 0);
        onComplete?.();
        setIsActive(false);
        setIsComplete(false);
      },
    });
  }, [isActive, reducedMotion, onComplete]);

  useIsomorphicLayoutEffect(() => {
    if (!isActive || reducedMotion || isComplete) return;

    const overlay = overlayRef.current;
    const rect = rectangleRef.current;
    const ray = rayRef.current;
    if (!overlay || !rect) return;

    completedRef.current = false;

    const ctx = gsap.context(() => {
      gsap.set(overlay, { autoAlpha: 1 });
      gsap.set(rect, {
        width: "100vw",
        height: "100vh",
        left: "50%",
        top: "50%",
        xPercent: -50,
        yPercent: -50,
        scale: 1,
      });
      if (ray) {
        gsap.set(ray, {
          left: "100%",
          width: 8,
          xPercent: -50,
        });
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          completedRef.current = true;
          window.scrollTo(0, 0);
          onComplete?.();
          setIsActive(false);
          setIsComplete(false);
        },
      });

      tl.to(rect, {
        scale: 0.35,
        duration: 2.2,
        ease: "power3.inOut",
      });

      tl.addLabel("rayStart");
      if (ray) {
        tl.to(
          ray,
          {
            keyframes: [
              { left: "50%", width: 120, duration: 1.1, ease: "circ.out" },
              { left: "0%", width: 8, duration: 1.1, ease: "circ.in" },
            ],
          },
          "rayStart"
        );
      }

      tl.call(() => onRayCenter?.(), undefined, "rayStart+=1.1");

      tl.to(rect, {
        scale: 1,
        duration: 1.2,
        ease: "power3.inOut",
      });
      tl.to(
        overlay,
        {
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }, overlayRef);

    return () => {
      if (!completedRef.current) ctx.revert();
    };
  }, [isActive, reducedMotion, isComplete, onRayCenter, onComplete]);

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      aria-hidden="true"
      style={{ visibility: isActive ? "visible" : "hidden" }}
    >
      <div className={styles.hudWrapper}>
        <HUDBackground minimal={false} />
      </div>
      <div ref={rectangleRef} className={styles.rectangle}>
        <div ref={rayRef} className={styles.ray} aria-hidden="true" />
      </div>
    </div>
  );
});
