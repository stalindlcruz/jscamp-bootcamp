import { useFavoriteStore } from "../store/favoriteStore";
import { useAuthStore } from "../store/authStore";
import styles from "../pages/Detail.module.css";

function DetailApplyBtn() {
  const { isLoggedIn } = useAuthStore();

  return (
    <button disabled={!isLoggedIn}>
      {isLoggedIn ? "Aplicar ahora" : "Inicia sesión para aplicar"}
    </button>
  );
}

function DetailFavoriteBtn({ jobId }) {
  const { toggleFavorites, isFavorite } = useFavoriteStore();
  const { isLoggedIn } = useAuthStore();

  return (
    <button
      // className={""}
      disabled={!isLoggedIn}
      onClick={() => toggleFavorites(jobId)}
    >
      {isFavorite(jobId) ? "❤️" : "♡"}
    </button>
  );
}

export function DetailPageHeader({ job }) {
  return (
    <header className={styles.detailHeader}>
      <div className={styles.containerTitle}>
        <h2>{job.titulo}</h2>
        <p>
          {job.empresa} • {job.ubicacion}
        </p>
      </div>

      <div className={styles.containerBtns}>
        <DetailApplyBtn />
        <DetailFavoriteBtn jobId={job.id} />
      </div>
    </header>
  );
}
