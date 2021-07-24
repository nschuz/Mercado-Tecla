//Este archivo es para un futuro
const { Router } = require('express');
const { body, check } = require('express-validator');
const { validarCampos } = require('../middlewares/sumaErrores')
const { emailExiste, emailNoExiste } = require('../services/db_validaciones.service')

const router = Router();
const {
    aboutGet,
    homeGet,
    redirectGet,
    tiendaGet,
    registroGet,
    olvidepasswordGet,
    loginGet,
    carritoGet,
    contactoGet,
    checkoutGet,
    contactoPost,
    contacto2Get,
    contactoBorrar,
    contactoPut,
    productoGet,
    productoPost,
    productosGet,
    productos2Get,
    productoPut,
    productoBorrar,
} = require('../controllers/tienda.controller')

router.get('/about', aboutGet);
router.get('/home', homeGet);
router.get('/', redirectGet)
router.get('/tienda', tiendaGet)
router.get('/registro', registroGet)
router.get('/restablecer-password', olvidepasswordGet)
router.get('/login', loginGet);
router.get('/carrito', carritoGet)
router.get('/contacto', contactoGet)
router.get('/checkout', checkoutGet)
router.get('/add-producto', productoGet)

//insertar
router.post('/contacto', [
    body('nombre', "El nombre es necesario").not().isEmpty(),
    check('email', "El email no es valido").isEmail().normalizeEmail(),
    check('email').custom(emailExiste),
    check('mensaje', "El campo mensaje no es valido").not().isEmpty(),
    check('telefono', "Es necesario el telefono").not().isEmpty(),
    validarCampos
], contactoPost);

//get obetner contactos
router.get('/contactos', contacto2Get);

//actualizar 
router.put('/contacto/:email', [
    body('nombre', "El nombre es necesario").not().isEmpty(),
    // check('email', "El email no es valido").isEmail().normalizeEmail(),
    //   check('email', "Email no registrado").custom(emailNoExiste).not(),
    body('menssage', "El campo mensaje esta vacio").not().isEmpty(),
    check('telefono', "Es necesario el telefono").not().isEmpty(),
    validarCampos
], contactoPut);

//delete  registro
router.delete('/contacto/:email', [
    check('email', "El email no es valido").isEmail().normalizeEmail(),
    check('email', "El email no esta registrado").custom(emailNoExiste),
    validarCampos
], contactoBorrar);

/* Rutas De Gestion de productos */

// Crear un nuevo producto
router.post('/producto', [
    body('nombre', "El nombre es necesario").not().isEmpty(),
    check('precio', "Verificar el precio").not().isEmpty().isFloat(),
    check('descripcion', "Es necesaria la descripcion").not().isEmpty(),
    check('cantidad', "Verificar la cantidad").not().isEmpty().isInt(),
    check('imagen', "Es necesaria la imagen").not().isEmpty(),
    check('categoria', "Es necesaria la categoria").not().isEmpty(),
    validarCampos
], productoPost);

//Leer productos
router.get('/productos', productosGet);
router.get('/ver-productos', productos2Get);

//Actualizar un producto
router.put('/producto/:id', [
    body('nombre', "El nombre es necesario").not().isEmpty(),
    // check('email').custom(emailExiste),
    check('precio', "Verificar el precio").not().isEmpty().isFloat(),
    check('descripcion', "Es necesaria la descripcion").not().isEmpty(),
    check('cantidad', "Verificar la cantidad").not().isEmpty().isInt(),
    check('imagen', "Es necesaria la imagen").not().isEmpty(),
    check('categoria', "Es necesaria la categoria").not().isEmpty(),
    validarCampos
], productoPut);

//Eliminar un producto
router.delete('/producto/:id', [
    validarCampos
], productoBorrar);

module.exports = router;