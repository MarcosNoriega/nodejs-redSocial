const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');

//base de datos
require('../db/db');

//configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.engine('.hbs', handlebars({
    layoutsDir: app.get('views') + '/layouts',
    partialsDir: app.get('views') + '/partials',
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


//middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/images/temp'),
    filename: (res, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});

app.use(multer({
    storage,
    fileFilter: (req, file, cb) => {
        const filetype = /jpg|png|gif|jpeg/;
        const mimetype = filetype.test(file.mimetype);
        const extname = filetype.test(path.extname(file.originalname));
        if(mimetype && extname){
            return cb(null, true);
        }else{
            return cb("error: el archivo debe ser una imagen valida");
        }
    }}).single('imagen'));



//rutas
app.use(require('../routes'));

module.exports = app;