"use client";

import Link from "next/link";
import { useCursor } from "@/components/Cursor/CursorContext";
import { PlaygroundCollage } from "@/components/Playground/PlaygroundCollage";
import { TextRoll } from "@/components/TextRoll/TextRoll";
import styles from "./Home.module.scss";

export function PlaygroundSection() {
  const { setVariant } = useCursor();

  const handleMouseEnter = () => setVariant("action");
  const handleMouseLeave = () => setVariant("default");

  return (
    <section className={styles.playground}>
      <div className={styles.playgroundHeader}>
        <h2 className={styles.playgroundTitle}>Playground</h2>
        <p className={styles.playgroundText}>
          A curated archive of tests, motion studies, and project components
        </p>
        <p className={styles.playgroundNote}>
          Experiments in typography, motion, and visual exploration
        </p>
        <Link
          href="/playground"
          className={styles.playgroundLink}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <TextRoll>Explore All</TextRoll>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className={styles.playgroundCollage}>
        <PlaygroundCollage />
      </div>
    </section>
  );
}
