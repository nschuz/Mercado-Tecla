const { Router } = require('express');
const { validarCampos } = require('../middlewares/sumaErrores')

const router = Router();
const {
    renderCheckout,
    preRenderCheck,
    postPedido,
    renderCompraExitosa
} = require('../controllers/user.controller');

router.get('/buy', preRenderCheck);
router.get('/checkout', renderCheckout);
router.post('/checkout/direccion', postPedido);
router.get('/compra-exitosa', renderCompraExitosa);



module.exports = router;