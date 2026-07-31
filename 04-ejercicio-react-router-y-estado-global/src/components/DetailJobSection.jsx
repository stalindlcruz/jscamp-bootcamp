import snarkdown from "snarkdown";
import styles from "../pages/Detail.module.css";

export function DetailJobSection({ title, content }) {
  const htmlContent = snarkdown(content);

  return (
    <section className={styles.jobSection} aria-label="Descripción del trabajo">
      <h2>{title}</h2>
      <div
        className={`prose`}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </section>
  );
}
