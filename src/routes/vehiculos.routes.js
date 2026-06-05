import { Router } from "express";
import {
  prueba,
  leerVehiculos,
  crearVehiculo,
  leerVehiculosPorId,
  editarVehiculosPorId,
  borrarVehiculosPorId,
  vehiculosPaginados,
} from "../controllers/vehiculos.controllers.js";
import validacionVehiculo from "../middlewares/validarVehiculo.js";
import verificarJWT from "../middlewares/verificarJWT.js";
import upload from "../middlewares/upload.js";
import errorMulter from "../middlewares/errorMulter.js";

const router = Router();
//get, post, put, delete
router.route("/prueba").get(prueba);
router
  .route("/")
  .get(leerVehiculos)
  .post(
    [verificarJWT, upload.array("imagenes"), errorMulter, validacionVehiculo],
    crearVehiculo,
  );
router.route("/paginacion").get(vehiculosPaginados);
router
  .route("/:id")
  .get(leerVehiculosPorId)
  .put(
    [verificarJWT, upload.array("imagenes"), errorMulter, validacionVehiculo],
    editarVehiculosPorId,
  )
  .delete(verificarJWT, borrarVehiculosPorId);

export default router;
