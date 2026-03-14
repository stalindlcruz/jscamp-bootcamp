import { JobCard } from "./JobCard.jsx";

export function JobListings({ jobs }) {
  return (
    <div className="jobs-listings">
      {jobs.length === 0 && (
        <p>No se han encontrado empleos que coincidan con la búsqueda</p>
      )}

      {jobs.map((job) => (
        <JobCard job={job} key={job.id} />
      ))}
    </div>
  );
}
