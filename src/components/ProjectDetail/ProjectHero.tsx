"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useIsomorphicLayoutEffect } from "@/lib/gsap/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/lib/gsap/useReducedMotion";
import type { Project } from "@/lib/data/projects";
import styles from "./ProjectDetail.module.scss";

type ProjectHeroProps = {
  project: Project;
};

export function ProjectHero({ project }: ProjectHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-animate", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className={styles.hero}>
      <div className={styles.heroHeader}>
        <div className={styles.heroMeta}>
          <span className="hero-animate">[{project.index}]</span>
          <span className="hero-animate">{project.clientLine}</span>
          <span className="hero-animate">{project.year}</span>
        </div>
        <h1 className={`${styles.heroTitle} hero-animate`}>{project.title}</h1>
        <p className={`${styles.heroTagline} hero-animate`}>
          {project.writeup.tagline}
        </p>
        <div className={`${styles.heroCategories} hero-animate`}>
          {project.categories.map((cat) => (
            <span key={cat} className={styles.heroCategoryTag}>
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div className={`${styles.heroCover} hero-animate`}>
        {project.cover.type === "video" ? (
          <video
            src={project.cover.src}
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
            className={styles.heroCoverVideo}
          />
        ) : (
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="100vw"
            quality={100}
            style={{ objectFit: "cover" }}
            priority
          />
        )}
      </div>
    </div>
  );
}
