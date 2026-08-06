import { Router } from "express";
import { login } from "../controllers/usuarios.controllers.js";
import loginLimiter from "../middlewares/loginLimiter.js";

const router = Router();
//get, post, put, delete solicitud, request
router.route("/login").post(loginLimiter, login);

export default router;
