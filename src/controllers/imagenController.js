const imagenController = {};
const Imagen = require('../models/imagen');
const Comentario = require('../models/comentarios');
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const fs = require('fs-extra');
const md5 = require('md5');
const sidebar = require('../helpers/sidebar');

imagenController.index = async (req, res) => {
    var {id} = req.params;
    var imagen = await Imagen.findById(id);
    let viewModel = {};

    viewModel.imagen = imagen;
    

    if (imagen){
        imagen.views += 1;
        await imagen.save();
        var comentarios = await Comentario.find({imagen_id: id});

        viewModel.comentarios = comentarios;
        viewModel = await sidebar(viewModel);
    

        res.render('imagen', viewModel);
    }else{
        res.redirect('/');
    }
}

imagenController.create = async (req, res) => {
    var {nombre, descripcion} = req.body;
    var result = await cloudinary.v2.uploader.upload(req.file.path);

    var imagen = new Imagen({
        nombre,
        descripcion,
        ruta: result.url,
        public_id: result.public_id
    })

    await imagen.save();
    await fs.unlink(req.file.path);

    res.redirect('/');
    
}

imagenController.like = async (req, res) => {
    var {id} = req.params;
    var imagen = await Imagen.findById(id);
    imagen.likes += 1;
    await imagen.save();

    res.json({likes: imagen.likes});
}

imagenController.comentarios = async (req, res) => {
    var {id} = req.params; 
    var imagen = await Imagen.findById(id);

    if(imagen){
        var {nombre, email, comentario} = req.body;

        var comentario = new Comentario({
            imagen_id: id,
            email,
            gravatar: md5(email),
            nombre,
            comentario
        });

        await comentario.save();
        res.redirect('/imagen/' + id);
    }


    

    
}

imagenController.delete = async (req, res) => {
    var imagen = await Imagen.findById(req.params.id);
    cloudinary.v2.uploader.destroy(imagen.public_id);

    await Comentario.deleteOne({imagen_id: imagen._id});
    await imagen.remove();

    res.json({"mensaje": "Imagen eliminada con exito"});
}

module.exports = imagenController;