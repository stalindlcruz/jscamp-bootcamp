import { Link } from "../components/Link.jsx";
import styles from "../pages/Detail.module.css";

export function DetailPageBreadCrumb({ job }) {
  return (
    <div>
      <nav className={styles.navContainer}>
        <Link className={styles.jobLink} to={"/search"}>
          Empleos
        </Link>
        <span>/</span>
        <h3>{job.titulo}</h3>
      </nav>
    </div>
  );
}
