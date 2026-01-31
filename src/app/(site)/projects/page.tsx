"use client";

import { useState } from "react";
import { Filters } from "@/components/Projects/Filters";
import { ProjectsGrid } from "@/components/Projects/ProjectsGrid";
import { Manifesto } from "@/components/Projects/Manifesto";
import {
  projects,
  filterCategories,
  type WorkCategory,
} from "@/lib/data/projects";
import styles from "@/components/Projects/Projects.module.scss";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<WorkCategory | "All">("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(activeFilter));

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Filters
          categories={filterCategories}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <ProjectsGrid projects={filteredProjects} />
      </div>
      <Manifesto />
    </div>
  );
}
