const { Contacto } = require('../models/contacto');
const { Usuario } = require('../models/Usuario');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { crearJWT } = require('../services/crearJWT.service');
const jwt = require('jsonwebtoken')
<<<<<<< HEAD
=======
const nodemailer = require("nodemailer");
const { generatePassword } = require('../services/generatePassword.service');
>>>>>>> ebbb207600b1145eab61af570feaccb34558b797

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

/******Controles registro usuario *******/
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

    const activo = await Usuario.findAll({ where: { id_unico: id, } });

    if (!activo[0].dataValues.activo) {
        return res.status(400).json("No se puede actualizar un usuario inabilatado") //no se puede borrar un usuario inactivo
    }

    try {
        const passHas = await bcrypt.hash(password, 10);
        Usuario.update({ nombre, apellido, email, password: passHas }, { where: { id_unico: id } });
        res.status(200).json("Datos actaulizados");
    } catch (e) {
        res.status(400).json('No se pudo procesar tu solicitud');
        console.log(e);
    }

}

//Borramos un usuario
const registroDelete = async(req, res) => {

    const { id } = req.body;

    const activo = await Usuario.findAll({ where: { id_unico: id, } });
    console.log(activo);

    if (!activo[0].dataValues.activo) {
        return res.status(400).json("Contacte al administrador") //no se puede borrar un usuario inactivo
    }

    try {
        Usuario.update({ activo: false }, { where: { id_unico: id } });
        res.status(200).json("Datos actaulizados");
    } catch (e) {
        res.status(400).json('No se pudo procesar tu solicitud');
        console.log(e);
    }

}

//get usuarios 
const usuariosGet = async(req, res) => {
    try {
        const usuarios = await Usuario.findAll();

        res.status(200).json(usuarios);
    } catch (e) {
        res.status(400).json('Problema al solicitar tu peticion');
        console.log(e);
    }

}


/* Controladores Login*/
const loginPost = async(req, res) => {
    const { email, password } = req.body;
    //verificamos el correo exista 
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
        return res.status(400).json('Usuario/Password erroneo')
    }

    //verificamos el password sea correcto 
    //validar password 
    const passwordDB = usuario.dataValues.password;
    const passwordCorecto = bcrypt.compareSync(password, passwordDB);
    console.log("passoword ", passwordCorecto);
    if (!passwordCorecto) {
        return res.status(400).json('Usuario/Password erroneos')
    }


    const token = await crearJWT(usuario.dataValues.id_unico);

    const isAdmin = usuario.dataValues.tipo_usuario;
    if (isAdmin == "admin") {
        //res.cookie('acces-token', token, { path: '/admin' }).render('admin')
        // res.cookie('token', token).redirect('/tienda/admin')
        res.cookie('token', token).redirect('/tienda/admin')
    } else {
        res.cookie('token', token).redirect('/tienda/user')
    }
}


const adminGet = async(req, res) => {
    const token2 = req.cookies.token;
    const { uid } = jwt.verify(token2, 'secretkey')
    const usuario = await Usuario.findOne({ where: { id_unico: uid } })
    let nombre = usuario.dataValues.nombre;
    nombre = nombre.toUpperCase();

    res.render('admin', {
        nombre
    });
}
const userGet = async(req, res) => {
    const token2 = req.cookies.token;
    const { uid } = jwt.verify(token2, 'secretkey')
    const usuario = await Usuario.findOne({ where: { id_unico: uid } })
    let nombre = usuario.dataValues.nombre;
    nombre = nombre.toUpperCase();


    res.render('user', {
        nombre
    })
}

const olvidepasswordPost = async(req, res) => {

<<<<<<< HEAD
=======
    const { email } = req.body;


    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
        return res.status(400).json('Usuario/Password erroneo')
    }

    const password = generatePassword();
    //ciframos la contraseña
    const passHas = await bcrypt.hash(password, 10);

    try {

        usuario.update({ password: passHas }, { where: { email } });

        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: "smtp.ionos.mx",
            port: 587,
            secure: false,
            auth: {
                user: 'chuz.regis@proyectocifrado.com',
                pass: 'Anytime0730',
            },
        });
        let info = await transporter.sendMail({
            from: '"Tecla Mercado" <chuz.regis@proyectocifrado.com>', // sender address
            to: email, // list of receivers
            subject: "🚨🚨Nuevo password🚨🚨",
            text: `Restablecer Password`,
            html: `<p>Tu nuevo password: </p> <br/>
                  <p>${password}</p> <br/>
                  <img src="https://img.icons8.com/ios/452/password--v1.png">`,

        });

        res.status(200).json("datos actaulizados");

    } catch (e) {
        res.status(400).json('No se pudo procesar tu solicitud');
        console.log(e);
    }







    //  console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    //  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}

>>>>>>> ebbb207600b1145eab61af570feaccb34558b797
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
    registroPost,
    registroPut,
    registroDelete,
    usuariosGet,
    loginPost,
    adminGet,
    userGet,
    olvidepasswordPost
}