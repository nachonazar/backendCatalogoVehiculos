const errorMulter = (err, req, res, next) => {
  if (!err) return next();

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      mensaje: "La imagen supera el tamaño máximo permitido (2 MB)",
    });
  }

  if (err.message === "FORMATO_NO_PERMITIDO") {
    return res.status(400).json({
      mensaje:
        "Formato no permitido. Solo se aceptan imágenes (JPG, PNG, WEBP)",
    });
  }

  return res.status(400).json({
    mensaje: err.message || "Error inesperado al procesar el archivo",
  });
};

export default errorMulter;
