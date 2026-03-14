import { useState, useEffect } from "react";

const RESULTS_PER_PAGE = 5;

export function useSearch() {
  // const urlParams = new URLSearchParams(window.location.search);
  // const urlText = urlParams.get("text") || "";

  const [currentPage, setcurrentPage] = useState(1);

  const [filters, setFilters] = useState(() => {
    try {
      const savedFilters = localStorage.getItem("filterJobs");

      if (savedFilters) {
        return JSON.parse(savedFilters);
      }
    } catch (error) {
      console.error("Error al recuperar los filtros:", error);
    }

    return {
      technology: "",
      experience: "",
      location: "",
    };
  });

  const [textToFilter, setTextToFilter] = useState(() => {
    try {
      const savedText = localStorage.getItem("textStorage");
      if (savedText) {
        return JSON.parse(savedText);
      }
    } catch (error) {
      console.error("Error al recuperar el texto:", error);
    }

    return "";
  });

  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem("filterJobs", JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    localStorage.setItem("textStorage", JSON.stringify(textToFilter));
  }, [textToFilter]);

  useEffect(() => {
    setcurrentPage(1);
  }, [textToFilter, filters.technology, filters.location, filters.experience]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setError(null);
        setLoading(true);

        // delay 5 seconds
        // await new Promise((resolve) => setTimeout(resolve, 5000));

        const urlParams = new URLSearchParams();
        if (textToFilter) urlParams.append("text", textToFilter);
        if (filters.technology)
          urlParams.append("technology", filters.technology);
        if (filters.location) urlParams.append("type", filters.location);
        if (filters.experience) urlParams.append("level", filters.experience);

        const offset = (currentPage - 1) * RESULTS_PER_PAGE;
        urlParams.append("limit", RESULTS_PER_PAGE);
        urlParams.append("offset", offset);

        const queryParams = urlParams.toString();

        const response = await fetch(
          `https://jscamp-api.vercel.apsp/api/jobs?${queryParams}`,
        );

        if (!response.ok) {
          throw new Error(`Error al obtener los empleos: ${response.status}`);
        }

        const json = await response.json();

        setJobs(json.data);
        setTotalJobs(json.total);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [
    textToFilter,
    filters.technology,
    filters.location,
    filters.experience,
    currentPage,
  ]);

  const totalPages = Math.ceil(totalJobs / RESULTS_PER_PAGE);

  // const updateURL = (textToFilter, filters) => {
  //   const params = new URLSearchParams();

  //   if (textToFilter) {
  //     params.set("text", textToFilter);
  //   }

  //   if (filters.technology) {
  //     params.set("technology", filters.technology);
  //   }

  //   if (filters.location) {
  //     params.set("location", filters.location);
  //   }

  //   if (filters.experience) {
  //     params.set("experience", filters.experience);
  //   }

  //   const paramsString = params.toString();

  //   const newUrl = paramsString
  //     ? `${window.location.pathname}?${paramsString}`
  //     : window.location.pathname;

  //   window.history.replaceState({}, "", newUrl);
  // };

  const handlePageChange = (page) => {
    setcurrentPage(page);
  };

  const handleSearch = (filters) => {
    setFilters(filters);
    setcurrentPage(1);
    // updateURL(textToFilter, filters);
  };

  const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter);
    setcurrentPage(1);
    // updateURL(newTextToFilter, filters);
  };

  const handleReset = () => {
    setFilters({
      technology: "",
      experience: "",
      location: "",
    });
    setTextToFilter("");
    setcurrentPage(1);
    localStorage.removeItem("filterJobs");
    localStorage.removeItem("textStorage");
  };

  const hasActiveFilters = () => {
    const activeText = textToFilter !== "";
    const activeFilters = Object.values(filters).some(
      (filter) => filter !== "",
    );
    return activeText || activeFilters;
  };

  return {
    jobs,
    totalJobs,
    loading,
    currentPage,
    totalPages,
    handlePageChange,
    handleSearch,
    handleTextFilter,
    handleReset,
    hasActiveFilters,
    error,
  };
}
