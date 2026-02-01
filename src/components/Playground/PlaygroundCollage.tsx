"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { collageItems } from "@/lib/data/playground";
import { useReducedMotion } from "@/lib/gsap/useReducedMotion";
import styles from "./Playground.module.scss";

export function PlaygroundCollage() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Create quickSetters for performance
    const setters = itemRefs.current.map((el) =>
      el
        ? {
            x: gsap.quickSetter(el, "x", "px"),
            y: gsap.quickSetter(el, "y", "px"),
          }
        : null,
    );

    const handleMouseMove = (e: MouseEvent) => {
      const dx = (e.clientX - centerX) / centerX;
      const dy = (e.clientY - centerY) / centerY;

      collageItems.forEach((item, i) => {
        if (setters[i]) {
          const translateX = dx * item.depth * 80;
          const translateY = dy * item.depth * 80;
          setters[i]!.x(translateX);
          setters[i]!.y(translateY);
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reducedMotion]);

  return (
    <div className={styles.collage}>
      {collageItems.map((item, i) => (
        <div
          key={item.id}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          className={styles.item}
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            width: item.w,
            height: item.h,
            transform: item.rotate ? `rotate(${item.rotate}deg)` : undefined,
          }}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="300px"
            quality={100}
            style={{ objectFit: "cover" }}
          />
        </div>
      ))}
    </div>
  );
}
