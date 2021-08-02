const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/conexion')

const DetalleOrden = sequelize.define("detalleOrden", {
    id_orden: {
        type: Sequelize.STRING
    },
    id_producto: {
        type: Sequelize.STRING
    },
    cantidad: {
        type: Sequelize.INTEGER
    },
    total: {
        type: Sequelize.FLOAT
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

DetalleOrden.sync().then(() => {
    console.log('table created');
});

const generaDetalleOrden = (id_orden, productos) => {
    try {
        productos.forEach(element => {
            DetalleOrden.create({
                id_orden,
                id_producto: element.id,
                cantidad: element.cantidad,
                total: (element.cantidad * element.precio)
            })
        });
    } catch (err) {
        throw new Error('No se genero el detalle de orden.')
    }
}

const getDetalleOrden = (id_orden) => {
    try {
        const productos = sequelize.query(`SELECT imagen, nombre, detalleOrdens.cantidad AS cantidad, total FROM dbo.detalleOrdens, dbo.productos WHERE dbo.detalleOrdens.id_orden = '${id_orden}' AND dbo.detalleOrdens.id_producto = dbo.productos.id_producto`);
        return productos;
    } catch (err) {
        throw new Error('Problema al consultar la db.')
    }
}

const getCliente = (id_orden) => {
    try {
        const cliente = sequelize.query(`SELECT nombre FROM dbo.ordens, dbo.usuarios WHERE dbo.ordens.id_orden = '${id_orden}' AND dbo.ordens.id_cliente = dbo.usuarios.id_unico`);
        return cliente;
    } catch (err) {
        throw new Error('Problema al consultar la db.')
    }
}

const getEmail = (id_orden) => {
    try {
        const email = sequelize.query(`SELECT email FROM dbo.ordens, dbo.usuarios WHERE dbo.ordens.id_orden = '${id_orden}' AND dbo.ordens.id_cliente = dbo.usuarios.id_unico`);
        return email;
    } catch (err) {
        throw new Error('Problema al consultar la db.')
    }
}


module.exports = {
    DetalleOrden,
    generaDetalleOrden,
    getDetalleOrden,
    getCliente,
    getEmail,
};