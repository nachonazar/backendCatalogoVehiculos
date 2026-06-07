import cloudinary from "./cloudinary.js";

const subirImagenACloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "vehiculos" }, //guardamos la img en la carpeta vehiculos
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      },
    );
    stream.end(buffer);
  });
};

export default subirImagenACloudinary;
