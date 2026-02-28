import data from "../data.json";

import { JobListings } from "./JobListings.jsx";
import { Pagination } from "./Pagination.jsx";

import { useSearchResults } from "../hooks/useSearchResults.jsx";

export function SearchResults() {
  const { currentPage, handlePageChange, totalPages, pageResults } =
    useSearchResults(data);

  return (
    <section>
      <h2 style={{ textAlign: "center" }}>Resultados de búsqueda</h2>

      <JobListings data={pageResults} />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
