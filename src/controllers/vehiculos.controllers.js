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
    const nuevoVehiculo = new Vehiculo(req.body);
    await nuevoVehiculo.save();
    res.status(200).json({ mensaje: "Vehiculo creado correctamente" });
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
    const vehiculoModificado = await Vehiculo.findByIdAndUpdate(req.params.id, req.body);
    if (!vehiculoModificado) {
      return res.status(404).json({ mensaje: "Vehiculo no encontrado" });
    }
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
