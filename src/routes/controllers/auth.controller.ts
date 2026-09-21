import { Request, Response } from "express";

import { AuthService } from "./services/auth.services";

import { loginSchema } from "../../schemas/login.schema";

export class AuthController {

    constructor(
        private service: AuthService
    ) {}

    login = async (
        req: Request,
        res: Response
    ): Promise<Response> => {

        const resultado =
            loginSchema.safeParse(req.body);

        if (!resultado.success) {

            return res.status(400).json({
                error: "Datos de login inválidos",
                detalles:
                    resultado.error.issues
            });
        }

        try {

            const token =
                await this.service.login(
                    resultado.data.usuario,
                    resultado.data.password
                );

            if (!token) {

                return res.status(401).json({
                    error:
                        "Usuario o contraseña incorrectos"
                });
            }

            return res.status(200).json({
                mensaje: "Login exitoso",
                token
            });

        } catch (error) {

            console.error(
                "ERROR LOGIN:",
                error
            );

            return res.status(500).json({
                error:
                    "Error interno del servidor"
            });
        }
    };
}