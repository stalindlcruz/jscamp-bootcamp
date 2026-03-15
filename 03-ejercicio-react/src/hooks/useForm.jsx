let timeoutId = null;

export function useForm({
  onSearch,
  onTextFilter,
  onReset,
  idText,
  idTechnology,
  idLocation,
  idExperience,
}) {
  const handleChange = (event) => {
    event.preventDefault();

    if (event.target.name === idText) {
      const text = event.target.value;

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        onTextFilter(text);
      }, 500);
    } else {
      const formData = new FormData(event.currentTarget);

      const filters = {
        technology: formData.get(idTechnology),
        location: formData.get(idLocation),
        experience: formData.get(idExperience),
      };

      onSearch(filters);
    }
  };

  const handleReset = () => {
    document.querySelector("#empleos-search-form").reset();
    onReset();
  };

  return {
    handleChange,
    handleReset,
  };
}
