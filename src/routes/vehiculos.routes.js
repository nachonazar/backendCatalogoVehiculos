import { Router } from "express";
import { prueba, leerVehiculos, crearVehiculo } from "../controllers/vehiculos.controllers.js";

const router = Router();
//get, post, put, delete
router.route("/prueba").get(prueba);
router.route("/").get(leerVehiculos).post(crearVehiculo);

export default router;
