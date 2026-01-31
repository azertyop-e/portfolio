import styles from "./Frame.module.scss";

type FrameProps = {
  children: React.ReactNode;
};

export function Frame({ children }: FrameProps) {
  return (
    <div className={styles.frame}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
}
