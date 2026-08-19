import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const tiposPermitidos = ["image/jpeg", "image/png", "image/webp"];

    if (!tiposPermitidos.includes(file.mimetype)) {
      return cb(new Error("FORMATO_NO_PERMITIDO"));
    }

    cb(null, true);
  },
});

export default upload;
