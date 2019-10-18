const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Imagen = new Schema({
    nombre: String,
    descripcion: String,
    ruta: String,
    likes: {type: Number, default: 0 },
    views: {type: Number, default: 0 },
    timesteamp: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Imagen', Imagen);