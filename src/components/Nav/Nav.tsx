"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCursor } from "@/components/Cursor/CursorContext";
import { TextRoll } from "@/components/TextRoll/TextRoll";
import styles from "./Nav.module.scss";

const navLinks = [
  { href: "/", label: "Home", exact: true },
  { href: "/projects", label: "Projects", exact: false },
  { href: "/playground", label: "Playground", exact: false },
  { href: "/about", label: "About", exact: false },
];

export function Nav() {
  const pathname = usePathname();
  const { setVariant } = useCursor();

  const isActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const handleMouseEnter = () => setVariant("action");
  const handleMouseLeave = () => setVariant("default");

  return (
    <nav className={styles.nav}>
      <Link
        href="/"
        className={styles.logo}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Eliott Muller
      </Link>
      <div className={styles.links}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.link} ${
              isActive(link.href, link.exact) ? styles.active : ""
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <TextRoll>{link.label}</TextRoll>
          </Link>
        ))}
      </div>
    </nav>
  );
}
