import { validationResult } from "express-validator";

const resultadoValidacion = (req, res, next) => {
  const errores = validationResult(req);
  //errores.isEmpty() = true todo salio bien, no hay errores en la validacion
  //errores.isEmpty() = false hay errores de validacion
  if (!errores.isEmpty()) {
    return res.status(400).json({ mensaje: errores.array()[0].msg });
  }
  next();
};

export default resultadoValidacion;
