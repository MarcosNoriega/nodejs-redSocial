const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const imagenController = require('../controllers/imagenController');


router.get('/', homeController.index);

router.get('/imagen/:id', imagenController.index);
router.post('/imagen/create', imagenController.create);
router.post('/image/:id/like', imagenController.like);
router.post('/image/:id/comentarios', imagenController.comentarios);
router.delete('/imagen/delate/:id', imagenController.delete)



module.exports = router;