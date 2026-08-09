/* Aquí deberás usar los tipos creados en los ejercicios anteriores para definir los tipos de los parámetros y el valor de retorno de las funciones */

import type { Job } from "./objects.ts";
import type { ExperienceLevel, Technology } from "./types.ts";

export function filterByExperience(
  jobs: Array<Job>,
  level: ExperienceLevel,
): Array<Job> {
  return jobs.filter((job) => job.experienceLevel === level);
}

// Función para filtrar por tecnología
export function filterByTechnology(
  jobs: Array<Job>,
  tech: Technology,
): Array<Job> {
  return jobs.filter((job) => job.technologies.includes(tech));
}

// Función para filtrar por salario mínimo
export function filterByMinSalary(
  jobs: Array<Job>,
  minSalary: number,
): Array<Job> {
  return jobs.filter(
    (job) => job.salary !== undefined && job.salary >= minSalary,
  );
}

// Función para buscar por texto
export function searchJobs(jobs: Array<Job>, searchTerm: string): Array<Job> {
  const term = searchTerm.toLowerCase();
  return jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(term) ||
      job.description.toLowerCase().includes(term),
  );
}
