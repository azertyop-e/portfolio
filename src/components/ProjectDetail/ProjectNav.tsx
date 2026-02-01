"use client";

import { PageTransitionLink } from "@/components/PageTransition";
import type { Project } from "@/lib/data/projects";
import styles from "./ProjectDetail.module.scss";

type ProjectNavProps = {
  nextProject: Project;
};

export function ProjectNav({ nextProject }: ProjectNavProps) {
  return (
    <nav className={styles.nav}>
      <PageTransitionLink href="/#projects" className={styles.navBack}>
        ← All Projects
      </PageTransitionLink>
      <PageTransitionLink
        href={`/projects/${nextProject.slug}`}
        className={styles.navNext}
      >
        <span className={styles.navNextLabel}>Next Project</span>
        <span className={styles.navNextTitle}>{nextProject.title}</span>
      </PageTransitionLink>
    </nav>
  );
}
