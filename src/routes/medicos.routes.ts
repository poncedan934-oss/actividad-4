import { Router } from "express";

import { MedicosRepository } 
    from "../repositories/medicos.repository";

import { MedicosService } 
    from "./controllers/services/medicos.services";

import { MedicosController } 
    from "./controllers/medicos.controller";
    

    import {
    verificarToken
} from "../middleware/auth.middleware";

const router = Router();


const repository =
    new MedicosRepository();


const service =
    new MedicosService(repository);


const controller =
    new MedicosController(service);

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

router.get(
    "/",
    controller.obtenerTodos
);


router.get(
    "/:id",
    controller.obtenerPorId
);


router.post(
    "/",
    controller.crear
);


router.put(
    "/:id",
    controller.actualizar
);


router.delete(
    "/:id",
    controller.eliminar
);


export default router;
