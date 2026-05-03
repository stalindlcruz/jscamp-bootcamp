import { Pagination } from "../components/Pagination.jsx";
import { SearchFormSection } from "../components/SearchFormSection.jsx";
import { JobListings } from "../components/JobListings.jsx";
import { useRouter } from "../hooks/useRouter.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

import { useFilters } from "../hooks/useFilters.jsx";

export default function SearchPage() {
  const {
    jobs,
    total,
    loading,
    totalPages,
    currentPage,
    textToFilter,
    filters,
    error,
    handlePageChange,
    handleSearch,
    handleTextFilter,
    handleReset,
    hasActiveFilters,
  } = useFilters();

  const title = loading
    ? "Cargando - DevJobs"
    : error
      ? "Error al cargar los trabajos"
      : `Resultados: ${total}, Página ${currentPage} - DevJobs`;

  return (
    <main>
      <title>{title}</title>
      <meta
        name="description"
        content="Explora miles de oportunidades laborales en el sector tecnológico. Encuentra tu próximo empleo en DevJobs."
      />

      <SearchFormSection
        initialText={textToFilter}
        initialFilters={filters}
        onSearch={handleSearch}
        onTextFilter={handleTextFilter}
        onReset={handleReset}
        hasActiveFilters={hasActiveFilters}
      />

      <section>
        <h2 style={{ textAlign: "center" }}>Resultados de búsqueda</h2>

        {loading ? (
          <LoadingSpinner text="Cargando empleos" />
        ) : (
          <JobListings jobs={jobs} />
        )}
        {!loading && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </main>
  );
}
