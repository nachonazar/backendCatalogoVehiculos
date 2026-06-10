import subirImagenACloudinary from "../helpers/uploader.js";
import Vehiculo from "../models/vehiculo.js";

export const prueba = (req, res) => {
  res.status(200);
  res.send("Primera prueba desde el backend");
};

export const leerVehiculos = async (req, res) => {
  try {
    const listaVehiculos = await Vehiculo.find();
    res.status(200).json(listaVehiculos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al leer los vehiculos" });
  }
};

export const crearVehiculo = async (req, res) => {
  try {
    let imagenesUrl = [];
    if (req.files && req.files.length > 0) {
      const resultado = await Promise.all(
        req.files.map((file) => subirImagenACloudinary(file.buffer)),
      );
      imagenesUrl = resultado.map((r) => r.secure_url);
    } else {
      imagenesUrl = [
        "https://images.pexels.com/photos/32907356/pexels-photo-32907356.jpeg",
      ];
    }

    const nuevoVehiculo = new Vehiculo({
      ...req.body,
      imagenes: imagenesUrl,
    });

    await nuevoVehiculo.save();
    res.status(201).json({ mensaje: "Vehiculo creado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear el vehiculo" });
  }
};

export const leerVehiculosPorId = async (req, res) => {
  try {
    const vehiculoBuscado = await Vehiculo.findById(req.params.id);
    if (!vehiculoBuscado) {
      return res.status(404).json({ mensaje: "Vehiculo no encontrado" });
    }
    res.status(200).json(vehiculoBuscado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al leer el vehiculo" });
  }
};

export const editarVehiculosPorId = async (req, res) => {
  try {
    console.log("req.files:", req.files);
    console.log("req.body.imagenesExistentes:", req.body.imagenesExistentes);
    const vehiculoModificado = await Vehiculo.findById(req.params.id);
    if (!vehiculoModificado) {
      return res.status(404).json({ mensaje: "Vehiculo no encontrado" });
    }

    let imagenesUrl = vehiculoModificado.imagenes;

    if (req.files && req.files.length > 0) {
      const resultados = await Promise.all(
        req.files.map((file) => subirImagenACloudinary(file.buffer)),
      );
      const nuevasUrls = resultados.map((r) => r.secure_url);

      const existentes = req.body.imagenesExistentes
        ? Array.isArray(req.body.imagenesExistentes)
          ? req.body.imagenesExistentes
          : [req.body.imagenesExistentes]
        : [];

      imagenesUrl = [...existentes, ...nuevasUrls];
    } else if (req.body.imagenesExistentes) {
      imagenesUrl = Array.isArray(req.body.imagenesExistentes)
        ? req.body.imagenesExistentes
        : [req.body.imagenesExistentes];
    }

    await Vehiculo.findByIdAndUpdate(
      req.params.id,
      {
        marca: req.body.marca,
        modelo: req.body.modelo,
        anio: Number(req.body.anio),
        categoria: req.body.categoria,
        precio: Number(req.body.precio),
        km: Number(req.body.km),
        disponible: req.body.disponible === "true",
        descripcion: req.body.descripcion,
        imagenes: imagenesUrl,
      },
      { new: true, runValidators: true },
    );

    res.status(200).json({ mensaje: "Vehiculo actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al editar el vehiculo" });
  }
};

export const borrarVehiculosPorId = async (req, res) => {
  try {
    const vehiculoBorrado = await Vehiculo.findByIdAndDelete(req.params.id);
    if (!vehiculoBorrado) {
      return res.status(404).json({ mensaje: "Vehiculo no encontrado" });
    }
    res.status(200).json({ mensaje: "Vehiculo eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar el vehiculo" });
  }
};

export const vehiculosPaginados = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; //numero de pagina
    const limit = parseInt(req.query.limit) || 10; //limit es la cantidad de vehiculos que quieres mostrar por página.
    const skip = (page - 1) * limit; //la fórmula (page - 1) * limit te da el número de vehiculos que debes omitir (skip) para empezar en la página correcta.

    const [vehiculos, total] = await Promise.all([
      Vehiculo.find().skip(skip).limit(limit), //obtiene los vehiculos de la página solicitada.
      Vehiculo.countDocuments(), //cuenta el total de vehiculos en la colección.
    ]);

    res.status(200).json({
      vehiculos,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener vehiculos paginados" });
  }
};
