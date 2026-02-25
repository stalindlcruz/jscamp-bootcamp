import { JobListings } from "./JobListings.jsx";
import { Pagination } from "./Pagination.jsx";

import data from "../data.json";

export function SearchResults() {
  return (
    <section>
      <h2 style={{ textAlign: "center" }}>Resultados de búsqueda</h2>

      <JobListings data={data} />

      <Pagination />
    </section>
  );
}
