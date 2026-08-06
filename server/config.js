import express from "express";
import cors from "cors";
import morgan from "morgan";
import { conectarDB } from "../db/config.js";

export default class Server {
  constructor() {
    this.app = express();
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
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(morgan("dev"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.info(
        `El servidor se esta ejecutando en http://localhost:${this.port}`,
      );
    });
  }
}
