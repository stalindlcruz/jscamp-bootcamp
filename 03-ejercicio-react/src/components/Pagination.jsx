import { usePagination } from "../hooks/usePagination";

export function Pagination({ totalPages = 10, currentPage = 1, onPageChange }) {
  const {
    pages,
    prevButton,
    nextButton,
    handlePrevClick,
    handleNextClick,
    handlePageClick,
  } = usePagination(totalPages, currentPage, onPageChange);

  return (
    <nav className="pagination">
      <button type="button" style={prevButton} onClick={handlePrevClick}>
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
        <button
          type="button"
          style={currentPage === page ? { color: "red" } : {}}
          key={page}
          onClick={(event) => {
            handlePageClick(event, page);
          }}
        >
          {page}
        </button>
      ))}

      <button type="button" style={nextButton} onClick={handleNextClick}>
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
