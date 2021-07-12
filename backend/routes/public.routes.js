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
    res.redirect('/public/home')
})
router.get('/tienda', (req, res) => {
    // res.json({     mensaje: "hola"})
    res.render('categorias')
})

router.get('/registro', (req, res) => {
    // res.json({     mensaje: "hola"})
    res.render('registro')
})

router.get('/restablecer-password', (req, res) => {
    // res.json({     mensaje: "hola"})
    res.render('olvidepassword')
})

router.get('/login', (req, res) => {
    // res.json({     mensaje: "hola"})
    res.render('login')
})


router.get('/carrito', (req, res) => {
    // res.json({     mensaje: "hola"})
    res.render('cart')
})


router.get('/contacto', (req, res) => {
    // res.json({     mensaje: "hola"})
    res.render('contact')
})

router.get('/checkout', (req, res) => {
    // res.json({     mensaje: "hola"})
    res.render('checkout')
})







module.exports = router;