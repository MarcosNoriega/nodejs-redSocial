const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Comentario = new Schema({
    imagen_id: ObjectId,
    email: String,
    gravatar: String,
    nombre: String,
    comentario: String,
    timestamp: {type: Date, default: Date.now},

});

Comentario.virtual('imagen')
.set(function(imagen) {
    this._imagen = imagen;
}).get(function(){
    return this._imagen;
});

module.exports = mongoose.model('Comentario', Comentario);