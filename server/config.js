import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { conectarDB } from "../db/config.js";

export default class Server {
  constructor() {
    this.app = express();

    // FIX: Configuración para que el Rate Limiter funcione correctamente detrás de Vercel
    this.app.set("trust proxy", 1);

    this.port = process.env.PORT || 3051;
    this.conectarBaseDeDatos();
    this.middlewares();
  }

  async conectarBaseDeDatos() {
    try {
      await conectarDB();
    } catch (error) {
      console.error(
        "No se pudo establecer la conexión inicial a la base de datos",
      );
    }
  }

  middlewares() {
    this.app.use(
      helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" },
        crossOriginEmbedderPolicy: false,
      }),
    );

    const origenesPermitidos = [
      "https://catalogos-vehiculos.netlify.app",
      "http://localhost:5173",
    ];

    this.app.use(
      cors({
        origin: (origin, callback) => {
          if (!origin || origenesPermitidos.includes(origin)) {
            return callback(null, true);
          }
          callback(new Error("No permitido por CORS"));
        },
      }),
    );
    this.app.use(express.json());
    this.app.use(morgan("dev"));
  }

  manejoDeErrores() {
    this.app.use((req, res, next) => {
      res.status(404).json({ mensaje: "La ruta solicitada no existe" });
    });

    this.app.use((err, req, res, next) => {
      console.error("Error capturado por el middleware central:", err);

      // FIX: Si Mongoose tira un CastError (ID mal formado), mandamos 400 en vez de 500
      if (err.name === "CastError") {
        return res.status(400).json({ mensaje: "Formato de ID inválido" });
      }

      const statusCode = err.status || 500;
      const mensaje = err.message || "Error interno del servidor";

      res.status(statusCode).json({ mensaje });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.info(
        `El servidor se esta ejecutando en http://localhost:${this.port}`,
      );
    });
  }
}
