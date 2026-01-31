"use client";

import { useState, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { services, type Service } from "@/lib/data/services";
import { useCursor } from "@/components/Cursor/CursorContext";
import { useIsomorphicLayoutEffect } from "@/lib/gsap/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/lib/gsap/useReducedMotion";
import { TextRoll } from "@/components/TextRoll/TextRoll";
import styles from "./Services.module.scss";

export function ServicesList() {
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const previewRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);
  const reducedMotion = useReducedMotion();
  const { setVariant } = useCursor();

  // Initialize GSAP quickTo for preview position
  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || !previewRef.current) return;

    xTo.current = gsap.quickTo(previewRef.current, "x", {
      duration: 0.4,
      ease: "power3.out",
    });
    yTo.current = gsap.quickTo(previewRef.current, "y", {
      duration: 0.4,
      ease: "power3.out",
    });
  }, [reducedMotion]);

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion) return;
    const x = e.clientX - 140;
    const y = e.clientY - 100;
    xTo.current?.(x);
    yTo.current?.(y);
    setMousePos({ x, y });
  };

  // Animate preview visibility
  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || !previewRef.current) return;

    if (activeService) {
      gsap.to(previewRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power3.out",
      });
    } else {
      gsap.to(previewRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
      });
    }
  }, [activeService, reducedMotion]);

  return (
    <div className={styles.services} onMouseMove={handleMouseMove}>
      <h2 className={styles.title}>Key Services</h2>
      <div className={styles.list}>
        {services.map((service) => (
          <div
            key={service.id}
            className={`${styles.item} ${
              activeService?.id === service.id ? styles.active : ""
            }`}
            onMouseEnter={() => {
              setActiveService(service);
              setVariant("action");
            }}
            onMouseLeave={() => {
              setActiveService(null);
              setVariant("default");
            }}
          >
            <span className={styles.label}>
              <TextRoll>{service.label}</TextRoll>
            </span>
            <span className={styles.index}>[{service.index}]</span>
          </div>
        ))}
      </div>

      {/* Preview */}
      {!reducedMotion && (
        <div
          ref={previewRef}
          className={styles.preview}
          style={{
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          }}
        >
          {activeService && (
            <Image
              src={activeService.preview}
              alt={activeService.label}
              width={280}
              height={280}
              quality={100}
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
      )}
    </div>
  );
}
