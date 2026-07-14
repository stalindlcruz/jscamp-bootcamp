import { Router } from "express";
import { JobController } from "../controllers/jobs.js";
import { JobModel } from "../models/jobs.js";

export const jobsRouter = Router();

/* Aquí debe ir la lógica de tus rutas */
/* Recuerda que en tus rutas debes usar los controladores */
/* 
Deberás implementar:
- Obtener todos los jobs [GET]
- Obtener un job por id [GET]
- Crear un job [POST]
- Actualizar un job por id [PUT]
- Actualizar parcialmente un job por id [PATCH]
- Eliminar un job por id [DELETE]
*/

jobsRouter.get("/", JobController.getAll);
jobsRouter.get("/:id", JobController.getById);
jobsRouter.post("/", JobController.createJob);
jobsRouter.put("/:id", JobController.updateJob);
jobsRouter.patch("/:id", JobController.partiallyUpdateJob);
jobsRouter.delete("/:id", JobController.deleteJob);
