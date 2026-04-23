import { Link } from "./Link.jsx";
import styles from "./OfferNotFound.module.css";

export function OfferNotFound({ message = "Oferta no encontrada" }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>404</h2>
        <p className={styles.message}>{message}</p>
        <p className={styles.description}>
          Puede que la oferta no exista o haya ocurrido un error al cargarla
        </p>
      </div>
      <div>
        <Link to={"/search"} className={styles.link}>
          Volver a la lista de empleos
        </Link>
      </div>
    </div>
  );
}
