import styles from "./404.module.css";
import { useRouter } from "../hooks/useRouter.jsx";

export function NotFoundPage() {
  const { navigateTo } = useRouter();

  const handleGoHome = () => {
    navigateTo("/");
  };

  return (
    <>
      <main className={styles.main}>
        <span className={styles.errorCode}>404</span>
        <h1 className={styles.title}>Página no encontrada</h1>
        <p className={styles.description}>
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <button className={styles.homeButton} onClick={handleGoHome}>
          Volver al inicio
        </button>
      </main>
    </>
  );
}
