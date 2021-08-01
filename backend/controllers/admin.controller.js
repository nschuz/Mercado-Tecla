const { Usuario } = require('../models/Usuario');
const jwt = require('jsonwebtoken')
const { Categoria } = require('../models/Categoria');
const { Producto, getProductosDisponibles } = require('../models/Producto')
const bcrypt = require('bcrypt');

/* Funciones para la API */
const createProducto = async(req, res) => {
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
        res.status(201).json(producto);

    } catch (e) {
        res.status(400).json('No se pudo procesar tu solicitud');
        console.log(e);
    }
}

const readProducto = async(req, res) => {
    try {
        const productos = await Producto.findAll();
        res.status(200).json(productos);
    } catch (e) {
        res.status(400).json('Problema al solicitar tu peticion');
        console.log(e);
    }
}

const readUnProducto = async(req, res) => {
    const id_producto = req.params.id
    try {
        const producto = await Producto.findAll({ where: { id_producto } });
        res.status(200).json(producto);
    } catch (e) {
        res.status(400).json('Problema al solicitar tu peticion');
        console.log(e);
    }
}

const updateProducto = async(req, res) => {
    const { nombre, precio, descripcion, cantidad, imagen, categoria } = req.body;
    const id_producto = req.params.id
    try {
        const producto = await Producto.update({ nombre, precio, descripcion, cantidad, imagen, categoria }, { where: { id_producto } });
        res.status(200).json('Modificado con exito')
    } catch (error) {
        res.status(400).json('No se pudo procesar tu solicitud');
        console.log(error);
    }
}

const deleteProducto = async(req, res) => {
    try {
        const id_producto = req.params.id;
        await Producto.destroy({ where: { id_producto } });
        res.status(200).json('Eliminado con exito');
    } catch (e) {
        res.status(400).json("No se pudo procesaro la solicitud");
    }
}

/* Funciones que renderizan */
const renderAddProducto = async(req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.render('./productos/add-producto', { categorias: categorias });
    } catch (error) {
        res.status(400).json('No se pudo procesar tu solicitud');
    }
}

const renderEditProducto = async(req, res) => {
    const id_producto = req.query.id
    try {
        const producto = await Producto.findOne({ where: { id_producto } })
        const categorias = await Categoria.findAll();
        res.render('./productos/edit-producto', {
            categorias: categorias,
            id_producto,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: producto.cantidad,
            imagen: producto.imagen,
            categoria: producto.categoria,
            descripcion: producto.descripcion,
        })
    } catch (error) {
        res.status(400).json('No se pudo procesar tu solicitud');
        console.log(e);
    }
}

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
        res.status(200).redirect('/tienda/admin/productos');

    } catch (e) {
        res.status(400).json('No se pudo procesar tu solicitud');
        console.log(e);
    }
}

//Obtenemos los productos de la db
const productosGet = async(req, res) => {
    try {
        // const productos = await getProductosDisponibles()
        const productos = await Producto.findAll();
        res.render('./productos/productos', { productos: productos })
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
        res.status(200).redirect('/tienda/admin/productos');
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

/* Funcion que redirige segun el usuario logeado */
const redirectType = async(req, res) => {
    const token2 = req.cookies.token;
    const { uid } = jwt.verify(token2, 'secretkey')
    const usuario = await Usuario.findOne({ where: { id_unico: uid } })
    let tipo = usuario.dataValues.tipo_usuario;
    if(tipo === 'admin') {
        res.redirect('/tienda/admin')
    } else {
        res.redirect('/tienda/user')
    }
}

//borramos usuario by email 
const registroEmailDelete = async(req, res) => {
    const { email } = req.params;

    const activo = await Usuario.findAll({ where: { email } });
    console.log(activo);

    if (!activo[0].dataValues.activo) {
        return res.status(400).json("Contacte al administrador") //no se puede borrar un usuario inactivo
    }
    try {
        Usuario.update({ activo: false }, { where: { email } });
        res.status(200).json("Datos actaulizados");
    } catch (e) {
        res.status(400).json('No se pudo procesar tu solicitud');
        console.log(e);
    }

}

//Update usuario
const updateUserPut = async(req, res) => {
    const { nombre, apellido, password, estado } = req.body;
    const emailnuevo = req.body.email;
    const { email } = req.params;


    const activo = await Usuario.findAll({ where: { email } });

    // if (!activo[0].dataValues.activo) {
    //     return res.status(400).json("No se puede actualizar un usuario inabilatado") //no se puede borrar un usuario inactivo
    // }
    console.log(nombre, apellido, password, estado);

    try {
        let passHas = '',
            nombreHas = '',
            apellidoHas = '',
            estadoHas = '',
            emailHas = '';

        if (password) {
            passHas = await bcrypt.hash(password, 10);
        } else {
            passHas = activo[0].dataValues.password
        }
        if (!nombre) {
            nombreHas = activo[0].dataValues.nombre;
        } else {
            nombreHas = nombre;
        }
        if (!apellido) {
            apellidoHas = activo[0].dataValues.apellido;
        } else {
            apellidoHas = apellido;
        }
        if (!emailnuevo) {
            emailHas = activo[0].dataValues.email;
        } else {
            emailHas = emailnuevo;
        }
        if (!estado) {
            estadoHas = activo[0].dataValues.estado;
        } else {
            estadoHas = estado;
        }





        Usuario.update({ nombre: nombreHas, apellido: apellidoHas, email: emailHas, password: passHas, activo: estadoHas }, { where: { email } });
        res.status(200).json("Datos actaulizados");
    } catch (e) {
        res.status(400).json('No se pudo procesar tu solicitud');
        console.log(e);
    }

}


module.exports = {
    createProducto,
    readProducto,
    readUnProducto,
    updateProducto,
    deleteProducto,

    renderAddProducto,
    renderEditProducto,
    productoPost,
    productosGet,
    productoPut,
    productoBorrar,
    registroEmailDelete,
    updateUserPut,
    redirectType
}