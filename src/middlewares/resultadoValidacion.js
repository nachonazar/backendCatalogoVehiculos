import { validationResult } from "express-validator";

const resultadoValidacion = (req, res, next) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    const erroresFormateados = errores.array().map((err) => ({
      mensaje: err.msg,
      campo: err.path,
    }));

    return res.status(400).json({
      errores: erroresFormateados,
    });
  }

  next();
};

export default resultadoValidacion;
