const { response, request } = require('express')


const aboutGet = (req, res) => {
    res.render('about')
}

const homeGet = (req, res) => {
    res.render('index')
}

const redirectGet = (req, res) => {
    res.redirect('/public/home')
}

const tiendaGet = (req, res) => {
    res.render('categorias')
}

const registroGet = (req, res) => {
    res.render('registro')
}

const olvidepasswordGet = (req, res) => {
    res.render('olvidepassword')
}

const loginGet = (req, res) => {
    res.render('login');
}

const carritoGet = (req, res) => {
    res.render('cart')
}

const contactoGet = (req, res) => {
    res.render('contact')
}

const checkoutGet = (req, res) => {
    res.render('checkout')
}




module.exports = {
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

}