import { JobListings } from "./JobListings.jsx";
import { Pagination } from "./Pagination.jsx";

export function SearchResults({
  jobs,
  totalPages,
  currentPage,
  onPageChange,
  loading,
}) {
  return (
    <section>
      <h2 style={{ textAlign: "center" }}>Resultados de búsqueda</h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>Cargando Empleos...</p>
      ) : (
        <JobListings jobs={jobs} />
      )}

      {totalPages > 0 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      )}
    </section>
  );
}
