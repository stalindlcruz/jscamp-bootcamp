import { JobCard } from "./JobCard.jsx";

export function JobListings({ data }) {
  return (
    <div className="jobs-listings">
      {data.length === 0 && (
        <p>No se han encontrado empleos que coincidan con la búsqueda</p>
      )}

      {data.map((job) => (
        <JobCard job={job} key={job.id} />
      ))}
    </div>
  );
}
