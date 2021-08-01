const { Router } = require('express');
const { body, check } = require('express-validator');
const { validarCampos } = require('../middlewares/sumaErrores');

const router = Router();

const {
    createProducto,
    readProducto,
    readUnProducto,
    updateProducto,
    deleteProducto,
    renderAddProducto,
    renderEditProducto,
    productoPost,
    productosGet,
    productoPut,
    productoBorrar,
    registroEmailDelete,
    updateUserPut
} = require('../controllers/admin.controller');

const { validarJWT } = require('../middlewares/validarJWT');
const { validarRol } = require('../middlewares/validarRol');
const { route } = require('./api.routes');
const { registroDelete } = require('../controllers/tienda.controller');
const { idExiste, emailNoExiste } = require('../services/db_validaciones.service');

/* Rutas para la api */

// Crear un nuevo producto
router.post('/productos', [
    body('nombre', "El nombre es necesario").not().isEmpty(),
    check('precio', "Verificar el precio").not().isEmpty().isFloat(),
    check('descripcion', "Es necesaria la descripcion").not().isEmpty(),
    check('cantidad', "Verificar la cantidad").not().isEmpty().isInt(),
    check('imagen', "Es necesaria la imagen").not().isEmpty(),
    check('categoria', "Es necesaria la categoria").not().isEmpty(),
    validarCampos
], createProducto);

//Leer productos
router.get('/productos', readProducto);

//Leer un producto
router.get('/productos/:id', readUnProducto);


//Editar los productos
router.put('/productos/:id', [
    body('nombre', "El nombre es necesario").not().isEmpty(),
    check('precio', "Verificar el precio").not().isEmpty().isFloat(),
    check('descripcion', "Es necesaria la descripcion").not().isEmpty(),
    check('cantidad', "Verificar la cantidad").not().isEmpty().isInt(),
    check('imagen', "Es necesaria la imagen").not().isEmpty(),
    check('categoria', "Es necesaria la categoria").not().isEmpty(),
    validarCampos
], updateProducto);

//Eliminar un producto
router.delete('/productos/:id', [
    validarCampos
], deleteProducto);


/* Rutas para las vista de gestion de productos */
router.get('/admin/add-producto', [
        validarJWT,
        validarRol
    ], renderAddProducto) //Ruta que renderiza la opcion de agregar un producto.
router.get('/admin/productos/edit', [
        validarJWT,
        validarRol
    ], renderEditProducto) //Ruta donde se renderiza la opcion de editar un producto.

// Crear un nuevo producto
router.post('/admin/productos', [
    body('nombre', "El nombre es necesario").not().isEmpty(),
    check('precio', "Verificar el precio").not().isEmpty().isFloat(),
    check('descripcion', "Es necesaria la descripcion").not().isEmpty(),
    check('cantidad', "Verificar la cantidad").not().isEmpty().isInt(),
    check('imagen', "Es necesaria la imagen").not().isEmpty(),
    check('categoria', "Es necesaria la categoria").not().isEmpty(),
    validarCampos,
    validarJWT,
    validarRol,
], productoPost);

//Leer productos
router.get('/admin/productos', [
    validarJWT,
    validarRol
], productosGet); // Muestra al admin los productos que hay en la db.

//Actualizar un producto(Usaremos POST de momento)
router.post('/admin/productos/edit/:id', [
    body('nombre', "El nombre es necesario").not().isEmpty(),
    check('precio', "Verificar el precio").not().isEmpty().isFloat(),
    check('descripcion', "Es necesaria la descripcion").not().isEmpty(),
    check('cantidad', "Verificar la cantidad").not().isEmpty().isInt(),
    check('imagen', "Es necesaria la imagen").not().isEmpty(),
    check('categoria', "Es necesaria la categoria").not().isEmpty(),
    validarCampos,
    validarJWT,
    validarRol
], productoPut);

//Eliminar un product (No METHOD)
router.get('/admin/productos/eliminar/:id', [
    validarJWT,
    validarRol
],productoBorrar);

router.get('/user-main', redirectType);

//DELETE USER BY EMAIl
router.delete('/admin/delelete/:email', [
    check('email').custom(emailNoExiste),
    validarCampos,
    validarJWT,
    validarRol
], registroEmailDelete)

//UPDATE USER 
router.put('/admin/update/:email', [
    body('nombre', "El nombre no pude llevar numeros").not().isNumeric(),
    body('apellido', "El apellido no pude llevar numeros").not().isNumeric(),
    validarJWT,
    validarRol
], updateUserPut)



module.exports = router;