import { z } from "zod";

const booleanQuery =
    z.enum(["true", "false"])
        .transform(value => value === "true");

export const turnoQuerySchema = z.object({
    fecha: z.string().optional(),
    hora: z.string().optional(),
    paciente: z.string().optional(),
    documento: z.coerce.number().int().positive().optional(),
    especialidad: z.string().optional(),
    confirmado: booleanQuery.optional()
});

export type TurnoQuery =
    z.infer<typeof turnoQuerySchema>;
