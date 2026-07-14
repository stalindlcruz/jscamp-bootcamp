import jobs from "../jobs.json" with { type: "json" };

/* Aquí deberá ir la lógica de tu modelo */
/* Recuerda que el modelo SOLO debe manejar la lógica de los datos, en este caso nuestro JSON */

export class JobModel {
  static async getAll({ title, text, technology, limit, offset }) {
    let filteredJobs = jobs;

    if (title) {
      const valueTitle = title.toLowerCase();

      filteredJobs = filteredJobs.filter((job) =>
        job.titulo.toLowerCase().includes(valueTitle),
      );
    }

    if (text) {
      const searchText = text.toLowerCase();

      filteredJobs = filteredJobs.filter((job) =>
        job.descripcion.toLowerCase().includes(searchText),
      );
    }

    if (technology) {
      const valueTech = technology.toLowerCase();

      filteredJobs = filteredJobs.filter((job) =>
        job.data.technology.includes(valueTech.toLowerCase()),
      );
    }

    const limitNumber = Number(limit);
    const offsetNumber = Number(offset);

    const paginatedJobs = filteredJobs.slice(
      offsetNumber,
      offsetNumber + limitNumber,
    );

    return {
      total: paginatedJobs.length,
      jobs: paginatedJobs,
      limitNumber,
      offsetNumber,
    };
  }

  static async getById(id) {
    const job = jobs.find((job) => job.id === id);
    return job;
  }
}
