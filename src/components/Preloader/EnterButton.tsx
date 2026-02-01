"use client";

import { forwardRef, useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import styles from "./Preloader.module.scss";

interface EnterButtonProps {
  isLoading: boolean;
  isTransitioning: boolean;
  startShrink: boolean;
  loaderRef: React.RefObject<HTMLDivElement | null>;
  counterRef: React.RefObject<HTMLDivElement | null>;
  bottomInfoRef: React.RefObject<HTMLDivElement | null>;
  onComplete?: () => void;
  onDashedCircleShrinkComplete?: () => void;
}

// Tailles en vw
const PROGRESS_CIRCLE_SIZE = "20vw"; // Taille initiale du cercle de chargement
const INNER_CIRCLE_SIZE = "17vw"; // Cercle plein - état normal
const DASHED_CIRCLE_SIZE = "15vw"; // Cercle dash - état normal
const INNER_CIRCLE_HOVER = "15vw"; // Cercle plein - hover
const DASHED_CIRCLE_HOVER = "20vw"; // Cercle dash - hover

export const EnterButton = forwardRef<HTMLDivElement, EnterButtonProps>(
  (
    {
      isLoading,
      isTransitioning,
      startShrink,
      loaderRef,
      counterRef,
      bottomInfoRef,
      onComplete,
      onDashedCircleShrinkComplete,
    },
    ref,
  ) => {
    const innerCircleRef = useRef<HTMLDivElement>(null);
    const dashedCircleRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const circlesWrapperRef = useRef<HTMLDivElement>(null);
    const hasFadedIn = useRef(false);
    const hasShrunkRef = useRef(false);
    const rotationTweenRef = useRef<gsap.core.Tween | null>(null);
    const [hasShrunk, setHasShrunk] = useState(false);

    // Tailles initiales (pendant le chargement, on utilise la taille du progress circle)
    const innerSize =
      isTransitioning && !hasShrunk ? PROGRESS_CIRCLE_SIZE : INNER_CIRCLE_SIZE;
    const dashedSize =
      isTransitioning && !hasShrunk ? PROGRESS_CIRCLE_SIZE : DASHED_CIRCLE_SIZE;

    // Callback mémorisé pour éviter les re-renders
    const handleShrinkComplete = useCallback(() => {
      onDashedCircleShrinkComplete?.();
    }, [onDashedCircleShrinkComplete]);

    // Fade in des cercles quand isTransitioning devient true
    useEffect(() => {
      if (!isTransitioning || hasFadedIn.current) return;
      hasFadedIn.current = true;

      // Faire apparaître les cercles avec un fade in
      gsap.fromTo(
        innerCircleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" },
      );
      gsap.fromTo(
        dashedCircleRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" },
      );

      // Rotation continue du cercle dash
      rotationTweenRef.current = gsap.to(dashedCircleRef.current, {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });

      return () => {
        rotationTweenRef.current?.kill();
      };
    }, [isTransitioning]);

    // Animation de réduction quand startShrink devient true
    useEffect(() => {
      if (!startShrink || hasShrunkRef.current) return;
      hasShrunkRef.current = true;

      // Animation de réduction vers les tailles finales
      gsap.to(innerCircleRef.current, {
        width: INNER_CIRCLE_SIZE,
        height: INNER_CIRCLE_SIZE,
        duration: 0.8,
        delay: 0.12,
        ease: "power2.inOut",
      });
      gsap.to(dashedCircleRef.current, {
        width: DASHED_CIRCLE_SIZE,
        height: DASHED_CIRCLE_SIZE,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          setHasShrunk(true);
          handleShrinkComplete();
          // Afficher le texte après la réduction
          if (textRef.current) {
            gsap.set(textRef.current, { opacity: 0, scale: 0.8 });
            gsap.to(textRef.current, {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
            });
          }
        },
      });
    }, [startShrink, handleShrinkComplete]);

    const handleMouseEnter = () => {
      if (isLoading) return;
      gsap.killTweensOf([dashedCircleRef.current, innerCircleRef.current]);
      gsap.to(dashedCircleRef.current, {
        width: DASHED_CIRCLE_HOVER,
        height: DASHED_CIRCLE_HOVER,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(innerCircleRef.current, {
        width: INNER_CIRCLE_HOVER,
        height: INNER_CIRCLE_HOVER,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      if (isLoading) return;
      gsap.killTweensOf([dashedCircleRef.current, innerCircleRef.current]);
      gsap.to(dashedCircleRef.current, {
        width: DASHED_CIRCLE_SIZE,
        height: DASHED_CIRCLE_SIZE,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(innerCircleRef.current, {
        width: INNER_CIRCLE_SIZE,
        height: INNER_CIRCLE_SIZE,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleClick = () => {
      if (isLoading) return;

      const tl = gsap.timeline({
        onComplete: () => {
          onComplete?.();
        },
      });

      // Fade out tous les éléments ensemble
      tl.to([counterRef.current, bottomInfoRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in",
      })
        .to(
          textRef.current,
          { opacity: 0, duration: 0.3, ease: "power2.in" },
          "-=0.3",
        )
        .to(
          [innerCircleRef.current, dashedCircleRef.current],
          {
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
          },
          "-=0.2",
        )
        .to(
          loaderRef.current,
          { opacity: 0, duration: 0.3, ease: "power2.out" },
          "-=0.1",
        );
    };

    // Handle Enter key
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter" && !isLoading) {
          handleClick();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isLoading]);

    return (
      <div
        ref={ref}
        className={`${styles.enterButton} ${
          isLoading && !isTransitioning ? styles.hidden : ""
        } ${isLoading ? styles.noPointer : ""}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={circlesWrapperRef} className={styles.circlesWrapper}>
          <div
            ref={dashedCircleRef}
            className={styles.dashedCircle}
            style={{
              width: dashedSize,
              height: dashedSize,
            }}
          />
          <div
            ref={innerCircleRef}
            className={styles.innerCircle}
            style={{
              width: innerSize,
              height: innerSize,
            }}
          />
        </div>
        <span ref={textRef} className={styles.enterText}>
          Enter
        </span>
      </div>
    );
  },
);

EnterButton.displayName = "EnterButton";
