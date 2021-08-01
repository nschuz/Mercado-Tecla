const { Router } = require('express');
const { validarCampos } = require('../middlewares/sumaErrores')

const router = Router();
const {
    renderCheckout,
    preRenderCheck,
    postDireccion,
    renderCompraExitosa
} = require('../controllers/user.controller');

router.get('/checkout',preRenderCheck, renderCheckout);
router.post('/checkout/direccion', postDireccion);
router.get('/compra-exitosa', renderCompraExitosa);



module.exports = router;