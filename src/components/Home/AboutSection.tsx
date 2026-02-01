"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "@/components/Cursor/CursorContext";
import { ServicesList } from "@/components/Services/ServicesList";
import styles from "./Home.module.scss";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const { setVariant } = useCursor();

  const handleMouseEnter = () => setVariant("action");
  const handleMouseLeave = () => setVariant("default");

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const label = labelRef.current;
    const content = contentRef.current;

    if (!section || !title || !label || !content) return;

    // Wait for horizontal carousel ScrollTrigger to be set up first
    const timeoutId = setTimeout(() => {
      // Refresh all ScrollTriggers to recalculate positions after carousel pin spacing
      ScrollTrigger.refresh();

      ctxRef.current = gsap.context(() => {
        // Split title into words for animation
        const words = title.innerText.split(" ");
        title.innerHTML = words
          .map(
            (word) =>
              `<span class="${styles.aboutWord}"><span>${word}</span></span>`,
          )
          .join(" ");

        const wordSpans = title.querySelectorAll(`.${styles.aboutWord} > span`);

        // Timeline for staggered animations
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        });

        // Animate label
        tl.from(label, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.out",
        });

        // Animate title words
        tl.from(
          wordSpans,
          {
            y: "100%",
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.05,
          },
          "-=0.3",
        );

        // Animate content
        tl.from(
          content,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4",
        );
      }, section);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      if (ctxRef.current) {
        ctxRef.current.revert();
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className={styles.about}>
      <div className={styles.aboutHeader}>
        <div className={styles.aboutIntro}>
          <span ref={labelRef} className={styles.aboutLabel}>
            About
          </span>
          <h2 ref={titleRef} className={styles.aboutTitle}>
            Crafting visual experiences that resonate with audiences and drive
            results.
          </h2>
        </div>

        <div ref={contentRef} className={styles.aboutContent}>
          <p className={styles.aboutText}>
            Multidisciplinary designer and art director specializing in brand
            identity, motion design, and digital experiences. The approach
            combines strategic thinking with meticulous craft, ensuring every
            project receives the same level of attention and care.
          </p>
          <a
            href="mailto:hello@eliottmuller.com"
            className={styles.aboutLink}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Get in Touch
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      <div className={styles.aboutServices}>
        <ServicesList />
      </div>
    </section>
  );
}
