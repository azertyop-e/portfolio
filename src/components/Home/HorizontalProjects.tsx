"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { PageTransitionLink } from "@/components/PageTransition";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "@/components/Cursor/CursorContext";
import { NumberRoll } from "@/components/NumberRoll/NumberRoll";
import { projects } from "@/lib/data/projects";
import styles from "./Home.module.scss";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HorizontalProjects() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const ctxRef = useRef<gsap.Context | null>(null);
  const { setVariant } = useCursor();

  const updateIndex = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!wrapper || !section || !track) return;

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const totalSlides = projects.length;
      const scrollDistance = (totalSlides - 1) * window.innerWidth;

      // Create context scoped to wrapper
      ctxRef.current = gsap.context(() => {
        gsap.to(track, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: `+=${scrollDistance}`,
            pin: section,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            snap: {
              snapTo: 1 / (totalSlides - 1),
              duration: { min: 0.2, max: 0.4 },
              ease: "power1.inOut",
            },
            onUpdate: (self) => {
              const newIndex = Math.round(self.progress * (totalSlides - 1));
              updateIndex(newIndex);
            },
          },
        });
      }, wrapper);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
    };
  }, [updateIndex]);

  return (
    <div ref={wrapperRef} id="projects" className={styles.carouselWrapper}>
      <section ref={sectionRef} className={styles.carousel}>
        {/* Progress indicator */}
        <div className={styles.carouselProgress}>
          <NumberRoll
            value={currentIndex + 1}
            className={styles.carouselCurrent}
          />
          <div className={styles.carouselLine}>
            <div
              className={styles.carouselLineFill}
              style={{
                width: `${((currentIndex + 1) / projects.length) * 100}%`,
              }}
            />
          </div>
          <span className={styles.carouselTotal}>
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        {/* Track */}
        <div ref={trackRef} className={styles.carouselTrack}>
          {projects.map((project, index) => (
            <div key={project.slug} className={styles.slide}>
              <PageTransitionLink
                href={`/projects/${project.slug}`}
                className={styles.slideLink}
                onMouseEnter={() => setVariant("action", "VIEW PROJECT")}
                onMouseLeave={() => setVariant("default")}
              >
                {/* Background media */}
                <div className={styles.slideImage}>
                  {project.cover.type === "video" ? (
                    <video
                      src={project.cover.src}
                      autoPlay
                      muted
                      playsInline
                      loop
                      preload="metadata"
                      className={styles.slideVideo}
                    />
                  ) : (
                    <Image
                      src={project.cover.src}
                      alt={project.cover.alt}
                      fill
                      priority={index === 0}
                      sizes="100vw"
                      quality={100}
                      style={{ objectFit: "cover" }}
                    />
                  )}
                  <div className={styles.slideOverlay} />
                </div>

                {/* Content */}
                <div className={styles.slideContent}>
                  <span className={styles.slideIndex}>[{project.index}]</span>
                  <h2 className={styles.slideTitle}>{project.title}</h2>
                  <p className={styles.slideRoles}>
                    {project.clientLine} — {project.year}
                  </p>
                </div>

                {/* Categories */}
                <div className={styles.slideCategories}>
                  {project.categories.slice(0, 3).map((category) => (
                    <span key={category} className={styles.slideCategory}>
                      {category}
                    </span>
                  ))}
                </div>
              </PageTransitionLink>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
