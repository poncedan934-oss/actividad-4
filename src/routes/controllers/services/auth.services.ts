import jwt from "jsonwebtoken";

export class AuthService {

    async login(
        usuario: string,
        password: string
    ) {

        if (
            usuario !== "admin" ||
            password !== "1234"
        ) {
            return null;
        }

        const secret =
            process.env.JWT_SECRET;

        if (!secret) {
            throw new Error(
                "JWT_SECRET no está configurado"
            );
        }

        const token =
            jwt.sign(
                {
                    usuario,
                    rol: "admin"
                },
                secret,
                {
                    expiresIn: "1h"
                }
            );

        return token;
    }
}