import { Router } from "express";
import { prueba, leerVehiculos, crearVehiculo, leerVehiculosPorId, editarVehiculosPorId, borrarVehiculosPorId } from "../controllers/vehiculos.controllers.js";

const router = Router();
//get, post, put, delete
router.route("/prueba").get(prueba);
router.route("/").get(leerVehiculos).post(crearVehiculo);
router.route("/:id").get(leerVehiculosPorId).put(editarVehiculosPorId).delete(borrarVehiculosPorId)

export default router;
