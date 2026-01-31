import Link from "next/link";
import type { Project } from "@/lib/data/projects";
import styles from "./ProjectDetail.module.scss";

type ProjectNavProps = {
  nextProject: Project;
};

export function ProjectNav({ nextProject }: ProjectNavProps) {
  return (
    <nav className={styles.nav}>
      <Link href="/projects" className={styles.navBack}>
        ← All Projects
      </Link>
      <Link href={`/projects/${nextProject.slug}`} className={styles.navNext}>
        <span className={styles.navNextLabel}>Next Project</span>
        <span className={styles.navNextTitle}>{nextProject.title}</span>
      </Link>
    </nav>
  );
}
