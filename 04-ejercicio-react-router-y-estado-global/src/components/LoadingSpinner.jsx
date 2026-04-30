import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner({ text = "Loading" }) {
  return (
    <div className={styles.loadingSpinner}>
      <p className={styles.loadingText}>{text}</p>
      <div className={styles.spinner}></div>
    </div>
  );
}
