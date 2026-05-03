export function usePagination(currentPage, totalPages, onPageChange) {
  // generar un array de páginas a mostrar
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const stylePrevButton = isFirstPage
    ? { pointerEvents: "none", opacity: 0.5 }
    : {};
  const styleNextButton = isLastPage
    ? { pointerEvents: "none", opacity: 0.5 }
    : {};

  const handlePrevClick = (event) => {
    event.preventDefault();
    if (isFirstPage === false) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = (event) => {
    event.preventDefault();
    if (isLastPage === false) {
      onPageChange(currentPage + 1);
    }
  };

  const handleChangePage = (event) => {
    event.preventDefault();
    const page = Number(event.target.dataset.page);

    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const buildPageUrl = (page) => {
    const url = new URL(window.location);
    url.searchParams.set("page", page);
    return `${url.pathname}?${url.searchParams.toString()}`;
  };

  return {
    pages,
    stylePrevButton,
    styleNextButton,
    handlePrevClick,
    handleNextClick,
    handleChangePage,
    buildPageUrl,
  };
}
