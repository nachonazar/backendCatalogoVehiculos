import jwt from "jsonwebtoken";

const generarJWT = async (email, id) => {
  try {
    //generar el payload
    const payload = { email, id };
    //firmar el token
    const token = await jwt.sign(payload, process.env.SECRET_JWT, {
      expiresIn: "2h",
    });
    return token;
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo generar el token");
  }
};

export default generarJWT;
