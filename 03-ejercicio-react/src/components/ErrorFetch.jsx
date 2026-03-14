import styles from "./ErrorFetch.module.css";

export function ErrorFetch({ error }) {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className={styles.errorDiv}>
      <p>Error al cargar los trabajos: {error}</p>
      <button className={styles.reloadButton} onClick={handleReload}>
        Recargar
      </button>
    </div>
  );
}
