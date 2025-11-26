/* Aquí va la lógica para filtrar los resultados de búsqueda */
const filterLocation = document.querySelector("#filter-location");

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
