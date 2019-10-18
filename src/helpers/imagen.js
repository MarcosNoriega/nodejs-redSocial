const Imagen = require('../models/imagen');

module.exports = {

    async popular(){
        var imagenes = await Imagen.find().limit(9).sort({likes: -1});

        return imagenes;
    }

}