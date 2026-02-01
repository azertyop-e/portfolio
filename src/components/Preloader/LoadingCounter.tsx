"use client";

import { forwardRef } from "react";
import styles from "./Preloader.module.scss";

interface LoadingCounterProps {
  progress: number;
  showReady: boolean;
}

export const LoadingCounter = forwardRef<HTMLDivElement, LoadingCounterProps>(
  ({ progress, showReady }, ref) => {
    return (
      <div ref={ref} className={styles.counter}>
        <span className={styles.counterText}>
          {showReady ? "READY" : Math.round(progress)}
        </span>
      </div>
    );
  },
);

LoadingCounter.displayName = "LoadingCounter";
