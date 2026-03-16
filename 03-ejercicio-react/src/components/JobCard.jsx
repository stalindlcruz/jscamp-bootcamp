import { useState } from "react";

export function JobCard({ job }) {
  const [isApplied, setIsApplied] = useState(false);

  const handleApplied = () => {
    setIsApplied(true);
  };

  const btnClasses = isApplied
    ? "button-apply-job is-applied"
    : "button-apply-job";

  const btnText = isApplied ? "Aplicado" : "Aplicar";

  return (
    <article
      className="job-listing-card"
      data-modalidad={job.data.modalidad}
      data-nivel={job.data.nivel}
      data-technology={job.data.technology}
    >
      <div>
        <h3>{job.titulo}</h3>
        <small>
          {job.empresa} | {job.ubicacion}
        </small>
        <p>{job.descripcion}</p>
      </div>
      <button className={btnClasses} onClick={handleApplied}>
        {btnText}
      </button>
    </article>
  );
}
