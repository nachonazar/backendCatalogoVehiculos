import { Router } from "express";
import { login } from "../controllers/usuarios.controllers.js";
import loginLimiter from "../middlewares/loginLimiter.js";

const router = Router();
router.route("/login").post(loginLimiter, login);

export default router;
