import { Request, Response } from "express";


export class HelloController {

    bienvenida = async (
        req: Request,
        res: Response
    ): Promise<void> => {

        let estado = "INICIADO";

        try {

            // Camino feliz
            estado = "EXITOSO";

            res.status(200).json({
                mensaje: "Hello World",
                estado
            });

        } catch (error) {

            // Camino de error
            estado = "ERROR";

            res.status(500).json({
                mensaje: "Error interno",
                estado
            });
        }
    };
}
let estado = "INICIADO";



export class TurnosController {

    private estado = "INICIADO";

    crear = async (req: Request, res: Response) => {

        this.estado = "EXITOSO";

        res.json({
            estado: this.estado
        });
    };
}

export class MedicosController {

    private estado = "INICIADO";

    crear = async (req: Request, res: Response) => {

        this.estado = "EXITOSO";

        res.json({
            estado: this.estado
        });
    };
}