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
