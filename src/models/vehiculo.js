import mongoose, { Schema } from "mongoose";

const vehiculoSchema = new Schema({
  marca: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  modelo: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
    match: [/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/],
  },
  anio: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear(),
  },
  categoria: {
    type: String,
    required: true,
    enum: ["Sedán", "SUV", "Camioneta", "Deportivo"],
  },
  precio: {
    type: Number,
    required: true,
    min: 0,
  },
  km: {
    type: Number,
    required: true,
    min: 0,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
  descripcion: {
    type: String,
    minlength: 10,
    maxlength: 500,
  },
  imagenes: {
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        return v.length > 0;
      },
    },
  },
});

const Vehiculo = mongoose.model("vehiculo", vehiculoSchema);

export default Vehiculo;
