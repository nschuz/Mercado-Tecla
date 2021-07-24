const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/conexion');

const Producto = sequelize.define('producto', {
    id_producto: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    precio: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    descripcion: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    imagen: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // stock: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false
    // },
    categoria: {
        type: Sequelize.STRING, //Llave foranea
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

Producto.sync().then(() => {
    console.log('table created');
});

module.exports = { Producto }