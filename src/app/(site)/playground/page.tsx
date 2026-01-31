import { PlaygroundCollage } from "@/components/Playground/PlaygroundCollage";
import styles from "./page.module.scss";

export default function PlaygroundPage() {
  return (
    <div className={styles.container}>
      <PlaygroundCollage />
      <div className={styles.content}>
        <h1 className={styles.title}>Playground</h1>
        <p className={styles.subtitle}>
          A curated archive of tests, motion studies, and project components
        </p>
        <p className={styles.note}>
          Experiments in typography, motion, and visual exploration
        </p>
      </div>
    </div>
  );
}
