/* Pasa tu contenido de src/App.jsx aquí */
import { SearchForm } from "../components/SearchForm.jsx";
import { SearchResults } from "../components/SearchResults.jsx";

import { useSearch } from "../hooks/useSearch.jsx";

export function SearchPage() {
  const {
    tittle,
    handleSearch,
    handleTextFilter,
    pageResults,
    totalPages,
    currentPage,
    handlePageChange,
  } = useSearch();

  return (
    <>
      <main>
        <title>{tittle}</title>
        <SearchForm onSearch={handleSearch} onTextFilter={handleTextFilter} />
        <SearchResults
          pageResults={pageResults}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </main>
    </>
  );
}
