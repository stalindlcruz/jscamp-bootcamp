import { useId } from "react";

import styles from "./SearchForm.module.css";

let timeoutId = null;

export function SearchForm({
  onSearch,
  onTextFilter,
  onReset,
  hasActiveFilters,
}) {
  const idText = useId();
  const idTechnology = useId();
  const idLocation = useId();
  const idExperience = useId();

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

  return (
    <section className="jobs-search">
      <h1>Encuentra tu próximo trabajo</h1>
      <p>Explora miles de oportunidades en el sector tecnológico.</p>

      <form onChange={handleChange} id="empleos-search-form" role="search">
        <div className="search-bar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>

          <input
            id="empleos-search-input"
            type="text"
            name={idText}
            placeholder="Buscar trabajos, empresas o habilidades"
          />

          {hasActiveFilters() && (
            <button
              className={styles.resetButton}
              type="button"
              onClick={handleReset}
            >
              Resetear
            </button>
          )}
        </div>

        <div className="search-filters">
          <select name={idTechnology} id="filter-technology">
            <option value="">Tecnología</option>
            <optgroup label="Tecnologías populares">
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="react">React</option>
              <option value="nodejs">Node.js</option>
            </optgroup>
            <option value="java">Java</option>
            <hr />
            <option value="csharp">C#</option>
            <option value="c">C</option>
            <option value="c++">C++</option>
            <hr />
            <option value="ruby">Ruby</option>
            <option value="php">PHP</option>
          </select>

          <select name={idLocation} id="filter-location">
            <option value="">Ubicación</option>
            <option value="remoto">Remoto</option>
            <option value="cdmx">Ciudad de México</option>
            <option value="guadalajara">Guadalajara</option>
            <option value="monterrey">Monterrey</option>
            <option value="barcelona">Barcelona</option>
            <option value="valencia">Valencia</option>
            <option value="madrid">Madrid</option>
          </select>

          <select name={idExperience} id="filter-experience-level">
            <option value="">Nivel de experiencia</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-level</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
          </select>
        </div>
      </form>

      <span id="filter-selected-value"></span>
    </section>
  );
}
