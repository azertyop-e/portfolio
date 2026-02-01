"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { useCursor } from "@/components/Cursor/CursorContext";
import { PageTransitionLink } from "@/components/PageTransition";
import { TextRoll } from "@/components/TextRoll/TextRoll";
import styles from "./Nav.module.scss";

const SECTION_IDS = ["hero", "projects", "about", "playground"] as const;

type NavLink =
  | { href: string; label: string; exact: true }
  | { href: string; label: string; exact: false; hashId: string };

const navLinks: NavLink[] = [
  { href: "/", label: "Home", exact: true },
  { href: "/#projects", label: "Projects", exact: false, hashId: "projects" },
  { href: "/#about", label: "About", exact: false, hashId: "about" },
  { href: "/#playground", label: "Playground", exact: false, hashId: "playground" },
];

export function Nav() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [hasMounted, setHasMounted] = useState(false);
  const [visibleSection, setVisibleSection] = useState<string>("");
  const ratiosRef = useRef<Record<string, number>>({});
  const { setVariant } = useCursor();

  useEffect(() => {
    setHasMounted(true);
    setHash(window.location.hash);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    const h = window.location.hash;
    setHash(h);
    if (pathname === "/" && h && SECTION_IDS.includes(h.slice(1) as (typeof SECTION_IDS)[number])) {
      setVisibleSection(h.slice(1));
    }
  }, [pathname, hasMounted]);

  useEffect(() => {
    if (!hasMounted) return;
    const onHashChange = () => {
      const h = window.location.hash;
      setHash(h);
      if (pathname === "/" && h && SECTION_IDS.includes(h.slice(1) as (typeof SECTION_IDS)[number])) {
        setVisibleSection(h.slice(1));
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [hasMounted, pathname]);

  // Mise à jour de l’état actif selon la section visible (page d’accueil uniquement)
  useEffect(() => {
    if (pathname !== "/" || !hasMounted) return;

    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el != null
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (id) ratiosRef.current[id] = entry.intersectionRatio;
        }
        const entries_ = Object.entries(ratiosRef.current);
        if (entries_.length === 0) return;
        const [activeId] = entries_.reduce<[string, number]>(
          (best, [id, ratio]) => (ratio > best[1] ? [id, ratio] : best),
          ["", 0]
        );
        setVisibleSection(activeId);
      },
      {
        root: null,
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname, hasMounted]);

  const currentHash = hasMounted && typeof window !== "undefined" ? window.location.hash : hash;

  const isActive = (link: NavLink) => {
    if (pathname === "/playground" && "hashId" in link && link.hashId === "playground")
      return true;
    if (pathname !== "/") {
      return link.exact ? pathname === "/" : pathname.startsWith(link.href);
    }
    if (link.exact) {
      return visibleSection === "hero" || (visibleSection === "" && !currentHash);
    }
    if ("hashId" in link && link.hashId) {
      return visibleSection === link.hashId;
    }
    return pathname.startsWith(link.href);
  };

  const handleMouseEnter = () => setVariant("action");
  const handleMouseLeave = () => setVariant("default");

  return (
    <nav className={styles.nav}>
      <span className={styles.logo}>Eliott Muller</span>
      <div className={styles.links}>
        {navLinks.map((link) => {
          const href =
            "hashId" in link && link.hashId && pathname === "/"
              ? `#${link.hashId}`
              : link.href;
          return (
            <PageTransitionLink
              key={link.href}
              href={href}
              className={`${styles.link} ${isActive(link) ? styles.active : ""}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <TextRoll>{link.label}</TextRoll>
            </PageTransitionLink>
          );
        })}
      </div>
    </nav>
  );
}
