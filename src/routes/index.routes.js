import { Router } from "express";
import vehiculosRoutes from "./vehiculos.routes.js";
import usuariosRoutes from "./usuarios.routes.js";

const router = Router();
router.use("/vehiculos", vehiculosRoutes);
router.use("/usuarios", usuariosRoutes);

export default router;
