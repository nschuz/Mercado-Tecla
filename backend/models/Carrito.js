const Sequelize = require('sequelize');
const db = require('./conexion')

const Carrito = db.define('carrito', {
    id_carrito: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_cliente: {
        type: Sequelize.INTEGER,
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
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

Carrito.sync().then(() => {
    console.log('table created');
});

module.exports = { Carrito }