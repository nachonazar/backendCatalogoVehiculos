// src/controllers/usuarios.controllers.js
import generarJWT from "../helpers/generarJWT.js";
import Usuario from "../models/usuario.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //0- validar que email y password sean strings antes de usarlos en cualquier query
    // (evita inyección NoSQL vía operadores como $ne, $gt, $regex, etc.)
    if (typeof email !== "string" || typeof password !== "string") {
      return res
        .status(400)
        .json({ mensaje: "Formato de credenciales inválido" });
    }

    //1- buscar el usuario por email
    const adminExistente = await Usuario.findOne({ email });

    //2- verificar existencia y password en un solo paso, con el MISMO mensaje
    // (no revelamos si el problema fue "email no existe" o "password incorrecto",
    // para no permitir enumeración de usuarios)
    const passwordVerificado = adminExistente
      ? await bcrypt.compare(password, adminExistente.password)
      : false;

    if (!adminExistente || !passwordVerificado) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }

    //3- generar el token
    const token = await generarJWT(
      adminExistente.nombreAdmin,
      adminExistente.email,
    );

    //4- enviar la respuesta al frontend
    res.status(200).json({
      mensaje: "Login exitoso",
      token,
      nombreAdmin: adminExistente.nombreAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al loguear el administrador" });
  }
};
