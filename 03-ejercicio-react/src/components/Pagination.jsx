import styles from "./Pagination.module.css";

export function Pagination({ totalPages = 10, currentPage = 1, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const prevButton = isFirstPage ? { pointerEvents: "none", opacity: 0.5 } : {};
  const nextButton = isLastPage ? { pointerEvents: "none", opacity: 0.5 } : {};

  const handlePrevClick = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (event, page) => {
    event.preventDefault();
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <nav className="pagination">
      <button
        className={`${styles.btn} ${styles.btnLastNext}`}
        type="button"
        style={prevButton}
        onClick={handlePrevClick}
      >
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
          className={`${styles.btn} ${currentPage === page ? styles.isActive : ""}`}
          key={page}
          onClick={(event) => {
            handlePageClick(event, page);
          }}
        >
          {page}
        </button>
      ))}

      <button
        className={`${styles.btn} ${styles.btnLastNext}`}
        type="button"
        style={nextButton}
        onClick={handleNextClick}
      >
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
