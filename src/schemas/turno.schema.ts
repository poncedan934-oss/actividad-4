import { z } from "zod";

export const turnoSchema = z.object({
    fecha: z
        .string()
        .min(1, "La fecha es obligatoria"),

    hora: z
        .string()
        .min(1, "La hora es obligatoria"),

    paciente: z
        .string()
        .min(2, "El paciente debe tener al menos 2 caracteres"),

    documento: z
        .number()
        .int("El documento debe ser un número entero")
        .positive("El documento debe ser un número positivo"),

    especialidad: z
        .string()
        .min(3, "La especialidad debe tener al menos 3 caracteres"),

    confirmado: z
        .boolean()
        .optional()
});

export type TurnoInput = z.infer<typeof turnoSchema>;
