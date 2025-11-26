/* Aquí va la lógica para mostrar los resultados de búsqueda */

const container = document.querySelector(".jobs-listings");

fetch("./data.json")
  .then((response) => {
    return response.json();
  })
  .then((jobs) => {
    jobs.forEach((job) => {
      const list = document.createElement("li");
      const article = document.createElement("article");
      article.className = "job-listing-card";

      article.dataset.location = job.data.modalidad;
      article.dataset.nivel = job.data.nivel;

      article.innerHTML = `
      <div>
        <h3>${job.titulo}</h3>
        <small>${job.empresa} | ${job.ubicacion}</small>
        <p>${job.descripcion}</p>
      </div>
      <button class="button-apply-job">Aplicar</button>
      `;
      list.appendChild(article);
      container.appendChild(list);
    });
  });
