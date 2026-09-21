import { Request, Response } from "express";

import { MedicosService } from "./services/medicos.services";

import {medicoQuerySchema } from "../../schemas/medico.query.schema";

import { medicoSchema } from "../../schemas/medico.schema";

import { AppError } from "../../errors/app.error";

 import { z } from "zod";

export type MedicoInput = z.infer<typeof medicoSchema>;

export class MedicosController {

    constructor(
        private service: MedicosService
    ) {}

    obtenerTodos = async (
        req: Request,
        res: Response
    ): Promise<void> => {

        try {

            const resultado =
                medicoQuerySchema.safeParse(req.query);

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

        const medico = await this.service.obtenerPorId(id);

        if (!medico) {
            throw new AppError("Médico no encontrado", 404);
        }

        return res.status(200).json({
            estado: "EXITOSO",
            data: medico
        });

    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                error: error.message
            });
        }

        console.error("ERROR OBTENER MÉDICO:", error);

        return res.status(500).json({
            error: "Error al obtener médico"
        });
    }
};

crear = async (req: Request, res: Response): Promise<void> => {
    try {
        const resultado = medicoSchema.safeParse(req.body);

        if (!resultado.success) {
            throw new AppError(
                "Los datos del médico no son válidos",
                400
            );
        }

        const medico = await this.service.crear(resultado.data);

        return res.status(201).json({
            estado: "EXITOSO",
            data: medico
        });

    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                error: error.message
            });
        }

        console.error("ERROR CREAR MÉDICO:", error);

        return res.status(500).json({
            error: "Error al crear médico"
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
                medicoSchema.safeParse(req.body);

            if (!resultado.success) {

                throw new AppError(
                    "Los datos del médico no son válidos",
                    400
                );
            }

            const medicoExistente =
                await this.service.obtenerPorId(id);

            if (!medicoExistente) {

                throw new AppError(
                    "No existe un médico con el ID indicado",
                    404
                );
            }

            const medicoActualizado =
                await this.service.actualizar(
                    id,
                    resultado.data
                );

            res.status(200).json({
                estado: "EXITOSO",
                data: medicoActualizado
            });

        } catch (error) {

            if (error instanceof AppError) {

                res.status(error.statusCode).json({
                    error: error.message
                });

                return;
            }

            console.error(
                "ERROR ACTUALIZAR MÉDICO:",
                error
            );

            res.status(500).json({
                error: "Error al actualizar médico"
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

            const medico =
                await this.service.obtenerPorId(id);

            if (!medico) {

                throw new AppError(
                    "No existe un médico con el ID indicado",
                    404
                );
            }

            await this.service.eliminar(id);

            res.status(200).json({
                estado: "EXITOSO",
                mensaje: "Médico eliminado correctamente"
            });

        } catch (error) {

            if (error instanceof AppError) {

                res.status(error.statusCode).json({
                    error: error.message
                });

                return;
            }

            console.error(
                "ERROR ELIMINAR MÉDICO:",
                error
            );

            res.status(500).json({
                error: "Error al eliminar médico"
            });
        }
    };
}
