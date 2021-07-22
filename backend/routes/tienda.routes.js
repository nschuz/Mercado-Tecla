//Este archivo es para un futuro
const { Router } = require('express');
const { body } = require('express-validator');
const { validarCampos } = require('../middlewares/sumaErrores')

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
    contactoPost
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


router.post('/contacto', [
    body('nombre').not().isEmpty(),
    validarCampos
], contactoPost);


module.exports = router;