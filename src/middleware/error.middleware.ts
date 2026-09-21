import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app.error";

export const errorMiddleware = (
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
): void => {

    if (error instanceof AppError) {

        res.status(error.statusCode).json({
            error: error.message
        });

        return;
    }

    console.error("ERROR:", error);

    res.status(500).json({
        error: "Error interno del servidor"
    });
};