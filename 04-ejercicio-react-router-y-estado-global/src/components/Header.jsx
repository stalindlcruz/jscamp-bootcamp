import { NavLink as NavLinkRouter } from "react-router";
import { HeaderUserButton } from "./HeaderUserButton.jsx";
import { HeaderFavoritesNavLink } from "./HeaderFavoritesNavLink.jsx";
import { Link } from "./Link.jsx";
import styles from "./Header.module.css";

export function Header() {
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

        <HeaderFavoritesNavLink />
      </nav>

      <HeaderUserButton />
    </header>
  );
}
