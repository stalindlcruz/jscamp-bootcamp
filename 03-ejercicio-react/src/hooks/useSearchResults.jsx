import { useState } from "react";

const RESULTS_PER_PAGE = 5;

export function useSearchResults(data) {
  const [currentPage, setcurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / RESULTS_PER_PAGE);

  const pageResults = data.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE,
  );

  const handlePageChange = (page) => {
    setcurrentPage(page);
  };

  return {
    currentPage,
    handlePageChange,
    totalPages,
    pageResults,
  };
}
