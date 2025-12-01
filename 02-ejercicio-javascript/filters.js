/* Aquí va la lógica para filtrar los resultados de búsqueda */
const filterLocation = document.querySelector("#filter-location");
const filterExperience = document.querySelector("#filter-experience-level");
const filterTittle = document.querySelector("#empleos-search-input");
const filterTech = document.querySelector("#filter-technology");

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

filterTittle?.addEventListener("input", () => {
  const jobs = Array.from(document.querySelectorAll(".job-listing-card"));
  const inputValue = filterTittle.value.toLowerCase().trim();

  const filteredJobs = jobs.filter((job) => {
    const tittle = job.dataset.input.toLowerCase();
    return tittle.includes(inputValue);
  });

  jobs.forEach((job) => job.classList.add("is-hidden"));

  filteredJobs.forEach((job) => job.classList.remove("is-hidden"));
});

filterTech?.addEventListener("change", () => {
  const jobs = document.querySelectorAll(".job-listing-card");
  const selectedValue = filterTech.value;

  jobs.forEach((job) => {
    const techData = job.dataset.technology;

    if (!techData) return;

    let technologyArray;

    try {
      technologyArray = JSON.parse(techData);
      if (!Array.isArray(technologyArray)) throw new Error();
    } catch {
      technologyArray = techData.split(",").map((t) => t.trim());
    }

    if (selectedValue === "" || technologyArray.includes(selectedValue)) {
      job.classList.remove("is-hidden");
    } else {
      job.classList.add("is-hidden");
    }
  });
});
