import { z } from "zod";

export const medicoSchema = z.object({
    nombre: z
        .string()
        .min(2, "El nombre debe tener al menos 2 caracteres"),

    apellido: z
        .string()
        .min(2, "El apellido debe tener al menos 2 caracteres"),

    especialidad: z
        .string()
        .min(3, "La especialidad debe tener al menos 3 caracteres"),

    matricula: z
        .string()
        .min(3, "La matrícula debe tener al menos 3 caracteres")
});

export type MedicoInput = z.infer<typeof medicoSchema>;