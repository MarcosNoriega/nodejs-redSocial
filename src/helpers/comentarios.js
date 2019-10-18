const Comentarios = require('../models/comentarios');
const Imagen = require('../models/imagen');

module.exports = {
    async novedosos(){
        var comentarios = await Comentarios.find().limit(5).sort({timestamp: -1});

        for (comentario of comentarios){
            imagen = await Imagen.findById(comentario.imagen_id);
            comentario.imagen = imagen;
        }

        return comentarios;
    }
}