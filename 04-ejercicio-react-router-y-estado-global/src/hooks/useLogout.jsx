import { useFavoriteStore } from "../store/favoriteStore";
import { useAuthStore } from "../store/authStore";

export function useLogout() {
  const { clearFavorites } = useFavoriteStore();
  const { logout } = useAuthStore();

  function handleLogout() {
    logout();
    clearFavorites();
  }

  return { handleLogout };
}
