import mongoose from "mongoose";

let conexionPromise = null;

export const conectarDB = () => {
  if (!conexionPromise) {
    conexionPromise = mongoose
      .connect(process.env.MONGODB, {
        maxPoolSize: 5,
      })
      .then((conexion) => {
        console.info("BD conectada");
        return conexion;
      })
      .catch((error) => {
        console.error("Error al conectar a la base de datos:", error);
        conexionPromise = null;
        throw error;
      });
  }
  return conexionPromise;
};

export default mongoose;
