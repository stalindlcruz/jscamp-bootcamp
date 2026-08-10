/* En este archivo deberás tipar las interfaces de los servicios de búsqueda y aplicación a empleo */
import type { Job } from "./objects.ts";

import type {
  ExperienceLevel,
  Technology,
  ApplicationStatus,
} from "./types.ts";

import {
  filterByExperience,
  filterByMinSalary,
  filterByTechnology,
  searchJobs,
} from "./functions.ts";

// Interface para servicios de búsqueda
export interface JobSearchService {
  /* Deberás definir los tipos de las funciones */
  searchJobs: (jobs: Array<Job>, text: string) => Array<Job>;
  filterByExperience: (jobs: Array<Job>, level: ExperienceLevel) => Array<Job>;
  filterByMinSalary: (jobs: Array<Job>, minSalary: number) => Array<Job>;
  filterByTechnology: (jobs: Array<Job>, tech: Technology) => Array<Job>;
}

export const searchService: JobSearchService = {
  searchJobs,
  filterByExperience,
  filterByMinSalary,
  filterByTechnology,
};

// Interface para aplicación a empleo
export interface JobApplication {
  id: string;
  jobId: string;
  candidateId: string;
  status: ApplicationStatus;
  appliedDate: Date;
  coverLetter?: string;
}

// Interface que extiende Job con propiedades adicionales
export interface DetailedJob extends Job {
  benefits: string[];
  requirements: string[];
  applicationDeadline?: Date;
}
