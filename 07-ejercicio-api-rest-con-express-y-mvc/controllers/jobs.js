/* Aquí debe ir la lógica de tu controlador */

import { JobModel } from "../models/jobs.js";
import { DEFAULTS } from "../config.js";
import { error } from "node:console";

export class JobController {
  static async getAll(request, response) {
    const {
      title,
      text,
      technology,
      limit = DEFAULTS.LIMIT_PAGINATION,
      offset = DEFAULTS.LIMIT_OFFSET,
    } = request.query;

    const { total, jobs, limitNumber, offsetNumber } = await JobModel.getAll({
      title,
      text,
      technology,
      limit,
      offset,
    });

    return response.json({
      total,
      limit: limitNumber,
      offset: offsetNumber,
      data: jobs,
    });
  }

  static async getById(request, response) {
    const { id } = request.params;

    const jobById = await JobModel.getById(id);

    if (!jobById) {
      return response.status(404).json({ error: "Job Not Found" });
    }

    return response.status(200).json(jobById);
  }

  static async createJob(request, response) {
    const { titulo, empresa, ubicacion, descripcion, data, content } =
      request.body;

    if (
      !titulo ||
      !empresa ||
      !ubicacion ||
      !descripcion ||
      !data ||
      !content
    ) {
      return response
        .status(400)
        .json({ error: "Datos incompletos. Todos los campos son requeridos" });
    }

    const newJob = await JobModel.createJob({
      titulo,
      empresa,
      ubicacion,
      descripcion,
      data,
      content,
    });

    if (!newJob) {
      return response
        .status(500)
        .json({ error: "No se puede crear el trabajo" });
    }

    return response.status(201).json(newJob);
  }
}
