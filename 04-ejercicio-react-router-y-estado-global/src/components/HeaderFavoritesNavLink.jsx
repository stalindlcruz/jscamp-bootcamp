import { NavLink as NavLinkRouter } from "react-router";
import { useFavoriteStore } from "../store/favoriteStore";
import { useAuthStore } from "../store/authStore";
import styles from "./Header.module.css";

export function HeaderFavoritesNavLink() {
  const isActive = ({ isActive }) => (isActive ? styles.activeLink : "");
  const { isLoggedIn, login, logout } = useAuthStore();
  const { countFavorites } = useFavoriteStore();

  const totalFavorites = countFavorites();

  return (
    isLoggedIn && (
      <NavLinkRouter to="/profile" className={isActive}>
        Perfil {totalFavorites > 0 ? "❤️" : "♡"}{" "}
        {totalFavorites > 0 ? totalFavorites : ""}
      </NavLinkRouter>
    )
  );
}
