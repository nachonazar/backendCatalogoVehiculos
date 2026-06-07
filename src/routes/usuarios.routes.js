import { Router } from "express";
import { login } from "../controllers/usuarios.controllers.js";

const router = Router();
//get, post, put, delete solicitud, request
router.route("/login").post(login);

export default router;
