"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./HUDBackground.module.scss";

// reduced motion
function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

// Node positions
const nodes = [
  { id: 1, top: "15%", left: "8%" },
  { id: 2, top: "72%", left: "12%" },
  { id: 3, top: "28%", right: "6%" },
  { id: 4, top: "85%", right: "15%" },
  { id: 5, top: "45%", left: "92%" },
];

// Compilation log lines
const compileLines = [
  "$ npm run build",
  "",
  "> portfolio@1.0.0 build",
  "> next build",
  "",
  "   ▲ Next.js 14.x",
  "   - Environments: .env.local",
  "",
  "⠋ Compiling...",
  "✓ Compiled / in 1.2s",
  "✓ Linting and checking validity of types",
  "✓ Collecting page data",
  "  Generating static pages (4/4)",
  "  /",
  "  /hud",
  "  /playground",
  "  /projects/[slug]",
  "✓ Finalizing page optimization",
  "",
  "Route (app)                Size     First Load JS",
  "└ ○ /                       12.4 kB        85 kB",
  "└ ○ /hud                    8.2 kB         82 kB",
  "",
  "○  (Static)  prerendered as static content",
  "",
  "Done in 2.84s",
];

type HUDBackgroundProps = {
  watermark?: string;
  minimal?: boolean;
  className?: string;
  /** ROUTE value in right panel */
  routeLabel?: string;
};

export function HUDBackground({
  watermark = "PORTFOLIO",
  minimal = false,
  className = "",
  routeLabel = "—",
}: HUDBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const [time, setTime] = useState("00:00:00");
  const [date, setDate] = useState("01.01.2025");
  const [compileIndex, setCompileIndex] = useState(0);

  // Sliding window: 5 lines, advance every tick
  const compileLinesDoubled = [...compileLines, ...compileLines];
  const visibleCompileLines = compileLinesDoubled.slice(
    compileIndex,
    compileIndex + 5,
  );

  useEffect(() => {
    if (reducedMotion) return;
    const t = setInterval(() => {
      setCompileIndex((i) => (i + 1) % compileLines.length);
    }, 600);
    return () => clearInterval(t);
  }, [reducedMotion]);

  // Update time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
      setDate(
        now
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, "."),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Canvas noise animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let lastTime = 0;
    const fps = 12;
    const frameInterval = 1000 / fps;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr * 0.25; // Lower resolution for performance
      canvas.height = height * dpr * 0.25;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    const generateNoise = () => {
      const width = canvas.width;
      const height = canvas.height;
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value; // R
        data[i + 1] = value; // G
        data[i + 2] = value; // B
        data[i + 3] = 25; // Alpha (low for subtlety)
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const animate = (currentTime: number) => {
      if (reducedMotion) {
        generateNoise(); // Just one frame
        return;
      }

      animationId = requestAnimationFrame(animate);

      if (currentTime - lastTime < frameInterval) return;
      lastTime = currentTime;

      generateNoise();
    };

    resize();
    window.addEventListener("resize", resize);

    if (reducedMotion) {
      generateNoise();
    } else {
      animationId = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [reducedMotion]);

  return (
    <div
      className={`${styles.hud} ${minimal ? styles.minimal : ""} ${className}`}
      aria-hidden="true"
    >
      <div className={styles.grid} />
      <div className={styles.scanlines} />
      <canvas ref={canvasRef} className={styles.noise} />
      <div className={styles.vignette} />
      <div className={styles.watermark}>{watermark}</div>
      <div className={styles.corners}>
        <div className={`${styles.corner} ${styles.cornerTL}`} />
        <div className={`${styles.corner} ${styles.cornerTR}`} />
        <div className={`${styles.corner} ${styles.cornerBL}`} />
        <div className={`${styles.corner} ${styles.cornerBR}`} />
      </div>
      <div className={styles.ticks}>
        <div className={`${styles.tick} ${styles.tickTop}`} />
        <div className={`${styles.tick} ${styles.tickBottom}`} />
        <div className={`${styles.tick} ${styles.tickLeft}`} />
        <div className={`${styles.tick} ${styles.tickRight}`} />
      </div>

      {!minimal && (
        <>
          <div className={styles.compileBlock}>
            <div className={styles.compileTitle}>BUILD</div>
            <div className={styles.compileLog}>
              {visibleCompileLines.map((line, i) => (
                <div key={compileIndex + i} className={styles.compileLine}>
                  {line}
                </div>
              ))}
            </div>
            <div className={styles.compileCursorLine}>
              <span className={styles.compileCursor} aria-hidden="true" />
            </div>
          </div>

          <aside className={styles.sidebarLeft}>
            <div className={styles.sidebarBlock}>
              <span className={styles.sidebarLabel}>STATUS</span>
              <span className={styles.sidebarValue}>ACTIVE</span>
            </div>
            <div className={styles.sidebarBlock}>
              <span className={styles.sidebarLabel}>LAYER</span>
              <span className={styles.sidebarValue}>BACKGROUND</span>
            </div>
            <div className={styles.sidebarBlock}>
              <span className={styles.sidebarLabel}>OPACITY</span>
              <span className={styles.sidebarValue}>100%</span>
            </div>
          </aside>
          <aside className={styles.sidebarRight}>
            <div className={styles.sidebarBlock}>
              <span className={styles.sidebarLabel}>ROUTE</span>
              <span className={styles.sidebarValue}>{routeLabel}</span>
            </div>
            <div className={styles.sidebarBlock}>
              <span className={styles.sidebarLabel}>VIEW</span>
              <span className={styles.sidebarValue}>PREVIEW</span>
            </div>
            <div className={styles.sidebarBlock}>
              <span className={styles.sidebarLabel}>FRAME</span>
              <span className={styles.sidebarValue}>SITE</span>
            </div>
          </aside>

          <div className={styles.hudTextLeft}>
            <div className={styles.hudLine}>
              <span className={styles.hudLabel}>STATUS</span>
              <span className={styles.hudValue}>PARSING DATA</span>
            </div>
            <div className={styles.hudLine}>
              <span className={styles.hudLabel}>DATE</span>
              <span className={styles.hudValue}>{date}</span>
            </div>
            <div className={styles.hudLine}>
              <span className={styles.hudLabel}>TIME</span>
              <span className={styles.hudValue}>{time}</span>
            </div>
            <div className={styles.hudLine}>
              <span className={styles.hudLabel}>PROJECTS</span>
              <span className={styles.hudValue}>LOADING (04/28)</span>
            </div>
          </div>

          <div className={styles.hudTextRight}>
            <div className={styles.hudLine}>
              <span className={styles.hudLabel}>DISPLAY</span>
              <span className={styles.hudValue}>1440x900 @ 75HZ</span>
            </div>
            <div className={styles.hudLine}>
              <span className={styles.hudLabel}>BROWSER</span>
              <span className={styles.hudValue}>CHROMIUM</span>
            </div>
            <div className={styles.hudLine}>
              <span className={styles.hudLabel}>LANGUAGE</span>
              <span className={styles.hudValue}>EN-US</span>
            </div>
            <div className={styles.hudLine}>
              <span className={styles.hudLabel}>RENDER</span>
              <span className={styles.hudValue}>GPU ACCELERATED</span>
            </div>
          </div>

          <div className={styles.nodes}>
            {nodes.map((node) => (
              <div
                key={node.id}
                className={styles.node}
                style={{
                  top: node.top,
                  left: node.left,
                  right: node.right,
                }}
              >
                <span className={styles.nodeX}>×</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
