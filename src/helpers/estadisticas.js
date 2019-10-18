const Imagen = require('../models/imagen');
const Comentarios = require('../models/comentarios');

async function imagenesTotales(){
    return await Imagen.countDocuments();
}

async function contadorComentarios(){
    return await Comentarios.countDocuments();
}

async function totalVistasImagenes(){
    var result = await Imagen.aggregate([{
        $group: {
            _id: '1',
            viewsTotal: {$sum: '$views'}
        }
    }]);

    return result[0].viewsTotal;
}

async function totalLikesImagenes(){
    var result = await Imagen.aggregate([{
        $group: {
            _id: '1',
            likesTotal: {$sum: '$likes'}
        }
    }]);

    return result[0].likesTotal;
}

module.exports = async () => {
    var result = await Promise.all([
        imagenesTotales(),
        contadorComentarios(),
        totalVistasImagenes(),
        totalLikesImagenes()
    ]);

    return {
        imagenes: result[0],
        Comentarios: result[1],
        Views: result[2],
        Likes: result[3]
    };
}