"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { gsap } from "gsap";
import { useIsomorphicLayoutEffect } from "@/lib/gsap/useIsomorphicLayoutEffect";
import styles from "./PageTransition.module.scss";

type TransitionPhase = "entry" | "flash" | "auth" | "logo" | "content" | "complete";

type PageTransitionProps = {
  onComplete?: () => void;
  children: React.ReactNode;
};

export function PageTransition({ onComplete, children }: PageTransitionProps) {
  const [phase, setPhase] = useState<TransitionPhase>("entry");
  const [isTransitionComplete, setIsTransitionComplete] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const authTextRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cornerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const enterBtnRef = useRef<HTMLButtonElement>(null);

  const startTransition = useCallback(() => {
    if (phase !== "entry") return;

    const tl = gsap.timeline({
      onComplete: () => {
        setPhase("complete");
        setIsTransitionComplete(true);
        onComplete?.();
      },
    });

    // Phase 1: Flash
    tl.to(flashRef.current, {
      opacity: 1,
      duration: 0.1,
      ease: "power2.in",
    })
      .to(flashRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      })
      .to(
        enterBtnRef.current,
        {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power3.in",
        },
        "<"
      )
      .add(() => setPhase("auth"));

    // Phase 2: Authorization
    tl.to(authTextRef.current, {
      opacity: 1,
      duration: 0.1,
    })
      .to(authTextRef.current, {
        opacity: 1,
        duration: 0.5,
      })
      .to(
        frameRef.current,
        {
          opacity: 1,
          duration: 0.3,
        },
        "<"
      )
      .to(
        `.${styles.frameLine}`,
        {
          scaleX: 1,
          scaleY: 1,
          duration: 0.6,
          ease: "expo.inOut",
          stagger: 0.05,
        },
        "<"
      )
      .to(
        cornerRefs.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
          stagger: 0.08,
        },
        "-=0.3"
      )
      .to(authTextRef.current, {
        opacity: 0,
        duration: 0.2,
      })
      .add(() => setPhase("logo"));

    // Phase 3: Logo Reveal
    tl.to(logoRef.current, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 0.8,
      ease: "expo.inOut",
    })
      .to(
        bioRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .add(() => setPhase("content"));

    // Phase 4: Content Grid
    tl.to(`.${styles.gridCard}`, {
      autoAlpha: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.1,
    })
      .to(
        `.${styles.cardHeader}`,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
          stagger: 0.08,
        },
        "-=0.8"
      )
      .to(
        `.${styles.cardImage}`,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.1,
        },
        "-=0.6"
      );

    // Final: Hide overlay
    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      },
      "+=0.3"
    );
  }, [phase, onComplete]);

  // Skip transition if already complete (e.g., on navigation back)
  useIsomorphicLayoutEffect(() => {
    // Check sessionStorage to skip transition on return visits
    if (typeof window !== "undefined") {
      const hasVisited = sessionStorage.getItem("fui-transition-complete");
      if (hasVisited) {
        setIsTransitionComplete(true);
        setPhase("complete");
      }
    }
  }, []);

  // Store completion state
  useIsomorphicLayoutEffect(() => {
    if (isTransitionComplete && typeof window !== "undefined") {
      sessionStorage.setItem("fui-transition-complete", "true");
    }
  }, [isTransitionComplete]);

  // Handle Enter key to start transition
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && phase === "entry") {
        startTransition();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, startTransition]);

  if (isTransitionComplete) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Main content (hidden during transition) */}
      <div style={{ visibility: phase === "complete" ? "visible" : "hidden" }}>
        {children}
      </div>

      {/* Transition Overlay */}
      <div ref={containerRef} className={styles.transitionOverlay}>
        {/* Scanlines */}
        <div className={styles.scanlines} />

        {/* White Flash */}
        <div ref={flashRef} className={styles.flash} />

        {/* Entry Button */}
        <button
          ref={enterBtnRef}
          className={styles.enterButton}
          onClick={startTransition}
          style={{ opacity: phase === "entry" ? 1 : 0 }}
        >
          <span className={styles.enterCircleOuter} />
          <span className={styles.enterCircleInner} />
          <span className={styles.enterText}>ENTER</span>
        </button>

        {/* Authorization Text */}
        <div ref={authTextRef} className={styles.authText}>
          AUTHORIZED ACCESS
        </div>

        {/* Frame Lines */}
        <div ref={frameRef} className={styles.frame}>
          <div className={`${styles.frameLine} ${styles.frameTop}`} />
          <div className={`${styles.frameLine} ${styles.frameRight}`} />
          <div className={`${styles.frameLine} ${styles.frameBottom}`} />
          <div className={`${styles.frameLine} ${styles.frameLeft}`} />
        </div>

        {/* Corner Data */}
        <div className={styles.cornerData}>
          {/* Top Left */}
          <div
            ref={(el) => { cornerRefs.current[0] = el; }}
            className={`${styles.corner} ${styles.cornerTL}`}
          >
            <span className={styles.cornerLabel}>READY</span>
            <span className={styles.cornerValue}>SADE 01 2024</span>
          </div>

          {/* Top Center */}
          <div
            ref={(el) => { cornerRefs.current[1] = el; }}
            className={`${styles.corner} ${styles.cornerTC}`}
          >
            <span className={styles.cornerValue}>
              PARIS GMT +1 / 48.8566° N, 2.3522° E
            </span>
          </div>

          {/* Top Right */}
          <div
            ref={(el) => { cornerRefs.current[2] = el; }}
            className={`${styles.corner} ${styles.cornerTR}`}
          >
            <span className={styles.cornerLabel}>MACINTOSH</span>
            <span className={styles.cornerValue}>VERSION 10.4.1</span>
          </div>

          {/* Bottom Left */}
          <div
            ref={(el) => { cornerRefs.current[3] = el; }}
            className={`${styles.corner} ${styles.cornerBL}`}
          >
            <span className={styles.cornerValue}>BOOT COMPLETE</span>
          </div>

          {/* Bottom Center */}
          <div
            ref={(el) => { cornerRefs.current[4] = el; }}
            className={`${styles.corner} ${styles.cornerBC}`}
          >
            <span className={styles.cornerValue}>EXECUTE PROGRAM</span>
          </div>

          {/* Bottom Right */}
          <div
            ref={(el) => { cornerRefs.current[5] = el; }}
            className={`${styles.corner} ${styles.cornerBR}`}
          >
            <span className={styles.cornerValue}>EXIT LOADER</span>
          </div>
        </div>

        {/* Logo Section */}
        <div className={styles.logoSection}>
          <div ref={logoRef} className={styles.logo}>
            EM<span className={styles.logoAccent}>25</span>
          </div>
          <div ref={bioRef} className={styles.bio}>
            <p className={styles.bioTitle}>ELIOTT MULLER</p>
            <p className={styles.bioText}>
              IS A CREATIVE DEVELOPER & DESIGNER
              <br />
              FOCUSED ON BRAND IDENTITY, MOTION
              <br />
              DESIGN & DIGITAL EXPERIENCES.
            </p>
          </div>
        </div>

        {/* Project Grid Preview */}
        <div ref={gridRef} className={styles.grid}>
          {[
            { num: "001", title: "TECHUNTER" },
            { num: "002", title: "NIKE ACG" },
            { num: "003", title: "BLACK CROWS" },
            { num: "004", title: "OAKLEY" },
          ].map((project, i) => (
            <div key={i} className={styles.gridCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardNum}>{project.num}</span>
                <span className={styles.cardTitle}>{project.title}</span>
              </div>
              <div className={styles.cardImage}>
                <div className={styles.cardImagePlaceholder} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
