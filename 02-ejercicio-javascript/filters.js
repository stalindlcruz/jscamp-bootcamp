/* Aquí va la lógica para filtrar los resultados de búsqueda */
const filterLocation = document.querySelector("#filter-location");
const filterExperience = document.querySelector("#filter-experience-level");

filterLocation?.addEventListener("change", () => {
  const jobs = document.querySelectorAll(".job-listing-card");
  const selectedValue = filterLocation.value;

  jobs.forEach((job) => {
    const location = job.dataset.location;

    if (selectedValue === "" || selectedValue === location) {
      job.classList.remove("is-hidden");
    } else {
      job.classList.add("is-hidden");
    }
  });
});

filterExperience?.addEventListener("change", () => {
  const jobs = document.querySelectorAll(".job-listing-card");
  const selectedValue = filterExperience.value;

  jobs.forEach((job) => {
    const experience = job.dataset.nivel;

    if (selectedValue === "" || selectedValue === experience) {
      job.classList.remove("is-hidden");
    } else {
      job.classList.add("is-hidden");
    }
  });
});
