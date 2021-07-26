const { Router } = require('express');
const { body, check } = require('express-validator');
const { validarCampos } = require('../middlewares/sumaErrores')

const router = Router();

const {
    productoGet,
    productoPost,
    productosGet,
    productos2Get,
    editProductoGet,
    productoPut,
    productoBorrar
} = require('../controllers/tienda.controller')
router.get('/add-producto', productoGet)
router.get('/productos/edit', editProductoGet)

/* Rutas De Gestion de productos */
// Crear un nuevo producto
router.post('/productos', [
    body('nombre', "El nombre es necesario").not().isEmpty(),
    check('precio', "Verificar el precio").not().isEmpty().isFloat(),
    check('descripcion', "Es necesaria la descripcion").not().isEmpty(),
    check('cantidad', "Verificar la cantidad").not().isEmpty().isInt(),
    check('imagen', "Es necesaria la imagen").not().isEmpty(),
    check('categoria', "Es necesaria la categoria").not().isEmpty(),
    validarCampos
], productoPost);

//Leer productos
router.get('/productos-plain', productosGet); //Muestra los productos (solo en texto)

router.get('/productos', productos2Get); // Muestra al admin los productos que hay en la db.

//Actualizar un producto(Usaremos POST de momento)
router.post('/productos/edit/:id', [
    body('nombre', "El nombre es necesario").not().isEmpty(),
    check('precio', "Verificar el precio").not().isEmpty().isFloat(),
    check('descripcion', "Es necesaria la descripcion").not().isEmpty(),
    check('cantidad', "Verificar la cantidad").not().isEmpty().isInt(),
    check('imagen', "Es necesaria la imagen").not().isEmpty(),
    check('categoria', "Es necesaria la categoria").not().isEmpty(),
    validarCampos
], productoPut);

//Eliminar un producto
router.delete('/productos/:id', [
    validarCampos
], productoBorrar);
//Eliminar un product (No METHOD)
router.get('/productos/eliminar/:id', productoBorrar);

module.exports = router;