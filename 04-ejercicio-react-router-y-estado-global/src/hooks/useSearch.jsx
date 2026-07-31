import { useState, useRef } from "react";

export const useSearchForm = ({
  idTechnology,
  idLocation,
  idExperienceLevel,
  idText,
  onSearch,
  onTextFilter,
  onReset,
}) => {
  const [searchText, setSearchText] = useState("");
  const timeoutId = useRef(null);
  const inputRef = useRef();

  const handleChange = (event) => {
    event.preventDefault();

    if (event.target.name === idText) {
      const text = event.target.value;
      setSearchText(text); //actualizamos el input inmediatamente

      // Debounce
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }

      timeoutId.current = setTimeout(() => {
        onTextFilter(text);
      }, 500);
    } else {
      const formData = new FormData(event.target.form);

      const filters = {
        technology: formData.get(idTechnology),
        location: formData.get(idLocation),
        experienceLevel: formData.get(idExperienceLevel),
      };

      onSearch(filters);
    }
  };

  const handleClearInput = (event) => {
    event.preventDefault();

    inputRef.current.value = "";
    onTextFilter("");
    onReset();
  };

  return {
    inputRef,
    searchText,
    handleChange,
    handleClearInput,
  };
};
