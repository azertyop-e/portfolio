"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useCursor } from "./CursorContext";
import { useIsomorphicLayoutEffect } from "@/lib/gsap/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/lib/gsap/useReducedMotion";
import styles from "./Cursor.module.scss";

const BOX_SIZE_DEFAULT = 24;
const BOX_SIZE_HOVER = 48;

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef<HTMLSpanElement>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);
  const { variant } = useCursor();
  const reducedMotion = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);
  const [coords, setCoords] = useState({ x: "0.000", y: "0.000" });
  const [currentSize, setCurrentSize] = useState(BOX_SIZE_DEFAULT);

  // Detect touch device
  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  // Initialize GSAP quickTo for smooth cursor movement
  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || isTouch || !cursorRef.current) return;

    xTo.current = gsap.quickTo(cursorRef.current, "left", {
      duration: 0.2,
      ease: "power3.out",
    });
    yTo.current = gsap.quickTo(cursorRef.current, "top", {
      duration: 0.2,
      ease: "power3.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const offset = currentSize / 2;
      xTo.current?.(e.clientX - offset);
      yTo.current?.(e.clientY - offset);
      setCoords({
        x: (e.clientX / window.innerWidth).toFixed(3),
        y: (e.clientY / window.innerHeight).toFixed(3),
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reducedMotion, isTouch, currentSize]);

  // Animate cursor size on hover
  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || isTouch || !cornersRef.current || !coordsRef.current)
      return;

    const isHover = variant === "action";
    const targetSize = isHover ? BOX_SIZE_HOVER : BOX_SIZE_DEFAULT;

    // Animate corners size
    gsap.to(cornersRef.current, {
      width: targetSize,
      height: targetSize,
      duration: 0.3,
      ease: "power3.out",
      onUpdate: () => {
        if (cornersRef.current) {
          const rect = cornersRef.current.getBoundingClientRect();
          setCurrentSize(rect.width);
        }
      },
    });

    // Animate coords position to follow bottom-right corner
    gsap.to(coordsRef.current, {
      top: targetSize + 4,
      left: targetSize - 4,
      duration: 0.3,
      ease: "power3.out",
    });
  }, [variant, reducedMotion, isTouch]);

  // Hide on touch devices or reduced motion
  if (isTouch || reducedMotion) {
    return null;
  }

  return (
    <div ref={cursorRef} className={styles.cursor}>
      <div ref={cornersRef} className={styles.corners}>
        <div className={`${styles.corner} ${styles.cornerTL}`} />
        <div className={`${styles.corner} ${styles.cornerTR}`} />
        <div className={`${styles.corner} ${styles.cornerBL}`} />
        <div className={`${styles.corner} ${styles.cornerBR}`} />
      </div>
      <span ref={coordsRef} className={styles.coords}>
        {coords.x}, {coords.y}
      </span>
    </div>
  );
}
