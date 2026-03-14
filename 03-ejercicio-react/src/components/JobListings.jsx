import { JobCard } from "./JobCard.jsx";

export function JobListings({ jobs }) {
  return (
    <div style={{ marginBlock: "2rem" }} className="jobs-listings">
      {jobs.length === 0 && (
        <p
          style={{
            color: "#fff",
            textAlign: "center",
            marginBlock: "2rem",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          No se han encontrado empleos que coincidan con la búsqueda 😔
        </p>
      )}

      {jobs.map((job) => (
        <JobCard job={job} key={job.id} />
      ))}
    </div>
  );
}
