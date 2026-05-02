import { useFavoriteStore } from "../store/favoriteStore";
import { useAuthStore } from "../store/authStore";
import styles from "./FavoriteBtn.module.css";

export function FavoriteBtn({ jobId }) {
  const { toggleFavorites, totalFavorites, isFavorite } = useFavoriteStore();
  const { isLoggedIn } = useAuthStore();

  return (
    <button
      disabled={!isLoggedIn}
      className={styles.favBtn}
      onClick={() => toggleFavorites(jobId)}
    >
      {isFavorite(jobId) ? "❤️" : "♡"}
    </button>
  );
}
