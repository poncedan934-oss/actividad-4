import { Request, Response } from "express";

import { TurnosService } from "./services/turnos.services";

import { turnoQuerySchema } from "../../schemas/turno.query.schema";

import { turnoSchema } from "../../schemas/turno.schema";

import { AppError } from "../../errors/app.error";

import { Turnos } from "./services/models/turnos";

import { z } from "zod";

export type TurnoInput = z.infer<typeof turnoSchema>;

export class TurnosController {

    constructor(
        private service: TurnosService
    ) {}

    obtenerTodos = async (
        req: Request,
        res: Response
    ): Promise<void> => {

        try {

            const resultado =
                turnoQuerySchema.safeParse(req.query);

            if (!resultado.success) {

                throw new AppError(
                    "Los parámetros de búsqueda no son válidos",
                    400
                );
            }

            const turnos =
                await this.service.obtenerTodos(
                    resultado.data
                );

            res.status(200).json({
                estado: "EXITOSO",
                data: turnos
            });

        } catch (error) {

            if (error instanceof AppError) {

                res.status(error.statusCode).json({
                    error: error.message
                });

                return;
            }

            console.error(
                "ERROR OBTENER TURNOS:",
                error
            );

            res.status(500).json({
                error: "Error al obtener turnos"
            });
        }
    };

    obtenerPorId = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError("El ID debe ser un entero positivo", 400);
        }

        const turno = await this.service.obtenerPorId(id);

        if (!turno) {
            throw new AppError("Turno no encontrado", 404);
        }

        return res.status(200).json({
            estado: "EXITOSO",
            data: turno
        });

    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                error: error.message
            });
        }

        console.error("ERROR OBTENER TURNO:", error);

        return res.status(500).json({
            error: "Error al obtener turno"
        });
    }
};


    crear = async (req: Request, res: Response): Promise<void> => {
    try {
        const resultado = turnoSchema.safeParse(req.body);

        if (!resultado.success) {
            throw new AppError(
                "Los datos del turno no son válidos",
                400
            );
        }

        const turno = await this.service.crear(resultado.data);

        return res.status(201).json({
            estado: "EXITOSO",
            data: turno
        });

    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                error: error.message
            });
        }

        console.error("ERROR CREAR TURNO:", error);

        return res.status(500).json({
            error: "Error al crear turno"
        });
    }
};

    actualizar = async (
        req: Request,
        res: Response
    ): Promise<void> => {

        try {

            const id = Number(req.params.id);

            if (!Number.isInteger(id) || id <= 0) {

                throw new AppError(
                    "El ID debe ser un número entero positivo",
                    400
                );
            }

            const resultado =
                turnoSchema.safeParse(req.body);

            if (!resultado.success) {

                throw new AppError(
                    "Los datos del turno no son válidos",
                    400
                );
            }

            const turnoExistente =
                await this.service.obtenerPorId(id);

            if (!turnoExistente) {

                throw new AppError(
                    "No existe un turno con el ID indicado",
                    404
                );
            }

            const turnoActualizado =
                await this.service.actualizar(
                    id,
                    resultado.data
                );

            res.status(200).json({
                estado: "EXITOSO",
                data: turnoActualizado
            });

        } catch (error) {

            if (error instanceof AppError) {

                res.status(error.statusCode).json({
                    error: error.message
                });

                return;
            }

            console.error(
                "ERROR ACTUALIZAR TURNO:",
                error
            );

            res.status(500).json({
                error: "Error al actualizar turno"
            });
        }
    };

    eliminar = async (
        req: Request,
        res: Response
    ): Promise<void> => {

        try {

            const id = Number(req.params.id);

            if (!Number.isInteger(id) || id <= 0) {

                throw new AppError(
                    "El ID debe ser un número entero positivo",
                    400
                );
            }

            const turno =
                await this.service.obtenerPorId(id);

            if (!turno) {

                throw new AppError(
                    "No existe un turno con el ID indicado",
                    404
                );
            }

            await this.service.eliminar(id);

            res.status(200).json({
                estado: "EXITOSO",
                mensaje: "Turno eliminado correctamente"
            });

        } catch (error) {

            if (error instanceof AppError) {

                res.status(error.statusCode).json({
                    error: error.message
                });

                return;
            }

            console.error(
                "ERROR ELIMINAR TURNO:",
                error
            );

            res.status(500).json({
                error: "Error al eliminar turno"
            });
        }
    };
}
