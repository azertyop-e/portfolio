"use client";

import { forwardRef } from "react";
import styles from "./Preloader.module.scss";

export const BottomInfo = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} className={styles.bottomInfo}>
      {/* Nom */}
      <div className={styles.nameSection}>
        <span className={styles.namePrimary}>ELIOTT MULLER</span>
        <span className={styles.nameSecondary}>PORTFOLIO</span>
      </div>

      {/* Overview */}
      <div className={styles.infoSection}>
        <div className={styles.overviewSection}>
          <span className={styles.overviewLabel}>OVERVIEW:</span>
          <span className={styles.overviewValue}>08 PROJECTS</span>
        </div>

        {/* Version et indicateurs */}
        <div className={styles.versionSection}>
          <div className={styles.indicators}>
            <span className={styles.indicatorActive} />
            <span className={styles.indicatorActive} />
            <span className={styles.indicatorInactive} />
          </div>
          <span className={styles.version}>V-002</span>
        </div>
      </div>
    </div>
  );
});

BottomInfo.displayName = "BottomInfo";
