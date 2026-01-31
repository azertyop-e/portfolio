import type { Project } from "@/lib/data/projects";
import styles from "./ProjectDetail.module.scss";

type ProjectWriteupProps = {
  project: Project;
};

export function ProjectWriteup({ project }: ProjectWriteupProps) {
  const { writeup } = project;

  return (
    <div className={styles.writeup}>
      <div className={styles.writeupGrid}>
        {/* Left column - Overview & Context */}
        <div className={styles.writeupMain}>
          <section className={styles.writeupSection}>
            <h2 className={styles.writeupLabel}>Overview</h2>
            <p className={styles.writeupText}>{writeup.overview}</p>
          </section>

          <section className={styles.writeupSection}>
            <h2 className={styles.writeupLabel}>Context</h2>
            <p className={styles.writeupText}>{writeup.context}</p>
          </section>

          <section className={styles.writeupSection}>
            <h2 className={styles.writeupLabel}>Approach</h2>
            <ul className={styles.writeupList}>
              {writeup.approach.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right column - Deliverables & Tools */}
        <div className={styles.writeupSidebar}>
          <section className={styles.writeupSection}>
            <h2 className={styles.writeupLabel}>Deliverables</h2>
            <ul className={styles.writeupListSimple}>
              {writeup.deliverables.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section className={styles.writeupSection}>
            <h2 className={styles.writeupLabel}>Tools</h2>
            <div className={styles.writeupTools}>
              {writeup.tools.map((tool) => (
                <span key={tool} className={styles.writeupTool}>
                  {tool}
                </span>
              ))}
            </div>
          </section>

          {writeup.notes && (
            <section className={styles.writeupSection}>
              <h2 className={styles.writeupLabel}>Note</h2>
              <p className={styles.writeupNote}>{writeup.notes}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
