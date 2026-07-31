import styles from "./JobCard.module.css";
import { Link } from "./Link.jsx";

import { ApplyBtn } from "./ApplyBtn.jsx";
import { FavoriteBtn } from "./FavoriteBtn.jsx";

export function JobCard({ job }) {
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
            href={`/jobs/${job.id}`}
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
          href={`/jobs/${job.id}`}
          className={styles.details}
          aria-label={`Ver Detalles de ${job.titulo}`}
        >
          Detalles
        </Link>
        <ApplyBtn />
        <FavoriteBtn jobId={job.id} />
      </div>
    </article>
  );
}
