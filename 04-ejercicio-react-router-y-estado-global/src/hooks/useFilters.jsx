import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const RESULTS_PER_PAGE = 4;

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Muy bien! Mira, podemos simplificarlo mucho más
  /* const [filters, setFilters] = useState(() => {
    const filters = {
      technology: "",
      location: "",
      experienceLevel: "",
    };

    const technology = searchParams.get("technology");
    if (technology) {
      filters.technology = technology;
    }

    const location = searchParams.get("location");
    if (location) {
      filters.location = location;
    }

    const experienceLevel = searchParams.get("experienceLevel");
    if (experienceLevel) {
      filters.experienceLevel = experienceLevel;
    }

    return filters;
  }); */

  // Aquí hacemos lo mismo pero de una manera más simplificada y fácil de leer
  const [filters, setFilters] = useState({
    technology: searchParams.get("technology") || "",
    location: searchParams.get("location") || "",
    experienceLevel: searchParams.get("experienceLevel") || "",
  });

  const [textToFilter, setTextToFilter] = useState(
    () => searchParams.get("text") || "",
  );

  const [currentPage, setCurrentPage] = useState(() => {
    const page = Number(searchParams.get("page"));
    if (page < 1) return 1;
    // Ojo que estaba mal implementado, si la página es NaN, debería ser 1, sino retornamos la página
    return Number.isNaN(page) ? 1 : page;
  });

  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        if (textToFilter) params.append("text", textToFilter);
        if (filters.technology) params.append("technology", filters.technology);
        if (filters.location) params.append("type", filters.location);
        if (filters.experienceLevel)
          params.append("level", filters.experienceLevel);

        const offset = (currentPage - 1) * RESULTS_PER_PAGE;
        params.append("limit", RESULTS_PER_PAGE);
        params.append("offset", offset);

        const queryParams = params.toString();

        const response = await fetch(
          `https://jscamp-api.vercel.app/api/jobs?${queryParams}`,
        );
        const json = await response.json();

        setJobs(json.data);
        setTotal(json.total);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching jobs:", error);
      } finally {
        // Muy bien aplicado el `finally` para el Loading
        setLoading(false);
      }
    }

    fetchJobs();
  }, [filters, currentPage, textToFilter]);

  useEffect(() => {
    // const params = new URLSearchParams();

    setSearchParams((params) => {
      // Excelente! Para evitar tantos if/else, podemos hacer una función que simplifique esto (es una alternativa que te quiero mostrar, lo que hiciste está perfecto)

      // Si ves lo comentado, queda mucho mas corto y claro

      /* const handleSetParamIfExists = (key, value) => {
        value ? params.set(key, value) : params.delete(key);
      };

      handleSetParamIfExists("text", textToFilter);
      handleSetParamIfExists("technology", filters.technology);
      handleSetParamIfExists("location", filters.location);
      handleSetParamIfExists("experienceLevel", filters.experienceLevel); */

      if (textToFilter) {
        params.set("text", textToFilter);
      } else {
        params.delete("text");
      }

      if (filters.technology) {
        params.set("technology", filters.technology);
      } else {
        params.delete("technology");
      }

      if (filters.location) {
        params.set("location", filters.location);
      } else {
        params.delete("location");
      }

      if (filters.experienceLevel) {
        params.set("experienceLevel", filters.experienceLevel);
      } else {
        params.delete("experienceLevel");
      }

      if (currentPage > 1) {
        params.set("page", currentPage);
      } else {
        params.delete("page");
      }

      return params;
    });
  }, [filters, currentPage, textToFilter, setSearchParams /* navigateTo */]);

  const totalPages = Math.ceil(total / RESULTS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (filters) => {
    setFilters(filters);
    setCurrentPage(1);
  };

  const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({
      technology: "",
      location: "",
      experienceLevel: "",
    });
    setCurrentPage(1);
  };

  const hasActiveFilters = () => {
    const hasTextFilter = textToFilter !== "";
    const hasFilters = Object.values(filters).some((value) => value !== "");

    return hasTextFilter || hasFilters;
  };

  return {
    loading,
    jobs,
    total,
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
  };
};
