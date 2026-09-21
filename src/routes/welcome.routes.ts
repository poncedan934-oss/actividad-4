import { Router } from "express";
import { HelloController } from "./controllers/welcome.controller";

const router = Router();

const controller = new HelloController();

router.get("/", controller.bienvenida);

export default router;