import mongoose, { Schema } from "mongoose";

const vehiculoSchema = new Schema({
  marca: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
    trim: true,
    match: [/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s\-\.()]+$/],
  },
  modelo: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
    trim: true,
    match: [/^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s\-\.()/]+$/],
  },
  anio: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 1,
  },
  categoria: {
    type: String,
    required: true,
    enum: ["Sedán", "SUV", "Camioneta", "Deportivo"],
  },
  precio: {
    type: Number,
    required: true,
    min: 500000,
    max: 500000000,
  },
  km: {
    type: Number,
    required: true,
    min: 0,
    max: 500000,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
  descripcion: {
    type: String,
    minlength: 10,
    maxlength: 500,
    trim: true,
  },
  imagenes: {
    type: String,
    required: true,
    validate: {
      validator: (valor) => {
        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\.(jpg|jpeg|png|webp))$/.test(
          valor
        );
      },
    },
  },
});

const Vehiculo = mongoose.model("vehiculo", vehiculoSchema);

export default Vehiculo;
