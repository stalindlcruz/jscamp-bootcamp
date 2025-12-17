/* Aquí va la lógica para mostrar los resultados de búsqueda */

const container = document.querySelector(".jobs-listings");

fetch("./data.json")
  .then((response) => {
    return response.json();
  })
  .then((jobs) => {
    /* 
    createDocumentFragment() lo que hace es crear un contenedor en memoria que sirve para almacenar todos los elementos del DOM que queremos pintar.
    Para que sirve esto? Para evitar re dibujar el HTML cada vez que insertamos un elemento dentro del forEach. Lo que hacemos es: agregamos los elementos en el contenedor virtual, y una vez estén todos, pintamos de una sola vez lo que hay en el contenedor sobre el DOM.
    Esto mejora bastante el rendimiento, sobre todo cuando tenemos muchos elementos :)
    */
    const documentFragment = document.createDocumentFragment()

    jobs.forEach((job) => {
      const list = document.createElement("li");
      const article = document.createElement("article");
      article.className = "job-listing-card";

      article.dataset.location = job.data.modalidad;
      article.dataset.nivel = job.data.nivel;
      article.dataset.input = job.titulo;
      article.dataset.technology = job.data.technology;

      article.innerHTML = `
      <div>
        <h3>${job.titulo}</h3>
        <small>${job.empresa} | ${job.ubicacion}</small>
        <p>${job.descripcion}</p>
      </div>
      <button class="button-apply-job">Aplicar</button>
      `;
      list.appendChild(article);
      documentFragment.appendChild(list)
    });
    
    container.appendChild(documentFragment);
  });
