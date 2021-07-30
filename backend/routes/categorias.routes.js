/* Rutas para las categoria de la APi  */
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/sumaErrores')


const { 
    createCategoria,
    readCategoria,
    readUnaCategoria,
} = require('../controllers/categoria.controller')

const router = Router();

// Crear una nueva categoria
router.post('/categorias', [
    check('id_categoria', "Es necesario el id").not().isEmpty(),
    check('nombre', "Es necesario el nombre").not().isEmpty(),
    validarCampos
], createCategoria);

//Obtener todas las categorias
router.get('/categorias', readCategoria);

//Obtener una categoria
router.get('/categorias/:id', readUnaCategoria);

module.exports = router;