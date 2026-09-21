import { Router } from "express";

import { AuthService } from "./controllers/services/auth.services";
import { AuthController } from "./controllers/auth.controller";

const router = Router();

const service =
    new AuthService();

const controller =
    new AuthController(service);

router.post(
    "/login",
    controller.login
);

export default router;