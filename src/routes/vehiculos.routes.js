import { Router } from "express";
import { prueba, leerVehiculos, crearVehiculo, leerVehiculosPorId, editarVehiculosPorId, borrarVehiculosPorId } from "../controllers/vehiculos.controllers.js";
import validacionVehiculo from "../middlewares/validarVehiculo.js";

const router = Router();
//get, post, put, delete
router.route("/prueba").get(prueba);
router.route("/").get(leerVehiculos).post(validacionVehiculo, crearVehiculo);
router.route("/:id").get(leerVehiculosPorId).put(validacionVehiculo, editarVehiculosPorId).delete(borrarVehiculosPorId)

export default router;
