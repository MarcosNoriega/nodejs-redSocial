const estadisticas =  require('./estadisticas');
const imagen = require('./imagen');
const comentario = require('./comentarios');

module.exports = async (viewModel) => {
    
    var result = await Promise.all([
        imagen.popular(),
        estadisticas(),
        comentario.novedosos()
    ]);

    viewModel.sidebar = {
        estadisticas: result[1],
        popular: result[0],
        comentarios: result[2]
    }

    return viewModel;
}