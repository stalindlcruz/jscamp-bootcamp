import { useState } from "react";
import data from "../data.json";

const RESULTS_PER_PAGE = 5;

export function useSearch() {
  // const urlParams = new URLSearchParams(window.location.search);
  // const urlText = urlParams.get("text") || "";

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

  const updateURL = (textToFilter, filters) => {
    const params = new URLSearchParams();

    if (textToFilter) {
      params.set("text", textToFilter);
    }

    if (filters.technology) {
      params.set("technology", filters.technology);
    }

    if (filters.location) {
      params.set("location", filters.location);
    }

    if (filters.experience) {
      params.set("experience", filters.experience);
    }

    const paramsString = params.toString();

    const newUrl = paramsString
      ? `${window.location.pathname}?${paramsString}`
      : window.location.pathname;

    window.history.replaceState({}, "", newUrl);
  };

  const handlePageChange = (page) => {
    setcurrentPage(page);
  };

  const handleSearch = (filters) => {
    setFilters(filters);
    setcurrentPage(1);
    updateURL(textToFilter, filters);
  };

  const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter);
    setcurrentPage(1);
    updateURL(newTextToFilter, filters);
  };

  const totalJobs = jobsWithTextFilter.length;
  const tittle = `Resultados ${totalJobs}, Página ${totalPages}`;

  return {
    currentPage,
    totalPages,
    pageResults,
    handlePageChange,
    handleSearch,
    handleTextFilter,
    tittle,
  };
}
