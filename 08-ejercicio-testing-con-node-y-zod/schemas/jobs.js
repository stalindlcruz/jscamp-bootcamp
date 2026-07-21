import * as zod from "zod";

/*
 * Aquí debes crear el schema de validación con Zod para los jobs
 *
 * Recuerda:
 * - Importar zod
 * - Crear un schema que valide la estructura de un job
 * - Exportar funciones validateJob() y validatePartialJob()
 * - Usar safeParse() para validar sin lanzar excepciones
 * - Definir reglas de validación (min, max, required, optional, etc.)
 */

export const jobSchema = zod.object({
  titulo: zod
    .string({ error: "El título es requerido" })
    .min(3, "El título debe tener 3 o mas caracteres")
    .max(100, "El título debe tener menos de 100 caracteres"),
  empresa: zod
    .string({ error: "La empresa es requerida" })
    .min(3, "La empresa debe tener 3 o mas caracteres")
    .max(100, "La empresa debe tener menos de 100 caracteres"),
  ubicacion: zod
    .string({ error: "La ubicación es requerida" })
    .min(3, "La ubicación debe tener 3 o mas caracteres")
    .max(100, "La ubicación debe tener menos de 100 caracteres"),
  descripcion: zod.string().optional(),
  data: zod
    .object({
      technology: zod
        .array(zod.string().min(3, "La tecnología no puede estar vacía"))
        .min(1, "Debe tener al menos una tecnología"),
      modalidad: zod.string().optional(),
      nivel: zod.string().optional(),
    })
    .optional(),
  content: zod
    .object({
      description: zod.string().optional(),
      responsibilities: zod.string().optional(),
      requirements: zod.string().optional(),
      about: zod.string().optional(),
    })
    .optional()
    .nullable(),
});

export function validateJob(job) {
  return jobSchema.safeParse(job);
}

export function validatePartialJob(job) {
  return jobSchema.partial().safeParse(job);
}
