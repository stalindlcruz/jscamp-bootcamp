export function usePagination({ totalPages, currentPage, onPageChange }) {
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

  return {
    pages,
    prevButton,
    nextButton,
    handlePrevClick,
    handleNextClick,
    handlePageClick,
  };
}
