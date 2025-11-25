/* Aquí va la lógica para dar funcionalidad al botón de "Aplicar" */

const jobsListings = document.querySelector(".jobs-listings");

jobsListings?.addEventListener("click", (event) => {
  const element = event.target;

  if (element.matches("button")) {
    element.textContent = "Aplicado!";
    element.classList.add("is-applied");
    element.disabled = true;
  }
});
