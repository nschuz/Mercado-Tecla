const Sequelize = require('sequelize');
const db = require('../db/conexion')

const Carrito = db.define('carrito', {
    id_carrito: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_cliente: {
        type: Sequelize.STRING,
        allowNull: false
    },
    id_producto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    total: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

const addFromCookies = async (productos, uid) => {
    for (let i = 0; i < productos.length; i++) {
        const item = await Carrito.findOne({
            where: {
                id_producto: productos[i].id,
                id_cliente: uid
            } 
        }) 
        if (!item) {
            Carrito.create({
                id_cliente: uid,
                id_producto: productos[i].id,
                cantidad: productos[i].cantidad,
                total: productos[i].cantidad * productos[i].precio,
            })
        } else {
            Carrito.update({id_cliente: uid,
                id_producto: productos[i].id,
                cantidad: productos[i].cantidad,
                total: productos[i].cantidad * productos[i].precio, 
            }, { where: { id_producto: productos[i].id, id_cliente: uid} });
        }
    }
}

const obtenerItems = (user) => {
    const items =  db.query(`SELECT imagen, nombre, dbo.carritos.cantidad AS cantidad, precio, total FROM dbo.productos, dbo.carritos WHERE dbo.carritos.id_cliente = '${user}' AND dbo.carritos.id_producto = dbo.productos.id_producto`);
    return items;
}

const limpiarCarrito = (id_cliente) => {
    Carrito.destroy({ where: { id_cliente }});
}

// Carrito.sync().then(() => {
//     console.log('table created');
// });

module.exports = { Carrito, obtenerItems, addFromCookies, limpiarCarrito }