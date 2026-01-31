"use client";

import styles from "./TextRoll.module.scss";

type TextRollProps = {
  children: string;
  className?: string;
  as?: "span" | "div" | "a";
  href?: string;
};

export function TextRoll({
  children,
  className = "",
  as: Component = "span",
}: TextRollProps) {
  return (
    <Component className={`${styles.textRoll} ${className}`}>
      <span className={styles.textRollInner} data-text={children}>
        {children}
      </span>
    </Component>
  );
}
