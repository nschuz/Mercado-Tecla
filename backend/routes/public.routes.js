//Este archivo es para un futuro
const { Router } = require('express');
const router = Router();
const hbs = require('hbs');

router.get('/about', (req, res) => {
    res.render('about')
})
router.get('/home', (req, res) => {
    res.render('index')
})
router.get('/', (req, res) => {
    // res.json({     mensaje: "hola"})
    res.render('index')
})
router.get('/tienda', (req, res) => {
    // res.json({     mensaje: "hola"})
    res.render('categorias')
})



module.exports = router;