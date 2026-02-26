import { useState } from "react";

export function useSearchResults() {
  const [currentPage, setcurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setcurrentPage(page);
  };

  return {
    currentPage,
    handlePageChange,
  };
}
