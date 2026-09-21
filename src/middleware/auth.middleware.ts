import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest
    extends Request {

    usuario?: string;
    rol?: string;
}


export const verificarToken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {

    const authorization =
        req.headers.authorization;

    if (!authorization) {

        return res.status(401).json({
            error:
                "Token de autenticación requerido"
        });
    }


    const partes =
        authorization.split(" ");

    if (
        partes.length !== 2 ||
        partes[0] !== "Bearer"
    ) {

        return res.status(401).json({
            error:
                "Formato de token inválido"
        });
    }


    const token = partes[1];

    const secret =
        process.env.JWT_SECRET;

    if (!secret) {

        return res.status(500).json({
            error:
                "JWT_SECRET no configurado"
        });
    }


    try {

        const payload =
            jwt.verify(
                token,
                secret
            ) as {
                usuario: string;
                rol: string;
            };


        req.usuario =
            payload.usuario;

        req.rol =
            payload.rol;


        next();

    } catch (error) {

        return res.status(401).json({
            error:
                "Token inválido o expirado"
        });
    }
};