"use client";

import { forwardRef } from "react";
import styles from "./Preloader.module.scss";

interface ProgressCircleProps {
  progress: number;
  strokeWidth?: number;
}

// Utilise la même taille que le cercle initial (35vw)
const CIRCLE_SIZE_VW = 20;

export const ProgressCircle = forwardRef<HTMLDivElement, ProgressCircleProps>(
  ({ progress, strokeWidth = 2 }, ref) => {
    // On calcule en fonction d'une taille de référence (350px pour 35vw sur écran 1000px)
    // Le SVG utilisera viewBox pour être responsive
    const viewBoxSize = 350;
    const radius = (viewBoxSize - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progressOffset = circumference - (progress / 100) * circumference;

    return (
      <div ref={ref} className={styles.progressCircle}>
        <svg
          width={`${CIRCLE_SIZE_VW}vw`}
          height={`${CIRCLE_SIZE_VW}vw`}
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          className={styles.progressSvg}
        >
          {/* Cercle de fond */}
          <circle
            cx={viewBoxSize / 2}
            cy={viewBoxSize / 2}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
          />
          {/* Cercle de progression */}
          <circle
            cx={viewBoxSize / 2}
            cy={viewBoxSize / 2}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            style={{ transition: "stroke-dashoffset 75ms ease-out" }}
          />
        </svg>
      </div>
    );
  },
);

ProgressCircle.displayName = "ProgressCircle";
