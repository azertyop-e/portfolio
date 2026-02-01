"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { useIsomorphicLayoutEffect } from "@/lib/gsap/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/lib/gsap/useReducedMotion";
import styles from "./IntroSequence.module.scss";

interface IntroSequenceProps {
  children: React.ReactNode;
  onComplete?: () => void;
}

export function IntroSequence({ children, onComplete }: IntroSequenceProps) {
  const reducedMotion = useReducedMotion();

  // Refs for DOM elements
  const overlayRef = useRef<HTMLDivElement>(null);
  const siteContentRef = useRef<HTMLDivElement>(null);
  const bootScreenRef = useRef<HTMLDivElement>(null);
  const enterButtonRef = useRef<HTMLButtonElement>(null);
  const uiShellRef = useRef<HTMLDivElement>(null);
  const stageWrapRef = useRef<HTMLDivElement>(null);
  const stageARef = useRef<HTMLDivElement>(null);
  const stageBRef = useRef<HTMLDivElement>(null);
  const stageCenterTextRef = useRef<HTMLDivElement>(null);
  const splitLineRef = useRef<HTMLDivElement>(null);
  const uiHeaderRef = useRef<HTMLElement>(null);
  const uiFooterRef = useRef<HTMLElement>(null);
  const typographyRevealRef = useRef<HTMLDivElement>(null);
  const bigTypoRef = useRef<HTMLDivElement>(null);
  const homeRevealRef = useRef<HTMLDivElement>(null);

  // State
  const [isComplete, setIsComplete] = useState(false);
  const [showUiShell, setShowUiShell] = useState(false);
  const [showTypography, setShowTypography] = useState(false);
  const [showHomeReveal, setShowHomeReveal] = useState(false);
  const [typoText, setTypoText] = useState("AAA2_");

  // Timeline ref
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Handle reduced motion - skip intro entirely
  useEffect(() => {
    if (reducedMotion) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [reducedMotion, onComplete]);

  // Idle animation for enter button
  useIsomorphicLayoutEffect(() => {
    if (isComplete || reducedMotion) return;

    const button = enterButtonRef.current;
    if (!button) return;

    const ctx = gsap.context(() => {
      // Subtle pulse animation on the enter button
      gsap.to(button, {
        scale: 1.02,
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, [isComplete, reducedMotion]);

  // Main animation sequence
  const runIntroSequence = useCallback(() => {
    if (!overlayRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          setIsComplete(true);
          onComplete?.();
        },
      });

      tlRef.current = tl;

      // ========================================
      // A) BOOT OUT (0.5s)
      // Fade out boot screen elements
      // ========================================
      tl.addLabel("boot_out")
        .to(
          enterButtonRef.current,
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
          },
          "boot_out",
        )
        .to(
          bootScreenRef.current?.querySelectorAll(
            "[class*='bootHud'], [class*='bootVersion']",
          ) || [],
          {
            opacity: 0,
            y: -10,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.in",
          },
          "boot_out",
        )
        .to(
          bootScreenRef.current,
          {
            opacity: 0,
            duration: 0.3,
          },
          "boot_out+=0.3",
        );

      // ========================================
      // B) UI IN (0.8s)
      // Show white HUD interface with black stage
      // ========================================
      tl.addLabel("ui_in", "boot_out+=0.5")
        .call(() => setShowUiShell(true), [], "ui_in")
        .fromTo(
          uiShellRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "ui_in",
        )
        .fromTo(
          stageARef.current,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" },
          "ui_in+=0.2",
        )
        .fromTo(
          uiHeaderRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.4 },
          "ui_in+=0.3",
        )
        .fromTo(
          uiFooterRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4 },
          "ui_in+=0.3",
        )
        // "AUTHORIZED ACCESS" text appears
        .to(
          stageCenterTextRef.current,
          { opacity: 1, duration: 0.4 },
          "ui_in+=0.5",
        );

      // ========================================
      // C) SPLIT HINT (0.4s)
      // White line appears on right edge of stage
      // ========================================
      tl.addLabel("split_hint", "ui_in+=0.9")
        .to(
          splitLineRef.current,
          {
            scaleY: 1,
            duration: 0.3,
            ease: "power2.out",
          },
          "split_hint",
        )
        // Micro "tick" effect
        .to(
          stageARef.current,
          {
            x: -3,
            duration: 0.1,
            ease: "power4.out",
          },
          "split_hint+=0.2",
        )
        .to(
          stageARef.current,
          {
            x: 0,
            duration: 0.1,
            ease: "power2.out",
          },
          "split_hint+=0.3",
        );

      // ========================================
      // D) LAYOUT SPLIT (0.9s)
      // Stage becomes 2 panels
      // ========================================
      tl.addLabel("layout_split", "split_hint+=0.4")
        // Hide split line and center text
        .to(splitLineRef.current, { opacity: 0, duration: 0.2 }, "layout_split")
        .to(
          stageCenterTextRef.current,
          { opacity: 0, duration: 0.2 },
          "layout_split",
        )
        // Animate stage A to shrink and move left
        .to(
          stageARef.current,
          {
            width: "48%",
            duration: 0.9,
            ease: "power3.inOut",
          },
          "layout_split+=0.1",
        )
        // Show and animate stage B
        .to(
          stageBRef.current,
          {
            width: "48%",
            opacity: 1,
            duration: 0.9,
            ease: "power3.inOut",
          },
          "layout_split+=0.1",
        )
        // Add gap between stages
        .to(
          stageWrapRef.current,
          {
            gap: "24px",
            duration: 0.9,
            ease: "power3.inOut",
          },
          "layout_split+=0.1",
        );

      // ========================================
      // E) LAYOUT REBALANCE (0.9s)
      // Left panel becomes narrow sidebar
      // ========================================
      tl.addLabel("layout_rebalance", "layout_split+=1")
        // Stage A becomes narrow sidebar
        .to(
          stageARef.current,
          {
            width: "80px",
            flexShrink: 0,
            duration: 0.9,
            ease: "power3.inOut",
          },
          "layout_rebalance",
        )
        // Stage B expands to fill remaining space
        .to(
          stageBRef.current,
          {
            flex: 1,
            width: "auto",
            duration: 0.9,
            ease: "power3.inOut",
          },
          "layout_rebalance",
        );

      // ========================================
      // F) ZOOM REVEAL (0.9s)
      // Main panel zooms to fill screen
      // ========================================
      tl.addLabel("zoom_reveal", "layout_rebalance+=1")
        // Fade out UI header/footer
        .to(
          [uiHeaderRef.current, uiFooterRef.current],
          { opacity: 0, duration: 0.4 },
          "zoom_reveal",
        )
        // Fade out sidebar
        .to(
          stageARef.current,
          { opacity: 0, width: 0, duration: 0.4 },
          "zoom_reveal",
        )
        // Remove gap
        .to(stageWrapRef.current, { gap: 0, duration: 0.4 }, "zoom_reveal")
        // Expand wrapper to full size
        .to(
          stageWrapRef.current,
          {
            width: "100%",
            height: "100%",
            duration: 0.6,
            ease: "power3.inOut",
          },
          "zoom_reveal+=0.2",
        )
        // Expand stage B to full
        .to(
          stageBRef.current,
          {
            width: "100%",
            height: "100%",
            duration: 0.6,
            ease: "power3.inOut",
          },
          "zoom_reveal+=0.2",
        )
        // Fade out UI shell background
        .to(
          uiShellRef.current,
          { backgroundColor: "#0a0a0a", padding: 0, duration: 0.5 },
          "zoom_reveal+=0.3",
        );

      // ========================================
      // G) TYPOGRAPHY IN (0.7s)
      // Big AAA2_ then AAA26 appears
      // ========================================
      tl.addLabel("typography_in", "zoom_reveal+=0.7")
        .call(() => setShowTypography(true), [], "typography_in")
        .to(
          typographyRevealRef.current,
          { opacity: 1, duration: 0.1 },
          "typography_in",
        )
        .fromTo(
          bigTypoRef.current,
          { opacity: 0, x: -80, scale: 0.95 },
          { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: "expo.out" },
          "typography_in+=0.1",
        )
        // Morph text from AAA2_ to AAA26
        .call(
          () => {
            setTypoText("AAA26");
          },
          [],
          "typography_in+=0.9",
        )
        .to(
          bigTypoRef.current,
          {
            scale: 1.03,
            duration: 0.12,
            ease: "power2.out",
          },
          "typography_in+=0.9",
        )
        .to(
          bigTypoRef.current,
          {
            scale: 1,
            duration: 0.15,
            ease: "power2.inOut",
          },
          "typography_in+=1.02",
        );

      // ========================================
      // H) HOME IN (0.8s)
      // Transition to final homepage state
      // ========================================
      tl.addLabel("home_in", "typography_in+=1.4")
        .call(() => setShowHomeReveal(true), [], "home_in")
        // Fade out typography
        .to(
          typographyRevealRef.current,
          { opacity: 0, duration: 0.4 },
          "home_in",
        )
        // Reveal home
        .to(
          homeRevealRef.current,
          { opacity: 1, duration: 0.5 },
          "home_in+=0.2",
        )
        // Animate project thumbs
        .fromTo(
          homeRevealRef.current?.querySelectorAll(`.${styles.projectThumb}`) ||
            [],
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
          },
          "home_in+=0.4",
        )
        // Fade out HUD frames
        .to(
          homeRevealRef.current?.querySelectorAll(`.${styles.hudFrame}`) || [],
          { opacity: 0, duration: 0.5 },
          "home_in+=0.7",
        )
        // Final reveal: fade out overlay, show real site
        .call(
          () => {
            if (siteContentRef.current) {
              siteContentRef.current.setAttribute("data-visible", "true");
            }
          },
          [],
          "home_in+=0.9",
        )
        .to(
          siteContentRef.current,
          { opacity: 1, duration: 0.5 },
          "home_in+=0.9",
        )
        .to(overlayRef.current, { opacity: 0, duration: 0.5 }, "home_in+=1.1")
        .call(
          () => {
            if (overlayRef.current) {
              overlayRef.current.setAttribute("data-complete", "true");
            }
          },
          [],
          "home_in+=1.6",
        );
    }, overlayRef);

    return () => ctx.revert();
  }, [onComplete]);

  // Handle enter button click
  const handleEnterClick = useCallback(() => {
    runIntroSequence();
  }, [runIntroSequence]);

  // Skip intro if reduced motion
  if (isComplete) {
    return <>{children}</>;
  }

  return (
    <>
      {/* OVERLAY - Fixed on top */}
      <div ref={overlayRef} className={styles.overlay} aria-hidden={isComplete}>
        {/* ================================ */}
        {/* BOOT SCREEN (State 1 - Black) */}
        {/* ================================ */}
        <div ref={bootScreenRef} className={styles.bootScreen}>
          {/* Top HUD */}
          <div className={styles.bootHudTop}>READY</div>

          {/* Bottom Left - Name */}
          <div className={styles.bootHudBottomLeft}>
            <div className={styles.bootName}>AMINE ZEGMOU</div>
            <div className={styles.bootSub}>PORTFOLIO</div>
          </div>

          {/* Bottom Mid - Overview */}
          <div className={styles.bootHudBottomMid}>
            <div className={styles.bootLabel}>OVERVIEW:</div>
            <div className={styles.bootValue}>08 PROJECTS</div>
          </div>

          {/* Bottom Right - Version */}
          <div className={styles.bootVersion}>
            <div className={styles.versionIndicators}>
              <div className={`${styles.indicator} ${styles.active}`} />
              <div className={styles.indicator} />
              <div className={styles.indicator} />
            </div>
            <div className={styles.versionText}>V-002</div>
          </div>

          {/* ENTER Button */}
          <button
            ref={enterButtonRef}
            className={styles.enterButton}
            onClick={handleEnterClick}
            aria-label="Enter site"
          >
            <div className={styles.enterCircleOuter} />
            <div className={styles.enterCircleInner} />
            <span className={styles.enterText}>ENTER</span>
          </button>
        </div>

        {/* ================================ */}
        {/* UI SHELL (State 2+ - White HUD) */}
        {/* ================================ */}
        <div
          ref={uiShellRef}
          className={styles.uiShell}
          data-active={showUiShell}
        >
          {/* Header */}
          <header ref={uiHeaderRef} className={styles.uiHeader}>
            <div className={styles.uiHeaderLeft}>
              <div className={styles.uiHeaderItem}>
                <span className={styles.uiHeaderLabel}>LOC:</span>
                <span className={styles.uiHeaderValue}>PARIS</span>
              </div>
              <div className={styles.uiHeaderItem}>
                <span className={styles.uiHeaderLabel}>GMT:</span>
                <span className={styles.uiHeaderValue}>+1</span>
              </div>
              <div className={styles.uiHeaderItem}>
                <span className={styles.uiHeaderLabel}>LAT:</span>
                <span className={styles.uiHeaderValue}>48.8566</span>
              </div>
              <div className={styles.uiHeaderItem}>
                <span className={styles.uiHeaderLabel}>LNG:</span>
                <span className={styles.uiHeaderValue}>2.3522</span>
              </div>
            </div>
            <div className={styles.uiHeaderRight}>
              <div className={styles.uiHeaderItem}>
                <span className={styles.uiHeaderLabel}>DEVICE:</span>
                <span className={styles.uiHeaderValue}>DESKTOP</span>
              </div>
              <div className={styles.uiHeaderItem}>
                <span className={styles.uiHeaderLabel}>STATUS:</span>
                <span className={styles.uiHeaderValue}>ONLINE</span>
              </div>
            </div>
          </header>

          {/* Body with Stages */}
          <div className={styles.uiBody}>
            {/* Decorative HUD dots */}
            <div className={`${styles.hudDots} ${styles.topLeft}`}>
              <div className={styles.hudDot} />
              <div className={styles.hudDot} />
              <div className={styles.hudDot} />
            </div>
            <div className={`${styles.hudDots} ${styles.topRight}`}>
              <div className={styles.hudDot} />
              <div className={styles.hudDot} />
              <div className={styles.hudDot} />
            </div>
            <div className={`${styles.hudDots} ${styles.bottomLeft}`}>
              <div className={styles.hudDot} />
              <div className={styles.hudDot} />
              <div className={styles.hudDot} />
            </div>
            <div className={`${styles.hudDots} ${styles.bottomRight}`}>
              <div className={styles.hudDot} />
              <div className={styles.hudDot} />
              <div className={styles.hudDot} />
            </div>

            {/* Stage Wrapper */}
            <div ref={stageWrapRef} className={styles.stageWrap}>
              {/* Stage A (main stage, becomes sidebar) */}
              <div
                ref={stageARef}
                className={`${styles.stage} ${styles.stageA}`}
              >
                <div className={styles.stageHudReady}>READY</div>
                <div
                  ref={stageCenterTextRef}
                  className={styles.stageCenterText}
                >
                  AUTHORIZED ACCESS
                </div>
                {/* Split line indicator */}
                <div ref={splitLineRef} className={styles.splitLine} />
              </div>

              {/* Stage B (appears on split, becomes main) */}
              <div
                ref={stageBRef}
                className={`${styles.stage} ${styles.stageB}`}
              >
                <div className={styles.stageHudReady}>SYSTEM</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer ref={uiFooterRef} className={styles.uiFooter}>
            <div className={styles.uiFooterLeft}>
              <div className={styles.uiFooterItem}>IIIINTERFACE</div>
              <div className={styles.uiFooterItem}>60.0-250.0 HZ</div>
            </div>
            <div className={styles.uiFooterRight}>
              <div className={styles.uiFooterItem}>BOOT COMPLETE</div>
              <div className={styles.uiFooterItem}>EXIT LOADER</div>
            </div>
          </footer>
        </div>

        {/* ================================ */}
        {/* TYPOGRAPHY REVEAL (AAA26) */}
        {/* ================================ */}
        <div
          ref={typographyRevealRef}
          className={styles.typographyReveal}
          data-active={showTypography}
        >
          <div ref={bigTypoRef} className={styles.bigTypo}>
            {typoText === "AAA2_" ? (
              <>
                AAA2<span className={styles.underscore}>_</span>
              </>
            ) : (
              typoText
            )}
          </div>
        </div>

        {/* ================================ */}
        {/* HOME REVEAL (Final state) */}
        {/* ================================ */}
        <div
          ref={homeRevealRef}
          className={styles.homeReveal}
          data-active={showHomeReveal}
        >
          {/* HUD Frame elements */}
          <div className={`${styles.hudFrame} ${styles.hudFrameTop}`} />
          <div className={`${styles.hudFrame} ${styles.hudFrameBottom}`} />
          <div className={`${styles.hudFrame} ${styles.hudFrameLeft}`} />
          <div className={`${styles.hudFrame} ${styles.hudFrameRight}`} />

          {/* Hero */}
          <div className={styles.homeHero}>
            <div className={styles.homeTitle}>AAA26</div>
          </div>

          {/* Projects Preview Grid */}
          <div className={styles.homeProjects}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={styles.projectThumb}>
                {/* Placeholder - real thumbnails would come from data */}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SITE CONTENT - Behind overlay */}
      <div
        ref={siteContentRef}
        className={styles.siteContent}
        data-visible={isComplete}
      >
        {children}
      </div>
    </>
  );
}
