import { useState, useEffect } from "react";
import { useRouter } from "./useRouter";

const RESULTS_PER_PAGE = 5;

export function useSearch() {
  const { navigateTo } = useRouter();

  const [currentPage, setcurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParams = params.get("page");

    if (!pageParams) {
      return 1;
    }

    const page = Number(pageParams);

    if (Number.isNaN(page) || page < 1) {
      return 1;
    }

    return page;
  });

  const [filters, setFilters] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);

    try {
      const savedFilters = localStorage.getItem("filterJobs");

      if (savedFilters) {
        return JSON.parse(savedFilters);
      }
    } catch (error) {
      console.error("Error al recuperar los filtros:", error);
    }

    return {
      technology: urlParams.get("technology") || "",
      experience: urlParams.get("level") || "",
      location: urlParams.get("type") || "",
    };
  });

  const [textToFilter, setTextToFilter] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlText = params.get("text");

      const savedText = localStorage.getItem("textStorage");

      if (urlText) {
        return urlText;
      } else if (savedText) {
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
          `https://jscamp-api.vercel.app/api/jobs?${queryParams}`,
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

  useEffect(() => {
    const params = new URLSearchParams();

    if (textToFilter) params.append("text", textToFilter);
    if (filters.technology) params.append("technology", filters.technology);
    if (filters.location) params.append("type", filters.location);
    if (filters.experience) params.append("level", filters.experience);
    if (currentPage > 1) params.append("page", currentPage);

    const paramsString = params.toString();

    const newUrl = paramsString
      ? `${window.location.pathname}?${paramsString}`
      : window.location.pathname;

    navigateTo(newUrl);
  }, [
    filters.technology,
    filters.location,
    filters.experience,
    textToFilter,
    currentPage,
    navigateTo,
  ]);

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
    textToFilter,
    filters,
  };
}
