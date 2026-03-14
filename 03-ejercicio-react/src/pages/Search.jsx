/* Pasa tu contenido de src/App.jsx aquí */
import { SearchForm } from "../components/SearchForm.jsx";
import { SearchResults } from "../components/SearchResults.jsx";

import { useSearch } from "../hooks/useSearch.jsx";

export function SearchPage() {
  const {
    jobs,
    totalJobs,
    loading,
    handleSearch,
    handleTextFilter,
    totalPages,
    currentPage,
    handlePageChange,
    handleReset,
    hasActiveFilters,
    error,
  } = useSearch();

  const tittle = `Resultados ${totalJobs}, Páginas ${currentPage}`;

  return (
    <>
      <main>
        <title>{tittle}</title>
        <SearchForm
          onSearch={handleSearch}
          onTextFilter={handleTextFilter}
          onReset={handleReset}
          hasActiveFilters={hasActiveFilters}
        />
        <SearchResults
          error={error}
          jobs={jobs}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          loading={loading}
        />
      </main>
    </>
  );
}
