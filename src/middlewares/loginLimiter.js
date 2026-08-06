import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { mensaje: "Demasiados intentos, probá de nuevo en unos minutos" },
});

export default loginLimiter;
