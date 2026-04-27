import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionVehiculo = [
  body("marca")
    .notEmpty()
    .withMessage("La marca del vehiculo es obligatoria")
    .isLength({ min: 2, max: 100 })
    .withMessage("La marca del vehiculo debe tener entre 2 y 100 caracteres")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s\-\.()]+$/)
    .withMessage(
      "La marca solo puede contener letras, espacios, guiones, puntos y paréntesis",
    )
    .trim(),
  body("modelo")
    .notEmpty()
    .withMessage("El modelo del vehiculo es obligatoria")
    .isLength({ min: 2, max: 100 })
    .withMessage("El modelo del vehiculo debe tener entre 2 y 100 caracteres")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s\-\.()/]+$/)
    .withMessage(
      "El modelo solo puede contener letras, números, espacios, guiones, puntos y paréntesis",
    )
    .trim(),
  body("categoria")
    .notEmpty()
    .withMessage("La categoria es un dato obligatorio")
    .isIn(["Sedán", "SUV", "Camioneta", "Deportivo"])
    .withMessage(
      "La categoria debe ser una de las siguientes opciones: Sedán, SUV, Camioneta, Deportivo",
    ),
  body("descripcion")
    .notEmpty()
    .isLength({ min: 10, max: 500 })
    .withMessage(
      "La descripción del vehiculo debe tener entre 10 y 500 caracteres",
    )
    .trim(),
  body("precio")
    .notEmpty()
    .withMessage("El precio es un dato obligatorio")
    .isNumeric()
    .withMessage("El precio debe ser un número")
    .custom((valor) => {
      if (valor >= 500000 && valor <= 500000000) {
        return true;
      } else {
        throw new Error("El precio debe estar entre 500.000 y 500.000.000");
      }
    }),
  body("km")
    .notEmpty()
    .withMessage("El kilometraje es un dato obligatorio")
    .isNumeric()
    .withMessage("El kilometraje debe ser un número")
    .custom((valor) => {
      if (valor >= 0 && valor <= 500000) {
        return true;
      } else {
        throw new Error("El kilometraje debe estar entre 0 y 500.000");
      }
    }),
  body("anio")
    .notEmpty()
    .withMessage("El año es un dato obligatorio")
    .isNumeric()
    .withMessage("El año debe ser un número")
    .custom((valor) => {
      const añoMax = new Date().getFullYear() + 1;
      if (valor >= 1900 && valor <= añoMax) {
        return true;
      } else {
        throw new Error(`El año debe estar entre 1900 y ${añoMax}`);
      }
    }),
  body("disponible")
    .optional()
    .isBoolean()
    .withMessage("El campo disponible debe ser booleano"),
  body("imagenes")
    .notEmpty()
    .withMessage("La imagen es un dato obligatorio")
    .isArray({ min: 1 })
    .withMessage("Debe incluir al menos una imagen"),
  body("imagenes.*")
    .matches(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/#\w?=&.-]*)*\/?$/)
    .withMessage("Cada imagen debe ser una URL válida"),
  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validacionVehiculo;
