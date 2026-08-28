import crypto from "node:crypto";
import { db } from "../db/database";
import type {
  CreateJobDTO,
  Job,
  JobFilters,
  JobRow,
  UpdateJobDTO,
} from "../types";

/* Esto lo usamos en `getAll` y en `getById`. Así que lo pasamos a una variable para simplificar y reutilizar */
const BASE_QUERY = `
  SELECT j.*,
         GROUP_CONCAT(jt.technology, ' | ') AS technologies,
         jc.description AS content_description,
         jc.responsibilities, jc.requirements, jc.about
  FROM jobs j
  LEFT JOIN job_technologies jt ON j.id = jt.job_id
  LEFT JOIN job_content jc ON j.id = jc.job_id
`;

/* Con esto parseamos los las filas de BBDD a el formato Job que está usando la aplicación. */
/* Había un error en las technology, si no existían se rompía el código por hacer un split de algo que no existe. Mejoramos eso */
function mapRowToJob(row: JobRow): Job {
  return {
    id: row.id,
    title: row.title,
    company: row.company,
    location: row.location,
    description: row.description,
    data: {
      technology: (row.technologies ?? "").split(" | ").filter(Boolean),
      modality: row.modality,
      level: row.level,
    },
    content: row.content_description
      ? {
          description: row.content_description,
          responsibilities: row.responsibilities,
          requirements: row.requirements,
          about: row.about,
        }
      : undefined,
  };
}

// Preparamos las consultas una sola vez al arrancar el servidor. "prepare" es lento, y antes se preparaban dentro de todas las funciones
const insertJobStmt = db.prepare(`
  INSERT INTO jobs (id, title, company, location, description, modality, level)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

// Usamos OR IGNORE por si nos llega una technology repetida. En vez de fallar simplemente lo ignora
const insertTechStmt = db.prepare(`
  INSERT OR IGNORE INTO job_technologies (job_id, technology)
  VALUES (?, ?)
`);

// Guardamos el contenido, y si falla, si queremos que devuelva un error
const insertContentStmt = db.prepare(`
  INSERT INTO job_content (id, job_id, description, responsibilities, requirements, about)
  VALUES (?, ?, ?, ?, ?, ?)
`);

export class JobModel {
  static async getAll(filters?: JobFilters): Promise<Job[]> {
    // TODO: Debemos hacer la consulta a la base de datos para obtener todos los resultados, y por cada filtro, debemos agregarlo a la consulta
   /*  const techsQuery = `GROUP_CONCAT(jt.technology, ' | ') AS technologies`;
    const contentQuery = `jc.description AS content_description, jc.responsibilities, jc.requirements, jc.about`;
    let dbQuery = `
    SELECT j.*, ${techsQuery}, ${contentQuery} FROM jobs j
    LEFT JOIN job_technologies jt ON j.id = jt.job_id
    LEFT JOIN job_content jc ON j.id = jc.job_id
    `; */
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

    // Si hay filtros los unimos con WHERE; si no hay, no se agrega nada
    const where = conditions.length ? ` WHERE ${conditions.join(" AND ")}` : "";

    const rows = db
      .prepare<unknown[], JobRow>(`${BASE_QUERY}${where} GROUP BY j.id`)
      .all(...params);

    return rows.map(mapRowToJob);
  }
  static async getById(id: string): Promise<Job | undefined> {
    // TODO: Debemos hacer la consulta a la base de datos para obtener el job por ID
    /* const techsQuery = `GROUP_CONCAT(jt.technology, ' | ') AS technologies`;
    const contentQuery = `jc.description AS content_description, jc.responsibilities, jc.requirements, jc.about`;
    let dbQuery = `
    SELECT j.*, ${techsQuery}, ${contentQuery} FROM jobs j
    LEFT JOIN job_technologies jt ON j.id = jt.job_id
    LEFT JOIN job_content jc ON j.id = jc.job_id
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
      content: job.content_description
        ? {
            description: job.content_description,
            responsibilities: job.responsibilities,
            requirements: job.requirements,
            about: job.about,
          }
        : undefined,
    }; */
    const row = db
      .prepare<string[], JobRow>(`${BASE_QUERY} WHERE j.id = ? GROUP BY j.id`)
      .get(id);

    return row ? mapRowToJob(row) : undefined;
  }

  // Crear un nuevo job
  static async create(input: CreateJobDTO): Promise<Job> {
    const newJob: Job = {
      id: crypto.randomUUID(),
      ...input,
    };

    // TODO: Debemos insertar el job en la base de datos
    /* const insertJob = db.prepare(`
    INSERT OR IGNORE INTO jobs (id, title, company, location, description, modality, level)
    VALUES (?, ?, ?, ?, ?, ?, ?); `);

    const inserTechs = db.prepare(`
    INSERT OR IGNORE INTO job_technologies (job_id, technology)
    VALUES (?, ?); `);

    const insertContent = db.prepare(`
    INSERT OR IGNORE INTO job_content (id, job_id, description, responsibilities, requirements, about)
    VALUES (?, ?, ?, ?, ?, ?); `); */

    const transaction = db.transaction(() => {
      insertJobStmt.run(
        newJob.id,
        newJob.title,
        newJob.company,
        newJob.location,
        newJob.description,
        newJob.data.modality,
        newJob.data.level,
      );

      newJob.data.technology.forEach((tech) => {
        insertTechStmt.run(newJob.id, tech);
      });

      if (newJob.content) {
        insertContentStmt.run(
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
    // Buscamos el job primero, sin tocar nada todavía
    const exists = db
      .prepare<string[], unknown>(`SELECT 1 FROM jobs WHERE id = ?`)
      .get(id);

    if (!exists) {
      return null;
    }

    const applyUpdate = db.transaction(() => {
      const conditions: string[] = [];
      const params: unknown[] = [];

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
        params.push(id);

        db.prepare<unknown[], JobRow>(
          `UPDATE jobs SET ${conditions.join(", ")} WHERE id = ?`,
        ).run(...params);
      }

      if (input.data?.technology) {
        // Borramos las tecnologías viejas y metemos las nuevas, pero todo dentro de la misma transacción (si algo falla deshacemos todo lo que se hizo dentro de la transaction)
        db.prepare(`DELETE FROM job_technologies WHERE job_id = ?`).run(id);

        input.data.technology.forEach((tech) => {
          insertTechStmt.run(id, tech);
        });
      }
    });

    applyUpdate();

    const updatedJob = await JobModel.getById(id);

    return updatedJob ?? null;
  }
}
