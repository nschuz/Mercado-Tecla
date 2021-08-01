const { Usuario } = require('../models/Usuario');
const { Direccion, agregarDireccion } = require('../models/Direccion');
const { Carrito, obtenerItems, addFromCookies, limpiarCarrito } = require('../models/Carrito');
const { Producto, agregarProductos } = require('../models/Producto');
const { generarOrden } = require('../models/Orden');
const { generaDetalleOrden, getDetalleOrden, getCliente } = require('../models/DetalleOrden');
const { v4: uuidv4 } = require('uuid');
const { generarCobro } = require('../models/Pago');
const jwt = require('jsonwebtoken')

if (typeof localStorage === "undefined" || localStorage === null) {
    let LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

const preRenderCheck = async (req, res) => {
    productos = req.cookies.productos;
    localStorage.setItem('productos', productos);

    try {
        if (req.cookies.token) {
            const token2 = req.cookies.token;
            const { uid } = jwt.verify(token2, 'secretkey')
            let productosLS = localStorage.getItem('productos');
            let productosJson = JSON.parse(productosLS);
            await limpiarCarrito(uid);
            await agregarProductos(productosJson);
            await addFromCookies(productosJson, uid);            
        }
        res.redirect('/tienda/checkout');
    } catch (e) {
        res.redirect('/tienda/carrito');
    }
}

const renderCheckout = async (req, res) => {
    try {
        if (req.cookies.token) {
            const token2 = req.cookies.token;
            const { uid } = jwt.verify(token2, 'secretkey')
            const usuario = await Usuario.findOne({ where: { id_unico: uid } })
            let nombre = usuario.dataValues.nombre;
            let apellido = usuario.dataValues.apellido;
            nombre = nombre.toUpperCase();
            apellido = apellido.toUpperCase();

            const itemsCarrito = await obtenerItems(uid)
            let total = 0;
            itemsCarrito[0].forEach(element => {
                total += (element.total)
            });
            res.render('checkout', { nombreUsuario: nombre, apellido, productos: itemsCarrito[0], total});
        }
        else {
            res.redirect('/tienda/login')
        }   
    } catch (e) {
        res.status(400).json('No se pudo procesar tu solicitud :' + e);
    }
}

const postDireccion = async (req, res) => {
    const data = req.body; 
    const id_direccion = uuidv4();
    const id_pago = uuidv4();
    const id_orden = uuidv4();
    const token2 = req.cookies.token;
    const { uid } = jwt.verify(token2, 'secretkey');
    let productos = localStorage.getItem('productos');
    let productosJson = JSON.parse(productos);
    try {
        const token2 = req.cookies.token;
        const { uid } = jwt.verify(token2, 'secretkey')
        await agregarDireccion(id_direccion, data, uid,)
        generarCobro(id_pago, data, uid);
        generarOrden(id_orden, uid, id_pago, id_direccion);
        generaDetalleOrden(id_orden, productosJson);
        console.log('DetalleOrden Generada');
        limpiarCarrito(uid);
        res.redirect('/tienda/compra-exitosa?id=' + id_orden);
    } catch (err) {
        res.status(400).json(err)
    }
}

const renderCompraExitosa = async(req, res) => {
    const id_orden = req.query.id
    console.log('id orden: ',id_orden);
    let totalCompra = 0;
    try {
        const productos = await getDetalleOrden(id_orden);
        const cliente = await getCliente(id_orden);
        const name = cliente[0][0].nombre
        productos[0].forEach(element => {
            totalCompra += element.total;
        });
        res.render('productos/compra-exitosa', { name, id_orden, productos: productos[0], total: totalCompra });
    } catch (err) {
        res.status(400).json('No se pudo procesar tu solicitud ' + err)
    }
}

module.exports = {
    preRenderCheck,
    renderCheckout,
    postDireccion,
    renderCompraExitosa
}