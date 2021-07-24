const { response, request } = require('express')
const { Contacto } = require('../models/contacto');
const { Producto } = require('../models/Producto')





const aboutGet = (req, res) => {
    res.render('about')
}

const homeGet = (req, res) => {
    res.render('index')
}

const redirectGet = (req, res) => {
    res.redirect('/tienda/home')
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

const productoGet = (req, res) => {
    res.render('add-producto')
}

//INsertamos a la base de datos
const contactoPost = async(req, res) => {
    const { nombre, telefono, email, mensaje } = req.body;
    try {
        const contacto = await Contacto.create({
            nombre,
            telefono,
            email,
            mensaje,
        })
        res.status(200).redirect('/tienda/contacto');

    } catch (e) {
        res.status(400).json('No se pudo procesar tu solicitud');
        console.log(e);
    }
}

//Borramos algun registro
const contactoBorrar = async(req, res) => {

    try {
        const { email } = req.params;
        console.log(email);
        await Contacto.destroy({ where: { email } })
        return res.status(200).json("registro eliminado");
    } catch (e) {
        res.status(400).json("No se pudo procesaro la solictud");
    }

}

//Actalizamos algun resgitro
const contactoPut = async(req, res) => {
    const { nombre, telefono, email, menssage } = req.body;
    console.log(menssage);
    try {
        Contacto.update({ nombre, telefono, mensaje: menssage }, { where: { email } });
        res.status(200).json("Datos actaulizados");
    } catch (e) {
        res.status(400).json('No se pudo procesar tu solicitud');
        console.log(e);
    }
}

//obtenemos registro
const contacto2Get = async(req, res) => {
    try {
        const contactos = await Contacto.findAll();
        console.log(contactos);
        res.status(200).json(contactos);
    } catch (e) {
        res.status(400).json('Problema al solicitar tu peticion');
        console.log(e);
    }
}

/* Controles de productos*/

//Insertamos un producto nuevo a la base de datos.
const productoPost = async(req, res) => {
    const { nombre, precio, descripcion, cantidad, imagen, categoria } = req.body;
    try {
        const producto = await Producto.create({
            nombre,
            precio,
            descripcion,
            cantidad,
            imagen,
            categoria,
        })
        res.status(200).redirect('/tienda/ver-productos');

    } catch (e) {
        res.status(400).json('No se pudo procesar tu solicitud');
        console.log(e);
    }
}

//Obtenemos los productos de la db
const productosGet = async(req, res) => {
    try {
        const productos = await Producto.findAll();
        res.status(200).json(productos);
    } catch (e) {
        res.status(400).json('Problema al solicitar tu peticion');
        console.log(e);
    }
}

const productos2Get = async (req, res) => {
    const productos = await Producto.findAll();
    res.render('productos', { productos: productos})
}

//Actalizamos un producto
const productoPut = async(req, res) => {
    const { nombre, precio, descripcion, cantidad, imagen, categoria } = req.body;
    let id_producto = req.params.id;
    try {
        Producto.update({ nombre, precio, descripcion, cantidad, imagen, categoria }, { where: { id_producto } });
        res.status(200).json("Datos actualizados");
    } catch (e) {
        res.status(400).json('No se pudo procesar tu solicitud');
        console.log(e);
    }
}

//Borramos algun producto
 const productoBorrar = async(req, res) => {
     try {
         const id_producto = req.params.id;
         await Producto.destroy({ where: { id_producto } })
         return res.status(200).json("Registro eliminado");
     } catch (e) {
         res.status(400).json("No se pudo procesaro la solicitud");
     }
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
    contactoPost,
    contacto2Get,
    contactoBorrar,
    contactoPut,
    productoGet,
    productoPost,
    productosGet,
    productos2Get,
    productoPut,
    productoBorrar
}