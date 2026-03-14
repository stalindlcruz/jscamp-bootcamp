import styles from "./LoadingSpinner.module.css";

export function LoadingSpinner({ text }) {
  return (
    <div className={styles.loadingSpinner}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>{text}</p>
    </div>
  );
}
