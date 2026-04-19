import { useState } from "react";
import { Link } from "./Link";

import styles from "./JobCard.module.css";

export function JobCard({ job }) {
  const [isApplied, setIsApplied] = useState(false);

  const handleApplyClick = () => {
    setIsApplied(true);
  };

  const buttonClasses = isApplied
    ? "button-apply-job is-applied"
    : "button-apply-job";
  const buttonText = isApplied ? "Aplicado" : "Aplicar";

  return (
    <article
      className="job-listing-card"
      data-modalidad={job.data.modalidad}
      data-nivel={job.data.nivel}
      data-technology={job.data.technology}
    >
      <div>
        <h3>
          <Link
            to={`/jobs/${job.id}`}
            className={styles.title}
            aria-label={`Trabajo de ${job.titulo}`}
          >
            {job.titulo}
          </Link>
        </h3>
        <small>
          {job.empresa} | {job.ubicacion}
        </small>
        <p>{job.descripcion}</p>
      </div>

      <div className={styles.detailsBtn}>
        <Link
          to={`/jobs/${job.id}`}
          className={styles.details}
          aria-label={`Ver Detalles de ${job.titulo}`}
        >
          Detalles
        </Link>

        <button className={buttonClasses} onClick={handleApplyClick}>
          {buttonText}
        </button>
      </div>
    </article>
  );
}
