const homeController = {};
const Imagen = require('../models/imagen');
const sidebar = require('../helpers/sidebar');

homeController.index = async (req, res) => {
    var imagenes = await Imagen.find();
    let viewModel = {imagenes: []};
    viewModel.imagenes = imagenes;
    viewModel = await sidebar(viewModel);
    console.log(viewModel.sidebar.comentarios);
    res.render('index', viewModel);
}

module.exports = homeController;