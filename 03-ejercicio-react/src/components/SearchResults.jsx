import { JobListings } from "./JobListings.jsx";
import { Pagination } from "./Pagination.jsx";

export function SearchResults({
  pageResults,
  totalPages,
  currentPage,
  onPageChange,
}) {
  return (
    <section>
      <h2 style={{ textAlign: "center" }}>Resultados de búsqueda</h2>

      <JobListings data={pageResults} />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </section>
  );
}
