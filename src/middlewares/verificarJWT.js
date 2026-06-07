import jwt from "jsonwebtoken";

const verificarJWT = (req, res, next) => {
  try {
    //1- extraer el token de la solicitud
    const token = req.headers["x-token"];
    //2- verificar que envien el token
    if (!token) {
      return res
        .status(401)
        .json({ mensaje: "No se envio el token en la solicitud" });
    }
    //3- verificar si el token es valido
    const payload = jwt.verify(token, process.env.SECRET_JWT);
    // puedo extraer los datos del payload y almacenar en el req
    req.nombreAdmin = payload.nombreAdmin;
    req.email = payload.email;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ mensaje: "Token invalido", error: error.message });
  }
};

export default verificarJWT;
