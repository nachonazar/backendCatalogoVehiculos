import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB)
  .then(() => {
    console.info("BD conectada");
  })
  .catch((error) => {
    console.error("Error al conectar BD:", error.message);
  });