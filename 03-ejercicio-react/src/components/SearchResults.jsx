import { JobListings } from "./JobListings.jsx";
import { Pagination } from "./Pagination.jsx";

import data from "../data.json";

import { useState } from "react";

export function SearchResults() {
  const [currentPage, setcurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setcurrentPage(page);
  };

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
