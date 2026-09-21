import { Request, Response } from "express";

export const notFoundMiddleware = (
    req: Request,
    res: Response
): void => {

    res.status(404).json({
        error: "Ruta no encontrada",
        metodo: req.method,
        ruta: req.originalUrl
    });
};