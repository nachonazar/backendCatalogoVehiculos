import { Router } from "express";
import vehiculosRoutes from "./vehiculos.routes.js";

const router = Router();
router.use("/vehiculos", vehiculosRoutes)

export default router;
