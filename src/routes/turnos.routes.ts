import { Router } from "express";

import { TurnosRepository }
    from "../repositories/turnos.repository";

import { TurnosService }
    from "./controllers/services/turnos.services";

import { TurnosController }
    from "./controllers/turnos.controller";

import { verificarToken }
    from "../middleware/auth.middleware";


const router = Router();


const repository =
    new TurnosRepository();


const service =
    new TurnosService(repository);


const controller =
    new TurnosController(service);


router.get(
    "/",
    verificarToken,
    controller.obtenerTodos
);


router.get(
    "/:id",
    verificarToken,
    controller.obtenerPorId
);


router.post(
    "/",
    verificarToken,
    controller.crear
);


router.put(
    "/:id",
    verificarToken,
    controller.actualizar
);


router.delete(
    "/:id",
    verificarToken,
    controller.eliminar
);


export default router;