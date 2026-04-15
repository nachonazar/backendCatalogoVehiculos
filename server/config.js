import express from "express";
import cors from "cors";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3051;
    this.middlewares();
  }

  //agregar metodos
  //middlewares
  middlewares() {
    this.app.use(cors()); //permite tener conexiones remotas
    this.app.use(express.json()); //interpreta los datos que llegan en la solicitud
    this.app.use(morgan("dev"));
    const __dirname = dirname(fileURLToPath(import.meta.url));
    console.log(`${__dirname}/../public`);
  }

  //escuchar el puerto
  listen() {
    this.app.listen(this.port, () => {
      console.info(
        `El servidor se esta ejecutando en http://localhost:${this.port}`,
      );
    });
  }
}
