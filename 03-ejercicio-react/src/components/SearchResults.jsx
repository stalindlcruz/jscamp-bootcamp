import { JobListings } from "./JobListings.jsx";
import { Pagination } from "./Pagination.jsx";
import { ErrorFetch } from "./ErrorFetch.jsx";
import { LoadingSpinner } from "./LoadingSpiner.jsx";

export function SearchResults({
  jobs,
  totalPages,
  currentPage,
  onPageChange,
  loading,
  error,
}) {
  return (
    <section>
      <h2 style={{ textAlign: "center" }}>Resultados de búsqueda</h2>

      {error ? (
        <ErrorFetch error={error} />
      ) : loading ? (
        <LoadingSpinner text="Cargando empleos, esto puede tardar unos segundos..." />
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
