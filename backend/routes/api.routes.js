const { Router } = require('express');
const {
    apiCategeoriasGet,
    apiTendenciasGet,
    productosCategoriasGet,
    procuctosNombreGet,
    apidefaultGet,
    apihomeGet,
    apidocGet,
} = require('../controllers/api.controller')

const router = Router();


router.get('/', apihomeGet)
router.get('/categorias', apiCategeoriasGet)
router.get('/tendencias', apiTendenciasGet);
router.get('/productos-categoria/:id', productosCategoriasGet)
router.get('/productos/:nombre', procuctosNombreGet)
router.get('/doc', apidocGet)
router.get('*', apidefaultGet)











/*
router.get('/', (req, res) => {
    res.json('hola');
})
*/




module.exports = router;