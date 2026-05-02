import { NavLink as NavLinkRouter } from "react-router";
import { Link } from "./Link.jsx";
import { useAuthStore } from "../store/authStore";
import { useFavoriteStore } from "../store/favoriteStore";
import styles from "./Header.module.css";

export function Header() {
  const { isLoggedIn, login, logout } = useAuthStore();
  const { countFavorites } = useFavoriteStore();

  const totalFavorites = countFavorites();

  const isActive = ({ isActive }) => (isActive ? styles.activeLink : "");

  return (
    <header>
      <Link href="/" style={{ textDecoration: "none" }}>
        <h1 style={{ color: "white" }}>
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
          DevJobs
        </h1>
      </Link>

      <nav>
        <NavLinkRouter to="/" className={isActive}>
          Inicio
        </NavLinkRouter>

        <NavLinkRouter to="/search" className={isActive}>
          Empleos
        </NavLinkRouter>

        <NavLinkRouter to="/contact" className={isActive}>
          Contacto
        </NavLinkRouter>

        {isLoggedIn && (
          <NavLinkRouter to="/profile" className={isActive}>
            Perfil {totalFavorites > 0 ? "❤️" : "♡"}{" "}
            {totalFavorites > 0 ? totalFavorites : ""}
          </NavLinkRouter>
        )}
      </nav>

      {isLoggedIn ? (
        <button onClick={logout}>Cerrar Sesion</button>
      ) : (
        <button onClick={login}>Iniciar Sesion</button>
      )}
    </header>
  );
}
