"use client";

import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/lib/data/projects";
import styles from "./Projects.module.scss";

type ProjectsGridProps = {
  projects: Project[];
};

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
