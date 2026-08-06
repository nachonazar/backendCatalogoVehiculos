import jwt from "jsonwebtoken";

const verificarJWT = (req, res, next) => {
  try {
    const token = req.headers["x-token"];

    if (!token) {
      return res
        .status(401)
        .json({ mensaje: "No se envio el token en la solicitud" });
    }

    const payload = jwt.verify(token, process.env.SECRET_JWT);

    req.nombreAdmin = payload.nombreAdmin;
    req.email = payload.email;

    req.rol = payload.rol;

    next();
  } catch (error) {
    console.error(error);

    res.status(401).json({ mensaje: "Token inválido o expirado" });
  }
};

export default verificarJWT;
