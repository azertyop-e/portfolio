"use client";

import Link from "next/link";
import Image from "next/image";
import { useCursor } from "@/components/Cursor/CursorContext";
import type { Project } from "@/lib/data/projects";
import styles from "./Projects.module.scss";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const { setVariant } = useCursor();

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={styles.card}
      onMouseEnter={() => setVariant("action", "VIEW PROJECT")}
      onMouseLeave={() => setVariant("default")}
    >
      <div className={styles.cardImage}>
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={100}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles.cardInfo}>
        <span className={styles.cardIndex}>[{project.index}]</span>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardRoles}>{project.roles.join(", ")}</p>
      </div>
    </Link>
  );
}
