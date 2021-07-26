const { response, request } = require('express')
const { Contacto } = require('../models/contacto');
const { Producto, getProductosDisponibles } = require('../models/Producto')
const { Usuario } = require('../models/Usuario');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');





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
    fetch('https://api-mercado-tecla.herokuapp.com/api/categorias')
        .then(res => res.json())
        .then(json => {
            res.render('add-producto', { categorias: json})
        }); 
}

const editProductoGet = async (req, res) => {
    const id_producto = req.query.id
    const producto = await Producto.findOne({where: {id_producto} })

    fetch('https://api-mercado-tecla.herokuapp.com/api/categorias')
        .then(res => res.json())
        .then(json => {
            res.render('edit-producto', {
                categorias: json,
                id_producto, 
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: producto.cantidad,
                imagen: producto.imagen,
                categoria: producto.categoria,
                descripcion: producto.descripcion,
            })
        }); 
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

/*Controles registro usuario */
//Insertamos un usuario a la base de datos
const registroPost = async(req, res) => {
    const { nombre, apellido, email, password, date } = req.body;

    try {

        //ciframos la contraseña
        const passHas = await bcrypt.hash(password, 10);

        //Guardamos en la base de datos al usuario
        const usuario = await Usuario.create({
            id_unico: uuidv4(),
            nombre,
            apellido,
            password: passHas,
            email,
            date,
        })



        // res.status(200).redirect('/tienda/login');
        res.status(200).json("usuario creado")

    } catch (e) {
        res.status(400).json('No se pudo procesar tu solicitud');
        console.log(e);
    }

}

//Actaualizamos un usuario en la base de datos
const registroPut = async(req, res) => {
    const { nombre, apellido, email, password, date } = req.body;
    const { id } = req.params;

    try {
        const passHas = await bcrypt.hash(password, 10);
        Usuario.update({ nombre, apellido, email, password: passHas }, { where: { id_unico: id } });
        res.status(200).json("Datos actaulizados");
    } catch (e) {
        res.status(400).json('No se pudo procesar tu solicitud');
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
        res.status(200).redirect('/tienda/productos');

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

const productos2Get = async(req, res) => {
    try {
        // const productos = await getProductosDisponibles()
        const productos = await Producto.findAll();
        res.render('productos', { productos: productos})
    } catch (error) {
        res.status(400).json('Problema al solicitar tu peticion');
    }
}

//Actalizamos un producto
const productoPut = async(req, res) => {
    const { nombre, precio, descripcion, cantidad, imagen, categoria } = req.body;
    let id_producto = req.params.id;
    try {
        await Producto.update({ nombre, precio, descripcion, cantidad, imagen, categoria }, { where: { id_producto } });
        res.status(200).redirect('/tienda/productos');
    } catch (e) {
        res.status(400).json('No se pudo procesar tu solicitud');
    }
}

//Borramos algun producto
const productoBorrar = async(req, res) => {
    try {
        const id_producto = req.params.id;
        await Producto.destroy({ where: { id_producto } })
        res.redirect('/tienda/productos')
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
    productoBorrar,
    editProductoGet,
    registroPost,
    registroPut,
}