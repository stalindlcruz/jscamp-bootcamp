import { useState } from "react";

export function Pagination({ totalPages = 10, currentPage = 1 }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const prevButton = isFirstPage ? { pointerEvents: "none", opacity: 0.5 } : {};
  const nextButton = isLastPage ? { pointerEvents: "none", opacity: 0.5 } : {};

  //   const [currentPage, setCurrentPage] = useState(1);
  //   setCurrentPage(2);
  //   console.log(currentPage);

  return (
    <nav className="pagination">
      <button style={prevButton}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 6l-6 6l6 6" />
        </svg>
      </button>

      {pages.map((page) => (
        <button style={currentPage === page ? { color: "red" } : {}} key={page}>
          {page}
        </button>
      ))}

      <button style={nextButton}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 6l6 6l-6 6" />
        </svg>
      </button>
    </nav>
  );
}
