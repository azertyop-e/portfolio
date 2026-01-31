import { ServicesList } from "@/components/Services/ServicesList";
import styles from "./page.module.scss";

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <section className={styles.bio}>
        <h1 className={styles.title}>About</h1>
        <div className={styles.content}>
          <p>
            Eliott Muller is a multidisciplinary designer and art director
            specializing in brand identity, motion design, and
            digital experiences.
          </p>
          <p>
            Passionate about creating meaningful visual
            experiences that resonate with audiences and drive results,
            the practice focuses on bridging creativity and technology.
          </p>
          <p>
            The approach combines strategic thinking with meticulous craft,
            ensuring every project—from comprehensive brand systems to focused
            digital campaigns—receives the same level of attention and care.
          </p>
        </div>
      </section>

      <section className={styles.servicesSection}>
        <ServicesList />
      </section>
    </div>
  );
}
