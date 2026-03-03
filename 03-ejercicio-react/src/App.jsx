import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { SearchForm } from "./components/SearchForm.jsx";
import { SearchResults } from "./components/SearchResults.jsx";

import data from "./data.json";
import { useState } from "react";

const RESULTS_PER_PAGE = 5;

function App() {
  const [currentPage, setcurrentPage] = useState(1);
  const [textToFilter, setTextToFilter] = useState("");
  const [filters, setFilters] = useState({
    technology: "",
    location: "",
    experience: "",
  });

  const jobsFilteredByFilters = data.filter((job) => {
    return (
      (filters.technology === "" ||
        job.data.technology.toLowerCase() ===
          filters.technology.toLowerCase()) &&
      (filters.location === "" ||
        job.data.modalidad.toLowerCase() === filters.location.toLowerCase()) &&
      (filters.experience === "" ||
        job.data.nivel.toLowerCase() === filters.experience.toLowerCase())
    );
  });

  const jobsWithTextFilter =
    textToFilter === ""
      ? jobsFilteredByFilters
      : jobsFilteredByFilters.filter((job) =>
          job.titulo.toLowerCase().includes(textToFilter.toLowerCase()),
        );

  const totalPages = Math.ceil(jobsWithTextFilter.length / RESULTS_PER_PAGE);

  const pageResults = jobsWithTextFilter.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE,
  );

  const handlePageChange = (page) => {
    setcurrentPage(page);
  };

  const handleSearch = (filters) => {
    setFilters(filters);
    setcurrentPage(1);
  };

  const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter);
    setcurrentPage(1);
  };

  const totalJobs = jobsWithTextFilter.length;
  const tittle = `Resultados ${totalJobs}, Página ${totalPages}`;

  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
}

export default App;
