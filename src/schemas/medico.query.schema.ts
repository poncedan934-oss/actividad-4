import { z } from "zod";

export const medicoQuerySchema = z.object({
    nombre: z.string().optional(),
    apellido: z.string().optional(),
    especialidad: z.string().optional(),
    matricula: z.string().optional()
});

export type MedicoQuery =
    z.infer<typeof medicoQuerySchema>;