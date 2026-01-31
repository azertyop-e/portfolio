"use client";

import Image from "next/image";
import type { Project, MediaItem } from "@/lib/data/projects";
import styles from "./ProjectDetail.module.scss";

type ProjectGalleryProps = {
  project: Project;
};

function GalleryItem({ item }: { item: MediaItem }) {
  if (item.type === "video") {
    return (
      <div className={styles.galleryItem}>
        <video
          src={item.src}
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          className={styles.galleryVideo}
        />
        {item.caption && (
          <p className={styles.galleryCaption}>{item.caption}</p>
        )}
      </div>
    );
  }

  return (
    <div className={styles.galleryItem}>
      <div className={styles.galleryImage}>
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={100}
          style={{ objectFit: "cover" }}
        />
      </div>
      {item.caption && (
        <p className={styles.galleryCaption}>{item.caption}</p>
      )}
    </div>
  );
}

export function ProjectGallery({ project }: ProjectGalleryProps) {
  return (
    <div className={styles.gallery}>
      <div className={styles.galleryGrid}>
        {project.gallery.map((item, index) => (
          <GalleryItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
