const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fecha: { type: String, required: true },
  hora: { type: String, required: true },
  ubicacion: { type: String, required: true },  
  descripcion: { type: String, required: true }  
});

const Evento = mongoose.model('Evento', eventoSchema);

module.exports = Evento;
