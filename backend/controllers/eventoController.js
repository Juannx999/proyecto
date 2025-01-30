const Evento = require('../models/Evento');

exports.createEvento = async (req, res) => {
  try {
    const evento = new Evento(req.body);
    await evento.save();
    console.log('Evento creado: 201');
    res.status(201).send('Evento creado');
  } catch (error) {
    console.log('Error al crear evento: 400', error.message);
    res.status(400).send('Error al crear evento');
  }
};

exports.getEventos = async (req, res) => {
  try {
    const eventos = await Evento.find();
    console.log('Eventos listados: 200');
    res.json(eventos);
  } catch (error) {
    console.log('Error al listar eventos: 500', error.message);
    res.status(500).send('Error en el servidor');
  }
};

exports.updateEvento = async (req, res) => {
  try {
    await Evento.findByIdAndUpdate(req.params.id, req.body);
    console.log('Evento actualizado: 200');
    res.send('Evento actualizado');
  } catch (error) {
    console.log('Error al actualizar evento: 400', error.message);
    res.status(400).send('Error al actualizar evento');
  }
};

exports.deleteEvento = async (req, res) => {
  try {
    await Evento.findByIdAndDelete(req.params.id);
    console.log('Evento eliminado: 200');
    res.send('Evento eliminado');
  } catch (error) {
    console.log('Error al eliminar evento: 400', error.message);
    res.status(400).send('Error al eliminar evento');
  }
};
