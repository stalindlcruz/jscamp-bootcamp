import { useRouter } from "../hooks/useRouter.jsx";
import styles from "./Link.module.css";

export function Link({
  href,
  children,
  exact = true,
  className = "",
  activeClassName = styles.active,
  ...restOfProps
}) {
  const { navigateTo, currentPathname } = useRouter();

  const handleClick = (event) => {
    event.preventDefault();
    navigateTo(href);
  };

  const isActive = exact
    ? currentPathname === href
    : currentPath.startsWith(href);

  const finalClassName = isActive
    ? `${className} ${activeClassName}`.trim()
    : className.trim();

  return (
    <a
      className={finalClassName}
      href={href}
      aria-current={isActive ? "page" : undefined}
      {...restOfProps}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
