import { Link as NavLink } from "react-router";
import { useRouter } from "../hooks/useRouter.jsx";

import styles from "./Link.module.css";

export function Link({
  href,
  children,
  className = "",
  exact = true,
  activeClassName = styles.active,
  ...restOfProps
}) {
  const { currentPath } = useRouter();

  const isActive = exact ? currentPath === href : currentPath.startsWith(href);

  const finalClassName = isActive
    ? `${className} ${activeClassName}`.trim()
    : className.trim();

  return (
    <NavLink className={finalClassName} to={href} {...restOfProps}>
      {children}
    </NavLink>
  );
}
