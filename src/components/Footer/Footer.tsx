"use client";

import { PageTransitionLink } from "@/components/PageTransition";
import { useCursor } from "@/components/Cursor/CursorContext";
import { TextRoll } from "@/components/TextRoll/TextRoll";
import styles from "./Footer.module.scss";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/playground", label: "Playground" },
  { href: "/#about", label: "About" },
];

const socialLinks = [
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://twitter.com", label: "Twitter" },
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://dribbble.com", label: "Dribbble" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { setVariant } = useCursor();

  const handleMouseEnter = () => setVariant("action");
  const handleMouseLeave = () => setVariant("default");

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top section */}
        <div className={styles.top}>
          <div className={styles.brand}>
            <PageTransitionLink
              href="/"
              className={styles.logo}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <TextRoll>Eliott Muller</TextRoll>
            </PageTransitionLink>
            <p className={styles.tagline}>Art Direction & Visual Design</p>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <span className={styles.linkTitle}>Navigation</span>
              <ul className={styles.linkList}>
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <PageTransitionLink
                      href={link.href}
                      className={styles.link}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <TextRoll>{link.label}</TextRoll>
                    </PageTransitionLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <span className={styles.linkTitle}>Social</span>
              <ul className={styles.linkList}>
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <TextRoll>{link.label}</TextRoll>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.linkGroup}>
              <span className={styles.linkTitle}>Contact</span>
              <ul className={styles.linkList}>
                <li>
                  <a
                    href="mailto:hello@eliottmuller.com"
                    className={styles.link}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <TextRoll>hello@eliottmuller.com</TextRoll>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} Eliott Muller. All rights reserved.
          </p>
          <p className={styles.credit}>Designed & Built with passion</p>
        </div>
      </div>
    </footer>
  );
}
