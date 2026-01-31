"use client";

import type { WorkCategory } from "@/lib/data/projects";
import styles from "./Projects.module.scss";

type FiltersProps = {
  categories: WorkCategory[];
  activeFilter: WorkCategory | "All";
  onFilterChange: (category: WorkCategory | "All") => void;
};

export function Filters({
  categories,
  activeFilter,
  onFilterChange,
}: FiltersProps) {
  return (
    <div className={styles.filters}>
      {categories.map((category) => (
        <button
          key={category}
          className={`${styles.filterBtn} ${
            activeFilter === category ? styles.active : ""
          }`}
          onClick={() => onFilterChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
