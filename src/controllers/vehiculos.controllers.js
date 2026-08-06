import subirImagenACloudinary from "../helpers/uploader.js";
import Vehiculo from "../models/vehiculo.js";

export const leerVehiculos = async (req, res) => {
  try {
    if (req.query.page || req.query.limit) {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const [vehiculos, total] = await Promise.all([
        Vehiculo.find().skip(skip).limit(limit),
        Vehiculo.countDocuments(),
      ]);

      return res.status(200).json({
        vehiculos,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      });
    }

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
    }

    // Construcción explícita para evitar vulnerabilidad de Mass Assignment
    const nuevoVehiculo = new Vehiculo({
      marca: req.body.marca,
      modelo: req.body.modelo,
      anio: Number(req.body.anio),
      categoria: req.body.categoria,
      precio: Number(req.body.precio),
      km: Number(req.body.km),
      disponible: req.body.disponible === "true",
      descripcion: req.body.descripcion,
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
