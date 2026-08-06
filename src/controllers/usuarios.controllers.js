import generarJWT from "../helpers/generarJWT.js";
import Usuario from "../models/usuario.js";
import bcrypt from "bcrypt";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
      return res
        .status(400)
        .json({ mensaje: "Formato de credenciales inválido" });
    }

    const adminExistente = await Usuario.findOne({ email });

    const passwordVerificado = adminExistente
      ? await bcrypt.compare(password, adminExistente.password)
      : false;

    if (!adminExistente || !passwordVerificado) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }

    const token = await generarJWT(
      adminExistente.nombreAdmin,
      adminExistente.email,
      adminExistente.rol,
    );

    res.status(200).json({
      mensaje: "Login exitoso",
      token,
      nombreAdmin: adminExistente.nombreAdmin,
    });
  } catch (error) {
    next(error);
  }
};
