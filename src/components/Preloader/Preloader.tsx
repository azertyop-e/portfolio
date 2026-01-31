"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { LoadingCounter } from "./LoadingCounter";
import { ProgressCircle } from "./ProgressCircle";
import { EnterButton } from "./EnterButton";
import { BottomInfo } from "./BottomInfo";
import styles from "./Preloader.module.scss";

interface PreloaderProps {
  onComplete?: () => void;
  children: React.ReactNode;
}

export function Preloader({ onComplete, children }: PreloaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const bottomInfoRef = useRef<HTMLDivElement>(null);
  const progressWrapperRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showEnterButton, setShowEnterButton] = useState(false);
  const [startShrink, setStartShrink] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showReady, setShowReady] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [hideProgressCircle, setHideProgressCircle] = useState(false);

  const strokeWidth = 2;


  // Animation du compteur de 0 à 100
  useEffect(() => {
    if (isComplete) return;

    const counter = { value: 0 };

    // Animation d'entrée des éléments
    gsap.fromTo(
      counterRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );

    gsap.fromTo(
      bottomInfoRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 }
    );

    gsap.to(counter, {
      value: 100,
      duration: 3.5,
      ease: "power1.inOut",
      onUpdate: () => setProgress(counter.value),
      onComplete: () => {
        setShowReady(true);
        setIsTransitioning(true);
        setShowEnterButton(true);
        
        // Fade out du cercle de chargement
        gsap.to(progressWrapperRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => {
            setHideProgressCircle(true);
            // Déclencher le fade in des cercles du bouton, puis la réduction
            setStartShrink(true);
          },
        });
      },
    });
  }, [isComplete]);

  const runProgressCircleShrink = useCallback(() => {
    setIsLoading(false);
    setIsTransitioning(false);
  }, []);

  const handleComplete = useCallback(() => {
    setIsComplete(true);
    onComplete?.();
  }, [onComplete]);

  if (isComplete) {
    return <>{children}</>;
  }

  return (
    <>
      <div style={{ visibility: "hidden" }}>{children}</div>
      <div ref={loaderRef} className={styles.preloader}>
        {/* Compteur en haut à gauche */}
        <LoadingCounter
          ref={counterRef}
          progress={progress}
          showReady={showReady}
        />

        {/* Cercle de progression au centre */}
        {isLoading && !hideProgressCircle && (
          <div ref={progressWrapperRef} className={styles.progressWrapper}>
            <ProgressCircle
              progress={progress}
              strokeWidth={strokeWidth}
            />
          </div>
        )}

        {/* Container pour le cercle Enter - apparaît quand showEnterButton est true et reste visible */}
        <div
          ref={containerRef}
          className={`${styles.enterWrapper} ${
            !showEnterButton ? styles.hidden : ""
          } ${isLoading ? styles.noPointer : ""}`}
        >
          <EnterButton
            ref={containerRef}
            isLoading={isLoading}
            isTransitioning={isTransitioning}
            startShrink={startShrink}
            loaderRef={loaderRef}
            counterRef={counterRef}
            bottomInfoRef={bottomInfoRef}
            onComplete={handleComplete}
            onDashedCircleShrinkComplete={runProgressCircleShrink}
          />
        </div>

        {/* Informations en bas */}
        <BottomInfo ref={bottomInfoRef} />
      </div>
    </>
  );
}
