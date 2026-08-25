import crypto from "node:crypto";
import type {
  Job,
  CreateJobDTO,
  UpdateJobDTO,
  JobFilters,
  JobRow,
} from "../types";
import { db } from "../db/database";

export class JobModel {
  // Obtener todos los jobs con filtros opcionales
  static async getAll(filters?: JobFilters): Promise<Job[]> {
    // TODO: Debemos hacer la consulta a la base de datos para obtener todos los resultados, y por cada filtro, debemos agregarlo a la consulta

    const techsQuery = `GROUP_CONCAT(jt.technology, ' | ') AS technologies`;
    const contentQuery = `jc.description AS content_description, jc.responsibilities, jc.requirements, jc.about`;
    let dbQuery = `
    SELECT j.*, ${techsQuery}, ${contentQuery} FROM jobs j
    INNER JOIN job_technologies jt ON j.id = jt.job_id
    INNER JOIN job_content jc ON j.id = jc.job_id
    `;

    const conditions: string[] = [];
    const params: unknown[] = [];

    if (filters?.tech) {
      conditions.push(
        `? IN (SELECT jt2.technology FROM job_technologies jt2 WHERE jt2.job_id = j.id)`,
      );
      params.push(filters.tech);
    }

    if (filters?.modality) {
      conditions.push(`j.modality = ?`);
      params.push(filters.modality);
    }

    if (filters?.level) {
      conditions.push(`j.level = ?`);
      params.push(filters.level);
    }

    if (conditions.length > 0) {
      dbQuery = `${dbQuery} WHERE ${conditions.join(" AND ")}`;
    }

    dbQuery = `${dbQuery} GROUP BY j.id`;

    const dbResult = db.prepare<unknown[], JobRow>(dbQuery).all(...params);

    const jobs = dbResult.map((job) => ({
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      description: job.description,
      data: {
        technology: job.technologies.split(" | "),
        modality: job.modality,
        level: job.level,
      },
      content: {
        description: job.content_description,
        responsibilities: job.responsibilities,
        requirements: job.requirements,
        about: job.about,
      },
    }));

    return jobs;
  }

  // Obtener un job por ID
  static async getById(id: string): Promise<Job | undefined> {
    // TODO: Debemos hacer la consulta a la base de datos para obtener el job por ID

    const techsQuery = `GROUP_CONCAT(jt.technology, ' | ') AS technologies`;
    const contentQuery = `jc.description AS content_description, jc.responsibilities, jc.requirements, jc.about`;
    let dbQuery = `
    SELECT j.*, ${techsQuery}, ${contentQuery} FROM jobs j
    INNER JOIN job_technologies jt ON j.id = jt.job_id
    INNER JOIN job_content jc ON j.id = jc.job_id
    WHERE j.id = ?
    GROUP BY j.id
    `;

    const job = db.prepare<string[], JobRow>(dbQuery).get(id);

    if (!job) {
      return undefined;
    }

    return {
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      description: job.description,
      data: {
        technology: job.technologies.split(" | "),
        modality: job.modality,
        level: job.level,
      },
      content: {
        description: job.content_description,
        responsibilities: job.responsibilities,
        requirements: job.requirements,
        about: job.about,
      },
    };
  }

  // Crear un nuevo job
  static async create(input: CreateJobDTO): Promise<Job> {
    const newJob: Job = {
      id: crypto.randomUUID(),
      ...input,
    };

    // TODO: Debemos insertar el job en la base de datos
    const insertJob = db.prepare(`
    INSERT OR IGNORE INTO jobs (id, title, company, location, description, modality, level)
    VALUES (?, ?, ?, ?, ?, ?, ?); `);

    const inserTechs = db.prepare(`
    INSERT OR IGNORE INTO job_technologies (job_id, technology)
    VALUES (?, ?); `);

    const insertContent = db.prepare(`
    INSERT OR IGNORE INTO job_content (id, job_id, description, responsibilities, requirements, about)
    VALUES (?, ?, ?, ?, ?, ?); `);

    const transaction = db.transaction(() => {
      insertJob.run(
        newJob.id,
        newJob.title,
        newJob.company,
        newJob.location,
        newJob.description,
        newJob.data.modality,
        newJob.data.level,
      );

      newJob.data.technology.forEach((tech) => {
        inserTechs.run(newJob.id, tech);
      });

      if (newJob.content) {
        insertContent.run(
          crypto.randomUUID(),
          newJob.id,
          newJob.content.description,
          newJob.content.responsibilities,
          newJob.content.requirements,
          newJob.content.about,
        );
      }
    });

    transaction();

    return newJob;
  }

  // Eliminar un job
  static async delete(id: string): Promise<boolean> {
    // TODO: Debemos eliminar el job de la base de datos
    const result = db.prepare(`DELETE FROM jobs WHERE id = ?`).run(id);

    if (result.changes > 0) {
      return true;
    }

    return false;
  }

  // Actualizar un job
  static async update(id: string, input: UpdateJobDTO): Promise<Job | null> {
    // TODO: Debemos actualizar el job en la base de datos
    const conditions: string[] = [];
    const params: unknown[] = [];

    let dbQuery = `UPDATE jobs SET `;

    if (input.title) {
      conditions.push(`title = ?`);
      params.push(input.title);
    }

    if (input.company) {
      conditions.push(`company = ?`);
      params.push(input.company);
    }

    if (input.location) {
      conditions.push(`location = ?`);
      params.push(input.location);
    }

    if (input.description) {
      conditions.push(`description = ?`);
      params.push(input.description);
    }

    if (input.data?.modality) {
      conditions.push(`modality = ?`);
      params.push(input.data.modality);
    }

    if (input.data?.level) {
      conditions.push(`level = ?`);
      params.push(input.data.level);
    }

    if (conditions.length > 0) {
      dbQuery = `${dbQuery} ${conditions.join(", ")} WHERE id = ?`;
      params.push(id);

      db.prepare<unknown[], JobRow>(dbQuery).run(...params);
    }

    if (input.data?.technology) {
      db.prepare(`DELETE FROM job_technologies WHERE job_id = ?`).run(id);

      const insertTech = db.prepare(
        `INSERT INTO job_technologies (job_id, technology) VALUES (?, ?)`,
      );
      input.data.technology.forEach((tech) => {
        insertTech.run(id, tech);
      });
    }

    const updatedJob = await JobModel.getById(id);

    return updatedJob ?? null;
  }
}
