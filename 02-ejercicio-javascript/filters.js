/* Aquí va la lógica para filtrar los resultados de búsqueda */

/* 
Hola Stalin! Muy buena solución :)
Lo que vamos a hacer es unos cambios para que podamos aplicar filtros múltiples y no individuales.
Lo que quiero decir con esto es que:
- Cada vez que buscamos por el `input`, el filtro que pusimos en el select se pierde
- Cada vez que hacemos un filtro por un select, al agregar otro solo se aplica el último

Y esto pasa porque al aplicar un `change` en los `addEventListener`, aplicamos los filtros a la lista completa, y no solo a los resultados ya filtrados previamente.

Lo que haremos es, crear una función que funcione para filtrar los resultados teniendo en cuenta todos los filtros activos. Y luego llamarla desde cada `addEventListener`.
*/
const filterLocation = document.querySelector("#filter-location");
const filterExperience = document.querySelector("#filter-experience-level");
const filterTittle = document.querySelector("#empleos-search-input");
const filterTech = document.querySelector("#filter-technology");

const handleFilterJobsResults = () => {
  const locationValue = filterLocation.value;
  const experienceValue = filterExperience.value;
  const techValue = filterTech.value;
  const titleValue = filterTittle.value.toLowerCase().trim();
  
  const jobs = document.querySelectorAll(".job-listing-card");

  jobs.forEach((job) => {
    const location = job.dataset.location;
    const experience = job.dataset.nivel;
    const title = job.querySelector("h3").textContent.toLowerCase();
    const technologies = job.dataset.technology?.split(",") || [];

    // aplicamos los filtros en conjunto
    const locationMatch = locationValue === "" || locationValue === location;
    const experienceMatch = experienceValue === "" || experienceValue === experience;
    const titleMatch = titleValue === "" || title.includes(titleValue);
    const techMatch = techValue === "" || technologies.includes(techValue);

    const isShow = locationMatch && experienceMatch && titleMatch && techMatch;

    job.classList.toggle("is-hidden", !isShow);
  })

};

// llamamos a la función de filtrado cuando cambien los filtros
filterLocation?.addEventListener("change", handleFilterJobsResults);
filterExperience?.addEventListener("change", handleFilterJobsResults);
filterTech?.addEventListener("change", handleFilterJobsResults);
filterTittle?.addEventListener("input", handleFilterJobsResults);

// un extra es que evitemos recargar la página al presionar Enter en el input
const formContainer = document.getElementById("empleos-search-form");
formContainer?.addEventListener("submit", (e) => e.preventDefault());