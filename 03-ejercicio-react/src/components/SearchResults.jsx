import data from "../data.json";

import { JobListings } from "./JobListings.jsx";
import { Pagination } from "./Pagination.jsx";

import { useSearchResults } from "../hooks/useSearchResults.jsx";

export function SearchResults() {
  const { currentPage, handlePageChange } = useSearchResults();

  return (
    <section>
      <h2 style={{ textAlign: "center" }}>Resultados de búsqueda</h2>

      <JobListings data={data} />

      <Pagination
        totalPages={10}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
