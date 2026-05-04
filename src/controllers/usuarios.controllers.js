import generarJWT from "../helpers/generarJWT.js";
import Usuario from "../models/usuario.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  try {
    //1- verificar si el mail existe, si no existe enviar mensaje de error
    const { email, password } = req.body;
    const adminExistente = await Usuario.findOne({ email });
    if (!adminExistente) {
      return res
        .status(404)
        .json({ mensaje: "No se encontro el administrador" });
    }
    //2- si existe el mail, verificar el password. Si el password no es el mismo entonces enviar mensaje de error
    const passwordVerificado = bcrypt.compareSync(
      password,
      adminExistente.password,
    );
    if (!passwordVerificado) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }
    //3- generar el token
    const token = await generarJWT(adminExistente.email, adminExistente._id);
    //4- enviar la respuesta al frontend
    res.status(200).json({ mensaje: "Login exitoso", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al loguear el administrador" });
  }
};
