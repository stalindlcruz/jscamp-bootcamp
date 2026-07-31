import { useId } from "react";
import { useSearchForm } from "../hooks/useSearch.jsx";

export function SearchFormSection({
  onTextFilter,
  onSearch,
  initialText,
  onReset,
  initialFilters,
  hasActiveFilters,
}) {
  const idText = useId();
  const idTechnology = useId();
  const idLocation = useId();
  const idExperienceLevel = useId();

  const { handleChange, handleClearInput, inputRef } = useSearchForm({
    idTechnology,
    idLocation,
    idExperienceLevel,
    idText,
    onSearch,
    onTextFilter,
    onReset,
  });

  // const [idKey, setIdKey] = useState(0);

  return (
    <section className="jobs-search">
      <h1>Encuentra tu próximo trabajo</h1>
      <p>Explora miles de oportunidades en el sector tecnológico.</p>

      <form
        onChange={handleChange}
        id="empleos-search-form"
        role="search"
        // key={idKey}
      >
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
            className="icon icon-tabler icons-tabler-outline icon-tabler-search"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>

          <input
            ref={inputRef}
            name={idText}
            id="empleos-search-input"
            type="text"
            role="searchbox"
            placeholder="Buscar trabajos, empresas o habilidades"
            defaultValue={initialText}
          />

          {hasActiveFilters() && (
            <button
              onClick={(event) => {
                handleClearInput(event);
                // setIdKey((prev) => prev + 1);
              }}
            >
              ✖︎
            </button>
          )}
        </div>

        <div className="search-filters">
          <select
            name={idTechnology}
            id="filter-technology"
            // aquí debería ir `value`, es el valor que va a tomar React para poder controlar el select. `defaultValue` es el value que se utiliza en los inputs no controlados de HTML. Siempre usa `value` en React para controlar el select.
            value={initialFilters.technology}
            onChange={handleChange}
          >
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

          <select
            name={idLocation}
            id="filter-location"
            value={initialFilters.location}
            onChange={handleChange}
          >
            <option value="">Ubicación</option>
            <option value="remoto">Remoto</option>
            <option value="cdmx">Ciudad de México</option>
            <option value="guadalajara">Guadalajara</option>
            <option value="monterrey">Monterrey</option>
            <option value="barcelona">Barcelona</option>
          </select>

          <select
            name={idExperienceLevel}
            id="filter-experience-level"
            value={initialFilters.experienceLevel}
            onChange={handleChange}
          >
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
